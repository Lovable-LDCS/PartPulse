# PartPulse - True North Architecture Requirements

## Mission and Philosophy

### Build Philosophy
This application follows two core philosophies:
1. **True North Build Philosophy**: All architecture requirements are the single source of truth. All builds align with the architecture.
2. **One Time Build Philosophy**: Upon receiving requirements, initiate the complete build process and handover only when 100% complete (QA GREEN).

### Roles
- **User (Non-Technical)**: Provides requirements in plain English, verifies via UI only. Does NOT run commands, paste code, or execute SQL.
- **Agent (Full-Stack)**: Has full read/write access, writes code, runs all commands, manages environment, delivers fully working system, produces English-readable QA/health reports.

## Application Overview

### Purpose
Internal spare parts distribution management system for Trane Thermo King Pty LTD - a globally-based company involved in manufacturing, distribution, and repair of HVAC units.

### Users
The app monitors and controls the issue of spare parts used for repair of HVAC systems by Technicians.

### Platforms
- Primary: Mobile (Android & Apple)
- Secondary: Desktop/Laptop access
- Architecture: Web-based application

### Hosting
- Initial: Free web hosting environment
- Scalable: Upgrade to paid hosting as traffic increases
- Deployment: GitHub Pages initially, with migration path to other platforms

## Technical Architecture

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth with role-based access
- **Email**: Resend API
- **Styling**: Tailwind CSS
- **Testing**: Playwright (E2E), Jest (Unit)
- **Build**: next build (must pass)
- **Linting**: ESLint + TypeScript compiler
- **Export**: XLSX for Excel exports

### Color Scheme
- **Primary**: #FF2B00
- **Secondary**: White
- **Theme**: Professional, clean, corporate

### Layout Requirements
- Company logo in top left corner (from `/public/assets/logo.png`)
- Left sidebar navigation
- Responsive design with Desktop/Mobile preview toggle
- Header with preview mode selector

### Navigation Structure
Sidebar tabs (in order):
1. Internal Transfer (All users)
2. Warranty Claims (All users)
3. Invite New Members (Admin only)
4. Reports (Admin only)
5. Settings (Admin only)
6. Security Dashboard (Admin only)
7. Health Checker (Admin only)

## User Access & Authentication

### User Levels
1. **Admin**
   - Full rights to change and alter all app functions
   - Access to all tabs and functionalities
   - Default Admin Users:
     - Joline Kruger (joline.kruger@tranetechnologies.com)
     - Johan Ras (johan.ras2@outlook.com)

2. **Technician**
   - Access to Internal Transfer tab
   - Access to Warranty Claims tab
   - Cannot access admin functions

### Authentication Features
- User invitation system (email-based)
- Signup page with username/password creation
- Create password
- Change password
- Lost password recovery
- Reset password
- Admin capability to invite other admins
- Audit trail for all user actions

### Role Persistence
- RoleContext and AuthContext persisted to localStorage
- "Reset session" control in UI
- Admin access granted if: role selector says Admin OR user.role === Admin OR email in admin list

## Feature Specifications

### 1. Internal Transfer Form

**Purpose**: Interface for technicians to submit internal transfer of parts notification

**Fields** (all marked with red asterisk for required):
- **Date**: Date picker (required)
- **Technician Name**: Auto-filled from user signup information
- **SSID/PSID**: Radio selector (one or the other, not both)
  - When SSID selected: PSID greyed out, reveal free text area for SSID number
  - When PSID selected: SSID greyed out, reveal free text area for PSID number
  - Required field
- **Quantity**: Free text area for number of items (required)
- **Part Number**: Free text area (required)
- **Description**: Free text area (required)

**Behavior**:
- Display one notification page at a time
- "+" button below form to add another form
- Unlimited forms can be created
- Each notification generates a PDF report
- PDF emailed to address configured in Settings page

### 2. Warranty Claims Form

**Purpose**: Record warranty claims for parts

**Fields** (all marked with red asterisk for required):
- **Date**: Date picker (required)
- **Technician Name**: Auto-filled from user signup information
- **SSID**: Free text area (no PSID) (required)
- **Chiller Serial Number**: Free text area (required)
- **Chiller Model**: Free text area (required)
- **Building Name**: Free text area (required)
- **Quantity**: Free text area (required)
- **Part Number**: Free text area (required)
- **Failed Serial Number**: Free text area (required)
- **Repair Serial Number**: Free text area (required)
- **Date of Failure**: Date picker (required)
- **Date of Repair**: Date picker (required)

**Behavior**:
- Same multi-form pattern as Internal Transfer
- "+" button to add unlimited forms
- Generate PDF notification report
- Email to configured address

### 3. Invite New Members (Admin Only)

