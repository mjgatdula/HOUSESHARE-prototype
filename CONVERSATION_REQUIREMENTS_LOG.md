# HouseShare Full Conversation Requirements Log

Date documented: September 29, 2026

This file documents the full request history from the start of the HouseShare conversation up to the latest implemented changes. It records what was asked, the expected result, and the prototype behavior that was implemented or clarified.

This is a conversation-derived requirements file. It is separate from the formal project documentation in `PROJECT_DOCUMENTATION.md`.

## 1. Project Location And Setup Requests

### Request: Find the project file

User asked where the project was located and said the overall file seemed missing.

Expected result:

- Identify the actual project folder.
- Make sure the user can open it in VS Code.
- Make sure the run command points to the correct folder.

Documented result:

- Project folder used during development:

```text
C:\Users\Jarren\Downloads\SOFT DESIGN README
```

- Main app source:

```text
C:\Users\Jarren\Downloads\SOFT DESIGN README\src\App.tsx
```

### Request: Run the project in VS Code

User tried:

```powershell
cd "C:\Users\Jarren\Downloads\SOFT DESIGN README"
pnpm run dev
```

Issue encountered:

- `pnpm` was not recognized.

Expected result:

- Provide a command that works with the installed tooling.

Documented result:

Use:

```powershell
cd "C:\Users\Jarren\Downloads\SOFT DESIGN README"
npm run dev -- --port 5173
```

Then open:

```text
http://localhost:5173/#dashboard
```

### Request: npm install failed

User ran `npm install` and got:

```text
Unsupported URL Type "workspace:": workspace:*
```

Expected result:

- Explain that the project is already prepared with dependencies and should be run directly with the dev command.

Documented result:

- Development continues using the existing project setup.
- Main local command remains `npm run dev -- --port 5173`.

## 2. Initial Redesign And Visual Quality Requests

### Request: Redesign the whole site

User asked for the site to be fully redesigned, not just lightly changed, while preserving the household sharing system.

Expected result:

- More beautiful interface.
- Richer animation.
- Higgsfield-style visual polish.
- Preserve the household share logic.
- Do not break the app system while redesigning.

Implemented result:

- Modern visual redesign.
- Animated dashboard/panel effects.
- Glass-like cards, soft motion, and richer UI hierarchy.
- Mobile-first shell preserved.
- Desktop layout also supported.
- Household sharing logic preserved and later expanded.

### Request: Do not make it the same thing

User said the earlier redesign was too similar and expected a more complete visual redesign.

Expected result:

- Stronger visual change.
- Better animations.
- More polished application feel.

Implemented result:

- Redesigned dashboard, payments, household, profile, and support areas.
- Added animated visual sections and polished cards.
- Improved spacing, typography, iconography, and motion.

## 3. Project Documentation Notes From User

User provided notes for the application concept.

Expected documentation content:

- Expenses list resets every month, except one-time sharing.
- Main tenant is the group admin.
- Main tenant can calculate, assign, approve, reject, and manage expenses.
- Away days require approval to avoid malicious avoidance of payment.
- Main tenant should receive notifications.
- Pie chart or progress chart should show payment completion for the month.
- Tenant removal should be available to the main tenant.
- Tenant invitation should use QR code or email invitation.
- App should be available for Android and iOS.
- Manual computation in Excel is a problem.
- Human error is a problem.
- Housemate communication and missed bills are problems.
- Cash payment risk is a problem.
- Efficiency is a major reason for the app.
- Member joining should use signup, confirmation details, and household link or QR code.
- Transfer tenancy should be supported.
- Fixed categories include internet, water, and rent.
- Fully paid fixed bills should not be active on dashboard.

Expected result:

- Convert these notes into project requirements.
- Reflect these requirements in app behavior where possible.

Implemented/documented result:

- Added/maintained project documentation in `PROJECT_DOCUMENTATION.md`.
- Implemented main tenant restrictions in the prototype.
- Implemented payment verification.
- Implemented household invitation codes/links.
- Implemented join approval flow.
- Implemented billing progress chart.
- Implemented away-day calculation for occupancy-based expenses.

