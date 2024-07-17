/**
 * The `FAQ` component renders a frequently asked questions section with an accordion-style interface.
 * 
 * The `FAQList` array contains the questions, answers, and unique values for each FAQ item.
 * The `Accordion` component from the `@/components/ui/accordion` module is used to render the accordion.
 * Each `AccordionItem` contains a `question` as the trigger and an `answer` as the content.
 * 
 * The component also includes a link at the bottom for users to contact the site if they have additional questions.
 */
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQProps {
  question: string
  answer: string
  value: string
}

const FAQList: FAQProps[] = [
  {
    question: 'Wie funktioniert Bitz?',
    answer:
      'Bitz ist eine Plattform, auf der du Technikgeräte kaufen, verkaufen kannst. Registriere dich, erstelle ein Profil und beginne, deine Lieblingsgadgets zu entdecken oder zu verkaufen.',
    value: 'item-1',
  },
  {
    question: 'Ist die Nutzung von Bitz kostenlos?',
    answer:
      'Ja, die Registrierung und Nutzung von Bitz ist kostenlos. Es können jedoch Gebühren anfallen, wenn du bestimmte Premium-Dienste oder Funktionen nutzt.',
    value: 'item-2',
  },
  {
    question: 'Wie sicher ist der Handel auf Bitz?',
    answer:
      'Bei Bitz legen wir großen Wert auf Sicherheit. Wir bieten sichere Zahlungsoptionen und jeder Verkäufer muss sich über seine Telefonnummer verifizieren.',
    value: 'item-3',
  },
  {
    question: 'Wie kann ich ein Produkt verkaufen?',
    answer:
      'Um ein Produkt zu verkaufen, erstelle einfach ein neues Bit, füge Fotos und eine Beschreibung hinzu, und bestimme deinen Preis. Sobald ein Käufer Interesse zeigt, könnt ihr die Details des Verkaufs besprechen oder wenn du bereit bist zu verschicken kannst du auch eine „Direkt Kaufen“ Funktion anbieten.',
    value: 'item-4',
  },
  {
    question: 'Wie kann ich mein Konto bei Bitz löschen?',
    answer:
      'Um dein Konto zu löschen, gehe zu den Kontoeinstellungen und wähle die Option "Account löschen". Folge den Anweisungen, des Pop-ups und bestätige deine Entscheidung.',
    value: 'item-5',
  },
  {
    question: 'Welche Zahlungsmethoden werden bei Bitz akzeptiert?',
    answer:
      'Bitz akzeptiert aktuell die Zahlung mit Kreditkarte. Sonst kannst du auch mit dem Verkäufer einen Termin ausmachen und direkt Bar bezahlen.',
    value: 'item-6',
  },
]

export const FAQ = () => {
  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">
        Frequently Asked{' '}
        <span className="bg-gradient-to-b from-card-foreground/60 to-card-foreground bg-clip-text text-transparent">
          Questions
        </span>
      </h2>

      <Accordion type="single" collapsible className="AccordionRoot w-full">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mt-4 font-medium">
        Still have questions?{' '}
        <a
          rel="noreferrer noopener"
          href="#"
          className="border-primary transition-all hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
  )
}
