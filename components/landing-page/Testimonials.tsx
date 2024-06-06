import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://static5.depositphotos.com/1037987/482/i/600/depositphotos_4823943-stock-photo-smiling-senior-woman-in-garden.jpg",
    name: "Anna, 28",
    userName: "@Anna",
    comment: "Ich liebe Bitz! Hier finde ich immer genau, was ich brauche und das zu großartigen Preisen. Die Community ist super hilfsbereit und ich habe schon viele tolle Deals gemacht.",
  },
  {
    image: "https://st.depositphotos.com/1269204/1219/i/600/depositphotos_12196470-stock-photo-smiling-men-isolated-on-the.jpg",
    name: "Markus, 35",
    userName: "@Markus",
    comment:
    "Bitz ist für mich die beste Plattform, um meine alten Geräte zu verkaufen. Der Verkaufsprozess ist einfach und ich erreiche viele potenzielle Käufer."
  },

  {
    image: "https://st3.depositphotos.com/13194036/37570/i/600/depositphotos_375703938-stock-photo-happy-blonde-woman-smiling-camera.jpg",
    name: "Katrin, 30",
    userName: "@Katrin",
    comment:
    "Bitz ist einfach fantastisch! Ich habe schon viele Schnäppchen gemacht und die Qualität der Produkte ist immer top. Es ist meine erste Anlaufstelle bei Elektronik Bedarf."
  },
  {
    image: "https://st3.depositphotos.com/12982378/33423/i/600/depositphotos_334235336-stock-photo-portrait-tender-african-american-girl.jpg",
    name: "Lisa, 22",
    userName: "@Lisa",
    comment:
    "Dank Bitz konnte ich mein altes Smartphone schnell und sicher verkaufen. Die Benutzeroberfläche ist intuitiv und die Kommunikation mit den Käufern lief reibungslos."
  },
  {
    image: "https://st2.depositphotos.com/11022818/43924/i/600/depositphotos_439249102-stock-photo-a-tired-and-sad-old.jpg",
    name: "Thomas, 58",
    userName: "@Thomas",
    comment:
    "Die Plattform bietet eine tolle Möglichkeit, neue Technik-Produkte auszuprobieren, ohne gleich viel Geld auszugeben."
  },
  {
    image: "https://st2.depositphotos.com/9393460/12292/i/600/depositphotos_122927452-stock-photo-girl-enjoying-summer-by-the.jpg",
    name: "Nina, 25",
    userName: "@Nina",
    comment:
    "Ich bin begeistert vom modernen und coolen Design von Bitz. Die Benutzeroberfläche ist super intuitiv und sieht einfach klasse aus. Es macht richtig Spaß, durch die Angebote zu stöbern!"
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Love{" "}
        </span>
        Bitz
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Unsere Kunden sind immer zufrieden
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
