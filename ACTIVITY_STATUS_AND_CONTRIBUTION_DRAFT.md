# HouseShare Activity Answer Draft

Format reminder from activity: Arial Narrow, size 12, 0.5 inch margin, submit as one PDF file.

Replace the bracketed fields before submission.

## Cover Information

Name: Jarren [Last Name]  
Date: September 30, 2026  
Course Code/Section: [Insert course code/section]  
Instructor Name: [Insert instructor name]  
Title: HouseShare - Group Software Project Status and Individual Contribution Report

---

# Part A - Project Information

Group Number: [Insert group number]

Project Title: HouseShare: A Web and Mobile Application for Shared Household Expense Management and Cost Sharing

Your Name: Jarren [Last Name]

Your Role/Responsibility in the Project: UI/UX prototype developer, frontend feature implementer, requirements/documentation contributor, and testing/debugging contributor.

---

# Part B - Group Software Project Status

## Current Status of the Group Project

| Project Component | Status | Brief Description / Current Progress |
|---|---|---|
| Problem / Project Definition | Completed | The project problem has been clearly identified: shared households often rely on manual computation, cash handling, spreadsheets, and informal communication, which can cause errors, missed payments, confusion, and inefficient bill tracking. The proposed solution is HouseShare, a centralized household expense-sharing app. |
| Requirements Gathering | Completed | Requirements were gathered from the household-sharing scenario, including monthly expenses, one-time sharing, main tenant permissions, tenant invitations, payment verification, away-day declarations, reports, reminders, profile management, and support/contact features. |
| Functional Requirements | Completed for prototype / In Progress for production | The prototype already includes login account switching, household creation, invite code/link joining, main tenant approval, expense creation, away-day calculation, payments, proof submission, payment verification, linked accounts, profile, notifications, support ticket, dark mode, and reports. Production functionality such as a real backend, database, and push notifications remains to be implemented. |
| Non-Functional Requirements | In Progress | The prototype addresses usability, mobile/desktop responsiveness, clearer UI layout, and visual consistency. Security-related requirements such as invite protection, account validation, and masked linked account numbers are represented, but production-grade security, encryption, authentication, and PCI-DSS-compliant payment storage still need backend support. |
| Software / System Design | In Progress | The system flow has been designed around two roles: Main Tenant and Tenant. Household-based data separation, member approvals, expense assignment, payment verification, and reports are already modeled in the prototype. A formal database schema and backend architecture still need to be finalized. |
| UI/UX / Prototype | Completed for current stage | A working React/Vite prototype was created with mobile and desktop layouts. The interface includes dashboard, expenses, payments, household, reports, notifications, profile, security, privacy, support, account linking, and household settings screens. The design was improved with modern cards, animations, icons, real payment logos, dark mode, and responsive layouts. |
| Database / Data Design | In Progress | The prototype currently uses in-memory state to simulate accounts, households, expenses, linked funding sources, payment statuses, join requests, and notifications. The expected database design should include users, households, household memberships, expenses, expense shares, away-day records, payment receipts, linked payment sources, and notifications. |
| Development / Coding | In Progress | The frontend prototype has been substantially developed in React and TypeScript. Major completed modules include role-based permissions, payment verification, join request approval, dynamic household data, add expense flow, occupancy-based calculation, account validation, reports, and linked payment accounts. Backend development remains future work. |
| Testing | In Progress | Manual testing and TypeScript/build verification have been performed. The app has been checked using `npx tsc --noEmit` and `npm run build`. Additional testing should include unit tests, integration tests, form validation tests, role-permission tests, and mobile usability testing. |
| Documentation | Completed for current stage / In Progress for final submission | Project documentation has been created, including `README.md`, `PROJECT_DOCUMENTATION.md`, `CONVERSATION_REQUIREMENTS_LOG.md`, and this activity draft. Final academic formatting and conversion to PDF still need to be completed before submission. |

## Overall Project Completion

Estimated overall project completion: 78%

Basis for this percentage:

The project has a strong working frontend prototype and most major user workflows are already represented. The app demonstrates the core HouseShare system: main tenant management, tenant joining through invitation, approval/rejection of join requests, expense creation, payment proof submission, payment verification, reports, profile settings, support, and away-day-based calculation. However, the project is not yet 100% complete because it still needs a real database, authentication backend, production security, persistent data storage, real payment integration, QR code generation, push notifications, full test coverage, and final mobile deployment preparation.

## Current Group Challenges

The current main challenges are:

1. Database and persistence are not yet implemented.
   The current prototype stores data in memory, so newly created accounts, households, expenses, and payments reset after refresh. The group needs to design and implement a real database.

2. Authentication and account security still need production implementation.
   The prototype validates form inputs, but it does not yet have real login sessions, encrypted password storage, verified identity records, or backend role enforcement.

