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

interface FAQComponentProps {
  translations: {
    title: string
    questions: string[]
    answers: string[]
    contactPrompt: string
    contactLink: string
  }
}

export const FAQ: React.FC<FAQComponentProps> = ({ translations }) => {
  const FAQList: FAQProps[] = translations.questions.map((question, index) => ({
    question,
    answer: translations.answers[index],
    value: `item-${index + 1}`,
  }))

  return (
    <section id="faq" className="container py-24 sm:py-32">
      <h2 className="mb-4 text-3xl font-bold md:text-4xl">{translations.title}</h2>

      <Accordion type="single" collapsible className="AccordionRoot w-full">
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="mt-4 font-medium">
        {translations.contactPrompt}{' '}
        <a
          rel="noreferrer noopener"
          href="#"
          className="border-primary transition-all hover:border-b-2"
        >
          {translations.contactLink}
        </a>
      </h3>
    </section>
  )
}
