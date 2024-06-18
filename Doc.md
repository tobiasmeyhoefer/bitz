# BITZ -  Next Generation

von gestern für morgen mit Technik versorgen
Eine Responsive Kauf- und Verkaufsplattform mit dem Fokus auf Technik, Sicherheit und Einfachheit.

## Getting Started

```
git clone https://github.com/tobiasmeyhoefer/bitz.git
cd bitz
npm i
npm run dev
```

Das startet die Anwendung unter Verwendung von localhost:3000

## Good to know while development

This project uses internationalization. Every string that is going to be internationalized should be written in the corresponding language json file and imported with the 
- useTranslations Hook (for server side)
- getTranslations Hook (for async server side)
- as a prop for client side


## Code Conventions

Pascal Case - Bennennung Komponenten
Kleinbuchstaben mit bindestrich - Bennenung von Dateien


## Technologies

### Language
Typescript

### Frontend Framework
Next.js v14+ (App Router): Next.js ist ein React-Framework, das serverseitiges Rendern, Routing und andere nützliche Funktionen out-of-the-box bereitstellt. Die Version 14+ mit dem App Router ermöglicht eine verbesserte Struktur und Performance der Anwendung.
Three.js (für 3D-Komponenten): Three.js ist eine leistungsstarke 3D-Bibliothek für JavaScript. Sie wurde integriert, um 3D-Elemente in der Anwendung darzustellen und interaktiv zu gestalten.
Zod (Formularvalidierung): Zod ist eine Bibliothek zur Validierung von Daten in TypeScript. Sie wurde verwendet, um Formulareingaben zu validieren und sicherzustellen, dass die Daten den erwarteten Formaten entsprechen.
next-intl (Internationalisierung): next-intl ist eine Bibliothek für die Internationalisierung in Next.js-Anwendungen. Sie ermöglicht die einfache Verwaltung von Übersetzungen und die Anpassung der Anwendung an verschiedene Sprachen.

### Backend Frameworks  
Drizzle (Object Relational Mapper): Drizzle ist ein ORM für TypeScript und JavaScript. Es wurde verwendet, um die Interaktion mit der Datenbank zu vereinfachen und typsichere Datenbankabfragen zu ermöglichen.
Neon (serverless PostgreSQL-Datenbank): Neon ist ein serverloser PostgreSQL-Datenbankdienst. Er wurde gewählt, um eine skalierbare und einfach zu verwaltende Datenbanklösung bereitzustellen, ohne sich um die Infrastruktur kümmern zu müssen.
Auth.js (Authentifizierung): Auth.js ist eine Bibliothek für die Authentifizierung in Next.js-Anwendungen. Sie wurde integriert, um die Benutzerauthentifizierung und -autorisierung zu handhaben und verschiedene Anmeldemethoden wie Google, GitHub und Passkeys zu unterstützen.

### Styling
TailwindCSS (für Styling in der TSX-Syntax): TailwindCSS ist ein utility-first CSS-Framework. Es ermöglicht das Styling direkt in der TSX-Syntax, was die Lesbarkeit und Wartbarkeit des Codes verbessert.
ShadCN (für bereits gut aussehende Komponenten): ShadCN ist eine Sammlung von vorgestalteten UI-Komponenten. Diese Komponenten wurden verwendet, um schnell ansprechende Benutzeroberflächen zu erstellen, ohne jede Komponente von Grund auf neu gestalten zu müssen.
Figma (für Styling und Corporate Design): Figma ist ein kollaboratives Designtool. Es wurde verwendet, um das visuelle Design der Anwendung zu entwerfen und ein einheitliches Corporate Design zu definieren.

### Other Tools
GitHub + Git (Versionskontrolle): GitHub und Git wurden für die Versionskontrolle des Projekts verwendet. Sie ermöglichen die Zusammenarbeit im Team, die Verfolgung von Änderungen und die Verwaltung verschiedener Versionen des Codes.
Vercel (Deployment): Vercel ist eine Plattform für das Deployment von Next.js-Anwendungen. Sie wurde gewählt, um eine einfache und automatisierte Bereitstellung der Anwendung zu ermöglichen.
Discord (Kommunikation): Discord wurde als Kommunikationsplattform für das Team verwendet. Es ermöglicht den Austausch von Nachrichten, Dateien und Informationen in Echtzeit.
Notion (Organisation): Notion ist ein Kollaborations- und Organisationstool. Es wurde verwendet, um Aufgaben zu verwalten, Dokumente zu erstellen und Informationen zu organisieren.


## Troubleshooting

### Google Authentication is not working?
this could possibly happen because of not running the application at localhost:3000, this can happen if you are already running a application at localhost:3000 e.g., <br>
another possible reason is that the account you tried using is already used with a magic link account

### cant event start th application
Check your installed node version it shouldnt be less then v18

## Autoren

Anna Laves s78700@bht-berlin.de, (891023)<br/>
Anton Kripp s88371@bht-berlin.de, (936120)<br/>
Dennis Blömeke s87697@bht-berlin.de, (929261)<br/>
Lucas Knäuper s67752@bht-berlin.de, (864306)<br/>
Niko Budic s87786@bht-berlin.de, (936244)<br/>
Tobias Meyhöfer s87766@bht-berlin.de (933280)<br/>
