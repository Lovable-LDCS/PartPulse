'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRole } from '@/contexts/RoleContext';
import { 
  Package, 
  FileText, 
  UserPlus, 
  BarChart3, 
  Settings, 
  Shield, 
  Activity,
  LogOut
} from 'lucide-react';

const allNavItems = [
  {
    label: 'Internal Transfer',
    href: '/internal-transfer',
    icon: Package,
    roles: ['Admin', 'Technician'],
  },
  {
    label: 'Warranty Claims',
    href: '/warranty-claims',
    icon: FileText,
    roles: ['Admin', 'Technician'],
  },
  {
    label: 'Invite New Members',
    href: '/invite-members',
    icon: UserPlus,
    roles: ['Admin'],
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: BarChart3,
    roles: ['Admin'],
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['Admin'],
  },
  {
    label: 'Security Dashboard',
    href: '/security-dashboard',
    icon: Shield,
    roles: ['Admin'],
  },
  {
    label: 'Health Checker',
    href: '/health-checker',
    icon: Activity,
    roles: ['Admin'],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { role, isAdmin, resetSession } = useRole();

  // Filter nav items based on user role
  const navItems = allNavItems.filter(item => 
    item.roles.includes(role) || (isAdmin && item.roles.includes('Admin'))
  );

  return (
    <aside className="w-64 bg-primary text-white min-h-screen flex flex-col">
      <nav className="flex-1 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive 
                  ? 'bg-white/20 border-r-4 border-white' 
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/20">
        <button
          onClick={resetSession}
          className="flex items-center gap-3 w-full px-4 py-2 rounded hover:bg-white/10 transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Reset Session</span>
        </button>
      </div>
    </aside>
  );
}
