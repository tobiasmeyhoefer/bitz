import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useTranslations,
} from "next-intl";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}
export const Testimonials = () => {
  const t = useTranslations('Landingpage.Testimonials');  
const testimonials: TestimonialProps[] = [
  {
    image: "https://static5.depositphotos.com/1037987/482/i/600/depositphotos_4823943-stock-photo-smiling-senior-woman-in-garden.jpg",
    name: "Anna, 28",
    userName: "@Anna",
    comment: t('anna'),
  },
  {
    image: "https://st.depositphotos.com/1269204/1219/i/600/depositphotos_12196470-stock-photo-smiling-men-isolated-on-the.jpg",
    name: "Markus, 35",
    userName: "@Markus",
    comment: t('markus'),
  },

  {
    image: "https://st3.depositphotos.com/13194036/37570/i/600/depositphotos_375703938-stock-photo-happy-blonde-woman-smiling-camera.jpg",
    name: "Katrin, 30",
    userName: "@Katrin",
    comment:
    t('katrin')
  },
  {
    image: "https://st3.depositphotos.com/12982378/33423/i/600/depositphotos_334235336-stock-photo-portrait-tender-african-american-girl.jpg",
    name: "Lisa, 22",
    userName: "@Lisa",
    comment:
    t('lisa')
  },
  {
    image: "https://st2.depositphotos.com/11022818/43924/i/600/depositphotos_439249102-stock-photo-a-tired-and-sad-old.jpg",
    name: "Thomas, 58",
    userName: "@Thomas",
    comment:
    t('thomas')
  },
  {
    image: "https://st2.depositphotos.com/9393460/12292/i/600/depositphotos_122927452-stock-photo-girl-enjoying-summer-by-the.jpg",
    name: "Nina, 25",
    userName: "@Nina",
    comment:
    t('nina')
  },
];


  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        {t('title01')}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
           {t('title02')}{" "}
        </span>
         {t('title03')}
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        {t('sub')}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
