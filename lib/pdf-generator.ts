import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// Define Enums
export enum CivilStatus {
  SINGLE = 'SINGLE',
  MARRIED = 'MARRIED',
  WIDOWED = 'WIDOWED',
  SEPARATED = 'SEPARATED',
  DIVORCED = 'DIVORCED',
  LIVE_IN = 'LIVE_IN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

// Define Patient Interface
export interface Patient {
  id: string;
  caseNumber?: string;
  dateOfRegistration?: Date | string;
  familySerialNumber?: string;
  
  // PhilHealth
  hasPhilHealth: boolean;
  philHealthNumber?: string;
  isPhilHealthPHC?: boolean; // Made optional as it's not in mock
  
  // Name
  lastName: string;
  givenName: string;
  middleName?: string;
  
  // Personal Details
  completeAddress?: string;
  age?: number;
  civilStatus?: CivilStatus | string; // Allow string for flexibility
  birthday?: Date | string;
  birthPlace?: string;
  religion?: string;
  occupation?: string;
  contactNumber?: string;

  // ** Refactored Fields **
  bloodType?: string; // Changed from enum to string
  menarche?: string; // Changed from number to string
  hepBTest?: string; // Changed from enum to string
  
  // Pregnancy Details
  lastMenstrualPeriod?: Date | string;
  expectedDateOfConfinement?: Date | string;
  gravida?: number;
  para?: number;
  fullTerm?: number;
  preterm?: number;
  abortions?: number;
  living?: number;
  
  // Risk Codes
  riskCodeA: boolean;
  riskCodeADate?: Date | string | null;
  riskCodeB: boolean;
  riskCodeBDate?: Date | string | null;
  riskCodeC: boolean;
  riskCodeCDate?: Date | string | null;
  riskCodeD: boolean;
  riskCodeDDate?: Date | string | null;
  riskCodeE: boolean;
  riskCodeEDate?: Date | string | null;
  
  // Ultrasound & Lab
  dateUTZTaken?: Date | string;
  ultrasoundPresentation?: string;
  aogAtUltrasound?: string;
  ultrasoundRemarks?: string;
  edcFromUltrasound?: Date | string;
  urineAnalysis?: string;
  cbcResult?: string;

  // Tetanus Toxoid
  tt1Done?: boolean;
  tt1Date?: Date | string | null;
  tt2Done?: boolean;
  tt2Date?: Date | string | null;
  tt3Done?: boolean;
  tt3Date?: Date | string | null;
  tt4Done?: boolean;
  tt4Date?: Date | string | null;
  tt5Done?: boolean;
  tt5Date?: Date | string | null;

  // Delivery Details
  deliveryDateTime?: Date | string;
  babySex?: string;
  birthWeightGrams?: number;

  // Post Partum Visits
  pp1VisitDate?: Date | string;
  pp1BreastFeeding?: boolean;
  pp1ManagementRemarks?: string;
  pp1Supplementation?: string;
  pp1NoBreastFeedingReason?: string | null;

  pp2VisitDate?: Date | string;
  pp2BreastFeeding?: boolean;
  pp2ManagementRemarks?: string;
  pp2Supplementation?: string;
  pp2NoBreastFeedingReason?: string | null;

  // Arrays
  obHistory?: any[];
  prenatalAssessments?: any[];
  
  // Vitals (Keep existing if needed, though not in mock explicitly except inside assessments)
  bloodPressure?: string;
  weight?: number;
  temperature?: number;
  pulseRate?: number;
  respiratoryRate?: number;
  fundicHeight?: number;
  fetalHeartTone?: number;

  // ** First Prenatal Visit Details **
  firstPrenatalVisit?: {
    date?: Date | string;
    aog?: string;
    trimester?: string;
    bp?: string;
    temperature?: string;
    pulseRate?: string;
    respiratoryRate?: string;
    weight?: string;
    fundicHeight?: string;
    fetalHeartTone?: string;
    vitaminsTaken?: string;
    remarks?: string;
  };

