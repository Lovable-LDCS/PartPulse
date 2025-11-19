'use client';

import { useState } from 'react';
import { Plus, Save } from 'lucide-react';

interface InternalTransferForm {
  id: string;
  date: string;
  ssidPsidType: 'SSID' | 'PSID' | '';
  ssidPsidValue: string;
  poNumber: string;
  siteName: string;
  quantity: string;
  partNumber: string;
  description: string;
}

export default function InternalTransferPage() {
  const [forms, setForms] = useState<InternalTransferForm[]>([
    {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ssidPsidType: '',
      ssidPsidValue: '',
      poNumber: '',
      siteName: '',
      quantity: '',
      partNumber: '',
      description: '',
    },
  ]);

  const addNewForm = () => {
    setForms([
      ...forms,
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ssidPsidType: '',
        ssidPsidValue: '',
        poNumber: '',
        siteName: '',
        quantity: '',
        partNumber: '',
        description: '',
      },
    ]);
  };

  const updateForm = (id: string, field: keyof InternalTransferForm, value: string) => {
    setForms(forms.map(form => 
      form.id === id ? { ...form, [field]: value } : form
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const allValid = forms.every(form => 
      form.date && 
      form.ssidPsidType && 
      form.ssidPsidValue && 
      form.quantity && 
      form.partNumber && 
      form.description
    );

    if (!allValid) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    try {
      // Send email notification
      const response = await fetch('/api/send-internal-transfer-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          forms,
          technicianName: 'Current User', // In production, this would be from AuthContext
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      alert('Internal transfer notifications submitted successfully! Email sent to joline.kruger@tranetechnologies.com');
      
      // Reset forms
      setForms([
        {
          id: Date.now().toString(),
          date: new Date().toISOString().split('T')[0],
          ssidPsidType: '',
          ssidPsidValue: '',
          poNumber: '',
          siteName: '',
          quantity: '',
          partNumber: '',
          description: '',
        },
      ]);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Internal Transfer</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Submit internal transfer of parts notifications. All fields marked with 
            <span className="text-primary"> *</span> are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {forms.map((form, index) => (
              <div key={form.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                {forms.length > 1 && (
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Notification #{index + 1}
                  </h3>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => updateForm(form.id, 'date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Technician Name (Auto-filled) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technician Name
                    </label>
                    <input
                      type="text"
                      value="Current User" // In production, this would be from AuthContext
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>

                  {/* PO Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PO Number
                    </label>
                    <input
                      type="text"
                      value={form.poNumber}
                      onChange={(e) => updateForm(form.id, 'poNumber', e.target.value)}
                      placeholder="Enter PO Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Site Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={form.siteName}
                      onChange={(e) => updateForm(form.id, 'siteName', e.target.value)}
                      placeholder="Enter Site Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* SSID/PSID Radio Selector */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      SSID or PSID
                    </label>
                    <div className="flex gap-6 mb-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`ssidPsid-${form.id}`}
                          value="SSID"
                          checked={form.ssidPsidType === 'SSID'}
                          onChange={(e) => updateForm(form.id, 'ssidPsidType', e.target.value as 'SSID' | 'PSID')}
                          className="mr-2"
                          required
                        />
                        <span className="text-gray-700">SSID</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`ssidPsid-${form.id}`}
                          value="PSID"
                          checked={form.ssidPsidType === 'PSID'}
                          onChange={(e) => updateForm(form.id, 'ssidPsidType', e.target.value as 'SSID' | 'PSID')}
                          className="mr-2"
                        />
                        <span className="text-gray-700">PSID</span>
                      </label>
                    </div>
                    {form.ssidPsidType && (
                      <input
                        type="text"
                        value={form.ssidPsidValue}
                        onChange={(e) => updateForm(form.id, 'ssidPsidValue', e.target.value)}
                        placeholder={`Enter ${form.ssidPsidType} number`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={form.quantity}
                      onChange={(e) => updateForm(form.id, 'quantity', e.target.value)}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Part Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Part Number
                    </label>
                    <input
                      type="text"
                      value={form.partNumber}
                      onChange={(e) => updateForm(form.id, 'partNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) => updateForm(form.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Form Button */}
            <div className="flex items-center justify-center pt-4">
              <button
                type="button"
                onClick={addNewForm}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Plus size={20} />
                <span>Add Another Notification</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <Save size={20} />
                <span>Submit All Notifications</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
