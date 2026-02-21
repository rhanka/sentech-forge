#!/usr/bin/env python3
"""Generate weekly SLOC SVG chart from top-ai-ideas-weekly-graph.csv.

Chart content:
- bars: weekly cloc_total
- line: 4-week trailing moving average
- lines: piecewise linear trends (before/after 2025-W51)
"""

from __future__ import annotations

import csv
import math
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT_CSV = ROOT / "src/content/blog/data/top-ai-ideas-weekly-graph.csv"
OUTPUT_SVG = ROOT / "public/blog/charts/top-ai-ideas-sloc-weekly.svg"
SMOOTHING_WINDOW = 4
MODEL_SHIFT_WEEK = "2025-W51"


@dataclass
class Point:
    iso_week: str
    cloc_total: int


def read_points(path: Path) -> list[Point]:
    with path.open("r", encoding="utf-8", newline="") as f:
        rows = list(csv.DictReader(f))

    if not rows:
        raise RuntimeError(f"No data rows in {path}")

    points: list[Point] = []
    for row in rows:
        if "iso_week" not in row or "cloc_total" not in row:
            raise RuntimeError("CSV must include iso_week and cloc_total columns")
        points.append(Point(iso_week=row["iso_week"], cloc_total=int(row["cloc_total"])))
    return points


def moving_average(values: list[int], window: int) -> list[float]:
    smoothed: list[float] = []
    for idx in range(len(values)):
        start = max(0, idx - window + 1)
        subset = values[start : idx + 1]
        smoothed.append(sum(subset) / len(subset))
    return smoothed


def linear_regression(values: list[int]) -> tuple[float, float]:
    n = len(values)
    xs = list(range(n))
    x_mean = sum(xs) / n
    y_mean = sum(values) / n

    denominator = sum((x - x_mean) ** 2 for x in xs)
    if denominator == 0:
        return 0.0, float(values[0])

    slope = sum((x - x_mean) * (y - y_mean) for x, y in zip(xs, values)) / denominator
    intercept = y_mean - slope * x_mean
    return slope, intercept


def nice_axis_max(max_value: float, lines: int = 6) -> tuple[int, int]:
    rough_step = max_value / lines
    if rough_step <= 0:
        return 1000, 6000

    magnitude = 10 ** int(math.floor(math.log10(rough_step)))
    normalized = rough_step / magnitude

    if normalized <= 1:
        step = 1
    elif normalized <= 2:
        step = 2
    elif normalized <= 2.5:
        step = 2.5
    elif normalized <= 5:
        step = 5
    else:
        step = 10

    y_step = int(step * magnitude)
    y_max = y_step * lines
    while y_max < max_value:
        y_max += y_step
    return y_step, y_max


