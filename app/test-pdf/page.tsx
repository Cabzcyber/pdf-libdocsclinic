'use client';

import React from 'react';
import { generatePatientPDF, Patient } from '@/lib/pdf-generator';

const mockPatient: Patient = {
  // --- Personal Info ---
  id: "test-uuid-123",
  dateOfRegistration: "2024-01-15T00:00:00.000Z",
  familySerialNumber: "FAM-001",
  lastName: "Dela Cruz",
  givenName: "Maria",
  middleName: "Santos",
  completeAddress: "Purok 2, Lower Jasaan, Misamis Oriental",
  age: 28,
  birthday: "1996-05-20T00:00:00.000Z",
  birthPlace: "Cagayan de Oro City",
  civilStatus: "MARRIED",
  religion: "Roman Catholic",
  occupation: "Teacher",
  contactNumber: "0917-123-4567",
  
  // ** Refactored Fields **
  bloodType: "O+",
  menarche: "12 years old",
  hepBTest: "NEGATIVE", // Text field input

  // --- PhilHealth (Boolean Logic) ---
  hasPhilHealth: true,
  philHealthNumber: "12-123456789-1",

  // --- Pregnancy Details ---
  lastMenstrualPeriod: "2023-10-01T00:00:00.000Z",
  expectedDateOfConfinement: "2024-07-08T00:00:00.000Z",
  gravida: 3,
  para: 2,
  fullTerm: 2,
  preterm: 0,
  abortions: 0,
  living: 2,

  // --- Risk Codes (Checkboxes + Dates) ---
  riskCodeA: true, 
  riskCodeADate: "2023-11-15T00:00:00.000Z",
  riskCodeB: false,
  riskCodeBDate: null,
  riskCodeC: false,
  riskCodeCDate: null,
  riskCodeD: true,
  riskCodeDDate: "2023-12-01T00:00:00.000Z",
  riskCodeE: false,
  riskCodeEDate: null,

  // --- Ultrasound & Lab ---
  dateUTZTaken: "2024-02-14T00:00:00.000Z",
  ultrasoundPresentation: "Cephalic",
  aogAtUltrasound: "18 weeks",
  ultrasoundRemarks: "Normal Fetal Movement",
  edcFromUltrasound: "2024-07-10T00:00:00.000Z",
  urineAnalysis: "Normal, Pus Cells 0-2",
  cbcResult: "Hgb 120, Normal",

  // --- Tetanus Toxoid ---
  tt1Done: true,
  tt1Date: "2023-11-01T00:00:00.000Z",
  tt2Done: true,
  tt2Date: "2023-12-01T00:00:00.000Z",
  tt3Done: false,
  tt3Date: null,
  tt4Done: false,
  tt4Date: null,
  tt5Done: false,
  tt5Date: null,

  // --- Delivery Details ---
  deliveryDateTime: "2024-07-08T08:30:00.000Z",
  babySex: "MALE",
  birthWeightGrams: 3200,
  

  // --- Post Partum Visits ---
  pp1VisitDate: "2024-07-15T00:00:00.000Z",
  pp1BreastFeeding: true,
  pp1ManagementRemarks: "Wound healed well. Continue iron.",
  pp1Supplementation: "Iron + Folic",
  pp1NoBreastFeedingReason: null,

  pp2VisitDate: "2024-08-15T00:00:00.000Z",
  pp2BreastFeeding: true,
  pp2ManagementRemarks: "Patient fully recovered.",
  pp2Supplementation: "None",
  pp2NoBreastFeedingReason: null,

  // --- OB HISTORY ARRAY (Loop Test) ---
  obHistory: [
    { gravidaYear: 2018, facilityConfined: "Jasaan Health Center", aog: "Term", mannerOfDelivery: "NSD", presentation: "Cephalic", gender: "F", complications: "None" },
    { gravidaYear: 2020, facilityConfined: "NMMC", aog: "Term", mannerOfDelivery: "NSD", presentation: "Cephalic", gender: "M", complications: "Mild Preeclampsia" }
  ],

  // --- PRENATAL ASSESSMENTS ARRAY (Loop Test) ---
  prenatalAssessments: [
    { date: "2023-11-15T00:00:00.000Z", assessment: "First Checkup. Vitals Normal.", remarks: "Given Vitamins" },
    { date: "2023-12-15T00:00:00.000Z", assessment: "Fetal Heart Tone audible.", remarks: "Continue Vitamins" },
    { date: "2024-01-15T00:00:00.000Z", assessment: "Weight gain steady.", remarks: "Scheduled UTZ" }
  ],

  // --- First Prenatal Visit ---
  firstPrenatalVisit: {
    date: "2023-11-15T00:00:00.000Z",
    aog: "8 weeks",
    trimester: "1st",
    bp: "110/70",
    temperature: "36.5",
    pulseRate: "80",
    respiratoryRate: "20",
    weight: "55",
    fundicHeight: "N/A",
    fetalHeartTone: "N/A",
    vitaminsTaken: "Folic Acid"
  },

  // --- Delivery Additional Details ---
  birthCC: "33",
  birthAC: "31",
  vitaminKGiven: true,
  hepBGiven: true,
  credesGiven: false
};

export default function TestPdfPage() {
  const handleGenerate = async () => {
    try {
      alert('Starting PDF Generation... Check console for field names.');
      await generatePatientPDF(mockPatient);
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">PDF Generation System Test</h1>
        
        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Generate Test PDF
        </button>
        
        <p className="mt-4 text-sm text-gray-500">
          Clicking the button will generate a PDF with the mock patient data.
          <br />
          <span className="text-xs text-gray-400">Open browser console (F12) to see available PDF fields.</span>
        </p>
      </div>
    </div>
  );
}
