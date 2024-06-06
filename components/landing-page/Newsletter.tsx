"use client"

import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export const Newsletter = () => {

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join {" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            Bitz{" "}
          </span>
          Today
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          von gestern für morgen
        </p>

        <div
          className="flex flex-col items-center justify-center w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
        >
          <Link href={"/auth/login"} className=""><Button>Lets get started</Button></Link>
        </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
