'use client';

import { generateLaborPDF } from '@/lib/labor-pdf-generator';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function LaborRecordsPage() {
  const handleGeneratePDF = async () => {
    await generateLaborPDF();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/patients" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Patients
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Labor Admission & Delivery Records</h1>
          <p className="text-gray-600 mt-2">Generate and manage labor and delivery records.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex flex-col items-center justify-center py-12 space-y-6">
            <div className="bg-blue-50 p-4 rounded-full">
              <FileText className="w-16 h-16 text-blue-600" />
            </div>
            
            <div className="text-center max-w-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Generate Labor Record PDF</h2>
              <p className="text-gray-500 mb-6">
                Click the button below to generate a sample Labor Admission & Delivery PDF using the mock data.
              </p>
            </div>

            <button
              onClick={handleGeneratePDF}
              className="flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Labor PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
