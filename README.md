# BITZ - Next Generation


#
___
### Inhaltsverzeichnis

##### I. Einleitung
  1. Kontext
  2. Onboarding für neue Mitarbeiter
  3. Zusätzliche Hinweise für Developer
     1. weitere wichtige Skripte
     2. ...zur Datenbankmigrationen
     3. Gitflow, Pullrequests & Merging
     4. Internationalierung (i18n)
     5. Code Conventions
     6. Lösungen für typische Probleme

##### II. Frontend-Technologien
  1. TypeScript
     1. Sort-By-Typescript
  2. Next.js v14+ (App Router)
  3. React
     1. React-Dom
     2. Zod (Formularvalidierung)
  4. Tailwind CSS (für Styling in der TSX-Syntax)
     1. Tailwind Merge
     2. Tailwind CSS Animate
  5. Next-Intl (Internationalisierung)
  6. React-Hook-Form
  7. clsx
  8. ShadCN (für bereits gut aussehende Komponenten)
     1.  Radix UI
  9.  Framer Motion
  10. Three (für 3D-Komponenten)
      1. React Three Fiber
      2. @types/three
      3. Drei
  11. Icons
      1.  React Icons
      2.  Lucide React
  12. Skeletons
  13. Zustand
  14. @geoapify/react-geocoder-autocomplete
      1.  @geoapify/geocoder-autocomplete
  15. React Intersection Observer (Lazy Loading)
  16. Canvas Confetti
      1.  @types/canvas-confetti
  17. Axios

##### III. Backend-Technologien
  1. Drizzle (Object Relational Mapper)
  2. Authentifizierung
     1. Next Auth.js (Authentifizierung)
     2. @simplewebauthn/browser & @simplewebauthn/server
     3. @auth/drizzle-adapter
  3. Neon Database (serverless PostgreSQL-Datenbank)
  4. AWS SDK 
  5. Twilio
     1. @types/twilio
  6. Pusher
      1.  Pusher JS
  7. Stripe
  8. React Email

##### IV.  Weitere Tools
  1. Node.js
  2. npm
  3. Git und Github (Versionskontrolle)
  4. Vercel (Deployment)
  5. Discord (Kommunikation)
  6. Notion (Organisation)
  7. Figma (für Styling und Corporate Design)

##### V. Lessons Learned

##### VI. Zukunft

##### VII. Fazit

##### VIII. Entwickler & Autoren


#
___
#
## I. Einleitung

#### 1.1 Kontext
**BITZ - Next Generation**
Bitz ist eine innovative Online-Plattform, die sich auf den Kauf, Verkauf und Tausch von Technikprodukten spezialisiert hat. Unser Ziel ist es, Menschen zusammenzubringen, die ihre gebrauchte Technik verkaufen möchten, mit denen, die auf der Suche nach erschwinglichen und hochwertigen Geräten sind. Bitz bietet eine benutzerfreundliche und sichere Umgebung, in der Transaktionen einfach und unkompliziert abgewickelt werden können. Durch unseren Fokus auf Technologie und unsere engagierte Community unterscheiden wir uns von anderen Online-Marktplätzen. Bei Bitz finden Sie eine große Auswahl an Technikprodukten zu wettbewerbsfähigen Preisen und profitieren von einem erstklassigen Kundenerlebnis.

Dieses Dokument bietet eine detaillierte Dokumentation der in unserem Projekt "Bitz" verwendeten Technologien. Es konzentriert sich speziell darauf, welchen Mehrwert die einzelnen Technologien für unser Projekt bieten und wie sie zu einer besseren Benutzererfahrung, verbesserter Codequalität und effizienter Entwicklung beitragen.

#### 1.2 Onboarding für neue Mitarbeiter

Willkommen im BITZ-Team! Hier sind einige Schritte, um Ihnen den Einstieg zu erleichtern:

1. *Repository klonen*:
  ```bash
  git clone https://github.com/tobiasmeyhoefer/bitz.git
  cd bitz
  ```
  Durch diesen Schritt klonen Sie das Projektrepository auf Ihren lokalen Computer.

2. *Abhängigkeiten installieren*:
  ```bash
  npm install
  ```
  Durch diesen Schritt installieren Sie alle Abhängigkeiten, die für das Projekt erforderlich sind.

3. *Umgebungsvariablen einrichten*
    Sie benütigen eine .env.local Datei im Stammverzeichnis und mit den die notwendigen Umgebungsvariablen hinzu. Kontaktieren sie einen Administrator, um diese Datei zu erhalten.
    ```bash
    ```    

4. *Entwicklungsserver starten*:
   ```bash
   npm run dev
   ```
   Durch diesen Schritt starten Sie den Entwicklungsserver, um den Projektcode zu berprüfen und zu debuggen. Jede veränderung im Code wird live sichtbar.
 ```bash
 ```
5. *Projektstruktur verstehen*: 
   Schauen sie sich die Struktur des Projektes im Explorer an, um ein Gefühl für die Organisation des Codes zu bekommen. 
   __
   *Wichtige Ordner und Unterordner:*
   * `app`: Hauptverzeichnis für die Next.js-Anwendung.
   * `app/[locale]`: Enthält lokalisierte Routen und Seiten für verschiedene Sprachen.
   * `app/[locale]/(protected)`: Enthält geschützte Routen und Seiten, die nur für authentifizierte Benutzer zugänglich sind.
   * `app/api`: Enthält API-Routen fr serverseitige Funktionen und Endpunkte.
   * `components`: Enthält wiederverwendbare React-Komponenten, die in der gesamten Anwendung verwendet werden
   * `lib`: Enthält Hilfsfunktionen und Logik, die in verschiedenen Teilen der Anwendung verwendet werden.
       * _Beispiel_: `productaction.ts` - Funktionen und Logik im Zusammenhang mit Produktaktionen.
   * `messages`: Enthält die Lokalisierungsdateien für die Internationalisierung der Anwendung.
       * en.json: Lokalisierungsdatei für englische Texte.
       * de.json: Lokalisierungsdatei für deutsche Texte.
   * `package.json`: Definiert die Abhängigkeiten des Projekts, Skripte zum Bauen, Starten und Testen der Anwendung sowie andere Metadaten.
  
   __
    *Wichtige Konfigurations-Dateien im Root-Ordner*
     * `i18n.ts`: Konfiguriert die Internationalisierung der Anwendung.
     * `navigation.ts`: Definiert die Navigationslogik der Anwendung.
     * `db.ts`: Stellt die Datenbankverbindung her.
     * `drizzle.config.ts`: Konfiguriert den Drizzle ORM.
     * `middleware.ts`: Definiert Middleware-Funktionen für die Anwendung.
     * `routes.ts`: Definiert die Routen der Anwendung.
     * `schema.ts`: Definiert das Datenbankschema.
     * `auth.ts`: Konfiguriert die Authentifizierungslogik.
     * __Hinweis: Diese Dateien sind wichtig für die Gesamtfunktionalität der Anwendung, aber für die meisten Entwickler zunächst nicht von zentraler Bedeutung, sobald sie einmal korrekt eingerichtet sind.__

   

