import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/landing-page/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Account erstellen",
    description:
      "Erstelle dir einen Account... bei uns gibt es keine Passwörter das erhöht die Sicherheit",
  },
  {
    icon: <MapIcon />,
    title: "Durchstöber die Produkte",
    description:
      "Gehe auf die Entdecken Seite und finde Produkte die dir gefallen... du kannst auch nach ihnen suchen",
  },
  {
    icon: <PlaneIcon />,
    title: "Kaufen",
    description:
      "Du kannst ein Produkt Kaufen oder Direkt Kaufen, Kaufen ist für das persönliche Treffen und verhandeln und Direkt kaufen ist für Paketversand",
  },
  {
    icon: <GiftIcon />,
    title: "Benutzen",
    description:
      "Nutze dein erworbenes Bit und stelle es wieder auf unserer Plattform wenn du genug davon hast",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Bitz ist kinderleicht, hier eine kurze Erklärung
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
