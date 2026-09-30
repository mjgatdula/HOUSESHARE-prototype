# House Share Project Documentation

## 1. Project Title

House Share: A Web and Mobile Application for Shared Household Expense Management and Cost Sharing

## 2. Project Overview

House Share is a proposed web and mobile application designed to help shared households manage expenses more accurately, transparently, and efficiently. The system allows a household group to record expenses, calculate member shares, track payment statuses, upload proof of payment, and notify members about pending or overdue payments.

The app is intended for roommates, tenants, dormitory residents, families, and co-living groups that regularly share expenses such as rent, electricity, water, internet, groceries, and household supplies.

## 3. Problem Statement

Many shared households still manage expenses manually using spreadsheets, handwritten records, messaging apps, or verbal agreements. These methods are not designed for reliable financial coordination and often lead to confusion, delays, and disputes.

The main problems are:

- Manual computation is prone to human error.
- Calculating member shares takes time for the main tenant.
- Housemates may forget bills, miss deadlines, or be hard to contact.
- Cash payments can be mishandled or incorrectly recorded.
- Expense tracking becomes inefficient when everything is handled in different tools.
- There is no clear visibility of who has paid, who is unpaid, and who still needs verification.

## 4. Five Whys Analysis

1. Why is the app needed?
   Manual computation is currently used for shared household expenses.

2. Why is manual computation a problem?
   Manual computation can cause human error.

3. Why does human error happen?
   Bills may be forgotten, housemates may be hard to contact, and cash allocation may be recorded incorrectly.

4. Why is cash allocation risky?
   Physical cash can be mishandled, misplaced, or incorrectly assigned to a member.

5. Why does this reduce efficiency?
   A fast-paced and mobile household needs a centralized system that can calculate, track, notify, and record payments quickly.

## 5. Proposed Solution

House Share provides a centralized system for managing household expenses. Instead of using separate spreadsheets, chats, and cash records, all important functions are placed in one application.

The system will allow users to:

- Create or join a household group.
- Invite tenants through QR code, link, or email.
- Add monthly or one-time shared expenses.
- Automatically calculate each member's share.
- Declare away days for fair monthly expense calculation.
- Submit proof of payment.
- Let the main tenant approve or reject payment and away-day requests.
- Track completion of monthly payments.
- Receive reminders and notifications.
- View financial summaries and reports.

## 6. User Roles

### Main Tenant / Admin

The main tenant acts as the administrator of the household group. Most management functions should be accessible only to this role.

Main tenant responsibilities:

- Create the household group.
- Invite tenants through QR code, link, or email.
- Add, calculate, and assign expenses.
- Approve or reject away-day declarations.
- Verify or reject payment proof.
- Remove tenants from the household.
- Transfer main tenancy to another tenant.
- Manage household settings and member permissions.

Example main tenant:

- Name: Jamie Cruz
- Role: Main Tenant / Manager

### Tenant / Member

Tenants are ordinary household members who pay their assigned shares.

Tenant responsibilities:

- Join a household through QR code, link, or invitation.
- View assigned monthly expenses.
- Declare away days.
- Submit proof of payment.
- Track payment status.
- Receive reminders and notifications.

Example tenant:

- Name: Alex Reyes
- Role: Tenant

## 7. Account Registration and Household Joining

Before joining a household, a member must download or open the House Share app and sign up.

Required sign-up details:

- Full name
- Birthday
- Email address
- Phone number
- Password

After registration, the tenant can join a household through:

- QR code
- Invitation link
- Email invitation
- Household code

The household QR code or link represents the endpoint/client reference for that household in the system database.

## 8. Expense Management Requirements

The app should support these expense types:

- Monthly recurring expenses
- One-time sharing expenses

Monthly expenses reset every billing cycle. One-time sharing expenses should not reset every month unless manually repeated.

Fixed recurring categories include:

- Internet
- Water
- Rent

Other supported categories include:

- Electricity
- Groceries
- Household supplies
- Maintenance
- Other shared costs

Once a fixed monthly expense is fully paid, it should no longer appear as an active unpaid item on the dashboard. It can still remain visible in history or reports.

## 9. Cost Sharing Options

The app should support different cost-sharing methods:

- Equal split: Divide the amount evenly among members.
- Manual amount: Assign a specific amount to each member.
- Percentage split: Assign shares by percentage.
- Selected members: Include only selected tenants in an expense.
- Occupancy-based split: Calculate based on the number of days a tenant stayed in the household.
- Away-day adjusted split: Reduce or adjust a member's share based on approved absence dates.

## 10. Away Days Feature

Away days allow tenants to declare dates when they will be absent from the household. This affects fair expense calculation for utilities or shared costs.

Tenant flow:

1. Tenant declares absence dates.
2. Tenant submits the away-day request.
3. The main tenant receives a push notification.
4. The main tenant reviews the request.
5. The main tenant approves or rejects the request.
6. Approved away days are included in monthly expense calculation.

Reason for approval:

Away-day requests require main tenant approval to prevent malicious use, such as avoiding payment responsibility without valid absence.

## 11. Payment and Verification

The payment system should reduce risk from cash handling and improve transparency.

Supported payment modes:

- GCash
- Maya
- PayPal
- Bank transfer
- Cash

