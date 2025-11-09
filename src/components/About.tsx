import { Button } from "@/components/ui/button";
import { Award, Briefcase, GraduationCap, Mail } from "lucide-react";

export const About = () => {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">À Propos</h2>
            <p className="text-xl text-muted-foreground">
              Fabien ANTOINE - Expert Indépendant
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-medium mb-8">
            <div className="prose prose-lg max-w-none text-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Formé en tant qu'ingénieur à la recherche en intelligence artificielle, j'ai acquis ces 23 années une solide expertise en stratégie et gestion des Technologies de l'information, ainsi qu'en innovation et stratégie des données et intelligence artificielle.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                J'aime résoudre des problèmes d'affaire et construire une valeur d'affaire, en adaptant une vision basée sur l'état de l'art et l'innovation au cas pratique du terrain, prenant en compte les contraintes et les coûts.
              </p>
              <p className="text-lg leading-relaxed">
                Depuis 2025, j'offre des services conseils en stratégie, architecture et développement innovants en IT, données et IA pour des clients sur Montréal et Paris.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">23 ans</h3>
              <p className="text-muted-foreground">d'expérience</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">Ex-VP CGI</h3>
              <p className="text-muted-foreground">Stratégie IA</p>
            </div>

            <div className="text-center p-6 bg-card border border-border rounded-lg">
              <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-primary mb-2">Polytechnique</h3>
              <p className="text-muted-foreground">ENSTA, Master IA</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              <strong>Parcours notable :</strong> Ex-Colonel, CDO adjoint ministères Justice et Intérieur (FR), Lead IA, Direction de programmes complexes (budgets 20-100M€/an, équipes 50-100 personnes)
            </p>
            <Button variant="hero" size="lg">
              <Mail className="mr-2" />
              Discutons de votre projet
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
