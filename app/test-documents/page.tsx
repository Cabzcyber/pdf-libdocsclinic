"use client";

import React from "react";
import { generateBirthPlanPDF, generateBabyPDF, mockBirthData, mockBabyData } from "@/lib/birth-baby-generator";

export default function TestDocumentsPage() {
  const handleGenerateBirthPlan = async () => {
    try {
      await generateBirthPlanPDF(mockBirthData);
    } catch (error) {
      console.error("Error generating Birth Plan:", error);
      alert("Failed to generate Birth Plan");
    }
  };

  const handleGenerateBabyRecord = async () => {
    try {
      await generateBabyPDF(mockBabyData);
    } catch (error) {
      console.error("Error generating Baby Record:", error);
      alert("Failed to generate Baby Record");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">PDF Generation Test Suite</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Birth Plan */}
        <div className="border rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-3">Birth Emergency Plan</h2>
          <p className="text-gray-600 mb-4">
            Generates the Birth Plan PDF using "template2.pdf" and mapped fields.
          </p>
          <div className="mb-4 text-sm text-gray-500">
            <strong>Key Fields:</strong> Hospital Name, Cost Checkboxes, Logistics, Donors.
          </div>
          <button
            onClick={handleGenerateBirthPlan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Generate Birth Plan
          </button>
        </div>

        {/* Card 2: Baby Record */}
        <div className="border rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-3">Baby's Record</h2>
          <p className="text-gray-600 mb-4">
            Generates the Baby Record PDF using "template3.pdf" and mapped fields.
          </p>
          <div className="mb-4 text-sm text-gray-500">
            <strong>Key Fields:</strong> Baby Profile, Mother/Father Info, Education Checkboxes.
          </div>
          <button
            onClick={handleGenerateBabyRecord}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Generate Baby Record
          </button>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-700">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Ensure <code>public/template2.pdf</code> and <code>public/template3.pdf</code> exist.</li>
          <li>Click the buttons above to generate and download the PDFs.</li>
          <li>Check the browser console for logs if files do not download.</li>
        </ol>
      </div>
    </div>
  );
}