Cashless payment is preferred because it is more secure and easier to verify.

Payment flow:

1. Tenant views unpaid expenses.
2. Tenant chooses a payment method.
3. Tenant submits payment proof, if required.
4. Payment status becomes Pending Verification.
5. Main tenant reviews the proof.
6. Main tenant accepts or rejects the payment.
7. Tenant receives a notification about the result.

Payment statuses:

- Unpaid
- Paid
- Pending Verification
- Overdue
- Rejected

## 12. Dashboard Requirements

The dashboard should show the most important household financial information.

Tenant dashboard:

- Personal outstanding balance
- Upcoming unpaid expenses
- Pending payment verification
- Recent household activity
- Notifications and reminders

Main tenant dashboard:

- Household total expenses
- Total collected amount
- Outstanding balances
- Payments waiting for verification
- Away-day requests waiting for approval
- Tenant payment status summary

## 13. Pie Chart Requirement

The app should include a pie chart or progress chart for the current billing month.

Purpose:

- Show payment completion percentage for the month.
- Help users understand how much of the monthly bill cycle has been paid.
- Show progress before the next billing cycle.

Possible chart values:

- Paid percentage
- Unpaid percentage
- Pending verification percentage
- Overdue percentage

Example:

- Paid: 65%
- Pending: 10%
- Unpaid: 20%
- Overdue: 5%

## 14. Tenant Management

Tenant management should be available to the main tenant.

Main tenant functions:

- Invite tenants.
- Remove tenants.
- Change member roles.
- Transfer main tenancy.

Tenant invitation methods:

- QR code invitation
- Email invitation
- Household invite link
- Household code

Tenant removal:

The main tenant can remove a member from the household. The system should preserve previous records for accountability and reporting.

Transfer tenancy:

The main tenant can promote another tenant to become the new main tenant. In the scenario where the old main tenant leaves the household, the new main tenant can remove the previous main tenant after transfer.

## 15. Notifications and Reminders

The app should notify users about:

- New expenses
- Upcoming due dates
- Overdue payments
- Payment proof submission
- Payment approval or rejection
- Away-day request approval or rejection
- Tenant invitations
- Tenant removal or role changes

Notifications are important because one of the main problems is poor communication among housemates.

## 16. Reports and History

The system should keep a clear record of household financial activity.

Reports may include:

- Monthly expense summary
- Payment history
- Member balance summary
- Paid and unpaid breakdown
- Category-based expense breakdown
- Exportable summaries

History should remain available even when monthly expenses reset.

## 17. Functional Requirements

### Account Module

- Register an account.
- Log in and log out.
- Manage profile details.
- Use secure authentication.

### Household Module

- Create a household.
- Join a household.
- Invite members through QR code, email, or link.
- Manage member roles.
- Remove tenants.
- Transfer main tenancy.

### Expense Module

- Add and categorize expenses.
- Support monthly recurring and one-time expenses.
- Auto-calculate member shares.
- Support away-day adjusted calculations.
- Show transaction history.

### Payment Module

- Record payments.
- Upload proof of payment.
- Verify or reject payment proof.
- Monitor paid, unpaid, pending, overdue, and rejected statuses.

### Away Days Module

- Allow tenants to declare absence dates.
- Notify main tenant about requests.
- Allow main tenant approval or rejection.
- Include approved away days in monthly calculations.

### System Module

- Dashboard
- Notifications
- Reminders
- Reports
- Search and filtering
- Web and mobile synchronization

## 18. Non-Functional Requirements

### Usability

The interface should be simple, clear, and easy to understand for both tenants and main tenants.

### Performance

The system should load quickly and process calculations immediately.

### Security

The system should protect account data, payment records, and household information.

### Reliability

Expense and payment records must remain accurate and consistent.

### Availability

The app should be accessible through supported devices with internet access.

### Compatibility

The app should be available on:

- Web browser
- Android
- iOS

### Maintainability

The system should be modular so it can be updated and improved over time.

### Data Integrity

Records should be synchronized and protected from duplicate, missing, or incorrect entries.

## 19. Current Prototype Status

The current prototype already demonstrates:

- A redesigned web interface
- Welcome screen
- Login/register screens
- Tenant dashboard
- Expense list and detail screens
- Payment submission flow
- Payment status display
- Household member list
- Notifications
- Profile and settings screens
- Reports screen
- Sample member roles with Alex as tenant and Jamie as main tenant/manager

## 20. Functionality Still Needed

The design is already strong, but functionality still needs more development.

Future work includes:

- Real database integration
- Real login/authentication
- Separate main tenant and tenant permissions
- Real QR code generation
- Real email invitations
- Away-day request form and approval workflow
- Actual monthly reset logic
- One-time sharing logic
- Real pie chart for monthly payment completion
- Tenant removal workflow
- Transfer tenancy workflow
- Push notifications
- Android and iOS versions
- Real payment gateway or payment reference integration

## 21. Expected Outcome

House Share is expected to improve household financial coordination by reducing manual computation, preventing errors, improving payment visibility, reducing cash-handling risk, and centralizing all household expense functions in one app.

The final system should make shared household expenses simpler, more transparent, and easier to manage for both tenants and the main tenant.
