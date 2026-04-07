# Tree Based Model Explainer

Interactive TypeScript + React application that visualises the behaviour of ensemble tree models. The UI lets practitioners switch between Gradient Boosting, Extra Trees, and Random Forest classifiers, inspect classification cases, and explore the contribution of each tree using dynamically rendered DOT graphs.

## Getting Started

1. Install dependencies:
    ```bash
    npm install
    ```
2. Start the Vite dev server:
    ```bash
    npm run dev
    ```
3. Open the printed local URL (defaults to http://localhost:5173) to explore the dashboards.

To create a production build run `npm run build`, then `npm run preview` to locally serve the compiled bundle.

## Core Features

- **Model catalogue** – landing page lists all supported models with icons, evaluation metrics, and quick navigation.
- **Case explorer** – per-model view highlights every scored case, colour-coding correct vs incorrect predictions and linking to detailed explanations.
- **Case drill-down** – individual case pages summarise predictions, list every input feature, draw gradient boosting contributions, and compute ensemble vote composition.
- **Tree visualiser** – clicking any tree entry opens a modal that fetches the corresponding DOT file and renders it with `d3-graphviz` backed by the `@hpcc-js/wasm` engine.
- **Static assets** – JSON model outputs and DOT graphs live under `public/data` and `public/dot`, making it easy to swap in new model artefacts without touching the code.

## Project Structure

- [src/App.tsx](src/App.tsx) – top-level routing and layout shell.
- [src/services/modelService.ts](src/services/modelService.ts) – lazy-loading data hooks with in-memory caching.
- [src/pages](src/pages) – route-aligned screens for model selection, overview, and case details.
- [src/components](src/components) – reusable UI pieces (case lists, charts, tree modal, etc.).
- [public/data/models.json](public/data/models.json) – sample model outputs, including case metadata and tree references.
- [public/dot](public/dot) – DOT graph snippets consumed by the modal visualiser.

## Data Contracts

The application expects `public/data/models.json` to follow the schema in [src/types/models.ts](src/types/models.ts). Each tree entry references a DOT file via `dotPath`. Add or remove models/cases by updating the JSON and dropping the corresponding DOT files under `public/dot/<model-id>/`.

## Technology Stack

- React 18 with TypeScript and React Router 6
- Vite 5 + SWC for fast dev/build feedback
- Recharts for bar and pie visualisations
- d3-graphviz with the `@hpcc-js/wasm` backend for DOT rendering
- CSS Modules for component-scoped styling and a single global stylesheet for resets

## Useful Commands

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Launches the development server with hot HMR |
| `npm run build` | Type-checks and produces an optimised bundle |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Lints `.ts` and `.tsx` files via ESLint |

## DOT Rendering Notes

The modal configures the WebAssembly assets to load from the jsDelivr CDN (`@hpcc-js/wasm@2.16.1`). In restricted environments supply the assets yourself and call `wasmFolder('/your/custom/path/')` before mounting the modal.
