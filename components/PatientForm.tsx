'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  CivilStatus, 
  Gender, 
  Patient 
} from '@/lib/pdf-generator';
import { Save, X } from 'lucide-react';

// --- ZOD SCHEMA ---
const patientSchema = z.object({
  // Patient Info
  lastName: z.string().min(1, 'Last name is required'),
  givenName: z.string().min(1, 'Given name is required'),
  middleName: z.string().optional(),
  dateOfRegistration: z.string().optional(), // Input type="date" returns string
  familySerialNumber: z.string().optional(),
  
  // PhilHealth
  hasPhilHealth: z.boolean(),
  philHealthNumber: z.string().optional(),
  isPhilHealthPHC: z.boolean(),
  
  // Personal Details
  completeAddress: z.string().optional(),
  age: z.string().optional(),
  civilStatus: z.nativeEnum(CivilStatus).optional(),
  birthday: z.string().optional(),
  birthPlace: z.string().optional(),
  religion: z.string().optional(),
  occupation: z.string().optional(),
  bloodType: z.string().optional(),
  menarche: z.string().optional(),
  contactNumber: z.string().optional(),
  
  // Pregnancy Details
  lastMenstrualPeriod: z.string().optional(),
  expectedDateOfConfinement: z.string().optional(),
  gravida: z.string().optional(),
  para: z.string().optional(),
  fullTerm: z.string().optional(),
  preterm: z.string().optional(),
  abortions: z.string().optional(),
  living: z.string().optional(),
  
  // Risk Codes
  riskCodeA: z.boolean(),
  riskCodeADate: z.string().optional(),
  riskCodeB: z.boolean(),
  riskCodeBDate: z.string().optional(),
  riskCodeC: z.boolean(),
  riskCodeCDate: z.string().optional(),
  riskCodeD: z.boolean(),
  riskCodeDDate: z.string().optional(),
  riskCodeE: z.boolean(),
  riskCodeEDate: z.string().optional(),
  
  // Vitals & Delivery
  bloodPressure: z.string().optional(),
  weight: z.string().optional(),
  temperature: z.string().optional(),
  pulseRate: z.string().optional(),
  respiratoryRate: z.string().optional(),
  fundicHeight: z.string().optional(),
  fetalHeartTone: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientFormProps {
  onSubmit: (data: Patient) => void;
  onCancel: () => void;
}

export default function PatientForm({ onSubmit, onCancel }: PatientFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      hasPhilHealth: false,
      isPhilHealthPHC: false,
      riskCodeA: false,
      riskCodeB: false,
      riskCodeC: false,
      riskCodeD: false,
      riskCodeE: false,
    },
  });

  const processSubmit = (data: PatientFormValues) => {
    // Helper to parse date string to Date object
    const parseDate = (dateStr?: string) => dateStr ? new Date(dateStr) : undefined;
    // Helper to parse number string to number
    const parseNumber = (numStr?: string) => (numStr && numStr.trim() !== '') ? Number(numStr) : undefined;

    const patientData: Patient = {
      id: crypto.randomUUID(),
      ...data,
      // Manually transform date strings to Date objects
      dateOfRegistration: parseDate(data.dateOfRegistration),
      birthday: parseDate(data.birthday),
      lastMenstrualPeriod: parseDate(data.lastMenstrualPeriod),
      expectedDateOfConfinement: parseDate(data.expectedDateOfConfinement),
      riskCodeADate: parseDate(data.riskCodeADate),
      riskCodeBDate: parseDate(data.riskCodeBDate),
      riskCodeCDate: parseDate(data.riskCodeCDate),
      riskCodeDDate: parseDate(data.riskCodeDDate),
      riskCodeEDate: parseDate(data.riskCodeEDate),
      
      // Manually transform number strings to numbers
      age: parseNumber(data.age),
      menarche: data.menarche,
      gravida: parseNumber(data.gravida),
      para: parseNumber(data.para),
      fullTerm: parseNumber(data.fullTerm),
      preterm: parseNumber(data.preterm),
      abortions: parseNumber(data.abortions),
      living: parseNumber(data.living),
      weight: parseNumber(data.weight),
      temperature: parseNumber(data.temperature),
      pulseRate: parseNumber(data.pulseRate),
      respiratoryRate: parseNumber(data.respiratoryRate),
      fundicHeight: parseNumber(data.fundicHeight),
      fetalHeartTone: parseNumber(data.fetalHeartTone),
    };
    
    onSubmit(patientData);
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">New Patient Registration</h2>
        <button type="button" onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>

      {/* --- PERSONAL INFO --- */}
      <fieldset className="border p-4 rounded-md shadow-sm">
        <legend className="text-lg font-semibold text-blue-600 px-2">Personal Information</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input {...register('lastName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
            {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Given Name</label>
            <input {...register('givenName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
            {errors.givenName && <p className="text-red-500 text-xs">{errors.givenName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Middle Name</label>
            <input {...register('middleName')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" {...register('age')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Civil Status</label>
            <select {...register('civilStatus')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2">
              <option value="">Select...</option>
              {Object.values(CivilStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input {...register('contactNumber')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>

          <div className="md:col-span-3">
             <label className="block text-sm font-medium text-gray-700">Complete Address</label>
             <input {...register('completeAddress')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
        </div>
      </fieldset>

      {/* --- PREGNANCY DETAILS --- */}
      <fieldset className="border p-4 rounded-md shadow-sm">
        <legend className="text-lg font-semibold text-pink-600 px-2">Pregnancy Details</legend>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">LMP</label>
            <input type="date" {...register('lastMenstrualPeriod')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">EDD</label>
            <input type="date" {...register('expectedDateOfConfinement')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gravida</label>
            <input type="number" {...register('gravida')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Para</label>
            <input type="number" {...register('para')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
        </div>
      </fieldset>

      {/* --- RISK CODES --- */}
      <fieldset className="border p-4 rounded-md shadow-sm">
        <legend className="text-lg font-semibold text-red-600 px-2">Risk Codes</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('riskCodeA')} id="riskA" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="riskA" className="text-sm text-gray-700">Risk Code A</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('riskCodeB')} id="riskB" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="riskB" className="text-sm text-gray-700">Risk Code B</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('riskCodeC')} id="riskC" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="riskC" className="text-sm text-gray-700">Risk Code C</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('riskCodeD')} id="riskD" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="riskD" className="text-sm text-gray-700">Risk Code D</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register('riskCodeE')} id="riskE" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="riskE" className="text-sm text-gray-700">Risk Code E</label>
          </div>
        </div>
      </fieldset>

      {/* --- VITALS & DELIVERY --- */}
      <fieldset className="border p-4 rounded-md shadow-sm">
        <legend className="text-lg font-semibold text-green-600 px-2">Vitals & Delivery</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
            <input {...register('bloodPressure')} placeholder="e.g. 120/80" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" step="0.1" {...register('weight')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
            <input type="number" step="0.1" {...register('temperature')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit" className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Save className="mr-2 h-4 w-4" />
          Save Patient
        </button>
      </div>
    </form>
  );
}