#
#### 1.3 Zusätzliche Hinweise für Developer

##### 1.3.1 weitere wichtige Skripte:

- `npm run dev`: Startet die Anwendung im Entwicklungsmodus.
- `npm run build`: Erstellt ein Produktions-Build der Anwendung.


##### 1.3.2 ...zur Datenbankmigrationen:

- `npm run db:migrate`: Führt Datenbankmigrationen durch.
- `npm run db:generate`: Generiert das Schema für die Datenbank.
- `npm run db:push`: Pusht das Schema zur Datenbank.


##### 1.3.3 Gitflow, Pullrequests & Merging

Für alle Arbeiten am Code sollte ein eigener Branch erstellt werden. Diese Branches sollten nach Möglichkeit eingeleitet werden mit `fix/` oder `feat/` als Prefix. Wenn die Abeiten in dem Branch beendet sind, ist es Zeit, den Branch in den Masterbranch zu mergen.

Die Branches dürfen jedoch nicht direkt in ```main``` mergen, sondern stattdesssen ist ein Pullrequest zu erstellen!
**ACHTUNG:** Bevor du einen Pullrequest erstellst, führe ```npm run build``` aus und stelle sicher, dass die Anwendung funktioniert!
#
##### 1.3.4 Internationalierung (i18n)

Dieses Projekt verwendet die Internationalisierung. Jeder String, der internationalisiert werden soll, muss in die entsprechende Sprach-Json-Datei geschrieben und mit dem 
- useTranslations Hook (for server side)
- getTranslations Hook (for async server side)
- als eine Property (prop) für Komponenten, die mit 'use client' makiert sind,
in die Komponente implentiert werden.

#
##### 1.3.5 Code Conventions

Pascal Case - Bennennung Komponenten
Kleinbuchstaben mit Bindestrich - Bennenung von Dateien und Ordnern

#
##### 1.3.6 Lösungen für typische Probleme

* Die Google-Authentifizierung funktioniert nicht?
Dies könnte daran liegen, dass die Anwendung nicht auf `localhost:3000` läuft. Dies kann passieren, wenn Sie bereits eine Anwendung auf `localhost:3000` laufen lassen, 
ein weiterer möglicher Grund ist, dass das Konto, das Sie verwenden, bereits mit einem Magic Link-Konto verwendet wird.
<br/>
* Andere Probleme mit der Authentifizierung?
  Wenn Sie auf localhost laufen, stellen Sie sicher, dass Sie die aktuellste ```.env.locale```- Datei verwenden
<br/>
* Ich kann die Anwendung gar nicht starten.
Überprüfen Sie die installierte Node-Version, sie sollte nicht kleiner als v18 sein.
#

**Wenn Sie Fragen haben oder Hilfe benötigen, zögern Sie nicht, sich an einen Kollegen oder Ihren Vorgesetzten zu wenden.
 Viel Erfolg und willkommen an Bord!**



#
___
## II. Frontend-Technologien
#### 2.1 TypeScript
TypeScript ermöglicht es uns, unseren Frontend-Code typsicher zu gestalten. Dies führt zu einer höheren Codequalität, da Fehler frühzeitig erkannt und behoben werden können.

  
```
// Definition einer Produkt-Schnittstelle
interface Product {
  id: string;
  name: string;
  price: number;
}

// Verwendung der Schnittstelle in einer Funktion
function displayProduct(product: Product) {
  console.log(`Produktname: ${product.name}`);
  console.log(`Preis: ${product.price}`);
}
```

Durch die Verwendung von TypeScript können wir sicherstellen, dass die Funktion displayProduct immer ein Objekt vom Typ Product erhält. Dies verhindert Laufzeitfehler, die auftreten könnten, wenn die Funktion mit falschen Datentypen aufgerufen wird.

##### 2.1.1 Sort-By-Typescript
Sort-By-Typescript ist eine Bibliothek zum Sortieren von Arrays in TypeScript.
```
// utils/sorting.ts
import sortBy from 'sort-by-typescript';

const products = [
  { name: 'Produkt A', price: 10 },
  { name: 'Produkt B', price: 20 },
  { name: 'Produkt C', price: 5 },
];

const sortedProducts = sortBy(products, 'price');
```
In diesem Beispiel verwenden wir sortBy, um das Array products nach dem Preis zu sortieren.

#
#### 2.2 Next.js
Next.js ist ein Framework für serverseitiges Rendering und statische Seitengenerierung in React-Anwendungen. Es bietet uns Funktionen wie serverseitiges Rendering, Routing, Datenabruf und Bildoptimierung, die die Leistung und SEO unserer Anwendung verbessern.
```
// pages/products/[id].js
import { getProductById } from '../api/products';

export async function getServerSideProps({ params }) {
  const product = await getProductById(params.id);
  return { props: { product } };
}

function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductPage;
```
In diesem Beispiel verwenden wir getServerSideProps, um Produktdaten serverseitig abzurufen und an die Komponente ProductPage zu übergeben. Dies verbessert die SEO, da Suchmaschinen den vollständigen HTML-Code der Seite crawlen können.
#
#### 2.3 React

