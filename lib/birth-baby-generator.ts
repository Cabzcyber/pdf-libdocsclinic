import { PDFDocument } from "pdf-lib";

// ==========================================
// INTERFACES
// ==========================================

export interface BirthPlanRecord {
  hospitalName: string;
  costNsd: boolean;
  costCs: boolean;
  vehicle: string;
  transporter: string;
  emergencyContact: string;
  companion: string;
  childWatcher: string;
  donor1: string;
  donor2: string;
  donor3: string;
  donor4: string;
  babyNameBoy: string;
  babyNameGirl: string;
}

export interface BabyRecord {
  // Baby Profile
  caseNumber: string;
  babyName: string;
  sex: string;
  dob: string;
  weight: string;
  hc: string;
  cc: string;
  apgar: string;
  length: string;

  // Mother Info
  motherName: string;
  motherAge: string;
  motherOccupation: string;
  
  // Mother Educ (Checkboxes)
  mHsLevel: boolean;
  mHsGrad: boolean;
  mColLevel: boolean;
  mColGrad: boolean;

  // Father Info
  fatherName: string;
  fatherAge: string;
  fatherOccupation: string;

  // Father Educ (Checkboxes)
  fHsLevel: boolean;
  fHsGrad: boolean;
  fColLevel: boolean;
  fColGrad: boolean;

  // Footer
  address: string;
  midwifeName: string;
  nurseName: string;
}

// ==========================================
// MOCK DATA
// ==========================================

export const mockBirthData: BirthPlanRecord = {
  hospitalName: "City General Hospital",
  costNsd: true,
  costCs: false,
  vehicle: "Private Car",
  transporter: "John Doe (Husband)",
  emergencyContact: "0917-123-4567",
  companion: "Jane Doe (Sister)",
  childWatcher: "Grandma Maria",
  donor1: "Uncle Bob",
  donor2: "Aunt Alice",
  donor3: "Cousin Charlie",
  donor4: "Neighbor Dan",
  babyNameBoy: "James",
  babyNameGirl: "Jasmine",
};

export const mockBabyData: BabyRecord = {
  // Baby Profile
  caseNumber: "NB-2024-001",
  babyName: "James Doe",
  sex: "Male",
  dob: "2024-01-30",
  weight: "3.2 kg",
  hc: "34 cm",
  cc: "33 cm",
  apgar: "9/10",
  length: "50 cm",

  // Mother Info
  motherName: "Juana Doe",
  motherAge: "28",
  motherOccupation: "Teacher",

  // Mother Educ
  mHsLevel: false,
  mHsGrad: true,
  mColLevel: false,
  mColGrad: true,

  // Father Info
  fatherName: "John Doe",
  fatherAge: "30",
  fatherOccupation: "Engineer",

  // Father Educ
  fHsLevel: false,
  fHsGrad: true,
  fColLevel: false,
  fColGrad: true,

  // Footer
  address: "123 Rizal St, Manila",
  midwifeName: "Maria Midwife",
  nurseName: "Nora Nurse",
};

// ==========================================
// GENERATOR FUNCTIONS
// ==========================================

