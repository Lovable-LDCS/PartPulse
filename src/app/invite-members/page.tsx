'use client';

import { useState } from 'react';
import { UserPlus, Mail } from 'lucide-react';

export default function InviteMembersPage() {
  const [userName, setUserName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName || !idNumber || !email) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, this would call the API to send invitation email
      console.log('Sending invitation to:', { userName, idNumber, email });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`Invitation sent successfully to ${email}!\n\nThey will receive an email with a signup link.`);
      
      // Reset form
      setUserName('');
      setIdNumber('');
      setEmail('');
    } catch (error) {
      alert('Error sending invitation. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Invite New Members</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <UserPlus size={24} />
              <h2 className="text-xl font-semibold">Send Invitation</h2>
            </div>
            <p className="text-gray-600">
              Enter the user details below to send an invitation email. The user will receive a link to create their account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                User Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                ID Number
              </label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                placeholder="Enter ID number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Mail className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Email Preview</h3>
                  <p className="text-sm text-blue-700">
                    &quot;You are invited to access PartPulse. Please click the following link to sign up.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={20} />
                <span>{isSubmitting ? 'Sending...' : 'Send Invitation'}</span>
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">Access Rights</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• New members will be assigned &quot;Technician&quot; role by default</li>
            <li>• Technicians can access Internal Transfer and Warranty Claims</li>
            <li>• Admin users can promote members to Admin role in Settings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