3. Payment processing is still a prototype.
   The app shows GCash, Maya, PayPal, bank transfer, cash, linked bank sources, and receipt proof submission, but it does not connect to real payment APIs.

4. Invite links and QR codes need backend support.
   Invite codes work in the prototype, but production should use secure generated tokens, QR generation, expiration rules, and database validation.

5. More testing is needed.
   The group should still test edge cases such as invalid invites, duplicate accounts, payment rejection, mobile layout, dark mode, and recalculation of occupancy-based expenses.

What the group plans to do:

- Create a proper database schema for users, households, memberships, expenses, expense shares, payments, and notifications.
- Connect the React frontend to a backend API.
- Improve testing and validation.
- Prepare final screenshots, diagrams, and project presentation materials.
- Convert documentation into a final PDF submission.

## Next Steps

The next three major tasks are:

1. Finalize database and backend design.
   Create the ERD/database schema and backend API plan for users, households, invitations, expenses, payment proofs, away days, linked accounts, and notifications.

2. Connect the prototype to persistent data.
   Replace in-memory demo state with database-backed records so accounts, expenses, household members, payments, and reports remain saved after refresh.

3. Complete final testing, screenshots, and presentation documentation.
   Test the main tenant and tenant workflows, capture screenshots of working features, prepare evidence, and export the final activity/report as a PDF.

---

# Part C - Individual Contribution

## 1. What have you personally contributed?

I personally contributed to the HouseShare project by helping define the application's requirements, improving the UI/UX design, building and testing the frontend prototype, and documenting the expected system behavior. I worked on the household expense-sharing workflow, including main tenant and tenant roles, payment verification, household invitation, join approval, linked payment accounts, reports, and account validation. I also helped identify bugs during testing, such as incorrect account switching, wrong household data appearing in another household, pending payments showing under the wrong tenant, invite mismatch issues, and Add Expense not updating the dashboard.

Specific work completed:

- Documented the project problem, proposed solution, user roles, and required features.
- Improved the UI/UX design so the app looks more polished and modern.
- Helped build the React/TypeScript prototype screens for dashboard, expenses, payments, household, reports, notifications, profile, support, and settings.
- Added role-based behavior so only the main tenant can add expenses, approve join requests, and verify payments.
- Added household invitation logic using invite code/link.
- Added join request approval/rejection for new tenants.
- Added payment proof submission and main tenant verification.
- Added real-looking payment and bank logos for GCash, Maya, PayPal, BDO, BPI, Landbank, UnionBank, Metrobank, PNB, and GoTyme.
- Added bank linking prototype with account holder, account/card number formatting, duplicate prevention, and linked account display in profile.
- Added account validation for full name, email, birthdate, Philippine phone number, duplicate phone/email, password length, and confirm password visibility.
- Added dark mode/light mode support.
- Added support/contact ticket screen.
- Added away-day selection for occupancy-based expense calculation.
- Made reports and statistics household-specific.
- Created documentation files for project requirements and conversation-based expected results.

## 2. Evidence of Your Contribution

Evidence 1: Project documentation file

File:

```text
C:\Users\Jarren\Downloads\SOFT DESIGN README\CONVERSATION_REQUIREMENTS_LOG.md
```

Caption:

This file shows the full request-by-request documentation of the HouseShare project. It includes the requested features, expected results, implemented prototype behavior, known limitations, and final presentation summary.

Evidence 2: Main source code file

File:

```text
C:\Users\Jarren\Downloads\SOFT DESIGN README\src\App.tsx
```

Caption:

This file contains the main React/TypeScript implementation of the HouseShare prototype, including screens, role logic, household data, expense calculation, payment verification, join request approval, reports, registration validation, and linked account behavior.

Evidence 3: UI prototype screenshots

Insert Screenshot 1: Dashboard screen of HouseShare showing the current user, household balance, billing cycle chart, expenses, and household overview.

Caption:

This screenshot shows the completed dashboard UI where users can view household financial status, balance, upcoming expenses, and monthly progress.

Insert Screenshot 2: Add Expense screen showing the occupancy-based away-day selection.

Caption:

This screenshot shows the Add Expense workflow where the main tenant can select away days for household members. These selected days are used to automatically calculate each member's share.

Insert Screenshot 3: Notifications or Household screen showing a pending join request with Accept and Reject buttons.

Caption:

This screenshot shows the main tenant's approval workflow for new tenants who join using the household invitation link or code.

Insert Screenshot 4: Payment screen or Verify Payments screen.

Caption:

This screenshot shows the payment verification workflow where submitted payment proof is reviewed by the main tenant before being accepted or rejected.

Insert Screenshot 5: Profile/Billing Linked Accounts screen.

