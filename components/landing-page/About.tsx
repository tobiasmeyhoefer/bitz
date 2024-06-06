import { Statistics } from './Statistics'
import pilot from '@/public/images/pilot.png'
import Image from 'next/image'

export const About = () => {
  return (
    <section id="about" className="container py-24 sm:py-32">
      <div className="rounded-lg border bg-muted/50 py-12">
        <div className="flex flex-col-reverse gap-8 px-6 md:flex-row md:gap-12">
          <Image src={pilot} alt="" className="w-[300px] rounded-lg object-contain" />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl font-bold md:text-4xl">
                Was ist{' '}
                <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
                  Bitz
                </span>
              </h2>
              <p className="mt-4 text-xl text-muted-foreground">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. */}
                Bitz ist eine Kauf und Verkaufsplattform ähnlich wie Kleinanzeigen oder Vinted nur
                sehr viel besser. Bei Bitz dreht sich alles um die Freude am Stöbern, Entdecken und
                Handeln. Unsere Anwendung dient als Marktplatz zum Verkauf eigener Ware oder zum
                Kauf von Waren anderer. Unser Augenmerk liegt hierbei auf dem Handel mit technischer
                Ware, eine erhöhte Sicherheit und eine gute Benutzererfahrung. Durch
                individualisierbare Nutzerprofile lassen sich eigene kleine Shops erstellen, um die
                Artikel somit ideal zu vermarkten. Mit Bitz lässt sich somit Geld sparen, Platz
                schaffen und zudem die Umwelt schonen.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