**Fields**:
- User Name (manual entry)
- ID Number (manual entry)

**Process**:
1. Admin enters user details
2. System sends invitation email: "You are invited to access PartPulse. Please click the following link to sign up"
3. User clicks link → directed to signup page
4. User creates username and password
5. New user saved with appropriate access rights

### 4. Reports (Admin Only)

**Display**: All notifications in table format

**Features**:
- Excel export capability
- Filter capacity:
  - **Type Filter**: SSID, PSID, Warranty (radio selector, multi-select)
  - **Date Filter**: From/To date picker
  - **Part Number Filter**: Dropdown with search, multi-select
  - **Technician Filter**: Dropdown with search, multi-select

### 5. Settings (Admin Only)

**Configuration**:
- Notification email address(es) for PDF reports
- Email sender configuration (fallback to onboarding or configured Gmail)
- Security alert recipient configuration
- Input validation for all settings

### 6. Security Dashboard (Admin Only)

**Purpose**: Measure and monitor security requirements and protection of information

**Features**:
- Security metrics dashboard
- Information protection monitoring
- Immediate breach detection
- Alert notifications to admin members or specified recipients
- Compliance with international standards and best practices

### 7. Health Checker (Admin Only)

**Purpose**: In-app QA check runner with human-readable results

**Features**:
- One-click "Run QA" / "Run Health Test" button
- Human-readable report (NO CODE shown to user)
- Clear listing of:
  - Architecture compliance
  - Environment presence/validity
  - Build/typecheck/lint status
  - Unit + E2E + wiring results (which component failed and why)
  - Routes (dev/start) with error snippets
  - DB connectivity/migration status
  - Email provider status
- Strict mode toggle (control whether missing envs/DB flip to RED in production)
- Component-level diagnostics

## Database Schema

### Tables Required

#### users
- id (uuid, primary key)
- email (text, unique)
- username (text, unique)
- role (enum: 'Admin', 'Technician')
- id_number (text)
- created_at (timestamp)
- updated_at (timestamp)

#### internal_transfers
- id (uuid, primary key)
- date (date)
- technician_id (uuid, foreign key → users)
- technician_name (text)
- ssid (text, nullable)
- psid (text, nullable)
- quantity (integer)
- part_number (text)
- description (text)
- created_at (timestamp)
- pdf_sent (boolean)

#### warranty_claims
- id (uuid, primary key)
- date (date)
- technician_id (uuid, foreign key → users)
- technician_name (text)
- ssid (text)
- chiller_serial_number (text)
- chiller_model (text)
- building_name (text)
- quantity (integer)
- part_number (text)
- failed_serial_number (text)
- repair_serial_number (text)
- date_of_failure (date)
- date_of_repair (date)
- created_at (timestamp)
- pdf_sent (boolean)

#### audit_log
- id (uuid, primary key)
- user_id (uuid, foreign key → users)
- action (text)
- entity_type (text)
- entity_id (uuid, nullable)
- details (jsonb)
- ip_address (text, nullable)
- created_at (timestamp)

#### app_settings
- id (uuid, primary key)
- key (text, unique)
- value (jsonb)
- updated_at (timestamp)
- updated_by (uuid, foreign key → users)

### Row Level Security (RLS)
- Enable RLS on all tables
- Admin users: full access to all tables
- Technician users: 
  - Read/write own internal_transfers and warranty_claims
  - No access to audit_log, app_settings, or other users
- Public: no access (authentication required)

## Quality Assurance Requirements

### QA Process
1. Architecture requirements encoded in `qa/requirements.json`
2. QA scans project folders and files for evidence
3. Each requirement shows GREEN (met) or RED (failed)
4. Initial QA run: expect 100% RED
5. Build to achieve 100% GREEN
6. New requirements: update architecture → update QA → run QA (RED) → build to GREEN

### QA Checks Required

#### Architecture/Requirements
- rules.md exists and conforms to True North
- qa/requirements.json encodes machine-verifiable checks

#### Environment
- Required env vars present (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, etc.)
- Strict mode toggle (QA_STRICT=1) to fail RED when envs missing/misconfigured

#### Type Safety & Coding
- TypeScript strict mode enabled
- `tsc --noEmit` passes with no errors
- ESLint passes with no errors

#### Build Integrity
- `next build` completes successfully
- No build errors or warnings

#### Unit Tests
- Minimal unit coverage for components and logic
- Required form fields validation
- Component rendering tests

#### E2E Tests (Playwright)
- Navigation between pages
- Headings and critical UI elements present
- Critical flows (login, form submission, reports)