## 4. Demo Accounts And Role Requests

### Request: Other accounts besides Alex

User asked if there were other accounts to try besides Alex.

Expected result:

- Provide or expose demo accounts for testing different roles.

Implemented result:

Default sample accounts include:

- Alex Reyes - Tenant
- Jamie Cruz - Main Tenant / Manager
- Sam Lim - Tenant
- Taylor Bautista - Tenant

Later created accounts can also appear in the prototype login picker.

### Request: Login as Jamie should show Jamie, not Alex

User reported that logging in as Jamie still behaved like Alex.

Expected result:

- Current account should match selected login.
- Role, name, dashboard, payments, and permissions should change based on logged-in member.

Implemented result:

- Login state uses selected member.
- `currentMember` drives role checks and UI labels.
- Jamie acts as the main tenant in the default Sunrise household.
- Tenant accounts remain restricted.

## 5. Payment Verification Requests

### Request: After payment should go to main tenant verification

User asked why payment proof did not go to main tenant verification.

Expected result:

- Tenant submits payment proof.
- Payment becomes pending verification.
- Main tenant can review the proof.
- Main tenant can accept or reject.
- Tenant receives notification after result.

Implemented result:

- Payment submission creates a pending receipt.
- Main tenant gets a verification queue.
- `Verify Payments` screen supports accept/reject.
- Notifications are created for accepted or rejected receipts.

### Request: Pending payment card must be clickable

User showed a payment waiting card that could not be clicked.

Expected result:

- Pending review card should navigate to verification for main tenant.
- Tenant view should show waiting state but not allow approval.

Implemented result:

- Main tenant pending payment card is clickable.
- Non-main tenants see a waiting-for-review notice.
- Verification screen is main-tenant-only.

### Request: Taylor should not be able to approve payments

User pointed out that a tenant appeared able to access review behavior.

Expected result:

- Only the main tenant can approve or reject payment receipts.
- Tenants cannot verify payments.

Implemented result:

- Verification screen checks main tenant role.
- Non-main tenants see a main-tenant-only screen.
- Main tenant role is tied to the current household.

## 6. Mobile And Desktop Compatibility Requests

### Request: Fix mobile/PC layout slide bug

User showed a layout where the app frame appeared to slide or overflow on monitor/desktop.

Expected result:

- Mobile frame should remain stable.
- Desktop layout should not show broken square artifacts.
- UI should remain compatible on PC and mobile.

Implemented result:

- Desktop and mobile routes were kept separate.
- Desktop sidebar and content layout were updated.
- Bottom mobile navigation and main shell were adjusted.

### Request: Profile icon should be clickable

User requested the profile/avatar icon to behave like other websites, with logout or account options.

Expected result:

- Clicking the avatar opens an account/profile menu.
- Should include profile and logout behavior.

Implemented result:

- Account menu added.
- Profile access and logout flow added.

## 7. Main Tenant Permissions

### Request: Most functions should be main-tenant-only

User repeatedly emphasized that:

- Only main tenant can add expenses.
- Only main tenant can calculate and assign expenses.
- Only main tenant can accept/reject payment receipts.
- Only main tenant can approve/reject join requests.
- Tenants should not be able to customize household bills.

Expected result:

- Tenant actions are restricted.
- Main tenant controls management.

Implemented result:

- Add Expense screen is main-tenant-only.
- Verify Payments screen is main-tenant-only.
- Join request approval is main-tenant-only.
- Household settings and fixed bill context are manager-oriented.
- Tenant invalid invite creation is blocked.

## 8. Household And Invitation Logic Requests

### Request: Main tenant creates own household

User reported that creating a new main tenant account still showed Jamie/Alex/Sam/Taylor.

Expected result:

- New main tenant creates a separate household.
- The new household starts with only that main tenant.
- No sample Sunrise members should appear.
- No old payments or expenses should appear.

Implemented result:

- Added household model.
- Members now have a `householdId`.
- Current household controls visible members, expenses, and settings.
- New main tenant household starts empty.

