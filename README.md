# PartPulse - Spare Parts Distribution Management

A comprehensive internal spare parts distribution management system for Trane Thermo King Pty LTD. This application helps technicians efficiently manage internal transfers and warranty claims for HVAC parts.

## 🚀 Features

### For Technicians
- **Internal Transfer Form**: Submit internal transfer notifications with SSID/PSID tracking
- **Warranty Claims Form**: Record detailed warranty claims with comprehensive information
- Easy-to-use interface with form validation
- Multi-form submission support

### For Administrators
- **Invite New Members**: Send email invitations to new users
- **Reports**: View and filter all notifications, export to Excel
- **Settings**: Configure email notifications and system settings
- **Security Dashboard**: Monitor security posture and compliance
- **Health Checker**: Run comprehensive QA checks on the system

## 🏗️ Architecture

This application follows two core philosophies:

1. **True North Build Philosophy**: All architecture requirements are the single source of truth
2. **One Time Build Philosophy**: Complete builds delivered only when 100% GREEN

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **Email**: Resend API
- **Deployment**: GitHub Pages (static export)

## 📋 Prerequisites

- Node.js 20 or higher
- npm or yarn
- Supabase account (optional, for full functionality)
- Resend API key (optional, for email functionality)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/Lovable-LDCS/PartPulse-1.git
cd PartPulse-1
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
cp .env.example .env.local
```

4. Configure environment variables (optional):
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

5. Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### GitHub Pages Deployment

The app is configured for automatic deployment to GitHub Pages:

1. Push to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Access your app at: `https://lovable-ldcs.github.io/PartPulse-1/`

**Note**: For GitHub Pages to work properly, ensure:
- Repository Settings > Pages > Source is set to "GitHub Actions"
- The workflow has proper permissions (included in workflow file)

## 🎨 Customization

### Company Logo
Place your Trane Thermo King company logo at:
```
/public/assets/logo.png
```
Recommended dimensions: 300px × 100px (3:1 ratio)

### Colors
Primary color: `#FF2B00` (Trane red)
Secondary color: `#FFFFFF` (white)

Modify in: `tailwind.config.ts`

## 👥 User Roles

### Admin Users
Default admin emails (can be modified in database):
- joline.kruger@tranetechnologies.com
- johan.ras2@outlook.com

**Admin Access**:
- All technician features
- Invite new members
- View reports and analytics
- Manage settings
- Access security dashboard
- Run health checks

### Technician Users
**Access**:
- Internal transfer forms
- Warranty claims forms

## 🧪 Testing

### Type Checking
```bash
npm run typecheck
```

### Linting
```bash
npm run lint
```

### E2E Tests (Coming Soon)
```bash
npm run test:e2e
```

## 📚 Documentation

- **Architecture**: See `rules.md` for complete architecture specification
- **QA Requirements**: See `qa/requirements.json` for quality assurance checks
- **Database Schema**: See `supabase/migrations/` for database structure
- **Logo & Assets Guide**: See `LOGO_AND_ASSETS_GUIDE.md` for uploading logos and GIFs
- **Deployment Guide**: See `DEPLOYMENT.md` for deployment instructions
- **Deployment Troubleshooting**: See `DEPLOYMENT_TROUBLESHOOTING.md` for fixing common issues

## 🔒 Security

- Row Level Security (RLS) enabled on all database tables
- Role-based access control (RBAC)
- Secure session management with localStorage
- No sensitive credentials in client-side code
- HTTPS enforced in production

## 🐛 Troubleshooting

### Build Issues
1. Clear cache: `rm -rf .next node_modules && npm install`
2. Check Node.js version: `node --version` (should be 20+)
3. Verify TypeScript: `npm run typecheck`

### GitHub Pages 404 Errors
- **First time deploying?** See `DEPLOYMENT_TROUBLESHOOTING.md` for step-by-step setup
- Ensure GitHub Pages is enabled: Settings → Pages → Source: "GitHub Actions"
- Ensure `.nojekyll` file exists in output
- Check `basePath` in `next.config.js`
- Verify deployment workflow completes successfully in Actions tab

## 📞 Support

For issues or questions:
- Create an issue in the GitHub repository
- Contact: joline.kruger@tranetechnologies.com or johan.ras2@outlook.com

## 📄 License

Internal use only - Trane Thermo King Pty LTD

## 🙏 Acknowledgments

Built following international standards and best practices for:
- OWASP security guidelines
- GDPR data protection
- WCAG accessibility standards
- Production-ready application architecture

