'use client';

import { useState } from 'react';
import { Plus, Save } from 'lucide-react';

interface WarrantyClaimForm {
  id: string;
  date: string;
  ssid: string;
  chillerSerialNumber: string;
  chillerModel: string;
  buildingName: string;
  quantity: string;
  partNumber: string;
  failedSerialNumber: string;
  repairSerialNumber: string;
  dateOfFailure: string;
  dateOfRepair: string;
}

export default function WarrantyClaimsPage() {
  const [forms, setForms] = useState<WarrantyClaimForm[]>([
    {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ssid: '',
      chillerSerialNumber: '',
      chillerModel: '',
      buildingName: '',
      quantity: '',
      partNumber: '',
      failedSerialNumber: '',
      repairSerialNumber: '',
      dateOfFailure: '',
      dateOfRepair: '',
    },
  ]);

  const addNewForm = () => {
    setForms([
      ...forms,
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ssid: '',
        chillerSerialNumber: '',
        chillerModel: '',
        buildingName: '',
        quantity: '',
        partNumber: '',
        failedSerialNumber: '',
        repairSerialNumber: '',
        dateOfFailure: '',
        dateOfRepair: '',
      },
    ]);
  };

  const updateForm = (id: string, field: keyof WarrantyClaimForm, value: string) => {
    setForms(forms.map(form => 
      form.id === id ? { ...form, [field]: value } : form
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all required fields
    const allValid = forms.every(form => 
      form.date && 
      form.ssid && 
      form.chillerSerialNumber && 
      form.chillerModel && 
      form.buildingName && 
      form.quantity && 
      form.partNumber && 
      form.failedSerialNumber && 
      form.repairSerialNumber && 
      form.dateOfFailure && 
      form.dateOfRepair
    );

    if (!allValid) {
      alert('Please fill in all required fields marked with *');
      return;
    }

    console.log('Submitting warranty claims:', forms);
    alert('Warranty claim notifications submitted successfully!');
    
    // Reset forms
    setForms([
      {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ssid: '',
        chillerSerialNumber: '',
        chillerModel: '',
        buildingName: '',
        quantity: '',
        partNumber: '',
        failedSerialNumber: '',
        repairSerialNumber: '',
        dateOfFailure: '',
        dateOfRepair: '',
      },
    ]);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Warranty Claims</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Submit warranty claim notifications. All fields marked with 
            <span className="text-primary"> *</span> are required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {forms.map((form, index) => (
              <div key={form.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                {forms.length > 1 && (
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Warranty Claim #{index + 1}
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
                      value="Current User"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                    />
                  </div>

                  {/* SSID */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      SSID
                    </label>
                    <input
                      type="text"
                      value={form.ssid}
                      onChange={(e) => updateForm(form.id, 'ssid', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Chiller Serial Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Chiller Serial Number
                    </label>
                    <input
                      type="text"
                      value={form.chillerSerialNumber}
                      onChange={(e) => updateForm(form.id, 'chillerSerialNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Chiller Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Chiller Model
                    </label>
                    <input
                      type="text"
                      value={form.chillerModel}
                      onChange={(e) => updateForm(form.id, 'chillerModel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Building Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Building Name
                    </label>
                    <input
                      type="text"
                      value={form.buildingName}
                      onChange={(e) => updateForm(form.id, 'buildingName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
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

                  {/* Failed Serial Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Failed Serial Number
                    </label>
                    <input
                      type="text"
                      value={form.failedSerialNumber}
                      onChange={(e) => updateForm(form.id, 'failedSerialNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Repair Serial Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Repair Serial Number
                    </label>
                    <input
                      type="text"
                      value={form.repairSerialNumber}
                      onChange={(e) => updateForm(form.id, 'repairSerialNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Date of Failure */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Date of Failure
                    </label>
                    <input
                      type="date"
                      value={form.dateOfFailure}
                      onChange={(e) => updateForm(form.id, 'dateOfFailure', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  {/* Date of Repair */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 required-field">
                      Date of Repair
                    </label>
                    <input
                      type="date"
                      value={form.dateOfRepair}
                      onChange={(e) => updateForm(form.id, 'dateOfRepair', e.target.value)}
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
                <span>Add Another Warranty Claim</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                <Save size={20} />
                <span>Submit All Warranty Claims</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
