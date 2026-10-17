# HouseShare: Household Ledger Visual Redesign

Date: 2026-10-17

## Research and evidence

References are inspiration, not templates copied into HouseShare.

| Reference | Evidence reviewed | Principle adapted |
| --- | --- | --- |
| [Staymates](https://staymates.app/) | Live page content and desktop screenshot | Recognizable household identity, friendly hierarchy, concise shared-living language. |
| [Flatastic](https://www.flatastic-app.com/en/) | Live page content and desktop screenshot | Distinct green identity, selective contrasting accents, clear household task categories. |
| [Spliit](https://spliit.app/) | Live page content and desktop screenshot | Expense-first simplicity, clear primary actions, restrained financial presentation. |
| [iLost](https://ilost.co/) | Live page content and desktop screenshot | Direct task entry, understandable action hierarchy, human context through existing imagery. |
| [Linear](https://linear.app/) | Page content and navigation screenshot; animated main content did not appear in captured frame | Organized workspace navigation and contextual information hierarchy. No claims of testing its authenticated application. |

Additional discovery included searches across Awwwards, Godly, Dribbble, Behance, and SiteInspire. Useful accessible listings included [SiteInspire finance](https://www.siteinspire.com/websites/category/business-and-finance/page/2), [Dribbble expense dashboard](https://dribbble.com/shots/16106768-Expense-Tracking-Dashboard-UI), and [Behance finance dashboard](https://www.behance.net/gallery/169281075/Personal-Finance-Management-Dashboard). These are discovery material, not verified interactive products. No claims are made about their mobile interactions or animation implementations.

## Existing design audit

- Repeated boxed metrics, tables, membership panels, and settings competed for attention.
- The desktop heading combined account, role, and household into one undifferentiated line.
- Desktop space was constrained by a fixed content maximum while many secondary screens retained narrow prototype framing.
- Many competing CSS layers and inline declarations already existed; unrelated edits were present in index.css and were preserved.
- Expense filter chips required horizontal scrolling on small phones.
- Shared components already support broad presentation changes: MobileShell, StatusBadge, navigation, ScreenPrelude, and payment linking.

## Design direction

Household Ledger: mineral-white light surfaces, deep green/charcoal dark surfaces, teal financial accents, and a contrasting citron action/navigation accent. Existing Outfit/Inter typography remains, with restrained weights, tabular monetary values, readable section headings, and rule-separated information.

Dashboard metrics become a continuous financial strip rather than four interchangeable cards. A household masthead separates household identity from the account greeting. Expense rows become ledger entries. Profile sections become unframed groups. Existing imagery and official payment logos are retained; no fake charts or invented financial values were added.

Motion uses short opacity/translation entry effects, small stagger delays, and hover/press feedback. Reduced-motion disables these effects. Financial figures are never artificially counted through incorrect intermediate values.

## Implementation

- src/premium.css: coordinated presentation layer for both themes, dashboard, expense/payment rows, navigation, profile, forms, dialogs, and shared secondary-screen components.
- src/main.tsx: loads the new stylesheet after existing styles.
- src/App.tsx: household masthead, active-navigation semantics/class, and billing-strip styling hook only.
- No dependencies installed, no routing replacement, no domain structures or calculation handlers changed.
- Existing local index.css changes were not reverted or rewritten.

## Validation

- TypeScript no-emit check passed.
- Production Vite build passed.
- Edge/Playwright responsive matrix: dashboard, expenses, expense detail, add expense, payments, make payment, household, reports, profile, security, notifications; light/dark; 320, 375, 430, 619, 620, 899, 900, 1024, 1280, 1440px.
- First matrix had no runtime errors and flagged existing offscreen filter chips at 320/375px. Filter layout was changed to wrap, followed by another matrix run.
- Final matrix: 220 screen/theme/viewport combinations; zero JavaScript errors and zero flagged horizontal-overflow checks.
- Registration at 375x650 retained the 11-digit phone limit, password fields, required acknowledgement, and progression to household setup.
- Verified demo manager login, acceptance of the seeded pending payment, all four expense creation stages and saving a test expense.
- Verified expense text/data remained unchanged by theme switching.
- Verified reduced-motion removes screen-body animation and keyboard focus receives a solid outline.
- Screenshots inspected for desktop dashboard and mobile dashboard, expenses, and profile. Additional captures cover household, reports, payment, and registration.

## Limitations and preservation

These are smoke/regression checks, not proof that every existing workflow is correct. Prototype authentication, in-memory data, simulated uploads/linking, existing approval behavior, and financial limitations remain unchanged. The billing ring still represents calendar progression rather than monetary collection. No backend, durable audit trail, or production payment processing was added.

The existing generated household image remains a remote dependency. Google Fonts are also remote; both can fail offline. Existing CSS debt remains deliberately isolated from this presentation-only change. Comprehensive screen-reader, cross-browser, and all-role workflow testing remain future work.

The verified project server for this review is http://127.0.0.1:5174/ because port 5173 was already occupied and did not serve this build during testing.
