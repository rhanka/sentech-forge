#!/usr/bin/env python3
"""
Generate weekly development metrics for top-ai-ideas-fullstack.

Metrics mirror:
- make cloc
- make test-cloc
- make test-count

Output:
- src/content/blog/data/top-ai-ideas-weekly-metrics.csv
- src/content/blog/data/top-ai-ideas-weekly-graph.csv
"""

from __future__ import annotations

import csv
import os
import re
import shutil
import subprocess
import tempfile
from collections import OrderedDict
from datetime import datetime
from pathlib import Path
from typing import Iterable, Tuple

ROOT_REPO = Path("/home/antoinefa/src/top-ai-ideas-fullstack")
OUT_DIR = Path("/home/antoinefa/src/sentech-forge/src/content/blog/data")

TEST_PATTERN = re.compile(
    r"(^|[^A-Za-z0-9_])(test|it)(\.(skip|only|each|concurrent|fails|todo|fixme))*\s*\(",
    re.MULTILINE,
)


def run(cmd: list[str], cwd: Path | None = None) -> str:
    return subprocess.check_output(
        cmd,
        cwd=str(cwd) if cwd else None,
        text=True,
        stderr=subprocess.STDOUT,
    )


def get_week_commits(repo: Path) -> OrderedDict[str, tuple[str, str]]:
    """Return ISO-week -> (last_commit_date_in_week, commit_sha)."""
    log = run(
        [
            "git",
            "-C",
            str(repo),
            "log",
            "--reverse",
            "--date=short",
            "--pretty=format:%H|%cd",
        ]
    )

    weeks: OrderedDict[str, tuple[str, str]] = OrderedDict()
    for line in log.splitlines():
        sha, date_str = line.split("|", 1)
        dt = datetime.strptime(date_str, "%Y-%m-%d").date()
        year, week, _ = dt.isocalendar()
        weeks[f"{year}-W{week:02d}"] = (date_str, sha)
    return weeks


def cloc_code(snapshot_root: Path, targets: Iterable[str]) -> int:
    existing_targets = [str(snapshot_root / p) for p in targets if (snapshot_root / p).exists()]
    if not existing_targets:
        return 0

    cmd = [
        "cloc",
        "--csv",
        "--quiet",
        r"--not-match-f=(package.*\.json|.*_snapshot\.json)$",
        *existing_targets,
    ]
    output = run(cmd)

    reader = csv.reader(output.splitlines())
    for row in reader:
        if len(row) >= 5 and row[1] == "SUM":
            return int(row[4])
    raise RuntimeError("Unable to parse cloc SUM line")


def iter_files(snapshot_root: Path, scope: str) -> Iterable[Path]:
    if scope == "ui":
        base = snapshot_root / "ui/tests"
        if not base.exists():
            return
        for file_path in base.rglob("*"):
            if file_path.is_file() and (file_path.name.endswith(".test.ts") or file_path.name.endswith(".spec.ts")):
                yield file_path
        return

    if scope == "api_unit":
        base = snapshot_root / "api/tests"
        if not base.exists():
            return
        for file_path in base.rglob("*"):
            if not file_path.is_file():
                continue
            rel = file_path.relative_to(snapshot_root).as_posix()
            if rel.startswith("api/tests/ai/"):
                continue
            if file_path.name.endswith(".test.ts") or file_path.name.endswith(".spec.ts"):
                yield file_path
        return

    if scope == "api_ai":
        base = snapshot_root / "api/tests/ai"
        if not base.exists():
            return
        for file_path in base.rglob("*"):
            if file_path.is_file() and (file_path.name.endswith(".test.ts") or file_path.name.endswith(".spec.ts")):
                yield file_path
        return

    if scope == "e2e":
        base = snapshot_root / "e2e/tests"
        if not base.exists():
            return
        for file_path in base.rglob("*"):
            if not file_path.is_file() or not file_path.name.endswith(".spec.ts"):
                continue
            rel = file_path.relative_to(snapshot_root).as_posix()
            if rel.startswith("e2e/tests/fixtures/") or rel.startswith("e2e/tests/helpers/"):
                continue
            yield file_path
        return

    raise ValueError(f"Unknown scope: {scope}")