React ist eine JavaScript-Bibliothek zum Erstellen von Benutzeroberflächen. Es ermöglicht uns, unsere Benutzeroberfläche in wiederverwendbare Komponenten zu zerlegen, was die Entwicklung und Wartung vereinfacht.

```
// components/ProductCard.js
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductCard;
```
In diesem Beispiel definieren wir eine wiederverwendbare Komponente ProductCard, die die Details eines Produkts anzeigt. Diese Komponente kann dann an verschiedenen Stellen in der Anwendung wiederverwendet werden.

##### 2.3.1 React-Dom
React-Dom ist ein Paket, das die Interaktion zwischen React und dem Document Object Model (DOM) ermöglicht. Es ist für die Darstellung von React-Komponenten im Browser unerlässlich.

```
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
In diesem Beispiel verwenden wir ReactDOM.createRoot, um eine Root-Instanz zu erstellen und die Komponente App im DOM-Element mit der ID "root" zu rendern.

##### 2.3.2 Zod
Zod ist eine Bibliothek zur Schemavalidierung in TypeScript. Sie ermöglicht es uns, die Struktur und den Datentyp von Daten zu definieren und zu validieren.

```
// schemas/product.ts
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  price: z.number().positive(),
});

export default productSchema;
```
In diesem Beispiel definieren wir ein Schema für ein Produkt mit Zod. Das Schema gibt an, dass die Eigenschaft id ein UUID-String, name ein String mit mindestens 3 Zeichen und price eine positive Zahl sein muss.

#
#### 2.4 Tailwind CSS
Tailwind CSS ist ein Utility-First-CSS-Framework. Es bietet uns eine große Sammlung von vorgefertigten CSS-Klassen, mit denen wir unsere Benutzeroberfläche schnell und einfach gestalten können.
```
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```
In diesem Beispiel verwenden wir Tailwind CSS-Klassen, um einen blauen Button mit Hover-Effekt zu erstellen.

##### 2.4.1 Tailwind Merge
Tailwind Merge ist ein Tool, das uns hilft, Tailwind CSS-Klassen in unserem JavaScript-Code zu kombinieren und zu optimieren.
```
// components/Button.js
import { twMerge } from 'tailwind-merge';

function Button({ variant = 'primary', className, children }) {
  const buttonClasses = twMerge(
    'px-4 py-2 rounded-md font-medium',
    variant === 'primary' && 'bg-blue-500 text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-800',
    className
  );

  return <button className={buttonClasses}>{children}</button>;
}

export default Button;
```
In diesem Beispiel verwenden wir twMerge, um die Basis-Button-Klassen mit den variantenspezifischen Klassen und den benutzerdefinierten Klassen aus der Prop className zu kombinieren.

##### 2.4.2 Tailwind CSS Animate
Tailwind CSS Animate ist eine Erweiterung für Tailwind CSS, die uns vorgefertigte CSS-Animationen bietet.
```
<div class="animate-spin">
  {/* ... */}
</div>
```
In diesem Beispiel verwenden wir die Klasse animate-spin aus Tailwind CSS Animate, um ein Element zu drehen.


#
#### 2.5 Next-Intl
Next-Intl ist eine Bibliothek für die Internationalisierung (i18n) in Next.js-Anwendungen. Sie ermöglicht es uns, unsere Anwendung in mehrere Sprachen zu übersetzen und an verschiedene Regionen anzupassen.

Beispiel Serverseitige Komponente:
```
// pages/index.js
import { useTranslations } from 'next-intl';

function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}

export default HomePage;
```

Beispiel 'use client' - Komponente:
app\[locale]\(protected)\my-shop\add\page.tsx
```
import { getBanner } from '@/lib/user-actions'
import { getTranslations } from 'next-intl/server'

const MyShop = async () => {
  const t = await getTranslations('MyShop')
  const t2 = await getTranslations('addProductPage')
  const translations = {
    title: t2('title'),
    description: t2('description'),
    price: t2('price'),
    category: t2('category'),
    categoryPlaceholder: t2('categoryPlaceholder'),
    images: t2('images'),
    toastTitle: t2('toastTitle'),
    toastDescription: t2('toastDescription'),
    submitTitle: t2('submitTitle'),
    isDirectlyBuyable: t2('isDirectlyBuyable'),
    deletePicture: t2('deletePicture'),
  }
  const banner = await getBanner()
  return (
    <div className="inset-x-1/2 flex flex-col items-center">
      <Banner title={t('title')} myBanner={banner} />
      <div>
        <MyShopContent />
      </div>
      <div className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 left-[calc(100vw-160px)] flex h-[60px] w-[60px] space-x-4 rounded-full text-3xl">
              +
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[600px] w-full max-w-[800px] overflow-y-auto rounded-xl p-0 md:h-[65vh] md:max-h-[800px]">
            <ProductForm
              submitText={t2('submitTitle')}
              whichFunction="add"
              translations={translations}
            />

```
```
// components/my-shop/product-form.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { addProduct } from '@/lib/productaction'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card } from '@/components/ui/card'
import { Button } from '../ui/button'
import { useRouter } from '@/navigation'
import Image from 'next/image'
import { getSignedURL } from '@/lib/productaction'
import { FormTranslations, ProductType } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface ProductFormProps {
  submitText: string;
  whichFunction: 'add' | 'edit';
  translations: {
    title: string;
    description: string;
    price: string;
    quantity: string;
    category: string;
    categoryPlaceholder: string;
    images: string;
    toastTitle: string;
    toastDescription: string;
    submitTitle: string;
  };
}

export const ProductForm: React.FC<ProductFormProps> = ({ submitText, whichFunction, translations }) => {
  // Komponentencode hier
}
```


In diesem Beispiel verwenden wir den Hook useTranslations, um auf Übersetzungen für die Komponente HomePage zuzugreifen. Die Funktion t gibt die Übersetzung für den angegebenen Schlüssel zurück.
#
#### 2.6 React-Hook-Form
React-Hook-Form ist eine Bibliothek zur Formularverarbeitung in React. Sie vereinfacht die Erstellung und Validierung von Formularen und reduziert die Menge an Boilerplate-Code.

```
// components/LoginForm.js
import { useForm } from 'react-hook-form';

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="email" {...register('email')} placeholder="E-Mail" />
      <input type="password" {...register('password')} placeholder="Passwort" />
      <button type="submit">Anmelden</button>
    </form>
  );
}

