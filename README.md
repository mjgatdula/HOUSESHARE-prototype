# House Share

House Share is a React-based household expense sharing system. It helps tenants track shared bills, see their personal balance, submit payment proof, and understand how each amount is calculated. The app is designed for a shared apartment setup where one main tenant manages expenses and other tenants pay their assigned shares.

## Project Purpose

The purpose of this project is to make household expense sharing more transparent and organized. Instead of relying on chat messages or manual reminders, the system shows each expense, payment status, member responsibility, and pending verification in one interface.

## User Roles

### Main Tenant / Manager

The main tenant is responsible for managing the household account.

Example account:

- Name: Jamie Cruz
- Role: Main Tenant / Manager
- Responsibilities:
  - Add household expenses
  - Review submitted payment proof
  - Verify or reject payments
  - Manage household members

### Tenant

Tenants can view their own expenses and submit payments.

Example account:

- Name: Alex Reyes
- Role: Tenant
- Responsibilities:
  - View unpaid, paid, overdue, and pending expenses
  - Check personal balance
  - Submit payment proof
  - Track payment verification status

## Main Features

- Dashboard overview showing unpaid balance, upcoming expenses, and recent household activity
- Expense list with filters for paid, unpaid, pending, and overdue bills
- Expense detail page with total amount, personal share, due date, period, and calculation breakdown
- Payment screen showing paid, pending, and outstanding amounts
- Payment submission flow with supported methods such as GCash, Maya, PayPal, bank transfer, and cash
- Household page showing members, roles, paid amounts, and owed balances
- Notifications for due payments, payment proof status, and new expenses
- Profile, security, privacy, notification preferences, reports, and household settings screens

## Redesign Summary

The interface was redesigned to look more polished and modern while keeping the household expense system intact.

Major design updates include:

- A cinematic welcome screen with a custom Higgsfield-generated visual
- Animated household balance scene with floating payment cards and member nodes
- Glass-style cards, glowing highlights, and smoother motion
- A redesigned dashboard header for the household overview
- New screen intro panels for Expenses, Payments, and Household
- Better role consistency: Alex is now a tenant, while Jamie is the main tenant/manager
- Tenant payment flow now correctly says payments are waiting for Jamie's review

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

## Folder Structure

```text
SOFT DESIGN README/
├── src/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Important Files

- `src/App.tsx` contains the main app screens, sample data, routing state, and household expense logic.
- `src/index.css` contains the visual redesign, animations, layout polish, and responsive styling.
- `package.json` contains the commands used to run the project.
- `vite.config.ts` contains the Vite setup.
- `PROJECT_DOCUMENTATION.md` contains the full project documentation, including problem statement, requirements, user roles, proposed features, and future work.
- `CONVERSATION_REQUIREMENTS_LOG.md` contains the full request-by-request conversation log, expected results, and implemented prototype behavior from the start of the build through the latest fixes.

## How to Run the Project

Open the project folder in VS Code:

```powershell
code "C:\Users\Jarren\Downloads\SOFT DESIGN README"
```

Then open the VS Code terminal and run:

```powershell
npm run dev -- --port 5173
```

Open this URL in your browser:

```text
http://localhost:5173/
```

To go directly to the dashboard:

```text
http://localhost:5173/#dashboard
```

## Notes

The project uses demo data only. It does not yet connect to a real database or login system. The accounts, expenses, and payments are sample data used to demonstrate the household sharing workflow.

If `npm run build` fails because of a Windows permission issue with the `dist` folder, use development mode instead:

```powershell
npm run dev -- --port 5173
```

Development mode is enough for running and presenting the project locally.