Caption:

This screenshot shows the linked payment account feature, where bank/payment sources are stored with only masked details for privacy.

## 3. What are you currently working on?

I am currently working on finalizing the HouseShare prototype documentation, polishing the remaining validation and calculation behavior, and preparing the activity submission. The current task is to organize all completed features, expected results, and project progress into a clear report that can be submitted as a PDF. What remains is to finalize the academic formatting, insert screenshots as evidence, and ensure the content is aligned with the project status activity requirements.

## 4. What will you personally work on next?

My next specific contribution will be preparing the final presentation and technical documentation for HouseShare. This includes adding screenshots of the working web prototype, cleaning up the written explanation of each feature, preparing the database design/ERD, and helping test the main tenant and tenant workflows. I expect to complete the documentation and screenshot evidence before the final submission deadline, then continue with database/backend planning afterward.

## 5. Individual Reflection

Based on the current status of the project, I think the group needs to prioritize database design, backend integration, and testing because the frontend prototype already demonstrates most of the required workflows. The app now clearly shows how the main tenant and tenants interact, but the data still needs to become persistent and secure for a production-level system. I also think the group should focus on finalizing the payment verification, invitation, and away-day calculation flows because these are the most important features that make HouseShare different from a simple expense tracker. Overall, the project is progressing well because the prototype already communicates the problem, solution, roles, and main user experience clearly.

---

# Part D - Instructor Assistance

Yes, our group may need clarification from the instructor about the expected level of backend/database implementation for the current stage. The frontend prototype is already functional and demonstrates the main user workflows, but we need to confirm whether the final requirement expects a real connected database, real authentication, and real payment API integration, or if a complete interactive prototype with documented database design is acceptable for this phase.

If only a prototype is required at this stage, then no major assistance is needed other than feedback on the system design, database schema, and whether the feature scope is appropriate.

---

# Suggested Images To Insert

Use screenshots from the local app at:

```text
http://localhost:5173/#dashboard
```

Recommended screenshots:

1. Dashboard overview
   Insert under Part C - Evidence of Your Contribution.

2. Add Expense - Occupancy Days
   Insert under Evidence to prove the away-day calculation contribution.

3. Notifications - Join Request Approval
   Insert under Evidence to prove main tenant approval behavior.

4. Verify Payments screen
   Insert under Evidence to prove payment verification behavior.

5. Profile - Billing & Linked Accounts
   Insert under Evidence to prove linked account/payment source behavior.

6. Reports screen
   Insert under Evidence to prove household-specific statistics.

---

# Gemini Prompt For Better Formatting

Copy and paste this prompt into Gemini if you want Gemini to turn this draft into a cleaner school submission format:

```text
You are helping me format my Software Design activity submission. Please rewrite and structure the following content into a polished individual activity report using the required sections:

- Part A - Project Information
- Part B - Group Software Project Status
- Overall Project Completion
- Current Group Challenges
- Next Steps
- Part C - Individual Contribution
- Evidence of Contribution
- Current Work
- Next Personal Work
- Individual Reflection
- Part D - Instructor Assistance

Formatting requirements:
- Use a formal but natural student voice.
- Keep the content clear and specific.
- Do not make it sound overly AI-generated.
- Keep the project title as "HouseShare: A Web and Mobile Application for Shared Household Expense Management and Cost Sharing."
- Preserve the idea that this is an individual submission.
- Use tables where helpful.
- Add screenshot placeholders with captions, such as "[Insert Screenshot: Dashboard]".
- Make the final output suitable for copying into a document with Arial Narrow, size 12, 0.5 inch margins, then exporting as PDF.

Project context:
HouseShare is a household expense-sharing application for tenants and a main tenant/manager. It solves manual computation, human error, missed payments, cash handling risks, and inefficient communication. The prototype includes household creation, invite code/link joining, main tenant approval of new tenants, role-based permissions, expense creation, occupancy-based away-day calculation, payment proof submission, main tenant payment verification, reports/statistics, linked payment accounts, account validation, profile/settings, dark mode, support/contact form, and responsive mobile/desktop UI.

Current completion estimate:
78%

Reason:
The frontend prototype is mostly complete and demonstrates the core workflows, but the real database, backend authentication, persistent storage, production payment integration, QR code generation, push notifications, and full testing are still future work.

Please improve grammar, flow, and academic formatting, but do not remove important feature details or expected results.
```

---

# Final Checklist Before Submission

- Replace `[Insert group number]`.
- Replace `Jarren [Last Name]` with your full name.
- Replace `[Insert course code/section]`.
- Replace `[Insert instructor name]`.
- Insert screenshots under Evidence of Your Contribution.
- Add screenshot captions.
- Export the final document as one PDF file.

