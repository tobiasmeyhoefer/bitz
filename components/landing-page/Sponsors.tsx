import { Radar } from "lucide-react";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Radar size={34} />,
    name: "Frank Hampe",
  },
  {
    icon: <Radar size={34} />,
    name: "Oliver Lietz",
  },
  {
    icon: <Radar size={34} />,
    name: "ShadCn",
  },
  {
    icon: <Radar size={34} />,
    name: "TailwindCSS",
  },
  {
    icon: <Radar size={34} />,
    name: "Next.js",
  },
  {
    icon: <Radar size={34} />,
    name: "Neon Database",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        special thanks to
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span>{icon}</span>
            <h3 className="text-xl  font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
