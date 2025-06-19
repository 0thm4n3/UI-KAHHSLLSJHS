# SecureScope UI Code Extraction Guide

## Project Structure
```
securescope/
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── team/
│   │   └── ui/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── data/
│   ├── types/
│   └── lib/
├── supabase/
│   └── migrations/
└── config files
```

## Key Dependencies (package.json)
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.3",
    "react-hook-form": "^7.51.0",
    "lucide-react": "^0.344.0",
    "@supabase/supabase-js": "^2.39.7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "typescript": "^5.5.3",
    "vite": "^5.4.2"
  }
}
```

## Core Components to Extract

### 1. Layout Components
- `src/components/layout/MainLayout.tsx` - Main app layout
- `src/components/layout/Header.tsx` - Top navigation
- `src/components/layout/Sidebar.tsx` - Side navigation

### 2. UI Components
- `src/components/ui/Card.tsx` - Reusable card component
- `src/components/ui/Button.tsx` - Button component
- `src/components/ui/StatusBadge.tsx` - Status indicators
- `src/components/ui/ProgressBar.tsx` - Progress visualization

### 3. Dashboard Components
- `src/components/dashboard/StatsCards.tsx` - Metric cards
- `src/components/dashboard/ProjectsSummary.tsx` - Project overview
- `src/components/dashboard/VulnerabilitiesSummary.tsx` - Security overview
- `src/components/dashboard/SeverityDonutChart.tsx` - Chart visualization

### 4. Pages
- `src/pages/Dashboard.tsx` - Main dashboard
- `src/pages/Team.tsx` - Team management
- `src/pages/Projects.tsx` - Project listing
- `src/pages/Vulnerabilities.tsx` - Security findings

## Setup Instructions

1. **Create new React project:**
```bash
npm create vite@latest securescope -- --template react-ts
cd securescope
```

2. **Install dependencies:**
```bash
npm install react-router-dom react-hook-form lucide-react @supabase/supabase-js
npm install -D tailwindcss autoprefixer postcss
```

3. **Setup Tailwind CSS:**
```bash
npx tailwindcss init -p
```

4. **Copy configuration files:**
   - `tailwind.config.js`
   - `vite.config.ts`
   - `tsconfig.json`

5. **Copy source files:**
   - All files from `src/` directory
   - Update import paths if needed

## Environment Variables
Create `.env` file:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Setup (Optional)
If you want the full functionality:
1. Create Supabase project
2. Run the migration files in order
3. Update environment variables

## Styling Notes
- Uses Tailwind CSS with custom dark theme
- Custom color palette for security/professional look
- Responsive design with mobile-first approach
- Custom components follow consistent design system

## Key Features
- Dark theme optimized for security professionals
- Responsive layout with collapsible sidebar
- Real-time data updates via Supabase
- Form validation with react-hook-form
- Professional dashboard with charts and metrics
- Team management with CRUD operations