export default LoginForm;
```
In diesem Beispiel verwenden wir useForm, um eine Formularinstanz zu erstellen. Die Funktion register wird verwendet, um Formularfelder zu registrieren, und handleSubmit verarbeitet die Formularübermittlung.
#
#### 2.7 clsx
clsx ist eine Hilfsfunktion zum Kombinieren von CSS-Klassen in React. Sie vereinfacht die bedingte Anwendung von CSS-Klassen und verbessert die Lesbarkeit des Codes.
```
// components/ProductCard.js
import clsx from 'clsx';

function ProductCard({ product, isSelected }) {
  return (
    <div className={clsx('product-card', isSelected && 'selected')}>
      {/* ... */}
    </div>
  );
}

export default ProductCard;
```
In diesem Beispiel verwenden wir clsx, um die CSS-Klasse "selected" bedingt anzuwenden, wenn die Prop isSelected wahr ist.
#
#### 2.8 ShadCN
ShadCN ist eine Sammlung von vorgestalteten UI-Komponenten, die in unserem Projekt verwendet werden, um schnell ansprechende Benutzeroberflächen zu erstellen. Diese Komponenten sind sorgfältig gestaltet und bieten ein professionelles und modernes Erscheinungsbild. Der Hauptvorteil der Verwendung von ShadCN-Komponenten ist die Zeitersparnis bei der Entwicklung, da wir nicht jede Komponente von Grund auf neu gestalten müssen. Stattdessen können wir die vorhandenen Komponenten von ShadCN nutzen und sie nahtlos in unsere Anwendung integrieren.

Beispiel für die Verwendung von ShadCN
Ein Beispiel für den Einsatz von ShadCN in unserem Projekt ist die Implementierung von Dialog- und Sheet-Komponenten. Diese Komponenten werden verwendet, um modale Dialoge und seitliche Überlagerungen in der Benutzeroberfläche zu erstellen.
```// components/ui/dialog.tsx
import { Dialog, DialogTrigger, DialogContent } from '@shadcn/ui';

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  closeBtn?: boolean;
}

const CustomDialog: React.FC<DialogContentProps> = ({ closeBtn, ...props }) => (
  <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent {...props}>
      {closeBtn && <button onClick={() => console.log('Close Dialog')}>Close</button>}
      {props.children}
    </DialogContent>
  </Dialog>
);

export default CustomDialog;
```
In diesem Beispiel verwenden wir die Dialog, DialogTrigger und DialogContent Komponenten von ShadCN, um einen modalen Dialog zu erstellen. Die DialogContent Komponente wird erweitert, um eine optionale Schaltfläche zum Schließen des Dialogs hinzuzufügen. Durch die Verwendung von ShadCN-Komponenten können wir schnell und effizient ansprechende und konsistente UI-Elemente erstellen, ohne viel Zeit mit dem Design und der Implementierung von Grund auf zu verbringen.

```// components/ui/button.tsx
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary-hover/90',
        callToAction: 'px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full text-lg md:text-xl shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

##### 2.8.1 Radix UI
Radix UI ist eine Sammlung von unaufdringlichen UI-Komponenten für React. Sie bieten uns eine solide Grundlage für die Erstellung zugänglicher und benutzerfreundlicher Benutzeroberflächen.

In unserem Projekt wird ein Dropdown-Menü mit Radix und ShadCN wie folgt implementiert:
```
// components/ui/dropdown-menu.tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { inset?: boolean }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}

```
In diesem Beispiel verwenden wir Komponenten aus Radix UI, um ein Dropdown-Menü zu erstellen. Die Komponenten sind bereits auf Barrierefreiheit und Benutzerfreundlichkeit ausgelegt.

Diese vereinfachten Beispiele zeigen, wie ShadCN und Radix UI im Projekt verwendet werden, um ein Dropdown-Menü und eine Schaltfläche zu erstellen. Beide Komponenten nutzen die Flexibilität und Modularität von Radix UI und die leistungsstarke Variantenverwaltung von ShadCN.
#
#### 2.9 Framer Motion

Framer Motion ist eine Animationsbibliothek für React. Sie ermöglicht es uns, flüssige und ansprechende Animationen und Übergänge in unserer Benutzeroberfläche zu erstellen.

Beispiel:
```
// components/Modal.js
import { motion } from 'framer-motion';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function Modal({ isOpen, onClose, children }) {
  return (
    <motion.div
      initial="hidden"
      animate={isOpen ? 'visible' : 'hidden'}
      variants={modalVariants}
    >
      {/* ... */}
    </motion.div>
  );
}

export default Modal;
```


In diesem Beispiel verwenden wir motion.div, um eine animierte Modal-Komponente zu erstellen. Die Animation wird durch die variants-Eigenschaft definiert und durch den Zustand der Prop isOpen gesteuert.
#

#
#### 2.10 Three

Three.js ist eine JavaScript-Bibliothek zum Erstellen und Anzeigen von 3D-Grafiken im Browser. Sie bietet uns eine leistungsstarke API für die Arbeit mit 3D-Objekten, -Materialien, -Lichtern und -Kameras.

Beispiel:
```
// components/Product3DModel.js
import * as THREE from 'three';

function Product3DModel({ modelUrl }) {
  const loader = new THREE.ObjectLoader();
  loader.load(modelUrl, (object) => {
    // Objekt zur Szene hinzufügen
  });

  return (
    <div>
      {/* ... */}
    </div>
  );
}

export default Product3DModel;
```

