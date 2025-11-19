export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to PartPulse
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Spare Parts Distribution Management
          </h2>
          <p className="text-gray-600 mb-4">
            PartPulse is an internal spare parts distribution management system designed for 
            Trane Thermo King Pty LTD. This application helps technicians efficiently manage 
            internal transfers and warranty claims for HVAC parts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              For Technicians
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Submit internal transfer notifications</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Record warranty claims</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Track parts usage</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              For Administrators
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Invite and manage team members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>View comprehensive reports</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Configure system settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Monitor security and system health</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Getting Started
          </h3>
          <p className="text-blue-700">
            Use the navigation menu on the left to access different features. 
            You can toggle between Desktop and Mobile preview modes using the controls in the header.
            Administrators have access to additional features including reports, settings, and system monitoring.
          </p>
        </div>
      </div>
    </div>
  );
}
