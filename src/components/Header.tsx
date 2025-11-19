'use client';

import { usePreview } from '@/contexts/PreviewContext';
import { useRole } from '@/contexts/RoleContext';
import { Monitor, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { mode, setMode } = usePreview();
  const { role, setRole } = useRole();
  const [pulseGifError, setPulseGifError] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-32 h-12 relative">
          <Image
            src="/assets/logo.png"
            alt="Trane Thermo King"
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-800">PartPulse</h1>
          {/* Pulse animation - shows GIF if available, fallback to SVG */}
          {!pulseGifError ? (
            <div className="w-8 h-8 relative">
              <Image
                src="/assets/pulse.gif"
                alt="Pulse animation"
                width={32}
                height={32}
                className="object-contain"
                unoptimized
                onError={() => setPulseGifError(true)}
              />
            </div>
          ) : (
            <div className="w-8 h-8 relative">
              <Image
                src="/assets/pulse.svg"
                alt="Pulse animation"
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Preview Mode Toggle */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-sm font-medium text-gray-600 px-2">Preview:</span>
          <button
            onClick={() => setMode('desktop')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              mode === 'desktop' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Desktop preview mode"
          >
            <Monitor size={16} />
            <span className="text-sm">Desktop</span>
          </button>
          <button
            onClick={() => setMode('mobile')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              mode === 'mobile' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            aria-label="Mobile preview mode"
          >
            <Smartphone size={16} />
            <span className="text-sm">Mobile</span>
          </button>
        </div>

        {/* Role Selector for Testing */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          <span className="text-sm font-medium text-gray-600 px-2">Role:</span>
          <button
            onClick={() => setRole('Admin')}
            className={`px-3 py-1 rounded text-sm ${
              role === 'Admin' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => setRole('Technician')}
            className={`px-3 py-1 rounded text-sm ${
              role === 'Technician' 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Technician
          </button>
        </div>
      </div>
    </header>
  );
}