### Request: Tenant should not create own household when invite is wrong

User said tenants should be declined if invitation does not match.

Expected result:

- Tenant registration requires a valid invite link/code.
- If invalid, account creation is blocked.
- No "Unassigned Household" should be created for tenant.

Implemented result:

- Invalid tenant invite now shows an error.
- Tenant cannot proceed without valid invite.
- Removed fallback creation of `Unassigned Household`.

### Request: Copied invite link mismatched even when correct

User reported that copied main tenant invitation link did not match.

Expected result:

- App should accept raw invite code.
- App should accept full copied invite link.
- Matching should be case-insensitive and not fragile.

Implemented result:

- Invite matching accepts:

```text
HS-SUNRISE-2026
https://houseshare.app/join/HS-SUNRISE-2026
```

- Matching normalizes and decodes input.

### Request: Invitation code should be visible to each tenant

Expected result:

- Household page/settings should show the current household invite code/link.

Implemented result:

- Household page shows invitation code and link.
- Household settings also shows current invite code/link.

### Request: Invite code should be unique

Expected result:

- New household should get a unique invite code.
- It should not always reuse Sunrise code.

Implemented result:

- New main tenant household generates a unique prototype invite code.
- Note: This is prototype uniqueness, not production cryptographic security.

## 9. Join Request And Identity Review

### Request: Main tenant should approve/reject newbie from invitation link

User said a newbie joining should not only create a notification. Main tenant must accept or reject.

Expected result:

- New tenant submits join request after valid invite.
- Main tenant gets actionable approval UI.
- Main tenant can accept or reject.
- Only accepted tenants become household members.

Implemented result:

- Join requests are created with pending status.
- Household page shows Join Requests for main tenant.
- Notifications screen shows Action Required join cards.
- Main tenant can Accept or Reject.
- Accepted member is added to approved household members.
- Rejected member receives notification.

### Request: Identity review after newbie creation

Expected result:

- Main tenant can see identity-related information.
- Face capture and ID upload should be represented in prototype.

Implemented result:

- Register screen includes Face Check and Upload ID prototype buttons.
- Join request card shows whether face and ID were provided.
- Main tenant can approve or reject based on that.

## 10. Household Statistics And Reports

### Request: Statistics/reports should belong to each household

User said reports and statistics seemed to go to the wrong household.

Expected result:

- Each household has its own statistics.
- New households should not show Sunrise totals.
- Reports should use the current household's expenses and members.

Implemented result:

- Reports now receive live household data.
- Category totals are computed from current household expenses.
- Member contributions are computed from current household members.
- Desktop household total now uses current household expenses.
- Empty household reports show empty states instead of sample totals.

### Request: Pie chart/progress chart

Expected result:

- Show monthly billing/payment progress.

Implemented result:

- Billing cycle chart is present.
- It appears in dashboard views.

## 11. Expense Creation And Calculation

### Request: Add Expense should not show old sample members

User reported that Add Expense occupancy days showed Alex/Jamie/Sam even in a new household.

Expected result:

- Add Expense only shows approved members of the current household.

Implemented result:

- Add Expense receives current household members.
- Old sample members no longer appear for a separate household.

### Request: Adding expense should reflect in app

User reported that after adding an expense, it did not reflect in payments/statistics.

Expected result:

- Confirmed expenses should appear in Expenses.
- They should update Payments, Dashboard, Reports, and member calculations.

Implemented result:

- Added `customExpenses` state per household.
- Confirming an expense creates a live expense.
- Member statuses are created for approved household members.
- Dashboard, Expenses, Payments, Reports, and Member Detail read from live data.

### Request: Away days should be clickable

User said away leave/day boxes should be clickable during expense creation.

Expected result:

- Main tenant can click days for each member.
- Red days mean selected away days.
- The system recalculates member shares accordingly.

Implemented result:

- Away-day grid is now clickable.
- Selected days turn into away days.
- The number of away days updates per member.

### Request: Occupancy-based calculation should auto-calculate

User requested automatic recalculation based on day leave and return/present days.

