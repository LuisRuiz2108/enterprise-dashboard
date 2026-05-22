# Enterprise Dashboard

A production-grade Angular dashboard application built with modern Angular APIs, Angular Material, and real-world data from the [REST Countries API](https://restcountries.com).

![Angular](https://img.shields.io/badge/Angular-21-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Angular Material](https://img.shields.io/badge/Angular%20Material-21-purple?logo=angular)

## Features

- 🔐 **Authentication** — Login flow with route guards protecting the dashboard
- 📊 **Stats Cards** — Real-time KPIs derived from live API data
- 📈 **Region Chart** — Bar chart showing population distribution across world regions
- 🗺️ **Data Table** — Sortable, filterable, paginated table of the top 50 most populated countries
- 📱 **Responsive Layout** — Collapsible sidebar with persistent header
- ⚡ **Optimized HTTP** — Single API call shared across all components via `shareReplay(1)`

## Tech Stack

- **Framework:** Angular 21 (Standalone Components)
- **UI Library:** Angular Material
- **Charts:** Chart.js + ng2-charts
- **State:** Angular Signals (`signal`, `computed`, `effect`)
- **HTTP:** Angular HttpClient with RxJS `shareReplay`
- **Styling:** SCSS
- **CI/CD:** GitHub Actions

## Modern Angular APIs Used

This project intentionally uses the latest Angular APIs over their legacy equivalents:

| Modern | Legacy (avoided) |
|---|---|
| `input()` | `@Input()` |
| `output()` | `@Output()` |
| `viewChild()` | `@ViewChild()` |
| `signal()` / `effect()` | Component state via class properties |
| `@if` / `@for` | `*ngIf` / `*ngFor` |
| Standalone Components | NgModules |

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21+

### Installation

```bash
git clone https://github.com/LuisRuiz2108/enterprise-dashboard.git
cd enterprise-dashboard
npm install
ng serve
```

Open your browser at `http://localhost:4200`

### Demo Credentials

```
Email:    admin@dashboard.com
Password: admin123
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   ├── sidebar/
│   │   ├── stats-card/
│   │   ├── data-table/
│   │   └── region-chart/
│   ├── pages/
│   │   ├── login/
│   │   └── dashboard/
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── metrics.service.ts
│   └── guards/
│       └── auth.guard.ts
```

## Live Demo

🔗 [View Live Demo](https://enterprise-dashboard-ruby.vercel.app/)

## Author

**Luis Eduardo Ruiz Sanchez**  
Senior Frontend Engineer — Angular · TypeScript · Enterprise Web Applications  
[LinkedIn](https://www.linkedin.com/in/luis-eduardo-ruiz-sanchez-85b979183/)