#### Wiring Tests (Runtime)
- Header Preview toggle visible and functional
- Desktop/Mobile mode switching works
- Admin tab visibility (when admin role)
- Admin-only pages accessible and render correctly
- All sidebar tabs respond to clicks
- Forms submit and save data

#### Route Smoke Tests
- All routes respond with 200 status
- `next start` smoke test on common routes
- Full response body printed on non-200
- Server errors surfaced (e.g., "Cannot find module")

#### Database & Migrations
- Migrations applied locally and remotely
- No unapplied migrations
- No schema mismatches
- RLS policies verified (basic allow/deny probes)

#### API Health
- Core API endpoints respond 200
- CRUD operations perform expected side-effects in DB
- Error handling for missing envs

#### Email Integration
- Resend API key present
- From address configured (fallback to onboarding/Gmail)
- Domain verification status clear
- Notification recipients managed in Settings (not hard-coded)
- Input validation for email addresses

#### UI/UX Consistency
- Layout constraints enforced
- Consistent spacing and branding
- Responsive behavior (Desktop/Mobile)
- Color scheme (#FF2B00 primary, white secondary)
- Logo displayed in top left

#### Security Baseline
- Sensitive keys not in logs
- Permissive policies avoided
- Admin routes hidden from non-admin
- Passwords hashed (Supabase Auth)
- HTTPS enforced in production

#### Reporting & Exports
- Reports page reads live DB
- Excel export (xlsx) functional
- Filters work correctly
- Multi-select filters operational

#### Logging & Audit
- Critical events logged
- Audit table writable when DB available
- User actions tracked

## No Legacy Items & Strict Wiring

### Rules
- If code exists but isn't wired (not visible/functional in UI), QA must fail RED
- Two resolution options:
  1. **Required**: Wire it now; keep QA RED until it works at runtime
  2. **Legacy/De-wired**: Delete it

### Automatic Cleanup
- If a component fails wiring checks twice consecutively AND is not required by architecture, remove it to prevent accidental future wiring

### Wiring Check Types
- **Static**: Code references exist (components, imports, route files)
- **Runtime**: UI elements appear and respond (click handlers, visibility, state changes)

## State & Persistence

### Session Management
- RoleContext persisted to localStorage
- AuthContext persisted to localStorage
- "Reset session" control in UI (clears stored role/user, reloads)

### Admin Gating
Admin access granted if ANY of:
- Role selector says "Admin"
- user.role === "Admin"
- Email in admin list (joline.kruger@tranetechnologies.com, johan.ras2@outlook.com)

## Resilience & RED→GREEN Workflow

### Error Visibility
- Errors must be obvious in QA and UI
- Next server errors printed by QA (cause RED)
- Wiring issues fail E2E wiring checks (RED)

### Fix Process (RED → GREEN)
1. Capture new/changed requirements in architecture first
2. Update QA to reflect the issue (test fails RED)
3. Implement changes until QA passes GREEN
4. Handover to user for UI verification

## Deployment Requirements

### GitHub Pages
- Initial deployment target
- Static export configuration
- Build artifacts in `/out` directory
- Custom domain support (optional)

### Future Migration Path
- Document process for migration to other platforms
- Environment variable management
- Database connection configuration

## International Standards & Best Practices

### Security
- OWASP Top 10 compliance
- Data protection (GDPR considerations)
- Secure authentication and authorization
- Encrypted data transmission (HTTPS)
- Input validation and sanitization

### Accessibility
- WCAG 2.1 compliance (minimum AA)
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

### Performance
- Lighthouse score targets:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

## Fixed Rules for Development

### Agent Must Follow
1. Never ask user to paste code, run commands, or apply SQL
2. Never ask user to perform copy-paste operations
3. Always update architecture first, then encode QA checks, then implement, then re-run QA
4. QA must fail RED with full diagnostic context before any fix
5. Do not "silently" fix without first proving issue via QA
6. Delete legacy/de-wired code flagged by wiring checks in two consecutive cycles
7. Do not mark QA GREEN until:
   - Build/typecheck/tests pass
   - Wiring E2E pass (toggle/admin tabs respond)
   - Required routes respond 200
   - DB migrations applied (or strict mode disabled by design)
   - Emails send via configured sender or fallback (clearly declared)

### User Workflow
1. User describes outcomes in plain English
2. Agent updates architecture/QA
3. Agent writes/edits code
4. Agent runs commands, migrations, tests
5. Agent fixes issues to turn QA GREEN
6. User verifies result via UI only
7. If issues found, user reports in English → agent encodes in architecture/QA → fails RED → builds to GREEN

## Outcome

A resilient, production-ready app verified end-to-end by architecture-based QA runnable from the UI. Every handover happens only after full QA is GREEN. Health Checker provides readable, component-level report of system state.