In diesem Beispiel verwenden wir THREE.ObjectLoader, um ein 3D-Modell aus einer Datei zu laden.
##### 2.10.1 React Three Fiber

React Three Fiber ist eine Bibliothek zum Rendern von 3D-Grafiken in React mit Three.js. Sie ermöglicht es uns, interaktive 3D-Erlebnisse in unserer Anwendung zu erstellen.

Beispiel:
```
// components/Product3DModel.js
import { Canvas } from '@react-three/fiber';

function Product3DModel({ modelUrl }) {
  return (
    <Canvas>
      <mesh>
        <primitive object={modelUrl} />
      </mesh>
    </Canvas>
  );
}

export default Product3DModel;
```


In diesem Beispiel verwenden wir Canvas aus React Three Fiber, um ein 3D-Modell eines Produkts zu rendern.

##### 2.10.2 @types/three
@types/three enthält TypeScript-Typdefinitionen für Three.js. Dies ermöglicht es uns, Three.js in unserem TypeScript-Code typsicher zu verwenden.

##### 2.10.3 Drei
Drei ist eine Sammlung von Hilfsfunktionen und -komponenten für React Three Fiber. Sie vereinfacht die Verwendung von Three.js in React und bietet zusätzliche Funktionen.

#
#### 2.11 Icons

##### 2.11.1 React Icons
React Icons ist eine Sammlung von SVG-Icons, die als React-Komponenten verwendet werden können. Sie bietet uns eine große Auswahl an Icons für verschiedene Anwendungsfälle.

```
// components/IconButton.js
import { FaSearch } from 'react-icons/fa';

function IconButton({ icon, onClick }) {
  return (
    <button onClick={onClick}>
      <FaSearch />
    </button>
  );
}

export default IconButton;
```
In diesem Beispiel verwenden wir das Icon FaSearch aus React Icons, um einen Button mit einem Such-Icon zu erstellen.

##### 2.11.2 Lucide React
Lucide React ist eine weitere Sammlung von SVG-Icons, die für ihre minimalistische Ästhetik und gute Barrierefreiheit bekannt ist.
```
// components/Navigation.js
import { Home } from 'lucide-react';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">
            <Home /> Startseite
          </a>
        </li>
        {/* ... */}
      </ul>
    </nav>
  );
}

export default Navigation;
```
In diesem Beispiel verwenden wir das Icon Home aus Lucide React, um einen Link zur Startseite in unserer Navigation zu erstellen.

#
#### 2.12 Skeletons
In diesem Projekt verwenden wir Skeletons, um Platzhalter für Inhalte anzuzeigen, die noch geladen werden. Dies verbessert die Benutzererfahrung, indem es visuelles Feedback gibt, während Daten abgerufen werden.

```
// components/ProductSkeleton.tsx
import React from 'react';
import { Skeleton } from '@mui/material'; // Importiert das Skeleton-Komponente aus der Material-UI-Bibliothek


const ProductSkeleton = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width={210} height={118} /> // Erstellt ein rechteckiges Skeleton mit einer Breite von 210 und einer Höhe von 118
      <Skeleton variant="text" /> // Erstellt ein Skeleton in Textform

      <Skeleton variant="text" />
    </div>
  );
};

export default ProductSkeleton;
```

Eine weitere Stelle, wo Skeletons angewendet werden, ist die Datei ```app\[locale]\(protected)\browse\loading.tsx```. Der Code ist allerdings zu lang, daher wird er hier nicht vollständig angezeigt.




#
#### 2.13 Zustand
Zustand ist eine Bibliothek zur Zustandsverwaltung in React. Sie ermöglicht es uns, den Zustand unserer Anwendung auf einfache und effiziente Weise zu verwalten und zwischen Komponenten zu teilen.
```
// components/ShoppingCart.js
import { create } from 'zustand';

const useShoppingCart = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (itemId) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== itemId) })),
}));

function ShoppingCart() {
  const { items, addItem, removeItem } = useShoppingCart();

  return (
    <div>
      {/* ... */}
    </div>
  );
}

export default ShoppingCart;
```
In diesem Beispiel verwenden wir zustand, um einen globalen Warenkorb-Zustand zu erstellen. Die Funktionen addItem und removeItem können verwendet werden, um Artikel zum Warenkorb hinzuzufügen oder daraus zu entfernen.

#
#### 2.14 @geoapify/react-geocoder-autocomplete

@geoapify/react-geocoder-autocomplete ist eine React-Komponente für die automatische Vervollständigung von Adressen und Orten.
```
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from '@geoapify/react-geocoder-autocomplete'

// ...

<FormField
  control={form.control}
  name={'address'}
  render={({ field }) => (
    <FormItem>
      <FormMessage />
      <FormControl>
        <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_ADDRESS_KEY}>
          <GeoapifyGeocoderAutocomplete
            value={address}
            filterByCountryCode={['de']}
            sendGeocoderRequestFunc={sendGeocoderRequest}
            addDetails={true}
            sendPlaceDetailsRequestFunc={sendPlaceDetailsRequest}
            allowNonVerifiedStreet={false}
            debounceDelay={10}
          />
        </GeoapifyContext>
      </FormControl>
    </FormItem>
  )}
/>

```
In diesem Beispiel verwenden wir GeocoderAutocomplete, um ein Eingabefeld mit automatischer Adressvervollständigung zu erstellen.
##### 2.14.1 @geoapify/geocoder-autocomplete
@geoapify/geocoder-autocomplete ist die zugrunde liegende Bibliothek für die Adressvervollständigung, die von @geoapify/react-geocoder-autocomplete verwendet wird.
#
#### 2.15 React Intersection Observer (Lazy Loading)
React Intersection Observer ist eine React-Implementierung der Intersection Observer API. Sie ermöglicht es uns, zu erkennen, wann ein Element im Ansichtsbereich des Benutzers sichtbar ist.
```
// components/LazyLoadedImage.js
import { useInView } from 'react-intersection-observer';

function LazyLoadedImage({ src, alt }) {
  const { ref, inView } = useInView();

  return (
    <img
      ref={ref}
      src={inView ? src : ''}
      alt={alt}
    />
  );
}

export default LazyLoadedImage;
```


