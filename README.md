# Cover Page Generator

A client-side React app for creating university assignment and lab report cover pages. Pick a university, choose a design template, fill in your details, and download as PDF or PNG — all in the browser with no backend.

Inspired by [diucoverpage.com](https://diucoverpage.com/create/assignment.html).

## Features

- **Assignment** and **Lab Report** cover page types
- **Three design templates:** Classic, Modern, Bordered
- **Live A4 preview** (210mm × 297mm)
- **PDF and PNG export** via html2canvas + jsPDF
- **localStorage autosave** — form data persists across page reloads
- **University branding** via CSS variables (colors + logo)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Routes

| Route | Description |
|---|---|
| `/` | Home — choose cover type |
| `/create/assignment` | Assignment cover page builder |
| `/create/lab-report` | Lab report cover page builder |

## SUST Logo

The project ships with a **placeholder SVG** at `public/logos/sust.svg`. Replace it with the official Shahjalal University of Science and Technology crest for production use.

> **Note:** No official SUST logo was found on the Desktop during setup. Please add your logo files:
> - `public/logos/sust.svg` (primary, recommended)
> - `public/logos/sust.png` (optional fallback)

## Adding a University

Adding a new university requires **no template or form changes** — only data and assets:

1. **Add logo files** to `public/logos/`:
   ```
   public/logos/your-uni-id.svg
   public/logos/your-uni-id.png   (optional fallback)
   ```

2. **Add an entry** to `src/data/universities.js`:

   ```js
   {
     id: "your-uni-id",
     name: "Your University Full Name",
     shortName: "YUN",
     logoUrl: "/logos/your-uni-id.svg",
     colors: {
       primary: "#HEXCODE",   // main brand color (borders, headings)
       accent: "#HEXCODE",    // secondary accent
       text: "#111111",       // body text
     },
   },
   ```

3. **Done.** The new university appears in the dropdown automatically. Templates apply `--uni-primary`, `--uni-accent`, and `--uni-text` CSS variables from the university entry.

## Project Structure

```
Cover-Page/
├── public/logos/          # University logo assets
├── src/
│   ├── components/        # UI: forms, preview, export, navbar
│   ├── data/              # universities.js, designs.js
│   ├── hooks/             # useCoverForm (state + localStorage)
│   ├── pages/             # AssignmentPage, LabReportPage
│   ├── templates/         # Classic, Modern, Bordered + CoverSections
│   └── utils/             # exportPdf, exportImage, storage
├── index.html
└── vite.config.js
```

## Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [html2canvas](https://html2canvas.hertzen.com/) + [jsPDF](https://github.com/parallax/jsPDF)

## Privacy

All form data is stored only in your browser's `localStorage`. Nothing is sent to any server.

## License

MIT
