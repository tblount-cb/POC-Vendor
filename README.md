# CoreBridge VIPER POC

A proof-of-concept for **CoreBridge VIPER** (Vendor Integration, Partnerships & Enterprise Relationships) built with Angular 17 and Evo theme styling.

## Features

- **Home Dashboard**: Overview of vendors, integrations, and recent activity
- **Vendors Management**: List, search, and filter vendors with hard-coded demo data
- **Integrations**: Manage third-party service connections

## Navigation

- **Home** (`/home`): Dashboard with statistics and activity
- **Vendors** (`/vendors`): Vendor list with search and filtering
- **Integrations** (`/integrations`): Integration management cards

## Styling

This POC uses Evo theme styling patterns aligned with end-web (evo-platform branch, src/Evo):
- Inline Tailwind-inspired utility classes
- Evo theme color tokens and spacing
- Custom `vendor-*` class prefix (similar to POC-Documents `doc-*` pattern)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser to `http://localhost:4200`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── navigation/     # Main navigation component
│   ├── pages/
│   │   ├── home/           # Home dashboard
│   │   ├── vendors/        # Vendors list page
│   │   └── integrations/   # Integrations page
│   ├── app.component.ts    # Root component
│   ├── app.config.ts       # App configuration
│   └── app.routes.ts       # Route definitions
├── styles/
│   └── vendor-portal.less # Evo theme styles (VIPER)
└── styles.less            # Main stylesheet
```

## Demo Data

All data is currently hard-coded for demo purposes:
- 12 sample vendors in the Vendors page
- 5 sample integrations in the Integrations page
- Activity feed on the Home page

API and database integration will be added in a future phase.