In diesem Beispiel verwenden wir useInView, um zu erkennen, wann das Bild im Ansichtsbereich des Benutzers sichtbar ist. Nur dann wird das Bild geladen.

_**Die Webseite wird durch LazyLoading performanter und verursacht weniger Traffic.**_
#
#### 2.16 Canvas Confetti
Canvas Confetti ist eine Bibliothek zum Anzeigen von Konfetti-Animationen im Browser.
##### 2.16.1 @types/canvas-confetti
@types/canvas-confetti enthält TypeScript-Typdefinitionen für Canvas Confetti.
```
// components/ConfettiExplosion.js
import confetti from 'canvas-confetti';

function ConfettiExplosion() {
  confetti();
  return null;
}

export default ConfettiExplosion;
```
In diesem Beispiel verwenden wir confetti(), um eine Konfetti-Explosion auszulösen.

#
#### 2.17 Axios
Axios ist eine Bibliothek zum Erstellen von HTTP-Anfragen in JavaScript.
```
// api/products.js
import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};
```
In diesem Beispiel verwenden wir axios.get, um eine GET-Anfrage an die API-Route /api/products zu senden.



#
___ 
## III. Backend-Technologien
#### 3.1 Drizzle ORM
Drizzle ORM ist ein TypeScript-first ORM, das eine typsichere Möglichkeit bietet, mit unserer Datenbank zu interagieren. Es vereinfacht Datenbankabfragen und -migrationen und verbessert die Lesbarkeit und Wartbarkeit unseres Backend-Codes.
```
// schema.ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  price: integer('price'),
});

// routes/products.ts
import { db } from '../db';

export const getProducts = async () => {
  const allProducts = await db.select().from(products);
  return allProducts;
};
```
In diesem Beispiel definieren wir eine Tabelle products mit Drizzle ORM und verwenden sie, um alle Produkte aus der Datenbank abzufragen.


#
#### 3.2 Authentifizierung 
##### 3.2.1 Next Auth.js
NextAuth.js ist eine Authentifizierungsbibliothek für Next.js, die verschiedene Authentifizierungsanbieter wie Google, Facebook, Twitter usw. unterstützt. Sie vereinfacht die Implementierung der Benutzerauthentifizierung und -autorisierung in unserer Anwendung.
```
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
```
In diesem Beispiel konfigurieren wir NextAuth.js für die Verwendung von Google als Authentifizierungsanbieter.

##### 3.2.2 @simplewebauthn/browser & @simplewebauthn/server
@simplewebauthn/browser wird in unserem Projekt für die Implementierung von WebAuthn in unseren Frontend-Komponenten verwendet. Es ermöglicht uns, sichere und benutzerfreundliche Authentifizierungsmethoden wie biometrische Authentifizierung und Sicherheitsschlüssel zu unterstützen.
@simplewebauthn/server wird in unserem Projekt verwendet, um die serverseitige Logik für WebAuthn zu implementieren. Es wird zur Implementierung von WebAuthn-Authentifizierungslogik in unseren Backend-Komponenten verwendet.
##### 3.2.3 @auth/drizzle-adapter
@auth/drizzle-adapter ist ein Adapter, der die Integration von NextAuth.js mit Drizzle ORM ermöglicht. Er ermöglicht es uns, Benutzerdaten und Sitzungsdaten in unserer Neon-Datenbank zu speichern.
#
#### 3.3 Neon Database
Neon ist ein Serverless PostgreSQL-Datenbankdienst. Er bietet uns eine skalierbare, zuverlässige und kostengünstige Datenbanklösung für unsere Anwendung.

#
#### 3.4 AWS SDK
AWS SDK (Software Development Kit) ermöglicht es uns, auf verschiedene AWS-Dienste wie Amazon S3 (Simple Storage Service) zuzugreifen. Wir verwenden S3 zum Speichern von Benutzeruploads wie Produktbildern.
```
// lib/s3.js
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadImage = async (file) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: file.name,
    Body: file,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
};
```
In diesem Beispiel verwenden wir das AWS SDK, um ein Bild in unseren S3-Bucket hochzuladen.
#
#### 3.5 Twilio
Twilio ist eine Cloud-Kommunikationsplattform, die es uns ermöglicht, SMS-Nachrichten zu senden. Wir verwenden Twilio, um Benutzern Bestätigungscodes für die Telefonnummernüberprüfung zu senden.
```
// lib/twilio.js
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendVerificationCode = async (phoneNumber, code) => {
  await client.messages.create({
    body: `Ihr Bestätigungscode lautet: ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};
```
In diesem Beispiel verwenden wir das Twilio SDK, um einen Bestätigungscode per SMS zu senden.

##### 3.5.1 @types/twilio
@types/twilio enthält TypeScript-Typdefinitionen für das Twilio SDK.

#
#### 3.6 Pusher
Pusher ist ein Dienst für Echtzeitkommunikation über Websockets. Wir verwenden Pusher, um Benachrichtigungen und andere Echtzeit-Updates an Benutzer zu senden.
```
// lib/pusher.js
import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: process.env.PUSHER_APP_CLUSTER,
});

export default pusher;
```
In diesem Beispiel erstellen wir eine Instanz des Pusher-Clients.

##### 3.6.1 Pusher JS
Pusher JS ist die JavaScript-Clientbibliothek für Pusher.
#
#### 3.7 Stripe
Stripe ist eine Plattform für Online-Zahlungen. Wir verwenden Stripe, um Zahlungen von Benutzern zu verarbeiten.
```
// pages/api/checkout_sessions.js
import { stripe } from '../../lib/stripe';

