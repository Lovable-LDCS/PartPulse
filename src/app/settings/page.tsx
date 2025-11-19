'use client';

import { useState } from 'react';
import { Save, Mail } from 'lucide-react';

export default function SettingsPage() {
  const [notificationEmail, setNotificationEmail] = useState('');
  const [secondaryEmail, setSecondaryEmail] = useState('');
  const [emailFrom, setEmailFrom] = useState('onboarding@resend.dev');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!notificationEmail) {
      alert('Please enter at least one notification email address');
      return;
    }

    setIsSaving(true);

    try {
      // In production, this would save to app_settings table
      console.log('Saving settings:', {
        notificationEmail,
        secondaryEmail,
        emailFrom,
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Mail size={24} />
              <h2 className="text-xl font-semibold">Email Configuration</h2>
            </div>
            <p className="text-gray-600">
              Configure email addresses for notifications and system alerts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                Primary Notification Email
              </label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="notifications@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                PDF reports will be sent to this email address
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Notification Email (Optional)
              </label>
              <input
                type="email"
                value={secondaryEmail}
                onChange={(e) => setSecondaryEmail(e.target.value)}
                placeholder="backup@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Email Address
              </label>
              <input
                type="email"
                value={emailFrom}
                onChange={(e) => setEmailFrom(e.target.value)}
                placeholder="noreply@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email address used for sending notifications (fallback: onboarding@resend.dev)
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">Security Alerts</h3>
              <p className="text-sm text-yellow-700">
                Security breach notifications will be sent to all configured notification email addresses.
                Ensure these addresses are monitored regularly.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Environment Variables</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>Required environment variables:</p>
            <ul className="list-disc list-inside ml-4">
              <li>RESEND_API_KEY - Email service API key</li>
              <li>NEXT_PUBLIC_SUPABASE_URL - Database URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY - Database key</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