// Function A: Birth Plan
export async function generateBirthPlanPDF(data: BirthPlanRecord = mockBirthData) {
  try {
    // Load the template (template2.pdf matches Requirement 1 context vs public file check)
    const existingPdfBytes = await fetch("/template2.pdf").then((res) => {
      if (!res.ok) throw new Error("Failed to load template2.pdf");
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    console.log('--- Generating Birth Plan PDF ---');

    // Helper to safely set text fields
    const setField = (fieldName: string, value: string | undefined | null) => {
      if (value === undefined || value === null) return;
      try {
        const field = form.getTextField(fieldName);
        field.setText(String(value));
        console.log(`Set Field: ${fieldName} = ${value}`);
      } catch (error) {
        console.warn(`Field '${fieldName}' not found in PDF template.`);
      }
    };

    // Helper to safely set checkboxes
    const setCheck = (fieldName: string, condition: boolean) => {
      if (condition) {
        try {
          const checkbox = form.getCheckBox(fieldName);
          checkbox.check();
        } catch (error) {
          // Fallback if it's a text field intended for 'X'
          try {
            const field = form.getTextField(fieldName);
            field.setText("X");
          } catch (e) {
            console.warn(`Field '${fieldName}' not found or could not be checked.`);
          }
        }
      }
    };

    // Mapping Fields
    setField("bep_hospital_name", data.hospitalName);
    setCheck("bep_cost_nsd", data.costNsd);
    setCheck("bep_cost_cs", data.costCs);
    
    setField("bep_vehicle", data.vehicle);
    setField("bep_transporter", data.transporter);
    setField("bep_emergency_contact", data.emergencyContact);
    setField("bep_companion", data.companion);
    setField("bep_child_watcher", data.childWatcher);

    setField("bep_donor_1", data.donor1);
    setField("bep_donor_2", data.donor2);
    setField("bep_donor_3", data.donor3);
    setField("bep_donor_4", data.donor4);

    setField("bep_baby_boy", data.babyNameBoy);
    setField("bep_baby_girl", data.babyNameGirl);

    // Serialize
    const pdfBytes = await pdfDoc.save();

    // Trigger Download
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Birth_Plan_${data.hospitalName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error generating Birth Plan PDF:", error);
    alert("Failed to generate Birth Plan PDF. See console.");
  }
}

// Function B: Baby Record
export async function generateBabyPDF(data: BabyRecord = mockBabyData) {
  try {
    // Load the template (template3.pdf matches Requirement context)
    const existingPdfBytes = await fetch("/template3.pdf").then((res) => {
      if (!res.ok) throw new Error("Failed to load template3.pdf");
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    console.log('--- Generating Baby Record PDF ---');

    // Helper to safely set text fields
    const setField = (fieldName: string, value: string | undefined | null) => {
      if (value === undefined || value === null) return;
      try {
        const field = form.getTextField(fieldName);
        field.setText(String(value));
        console.log(`Set Field: ${fieldName} = ${value}`);
      } catch (error) {
        console.warn(`Field '${fieldName}' not found in PDF template.`);
      }
    };

    // Helper to safely set checkboxes
    const setCheck = (fieldName: string, condition: boolean) => {
      if (condition) {
        try {
          const checkbox = form.getCheckBox(fieldName);
          checkbox.check();
        } catch (error) {
          // Fallback
          try {
            const field = form.getTextField(fieldName);
            field.setText("X");
          } catch (e) {
            console.warn(`Field '${fieldName}' not found or could not be checked.`);
          }
        }
      }
    };

    // Mapping Fields
    // Baby Profile
    setField("baby_case_number", data.caseNumber);
    setField("baby_name", data.babyName);
    setField("baby_sex", data.sex);
    setField("baby_dob", data.dob);
    setField("baby_weight", data.weight);
    setField("baby_hc", data.hc);
    setField("baby_cc", data.cc);
    setField("baby_apgar", data.apgar);
    setField("baby_length", data.length);

    // Mother Info
    setField("mother_name", data.motherName);
    setField("mother_age", data.motherAge);
    setField("mother_occupation", data.motherOccupation);

    setCheck("educ_m_hs_level", data.mHsLevel);
    setCheck("educ_m_hs_grad", data.mHsGrad);
    setCheck("educ_m_col_level", data.mColLevel);
    setCheck("educ_m_col_grad", data.mColGrad);

    // Father Info
    setField("father_name", data.fatherName);
    setField("father_age", data.fatherAge);
    setField("father_occupation", data.fatherOccupation);

    setCheck("educ_f_hs_level", data.fHsLevel);
    setCheck("educ_f_hs_grad", data.fHsGrad);
    setCheck("educ_f_col_level", data.fColLevel);
    setCheck("educ_f_col_grad", data.fColGrad);

    // Footer
    setField("baby_address", data.address);
    setField("midwife_name", data.midwifeName);
    setField("nurse_name", data.nurseName);

    // Serialize
    const pdfBytes = await pdfDoc.save();

    // Trigger Download
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Baby_Record_${data.babyName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error generating Baby Record PDF:", error);
    alert("Failed to generate Baby Record PDF. See console.");
  }
}
