import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/landing-page/Icons";
import {
  useTranslations
  
 } from "next-intl";
interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const HowItWorks = () => {

const t = useTranslations('Landingpage.HowItWorks');
  
const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: t('step01'),
    description:
      t('step11'),
  },
  {
    icon: <MapIcon />,
    title: t('step02'),
    description:
      t('step22')
  },
  {
    icon: <PlaneIcon />,
    title: t('step03'),
    description:
      t('step33')
  },
  {
    icon: <GiftIcon />,
    title: t('step04'),
    description:
      t('step44'),
  },
];


  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        {t('title01')}{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
           {t('title02')}{" "}
        </span>
         {t('title03')}
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
         {t('sub')}
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