def count_tests(snapshot_root: Path, scope: str) -> Tuple[int, int]:
    files = 0
    cases = 0
    for file_path in iter_files(snapshot_root, scope) or []:
        files += 1
        content = file_path.read_text(encoding="utf-8", errors="ignore")
        cases += len(TEST_PATTERN.findall(content))
    return files, cases


def export_commit_snapshot(repo: Path, sha: str, out_dir: Path) -> None:
    git_proc = subprocess.Popen(
        ["git", "-C", str(repo), "archive", sha],
        stdout=subprocess.PIPE,
    )
    try:
        tar_proc = subprocess.Popen(
            ["tar", "-x", "-C", str(out_dir)],
            stdin=git_proc.stdout,
        )
        git_proc.stdout.close()
        tar_return = tar_proc.wait()
        git_return = git_proc.wait()
        if git_return != 0 or tar_return != 0:
            raise RuntimeError(f"Failed to export snapshot for {sha}")
    finally:
        if git_proc.stdout and not git_proc.stdout.closed:
            git_proc.stdout.close()


def main() -> None:
    weeks = get_week_commits(ROOT_REPO)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    full_csv = OUT_DIR / "top-ai-ideas-weekly-metrics.csv"
    graph_csv = OUT_DIR / "top-ai-ideas-weekly-graph.csv"

    rows: list[dict[str, object]] = []
    for iso_week, (date_str, sha) in weeks.items():
        tmp_dir = Path(tempfile.mkdtemp(prefix="top-ai-weekly-"))
        try:
            export_commit_snapshot(ROOT_REPO, sha, tmp_dir)

            total_sloc = cloc_code(tmp_dir, ["."])
            test_sloc = cloc_code(tmp_dir, ["api/tests", "ui/tests", "e2e/tests"])

            ui_files, ui_cases = count_tests(tmp_dir, "ui")
            api_unit_files, api_unit_cases = count_tests(tmp_dir, "api_unit")
            api_ai_files, api_ai_cases = count_tests(tmp_dir, "api_ai")
            e2e_files, e2e_cases = count_tests(tmp_dir, "e2e")

            test_files = ui_files + api_unit_files + api_ai_files + e2e_files
            test_cases = ui_cases + api_unit_cases + api_ai_cases + e2e_cases

            rows.append(
                {
                    "iso_week": iso_week,
                    "commit_date": date_str,
                    "commit_sha": sha,
                    "cloc_total": total_sloc,
                    "test_cloc": test_sloc,
                    "test_count_files": test_files,
                    "test_count_cases": test_cases,
                    "ui_test_files": ui_files,
                    "ui_test_cases": ui_cases,
                    "api_unit_test_files": api_unit_files,
                    "api_unit_test_cases": api_unit_cases,
                    "api_ai_test_files": api_ai_files,
                    "api_ai_test_cases": api_ai_cases,
                    "e2e_test_files": e2e_files,
                    "e2e_test_cases": e2e_cases,
                }
            )
        finally:
            shutil.rmtree(tmp_dir, ignore_errors=True)

    with full_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "iso_week",
                "commit_date",
                "commit_sha",
                "cloc_total",
                "test_cloc",
                "test_count_files",
                "test_count_cases",
                "ui_test_files",
                "ui_test_cases",
                "api_unit_test_files",
                "api_unit_test_cases",
                "api_ai_test_files",
                "api_ai_test_cases",
                "e2e_test_files",
                "e2e_test_cases",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    with graph_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "iso_week",
                "commit_date",
                "cloc_total",
                "test_cloc",
                "test_count_files",
                "test_count_cases",
            ],
        )
        writer.writeheader()
        for row in rows:
            writer.writerow(
                {
                    "iso_week": row["iso_week"],
                    "commit_date": row["commit_date"],
                    "cloc_total": row["cloc_total"],
                    "test_cloc": row["test_cloc"],
                    "test_count_files": row["test_count_files"],
                    "test_count_cases": row["test_count_cases"],
                }
            )

    print(f"Generated {full_csv}")
    print(f"Generated {graph_csv}")
    print(f"Weeks: {len(rows)}")
    if rows:
        print(f"Range: {rows[0]['iso_week']} -> {rows[-1]['iso_week']}")


if __name__ == "__main__":
    main()