Expected result:

- For occupancy-based bills, members with more away days pay less.
- Members with more present days pay more.
- Recalculation should work for Jamie's default household and newly created main-tenant households.

Implemented result:

- Occupancy-based expenses calculate shares by present-day weight.
- Present days = 30 minus away days.
- Expense-specific member shares are saved.
- Expense detail, member detail, reports, and balance calculations use saved shares.

## 12. Payment Methods And Real Logos

### Request: Payment logos looked AI/generic

User said GCash, Maya, PayPal, and bank logos should use real recognizable logos, not generic AI-looking icons.

Expected result:

- Download/add recognizable local logo assets.
- Use them in payment method and bank transfer UI.

Implemented result:

Local assets added:

```text
src/assets/payment-logos/gcash.svg
src/assets/payment-logos/maya.svg
src/assets/payment-logos/paypal.svg
src/assets/payment-logos/bdo.svg
src/assets/payment-logos/bpi.svg
src/assets/payment-logos/landbank.svg
src/assets/payment-logos/unionbank.svg
src/assets/payment-logos/metrobank.svg
src/assets/payment-logos/pnb.svg
src/assets/payment-logos/gotyme.svg
```

### Request: Add GoTyme bank

Expected result:

- GoTyme appears in bank transfer methods.
- GoTyme has a logo.

Implemented result:

- GoTyme bank option added.
- GoTyme logo asset added.

## 13. Bank Linking And Payment Source Requirements

### Request: Selecting bank should not be the end

User said after choosing a bank there should be details for account name/number and linking/verification.

Expected result:

- Bank method selection opens account linking details.
- User enters account holder and account/card number.
- Account should be linked after verification.
- Prototype should show linked success, not real redirect.

Implemented result:

- Link account flow added.
- Bank details panel added.
- Account holder and account/card number fields added.
- Verification/linking prototype status added.
- Linked accounts appear in profile billing section.

### Request: Account number format

Expected result:

- Placeholder should show `xxxx xxxx xxxx xxxx`.
- Account number should be formatted in groups.

Implemented result:

- Bank/account number input is formatted for readable grouped digits.

### Request: Avoid duplicate bank account numbers

Expected result:

- Same bank and account/card fingerprint cannot be duplicated.
- Duplicate should be rejected.

Implemented result:

- Linked funding source stores a fingerprint.
- Duplicate account checks prevent repeated same linked source.

### Request: Linked accounts should appear in profile

Expected result:

- Profile should show saved payment sources.
- Full numbers should not be shown.
- Only bank/source and last four digits should be visible.

Implemented result:

- Profile has Billing & Linked Accounts section.
- Shows linked source and masked last four digits.
- Includes note that full account numbers are not shown.

### Request: Profile Add should open the same account-linking flow

Expected result:

- Pressing Add in profile should not incorrectly go to Payments.
- It should open linking UI.

Implemented result:

- Profile Add opens link-account mode.
- Link-only payment screen returns to profile.

## 14. Payment Submission And Pending Review

### Request: Payment history and pending review should belong to payer

User said if Alex paid, only Alex's account should show that pending payment, not Sam/Taylor.

Expected result:

- Payment status is per member.
- Pending proof belongs to the submitting member.
- Main tenant sees verification queue.

Implemented result:

- Member payment statuses are tracked per member.
- Pending receipts store `memberId`.
- Main tenant sees submitted receipts.
- Other tenants do not own another tenant's pending status.

## 15. Support And Community Feature

### Request: Add contact/support/community

User asked for contact through Gmail, Discord, open community, future bugs/fixes, and chat/help.

Expected result:

- Add support/contact area.
- Users can submit concerns.
- Concern should include title, description, and optional image.

Implemented result:

- Support ticket screen added.
- Includes concern title, description, and image upload prototype.
- Support/community options added to the profile/settings area.

## 16. Account Creation Requirements

### Request: Full name validation

Expected result:

- Name must include first name and last name.

Implemented result:

- Registration checks for at least two name parts.

### Request: Phone number validation