def make_svg(points: list[Point]) -> str:
    values = [p.cloc_total for p in points]
    smooth = moving_average(values, SMOOTHING_WINDOW)
    week_to_index = {p.iso_week: i for i, p in enumerate(points)}
    split_index = week_to_index.get(MODEL_SHIFT_WEEK, len(values) // 2)
    split_index = max(1, min(split_index, len(values) - 2))

    pre_values = values[:split_index]
    post_values = values[split_index:]

    pre_slope, pre_intercept = linear_regression(pre_values)
    post_slope, post_intercept = linear_regression(post_values)

    pre_reg_start = pre_intercept
    pre_reg_end = pre_intercept + pre_slope * (len(pre_values) - 1)
    post_reg_start = post_intercept
    post_reg_end = post_intercept + post_slope * (len(post_values) - 1)

    width = 1360
    height = 760
    left = 100
    right = width - 60
    top = 80
    bottom = height - 120
    plot_width = right - left
    plot_height = bottom - top

    y_step, y_max = nice_axis_max(
        max(max(values), max(smooth), pre_reg_start, pre_reg_end, post_reg_start, post_reg_end) * 1.08
    )

    def y_to_px(value: float) -> float:
        if y_max == 0:
            return float(bottom)
        return bottom - (value / y_max) * plot_height

    slot = plot_width / len(points)
    bar_width = slot * 0.72

    grid_lines: list[str] = []
    y_labels: list[str] = []
    for tick in range(0, y_max + y_step, y_step):
        y = y_to_px(tick)
        grid_lines.append(
            f'<line x1="{left}" y1="{y:.2f}" x2="{right}" y2="{y:.2f}" stroke="#d7dde5" stroke-width="1" />'
        )
        y_labels.append(
            f'<text x="{left - 16}" y="{y + 4:.2f}" text-anchor="end" font-family="Inter, Arial, sans-serif" font-size="14" fill="#324055">{tick:,}</text>'
        )

    bars: list[str] = []
    for idx, value in enumerate(values):
        x = left + idx * slot + (slot - bar_width) / 2
        y = y_to_px(value)
        bar_h = max(1.0, bottom - y)
        bars.append(
            f'<rect x="{x:.2f}" y="{y:.2f}" width="{bar_width:.2f}" height="{bar_h:.2f}" fill="#7aa6d8" opacity="0.9" />'
        )

    smooth_points = " ".join(
        f"{left + idx * slot + slot / 2:.2f},{y_to_px(value):.2f}" for idx, value in enumerate(smooth)
    )

    pre_reg_x1 = left + slot / 2
    pre_reg_x2 = left + (len(pre_values) - 1) * slot + slot / 2
    pre_reg_y1 = y_to_px(pre_reg_start)
    pre_reg_y2 = y_to_px(pre_reg_end)

    post_reg_x1 = left + split_index * slot + slot / 2
    post_reg_x2 = left + (len(values) - 1) * slot + slot / 2
    post_reg_y1 = y_to_px(post_reg_start)
    post_reg_y2 = y_to_px(post_reg_end)

    shift_x = left + split_index * slot + slot / 2

    x_labels: list[str] = []
    max_labels = 9
    step = max(1, math.ceil(len(points) / max_labels))
    show_indexes = set(range(0, len(points), step))
    show_indexes.add(len(points) - 1)

    for idx in sorted(show_indexes):
        x = left + idx * slot + slot / 2
        label = points[idx].iso_week.replace("2025-", "").replace("2026-", "")
        x_labels.append(
            f'<text x="{x:.2f}" y="{bottom + 30}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" fill="#324055">{label}</text>'
        )

    subtitle = f"Range: {points[0].iso_week} to {points[-1].iso_week} | Smoothing window: {SMOOTHING_WINDOW} weeks"

    return f"""<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{width}\" height=\"{height}\" viewBox=\"0 0 {width} {height}\" role=\"img\" aria-labelledby=\"title desc\">
  <title id=\"title\">Weekly SLOC evolution for top-ai-ideas-fullstack</title>
  <desc id=\"desc\">Bars show weekly total SLOC. Orange line shows a 4-week moving average. Dashed lines show pre/post model-shift trends split at 2025-W51.</desc>
  <rect x=\"0\" y=\"0\" width=\"{width}\" height=\"{height}\" fill=\"#f8fafc\" />

  <text x=\"{left}\" y=\"38\" font-family=\"Inter, Arial, sans-serif\" font-size=\"30\" font-weight=\"700\" fill=\"#0f172a\">Top AI Ideas - Weekly SLOC</text>
  <text x=\"{left}\" y=\"62\" font-family=\"Inter, Arial, sans-serif\" font-size=\"15\" fill=\"#334155\">{subtitle}</text>

  {''.join(grid_lines)}
  {''.join(y_labels)}

  <line x1=\"{left}\" y1=\"{top}\" x2=\"{left}\" y2=\"{bottom}\" stroke=\"#334155\" stroke-width=\"1.2\" />
  <line x1=\"{left}\" y1=\"{bottom}\" x2=\"{right}\" y2=\"{bottom}\" stroke=\"#334155\" stroke-width=\"1.2\" />

  {''.join(bars)}

  <polyline points=\"{smooth_points}\" fill=\"none\" stroke=\"#f59e0b\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />
  <line x1=\"{pre_reg_x1:.2f}\" y1=\"{pre_reg_y1:.2f}\" x2=\"{pre_reg_x2:.2f}\" y2=\"{pre_reg_y2:.2f}\" stroke=\"#dc2626\" stroke-width=\"3\" stroke-dasharray=\"10 8\" />
  <line x1=\"{post_reg_x1:.2f}\" y1=\"{post_reg_y1:.2f}\" x2=\"{post_reg_x2:.2f}\" y2=\"{post_reg_y2:.2f}\" stroke=\"#0f766e\" stroke-width=\"3\" stroke-dasharray=\"10 8\" />
  <line x1=\"{shift_x:.2f}\" y1=\"{top}\" x2=\"{shift_x:.2f}\" y2=\"{bottom}\" stroke=\"#64748b\" stroke-width=\"1.5\" stroke-dasharray=\"5 6\" />
  <text x=\"{shift_x + 10:.2f}\" y=\"{top + 20}\" font-family=\"Inter, Arial, sans-serif\" font-size=\"12\" fill=\"#334155\">W51: GPT-5.2/5.3 Codex shift</text>

  {''.join(x_labels)}

  <g transform=\"translate({right - 330}, {top + 8})\">
    <rect x=\"0\" y=\"0\" width=\"322\" height=\"122\" rx=\"10\" fill=\"#ffffff\" stroke=\"#d7dde5\" />
    <rect x=\"18\" y=\"18\" width=\"24\" height=\"12\" fill=\"#7aa6d8\" opacity=\"0.9\" />
    <text x=\"52\" y=\"29\" font-family=\"Inter, Arial, sans-serif\" font-size=\"14\" fill=\"#1f2937\">Weekly cloc_total</text>
    <line x1=\"18\" y1=\"50\" x2=\"42\" y2=\"50\" stroke=\"#f59e0b\" stroke-width=\"4\" />
    <text x=\"52\" y=\"54\" font-family=\"Inter, Arial, sans-serif\" font-size=\"14\" fill=\"#1f2937\">4-week moving average</text>
    <line x1=\"18\" y1=\"74\" x2=\"42\" y2=\"74\" stroke=\"#dc2626\" stroke-width=\"3\" stroke-dasharray=\"10 8\" />
    <text x=\"52\" y=\"78\" font-family=\"Inter, Arial, sans-serif\" font-size=\"14\" fill=\"#1f2937\">Trend W40-W50</text>
    <line x1=\"18\" y1=\"98\" x2=\"42\" y2=\"98\" stroke=\"#0f766e\" stroke-width=\"3\" stroke-dasharray=\"10 8\" />
    <text x=\"52\" y=\"102\" font-family=\"Inter, Arial, sans-serif\" font-size=\"14\" fill=\"#1f2937\">Trend W51-W08</text>
  </g>
</svg>
"""


def main() -> None:
    points = read_points(INPUT_CSV)
    OUTPUT_SVG.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_SVG.write_text(make_svg(points), encoding="utf-8")
    print(f"Generated {OUTPUT_SVG}")


if __name__ == "__main__":
    main()
