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
Next.js v14+ (App Router), Three.js (for 3D components), Zod (form validation), next-intl (internationalization)

### Backend Frameworks  
Drizzle (Object Relational Mapper), Neon (serverless PostGreSQL database), Auth.js (Authentication)

### Styling
TailwindCSS (for styling in the tsx syntax directly), ShadCN (for already good looking components), Figma (for styling and corporate design)

### Other Tools
Github + Git (version controlling), Vercel (deployment), Discord (communication) , Notion (organization)


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