export default async function handler(req, res) {
  const { priceId } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.status(200).json({ sessionId: session.id });
}
```
In diesem Beispiel verwenden wir das Stripe SDK, um eine Checkout-Sitzung zu erstellen.

#
#### 3.8 React Email
React Email ist eine Bibliothek, die es ermöglicht, E-Mails in React zu erstellen und zu versenden. Sie bietet eine einfache Möglichkeit, E-Mail-Vorlagen zu erstellen und diese in einer React-Anwendung zu verwenden.

```
// lib/auth-send-request.ts
export function html(params: { url: string; host: string }) {
  const { url, host } = params;

  const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = '#346df1';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: '#fff',
  };

  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}

```
___

## IV. Weitere Tools

#### 4.1 Node.js
Node.js ist eine JavaScript-Laufzeitumgebung, die es uns ermöglicht, JavaScript-Code außerhalb eines Webbrowsers auszuführen. Wir verwenden Node.js für unseren Backend-Server und für die Ausführung von Build-Tools.
#
#### 4.2 npm
npm (Node Package Manager) ist der Paketmanager für Node.js. Wir verwenden npm, um Abhängigkeiten zu verwalten und unsere Anwendung zu erstellen.
#
#### 4.3 Git und Github
Git ist ein Versionskontrollsystem, das es uns ermöglicht, Änderungen an unserem Code zu verfolgen und mit anderen Entwicklern zusammenzuarbeiten. Github ist eine webbasierte Hosting-Plattform für Git-Repositories.
Wir verwenden GitFlow, um unsere Entwicklung zu organisieren. Wir erstellen und nutzen neue Branches für die meisten neuen Features oder Überarbeitungen. Die Branches werden gekennzeichnet mit fix-, feat-, refactor- oder chore-Präfixen.
#
#### 4.4 Vercel (Deployment)
Vercel ist eine Plattform für Continuous Deployment. Wir verwenden Vercel, um unsere Anwendung zu bereitstellen und sie zu verffentlichen.
(https://vercel.com/) 
Obwohl Next.js und Vercel von demselben Unternehmen, Vercel, entwickelt wurden, sind sie zwei verschiedene Produkte. Next.js ist ein React-Framework, während Vercel eine Serverless-Plattform ist.

Next.js kann auf verschiedenen Plattformen bereitgestellt werden, einschließlich Vercel. Vercel bietet jedoch eine Reihe von Funktionen, die speziell für Next.js optimiert sind, und ist daher die beste Plattform für die Bereitstellung und Skalierung von Next.js-Anwendungen.
#
#### 4.5 Discord (Kommunikation)
Discord ist eine Plattform für Chat- und Videokonferenzen. Wir verwenden Discord, um uns zu kommunizieren und zu informieren, sowie für den unkomplizierten schnellen Austausch von Datien.
#
#### 4.6 Notion (Dokumentation)
Notion ist umfangreiches Organisationswerkzeug. Wir verwenden Notion, um unsere Projektdokumentation zu verwalten und zu aktualisieren. Insbesondere fr unsere Entwicklungsprozesse nutzen wir Notion, um Scrum-Boards zu erstellen und zu verwalten.

#
#### 4.7 Figma (Designprototypen)
Durch die Verwendung von Figma in diesem Projekt wird eine enge Zusammenarbeit zwischen Design und Entwicklung gefördert. Das visuelle Design der Anwendung kann effizient erstellt, getestet und iteriert werden. Die Erstellung von wiederverwendbaren Designkomponenten und Stilen gewährleistet eine konsistente visuelle Identität und erleichtert die Pflege des Designs. Insgesamt trägt Figma dazu bei, eine ansprechende und benutzerfreundliche Oberfläche zu schaffen, die den Anforderungen und Erwartungen der Benutzer entspricht.

#
___
#


#
## V. Lessons Learned
Die Entwicklung von “Bitz” war für uns alle eine sehr spannende und vor allem lehrreiche Reise. Vom Projektmanagement, technologischen Entscheidungen bis zum Zwischenmenschlichen haben wir viel mitgenommen. Der folgende Teil soll einige unserer wichtigsten Lektionen und Lerneffekte beinhalten, welche wir während des Projektes erlebt haben.

Nutzerfeedback war elementar in der Entwicklung. Die aus dem Feedback des Playtests enthaltenen Ideen, Probleme und Anmerkungen haben Bitz auf das nächste Level gebracht. 
Teamarbeit und transparente Kommunikation waren wesentliche Faktoren für die erfolgreiche Umsetzung unseres Projekts. Da verschiedene Gruppenmitglieder verschiedene Belegungen und Arbeitszeiten im Semester hatten, war es natürlich eine Aufgabe, einen gemeinsamen zeitlichen Rahmen für das Projekt zu schaffen. So haben wir es geschafft, für drei wöchentliche Meetings zusammen zu kommen. In einem größeren beruflichen Rahmen eines solchen Projektes würden sich jedoch tägliche Stand-Ups mehr lohnen. Für die Kommunikation haben wir einen gemeinsamen Discord Server erstellt und genutzt, welcher verschiedene Text-Channel für verschiedene Nachrichtentypen hatte. So gab es zum Beispiel separate Kanäle für Bugs, Probleme bei der Entwicklung und ein Arbeitslog. In diesen Kanälen hat zum Ende des Projekts insbesondere eine hohe Rate an Kommunikation stattgefunden, welche auch im Rahmen des Projekts erlernt und verbessert wurde. Generell wurde gelernt, dass wenn alle Teammitglieder auf dem gleichen Stand waren, die Koordination der Entwicklung einfacher fiel.

Für das Ordnen und Managen der Sprints haben wir Notion benutzt. Dort haben wir in unseren wöchentlichen Sprintplanungmeetings Tickets erstellt und diese mit Akzeptanzkriterien und anderen wichtigen Metriken ausgestattet. Das Design der Tickets haben wir auch im Laufe des Projekts angepasst.

Die Aufteilung des Workloads war eine komplexe Entscheidung. Da Mitglieder im Team verschiedene Erfahrungsstände im Bereich Webentwicklung hatten und vor allem verschiedene Arbeitstempo, musste hier die Aufgabenverteilung gut gewählt sein. So haben wir probiert, die Aufgaben so zu verteilen, dass alle eine ungefähr gleiche zeitliche Auslastung haben.

#
## VI. Zukunft
Eine Ausweitung in den europäischen Markt wäre eine Option, um unsere Plattform international zu etablieren. Dies würde es uns ermöglichen, neue Kunden zu erreichen und unser Wachstum voranzutreiben. Wir könnten eng mit lokalen Partnern zusammenarbeiten, um sicherzustellen, dass der Kauf und Verkauf auch über Grenzen hinweg reibungslos funktioniert. So könnten Nutzer weltweit von unserem Service profitieren und Elektronikware einfacher kaufen und verkaufen.

Nach wie vor bleibt auch in der Zukunft unser Ziel, das Einkaufserlebnis für jeden Nutzer individuell zu gestalten. Zusätzlich zu unserem individuellen Shopdesign könnte man durch den Einsatz von Algorithmen und maschinellem Lernen personalisierte Produktempfehlungen geben, die auf den bisherigen Aktivitäten und Vorlieben der Nutzer basieren. Das würde sich vor allem auf unserer Browse Page anbieten, wo man dann als Nutzer neue Produkte entdecken kann. Auch ein überarbeiteter Suchalgorithmus würde an der Stelle ein Punkt mit hohem Entwicklungspotential sein. Das würde das Einkaufen nicht nur einfacher, sondern auch viel spannender machen.

Die Implementierung eines fairen und transparenten Bewertungssystems wäre uns sehr wichtig. Käufer und Verkäufer sollten sich auf unserer Plattform sicher fühlen und einander vertrauen können. Daher würden wir ein Bewertungssystem einführen, das beiden Seiten die Möglichkeit gäbe, ihre Erfahrungen zu teilen. So könnten neue Nutzer schnell erkennen, welche Verkäufer vertrauenswürdig sind und welche Käufer zuverlässig sind. Wir würden auch Maßnahmen ergreifen, um sicherzustellen, dass die Bewertungen echt und glaubwürdig sind.

Eine Technologie, die leider erst zum Schluss unserer Projektarbeit wirklich relevant geworden ist, ist Optimistic UI. Da diese aber erst mit der nächsten React Version rauskommt, konnten wir sie leider noch nicht implementieren. Die Nutzung von Optimistic UI würde bedeuten, dass Aktionen auf der Plattform sofort visuell bestätigt würden, noch bevor sie endgültig verarbeitet sind. Wenn Sie beispielsweise ein Produkt einstellen oder eine Transaktion durchführen, würden Sie sofort sehen, dass Ihre Aktion erfolgreich war. Das würde Wartezeiten reduzieren und die Nutzung unserer Plattform noch angenehmer und effizienter machen. Zusätzlich wäre das ganze Nutzungserlebnis unserer Plattform dadurch noch flüssiger.

#
## VII. Fazit
Unser Ziel bei der Erstellung von Bitz war es, eine Plattform für den An- und Verkauf für gebrauchte Elektronikware zu schaffen und uns durch eine sichere und benutzerfreundliche Implementierung von Marktkonkurrenten abzuheben. Von der ersten Idee bis zur fertigen Umsetzung haben wir verschiedene Entwicklungsphasen durchlaufen und dabei moderne Technologien genutzt, um die Plattform optimal auf die Bedürfnisse unserer Nutzer abzustimmen.

Wir sind stolz auf die Erfolge und Meilensteine, die wir bisher erreicht haben. Besonders erfreulich ist die positive Resonanz unserer Nutzer. Technisch gesehen haben wir einige Herausforderungen gemeistert, etwa die Implementierung eines sicheren Zahlungssystems und eine sichere Anmeldung, welche auf die Nutzung eines Passwortes verzichtet und durch die Nutzung von Passkeys beschleunigt werden kann.

Natürlich gab es auch Herausforderungen, die wir bewältigen mussten. Zum einen technische Hürden wie die Integration des direkten Zahlungssystems, die Chatfunktion und die Optimierung für mobile Endgeräte verlangten viel Kreativität und Ausdauer von uns. Zum anderen gab es im Team anfangs zum Beispiel Schwierigkeiten bei der Sprintplanung, dabei beispielsweise das Einschätzen des eigenen machbaren Workloads.

Mit Blick auf die Zukunft haben wir viele Ideen und Pläne, wie wir unsere Plattform weiterentwickeln können. Wir möchten neue Funktionen einführen, die Benutzerfreundlichkeit weiter steigern und neue Märkte sowie Zielgruppen erschließen, wie zum Beispiel zweiseitige Bewertungssysteme.

Unser Team hat sich im Laufe des Projekts stark weiterentwickelt. Die Zusammenarbeit hat nicht nur unser Wissen und unsere Fähigkeiten erweitert, sondern auch das Team enger zusammengeschweißt. Jeder von uns hat wertvolle Erfahrungen gesammelt, die weit über die technische Umsetzung hinausgehen.

Abschließend können wir sagen, dass unser Projekt ein großer Erfolg ist. Wir haben unsere ursprünglichen Ziele größtenteils erreicht und in manchen Bereichen sogar übertroffen. Wir sind besonders dankbar für die Unterstützung und das Vertrauen unserer Betreuer sowie für die engagierte Zusammenarbeit im Team. Wir freuen uns darauf, die Plattform weiter zu verbessern und unseren Beitrag zu einer nachhaltigeren Zukunft zu leisten.

#
## VIII. Entwickler

Anna Laves s78700@bht-berlin.de, (891023)<br/>
Anton Kripp s88371@bht-berlin.de, (936120)<br/>
Dennis Blömeke s87697@bht-berlin.de, (929261)<br/>
Lucas Knäuper s67752@bht-berlin.de, (864306)<br/>
Niko Budic s87786@bht-berlin.de, (936244)<br/>
Tobias Meyhöfer s87766@bht-berlin.de (933280)<br/>