  // ** Delivery Details Additions **
  birthCC?: string; // Chest Circumference
  birthAC?: string; // Abdominal Circumference
  vitaminKGiven?: boolean;
  hepBGiven?: boolean;
  credesGiven?: boolean;
}

export async function generatePatientPDF(patient: Patient) {
  try {
    // Load the template
    const existingPdfBytes = await fetch('/template.pdf').then((res) => {
      if (!res.ok) throw new Error('Failed to load template.pdf');
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Debug: Log all available fields
    const fields = form.getFields();
    console.log('Available PDF Fields:', fields.map(f => f.getName()));

    // Debug: Log Patient Object
    console.log('Received Patient Object:', patient);
    console.log('Patient Keys:', Object.keys(patient));
    console.log('Has firstPrenatalVisit:', !!patient.firstPrenatalVisit);
    if (patient.firstPrenatalVisit) {
        console.log('firstPrenatalVisit details:', patient.firstPrenatalVisit);
    } else {
        console.warn('firstPrenatalVisit is MISSING or UNDEFINED');
    }

    // Helper to safely set text fields
    const setField = (fieldName: string, value: string | number | undefined | null) => {
      if (value === undefined || value === null) {
          // console.log(`Skipping field '${fieldName}' (value is null/undefined)`);
          return;
      }
      try {
        const field = form.getTextField(fieldName);
        field.setText(String(value));
        console.log(`Set field '${fieldName}' to '${value}'`);
      } catch (error) {
        console.warn(`Field '${fieldName}' not found in PDF template.`);
      }
    };

    // Helper to draw check marks (X or ✓)
    // Coordinates are placeholders and should be adjusted
    const drawCheck = (condition: boolean | undefined, x: number, y: number, symbol: 'X' | '✓' = 'X') => {
      if (condition) {
        firstPage.drawText(symbol, {
          x,
          y,
          size: 12,
          // font: customFont // if needed
        });
      }
    };

    // Helper to format date
    const formatDate = (date: Date | string | undefined | null) => {
        if (!date) return '';
        const d = new Date(date);
        return isNaN(d.getTime()) ? String(date) : d.toLocaleDateString();
    };

    // --- MAPPING FIELDS ---
    
    // Personal Info
    setField('date_registration', formatDate(patient.dateOfRegistration));
    setField('family_serial_no', patient.familySerialNumber);
    setField('last_name', patient.lastName);
    setField('given_name', patient.givenName);
    setField('middle_name', patient.middleName);
    setField('complete_address', patient.completeAddress);
    setField('age', patient.age);
    setField('civil_status', patient.civilStatus);
    setField('birthday', formatDate(patient.birthday));
    setField('birth_place', patient.birthPlace);
    setField('religion', patient.religion);
    setField('occupation', patient.occupation);
    setField('contact_number', patient.contactNumber);
    setField('philhealth_no_phc', patient.philHealthNumber);

    // Refactored Fields
    setField('blood_type', patient.bloodType);
    setField('menarche', patient.menarche);
    setField('hepb_test_plus_minus', patient.hepBTest);

    // Pregnancy Details
    setField('lmp_date', formatDate(patient.lastMenstrualPeriod));
    setField('edd_date', formatDate(patient.expectedDateOfConfinement));
    setField('gravida', patient.gravida);
    setField('para', patient.para);
    setField('full_term', patient.fullTerm);
    setField('preterm', patient.preterm);
    setField('abortion', patient.abortions);
    setField('living', patient.living);
    
    // Risk Code Dates
    setField('risk_code_a_date', formatDate(patient.riskCodeADate));
    setField('risk_code_b_date', formatDate(patient.riskCodeBDate));
    setField('risk_code_c_date', formatDate(patient.riskCodeCDate));
    setField('risk_code_d_date', formatDate(patient.riskCodeDDate));
    setField('risk_code_e_date', formatDate(patient.riskCodeEDate));

    // Ultrasound & Lab
    setField('utz_date', formatDate(patient.dateUTZTaken));
    setField('utz_aog', patient.aogAtUltrasound);
    setField('utc_edc', formatDate(patient.edcFromUltrasound)); // Fixed: utz_edc -> utc_edc
    setField('utz_presentation', patient.ultrasoundPresentation);
    setField('utz_remarks', patient.ultrasoundRemarks);
    setField('urinalysis', patient.urineAnalysis);
    setField('cbc_result', patient.cbcResult);

    // Delivery Details
    setField('delivery_date', formatDate(patient.deliveryDateTime)); // Assuming date part only
    setField('baby_sex', patient.babySex);
    setField('baby_weight', patient.birthWeightGrams);
    setField('baby_cc', patient.birthCC); // CC
    setField('baby_ac', patient.birthAC); // AC

    // Post Partum Visits
    // PP1
    setField('pp1_date', formatDate(patient.pp1VisitDate));
    setField('pp1_supp', patient.pp1Supplementation);
    setField('pp1_remarks', patient.pp1ManagementRemarks);
    setField('pp1_bf_reason', patient.pp1NoBreastFeedingReason);
    
    // PP2
    setField('pp2_date', formatDate(patient.pp2VisitDate));
    setField('pp2_supp', patient.pp2Supplementation);
    setField('pp2_remarks', patient.pp2ManagementRemarks);
    setField('pp2_bf_reason', patient.pp2NoBreastFeedingReason);

    // Prenatal Assessments (Mapping first visit to first_visit fields)
    if (patient.firstPrenatalVisit) {
        const first = patient.firstPrenatalVisit;
        console.log('Mapping First Prenatal Visit:', first); // Debug Log

        setField('first_visit_date', formatDate(first.date));
        setField('first_visit_aog', first.aog); // AOG
        setField('first_visit_trimester', first.trimester); // Trimester
        
        // Typo in PDF Template: firt_visit_bp
        setField('firt_visit_bp', first.bp); 
        
        setField('first_visit_temp', first.temperature);
        setField('first_visit_pr', first.pulseRate);
        setField('first_visit_rr', first.respiratoryRate);
        setField('first_visit_weight', first.weight);
        setField('first_visit_fh', first.fundicHeight); // Fundic Height
        setField('first_visit_fht', first.fetalHeartTone);
        setField('first_visit_vit', first.vitaminsTaken);
        setField('first_visit_remarks', first.remarks);
    } else if (patient.prenatalAssessments && patient.prenatalAssessments.length > 0) {
        // Fallback to first assessment if specific firstPrenatalVisit not provided
        const first = patient.prenatalAssessments[0];
        console.log('Mapping First Assessment (Fallback):', first); // Debug Log

        setField('first_visit_date', formatDate(first.date));
        setField('first_visit_remarks', first.remarks);
    }

    if (patient.prenatalAssessments && patient.prenatalAssessments.length > 0) {
        // Map other assessments if needed, or if logic dictates different mapping
        // For now, keeping existing logic for subsequent assessments if they map to specific rows
         if (patient.prenatalAssessments.length > 1) {
            const second = patient.prenatalAssessments[1];
            setField('assess_r1_date', formatDate(second.date));
            setField('assess_r1_text', second.assessment);
            setField('assess_r1_rem', second.remarks);
        }
    }

    // --- OB HISTORY LOOP ---
    if (patient.obHistory && patient.obHistory.length > 0) {
      patient.obHistory.forEach((item, index) => {
        const row = index + 1;
        if (row > 5) return; 
        
        setField(`ob_r${row}_gravida`, item.gravidaYear);
        setField(`ob_r${row}_facility`, item.facilityConfined);
        setField(`ob_r${row}_aog`, item.aog);
        setField(`ob_r${row}_manner`, item.mannerOfDelivery);
        setField(`ob_r${row}_pres`, item.presentation);
        setField(`ob_r${row}_sex`, item.gender);
        setField(`ob_r${row}_comp`, item.complications);
      });
    }

    // --- DRAWING CHECKBOXES ---
    // PhilHealth (Using fields 'philhealth_yes' and 'philhealth_no' found in console)
    // Note: These seem to be text fields or checkboxes. If they are checkboxes, we use check(). 
    // If they are text fields intended for 'X', we use setText('X').
    // The console output lists them in `fields`, which implies they are form fields. 
    // Let's try to detect if they are CheckBox or TextField. 
    // For now, assuming TextField based on previous 'drawCheck' logic being replaced by setField if possible, 
    // BUT 'drawCheck' was using absolute coordinates. 
    // If 'philhealth_yes' is a field, we should use it!
    
    const setCheck = (fieldName: string, condition: boolean | undefined) => {
        if (condition) {
             try {
                const field = form.getTextField(fieldName);
                field.setText('X'); // Or '/' or checkmark
             } catch (e) {
                 // If it's a checkbox type
                 try {
                     const checkbox = form.getCheckBox(fieldName);
                     checkbox.check();
                 } catch (e2) {
                     console.warn(`Could not set checkbox/field ${fieldName}`);
                 }
             }
        }
    };

    setCheck('philhealth_yes', patient.hasPhilHealth);
    setCheck('philhealth_no', !patient.hasPhilHealth);

    // Risk Codes Checkboxes (Fields: risk_code_a, risk_code_b...)
    setCheck('risk_code_a', patient.riskCodeA);
    setCheck('risk_code_b', patient.riskCodeB);
    setCheck('risk_code_c', patient.riskCodeC);
    setCheck('risk_code_d', patient.riskCodeD);
    setCheck('risk_code_e', patient.riskCodeE);

    // Tetanus Toxoid (tt1_done, etc.)
    setCheck('tt1_done', patient.tt1Done);
    setCheck('tt2_done', patient.tt2Done);
    setCheck('tt3_done', patient.tt3Done);
    setCheck('tt4_done', patient.tt4Done);
    setCheck('tt5_done', patient.tt5Done);

    // Post Partum Breastfeeding (pp1_bf_yes, pp1_bf_no...)
    setCheck('pp1_bf_yes', patient.pp1BreastFeeding);
    setCheck('pp1_bf_no', patient.pp1BreastFeeding === false);
    setCheck('pp2_bf_yes', patient.pp2BreastFeeding);
    setCheck('pp2_bf_no', patient.pp2BreastFeeding === false);

    // Delivery Vaccines
    setCheck('vit_k_given', patient.vitaminKGiven);
    setCheck('hepb_given', patient.hepBGiven);
    setCheck('credes_given', patient.credesGiven);

    // Flatten the form to make fields uneditable (optional)
    // form.flatten();

    // Flatten the form to make fields uneditable (optional)
    // form.flatten();

    // Serialize
    const pdfBytes = await pdfDoc.save();

    // Trigger Download
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Patient_${patient.lastName}_${patient.givenName}_Record.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please check the console for details.');
  }
}
