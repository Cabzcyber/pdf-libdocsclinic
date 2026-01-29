'use client';

import { useState } from 'react';
import { Plus, Printer, Search } from 'lucide-react';
import PatientForm from '@/components/PatientForm';
import { generatePatientPDF, Patient, CivilStatus } from '@/lib/pdf-generator';

// Mock Data for demonstration
// Mock Data for demonstration
const MOCK_PATIENTS: Patient[] = [
  {
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
  }
];

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(MOCK_PATIENTS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPatient = (newPatient: Patient) => {
    // In a real app, this would save to the backend
    setPatients((prev) => [newPatient, ...prev]);
    setIsFormOpen(false);
  };

  const filteredPatients = patients.filter((p) => 
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.givenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.caseNumber && p.caseNumber.includes(searchTerm))
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Patient
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name or case number..."
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 border p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EDD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.caseNumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.lastName}, {patient.givenName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.age}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.expectedDateOfConfinement 
                        ? new Date(patient.expectedDateOfConfinement).toLocaleDateString() 
                        : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {patient.riskCodeA || patient.riskCodeB || patient.riskCodeC || patient.riskCodeD || patient.riskCodeE ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          High Risk
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => generatePatientPDF(patient)}
                        className="text-blue-600 hover:text-blue-900 flex items-center justify-end ml-auto"
                        title="Print PDF"
                      >
                        <Printer className="w-4 h-4 mr-1" />
                        Print
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg">
            <PatientForm 
              onSubmit={handleAddPatient} 
              onCancel={() => setIsFormOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