User asked that phone number should be PH-based and should not allow too many digits.

Expected result:

- Phone should be Philippine mobile number format.
- Should accept +63 style.
- Should block typing beyond valid length.
- Duplicate numbers should be disallowed.

Implemented result:

- Phone is normalized to PH format.
- Input hard-stops beyond valid length.
- Duplicate phone numbers are blocked.

### Request: Birthdate required

Expected result:

- Registration should include birthdate.

Implemented result:

- Birthdate field added.
- Required before proceeding.

### Request: Email validation and duplicate prevention

Expected result:

- Email required.
- Duplicate email cannot be used.

Implemented result:

- Email required.
- Duplicate email checked against prototype accounts.

### Request: Password validation

Expected result:

- Password must be at least 8 characters.
- Confirm password must match.
- Confirm password should have show/hide eye button.

Implemented result:

- Password minimum length enforced.
- Confirm password match enforced.
- Confirm password has show/hide eye toggle.

## 17. Dark Theme

### Request: Add dark theme

Expected result:

- Users can choose dark or light mode.

Implemented result:

- Theme state added.
- Profile/settings includes dark/light toggle.
- Colors switch between light and dark token sets.

## 18. Profile Picture And Identity Familiarity

### Request: Users should be able to edit profile picture

Expected result:

- Users can update profile image/avatar to help household members recognize them.

Implemented result:

- Profile photo state and profile update path were added in prototype form.

## 19. UI Text And Icon Cleanups

### Request: Emoji/status icons looked AI/generic

Expected result:

- Replace generic emoji-like visuals with cleaner icons.

Implemented result:

- Status badges use Lucide icons.
- Generic payment/bank visuals replaced with logo assets.

## 20. Current Implemented Prototype Behavior

### Household behavior

- Default Sunrise household has Jamie as main tenant.
- New main tenant accounts create their own empty household.
- Tenants need a valid invite code/link.
- Invalid tenant invitation blocks account creation.
- Join requests require main tenant approval.
- Accepted tenants join the household and are included in calculations.

### Expense behavior

- Main tenant can add expenses.
- Tenants cannot add expenses.
- New expenses are attached to current household.
- Expenses update dashboard, expenses list, payments, reports, and member detail.
- Occupancy-based expenses use away-day-selected shares.

### Payment behavior

- Tenants can submit payment proof.
- Main tenant can verify or reject.
- Payment proof is tied to the submitting member.
- Notifications are sent for submitted, accepted, and rejected payments.

### Reports behavior

- Reports use current household members and current household expenses.
- New empty households show empty/zero statistics.
- Category totals and member contribution progress are computed dynamically.

### Account behavior

- Registration requires full name, email, birthdate, PH phone number, password, and confirm password.
- Duplicate email and phone numbers are blocked.
- Confirm password can be shown/hidden.

## 21. Known Prototype Limits

These are intentionally prototype-only unless a backend/database is later added:

- Data resets when the page reloads because state is in memory.
- No real authentication server.
- No real payment gateway.
- No real bank verification.
- No real QR code generation yet.
- No real push notification service yet.
- No production-grade invite encryption yet.
- No permanent database for households, users, receipts, or linked accounts.

## 22. Verification Commands Used During Development

Type check:

```powershell
npx tsc --noEmit
```

Production build:

```powershell
npm run build
```

Development server:

```powershell
npm run dev -- --port 5173
```

## 23. Final Expected Presentation Summary

HouseShare is expected to demonstrate a complete household expense-sharing prototype where:

- A main tenant creates and manages a household.
- Tenants join only through a valid invite.
- The main tenant approves/rejects new tenant join requests.
- The main tenant creates expenses and selects cost-sharing rules.
- Away days can be selected and automatically affect occupancy-based calculations.
- Tenants submit payment proof.
- The main tenant verifies or rejects payment receipts.
- Reports and statistics are household-specific.
- Payment methods and bank linking feel familiar through real logos and linked account UI.
- The interface works on mobile and desktop.
- The app has profile, support, security, notifications, reports, and theme controls.

