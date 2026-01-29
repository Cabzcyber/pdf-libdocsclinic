import { PDFDocument } from "pdf-lib";

// Define Interfaces
export interface LaborRecord {
  // Header/Profile
  admitDate?: string;
  admitTime?: string;
  patientName: string;
  patientAddress?: string;
  husbandName?: string;

  // History
  lmpDate?: string;
  caseNumber?: string;
  isPhilHealth: boolean;
  isNonPhilHealth: boolean;
  aogWeeks?: string;
  gravida?: string;
  para?: string;
  abortion?: string;
  deathCount?: string;
  dischargeTime?: string; // Added field

  // OB History Table (Loop 5 rows)
  obHistory: {
    year?: string;
    place?: string;
    aog?: string;
    weight?: string;
    manner?: string;
    remarks?: string;
  }[];

  // Part III: Ultrasound & Lab Report
  // Ultrasound
  labUtzNorm: string;
  labUtzNorm1: string;
  labUtzAbn: string;
  labUtzAbn1: string;
  labUtzAbn2: string;

  // CBC
  labCbcNorm: string;
  labCbcNorm1: string;
  labCbcAbn: string;
  labCbcAbn1: string;
  labCbcAbn2: string;

  // Urinalysis
  labUriNorm: string;
  labUriNorm1: string;
  labUriAbn: string;
  labUriAbn1: string;
  labUriAbn2: string;

  // Hepatitis B
  labHepbNorm: string;
  labHepbNorm1: string;
  labHepbAbn: string;
  labHepbAbn1: string;
  labHepbAbn2: string;

  // Physical Assessment
  phyBp?: string;
  phyPr?: string;
  phyRr?: string;
  phyTemp?: string;
  phyWeight?: string;
  phyHt?: string;
  phyFr?: string; // Added field
  phyFht?: string; // Added field
  phyUc?: string; // Added field
  ieDilatation?: string; // Added field

  // Physical Checkboxes
  phyHeentNorm: boolean;
  phyChestNorm: boolean;
  phyExtNorm: boolean;
  bowIntact: boolean;
  bowRuptured: boolean;

  // Delivery Table (The 4 Stages)
  laborOnset: { time?: string; stage?: string; duration?: string };
  laborCervix: { time?: string; stage?: string; duration?: string };
  laborBaby: { time?: string; stage?: string; duration?: string };
  laborPlacenta: { time?: string; stage?: string; duration?: string };

  // Delivery Details
  delPatientName?: string;
  delCaseNumber?: string; // Added field
  delPhId?: string;
  episMedian: boolean;
  condAwake: boolean;
  utContracted: boolean;

  // Vitals Monitor (Loop 4 rows)
  vitalsMonitor: {
    hour?: string;
    bp?: string;
    pr?: string;
    rr?: string;
    temp?: string;
    fht?: string;
  }[];
  
  // Staff
  midwifeName?: string;
  nurseName?: string;
  monStaffName?: string;
}

// Mock Data
export const mockLaborData: LaborRecord = {
  // Header/Profile
  admitDate: "2024-01-29",
  admitTime: "08:00 AM",
  patientName: "Juana Dela Cruz",
  patientAddress: "123 Rizal St., Cagayan de Oro City",
  husbandName: "Juan Dela Cruz",

  // History
  lmpDate: "2023-04-15",
  caseNumber: "CN-2024-001",
  isPhilHealth: true,
  isNonPhilHealth: false,
  aogWeeks: "38 weeks",
  gravida: "3",
  para: "2",
  abortion: "0",
  deathCount: "0",
  dischargeTime: "10:00 AM",

  // OB History Table
  obHistory: [
    {
      year: "2020",
      place: "Home",
      aog: "Term",
      weight: "3.2kg",
      manner: "NSD",
      remarks: "Healthy",
    },
    {
      year: "2022",
      place: "Clinic",
      aog: "Term",
      weight: "3.5kg",
      manner: "NSD",
      remarks: "Healthy",
    },
    {
      year: "2023",
      place: "Hospital",
      aog: "Term",
      weight: "3.0kg",
      manner: "CS",
      remarks: "Breech",
    },
    {
      year: "2024",
      place: "Home",
      aog: "Preterm",
      weight: "2.5kg",
      manner: "NSD",
      remarks: "Incubated",
    },
    {
      year: "2025",
      place: "Clinic",
      aog: "Term",
      weight: "3.2kg",
      manner: "NSD",
      remarks: "Healthy",
    },
  ],

  // Part III: Ultrasound & Lab Report
  // Ultrasound
  labUtzNorm: "Normal",
  labUtzNorm1: "Cephalic",
  labUtzAbn: "None",
  labUtzAbn1: "N/A",
  labUtzAbn2: "N/A",

  // CBC
  labCbcNorm: "120",
  labCbcNorm1: "Normal",
  labCbcAbn: "None",
  labCbcAbn1: "N/A",
  labCbcAbn2: "N/A",

  // Urinalysis
  labUriNorm: "Clear",
  labUriNorm1: "Negative",
  labUriAbn: "Pus Cells",
  labUriAbn1: "2-4",
  labUriAbn2: "Trace",

  // Hepatitis B
  labHepbNorm: "Negative",
  labHepbNorm1: "Non-Reactive",
  labHepbAbn: "None",
  labHepbAbn1: "N/A",
  labHepbAbn2: "N/A",

  // Physical Assessment
  phyBp: "120/80",
  phyPr: "80",
  phyRr: "20",
  phyTemp: "36.5",
  phyWeight: "65kg",
  phyHt: "160cm",
  phyFr: "Normal",
  phyFht: "140 bpm",
  phyUc: "Mild",
  ieDilatation: "4 cm",

  // Physical Checkboxes
  phyHeentNorm: true,
  phyChestNorm: true,
  phyExtNorm: true,
  bowIntact: false,
  bowRuptured: true,

  // Delivery Table
  laborOnset: { time: "06:00 AM", stage: "Onset", duration: "2 hrs" },
  laborCervix: { time: "08:00 AM", stage: "Active", duration: "4 hrs" },
  laborBaby: { time: "12:00 PM", stage: "Expulsion", duration: "30 mins" },
  laborPlacenta: { time: "12:30 PM", stage: "Placental", duration: "15 mins" },

  // Delivery Details
  delPatientName: "Juana Dela Cruz",
  delCaseNumber: "CN-2024-001",
  delPhId: "12-3456789-1",
  episMedian: true,
  condAwake: true,
  utContracted: true,

  // Vitals Monitor
  vitalsMonitor: [
    {
      hour: "08:00",
      bp: "120/80",
      pr: "80",
      rr: "20",
      temp: "36.5",
      fht: "140",
    },
    {
      hour: "09:00",
      bp: "120/80",
      pr: "82",
      rr: "20",
      temp: "36.6",
      fht: "142",
    },
    {
      hour: "10:00",
      bp: "130/90",
      pr: "85",
      rr: "22",
      temp: "36.7",
      fht: "145",
    },
    {
      hour: "11:00",
      bp: "130/90",
      pr: "88",
      rr: "22",
      temp: "36.8",
      fht: "148",
    },
  ],
  midwifeName: "Maria Midwife",
  nurseName: "Nora Nurse",
  monStaffName: "Staff Sarah",
};

export async function generateLaborPDF(data: LaborRecord = mockLaborData) {
  try {
    // Load the template
    const existingPdfBytes = await fetch("/template1.pdf").then((res) => {
      if (!res.ok) throw new Error("Failed to load template1.pdf");
      return res.arrayBuffer();
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    console.log('--- Generating Labor PDF ---');
    console.log('Data received:', JSON.stringify(data, null, 2));

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
            console.warn(
              `Field '${fieldName}' not found or could not be checked.`,
            );
          }
        }
      }
    };

    // --- MAPPING FIELDS ---

    // Header/Profile
    setField("admit_date", data.admitDate);
    setField("admit_time", data.admitTime);
    setField("patient_name", data.patientName);
    setField("patient_address", data.patientAddress);
    setField("husband_name", data.husbandName);

    // History
    setField("lmp_date", data.lmpDate);
    setField("case_number", data.caseNumber);
    setField("discharge_time", data.dischargeTime);
    setCheck("philhealth_yes", data.isPhilHealth);
    setCheck("philhealth_no", data.isNonPhilHealth);
    setField("aog_weeks", data.aogWeeks);
    setField("gravida", data.gravida);
    setField("para", data.para);
    setField("abortion", data.abortion);
    setField("death", data.deathCount);

    // OB History Table (Loop 5 rows)
    data.obHistory.forEach((item, index) => {
      const row = index + 1;
      if (row > 5) return;
      setField(`hist_r${row}_year`, item.year);
      setField(`hist_r${row}_place`, item.place);
      setField(`hist_r${row}_aog`, item.aog);
      setField(`hist_r${row}_wt`, item.weight);
      setField(`hist_r${row}_manner`, item.manner);
      setField(`hist_r${row}_rem`, item.remarks);
    });

    // Part III: Ultrasound & Lab Report
    // Ultrasound
    setField("lab_utz_norm", data.labUtzNorm);
    setField("lab_utz_norm1", data.labUtzNorm1);
    setField("lab_utz_abn", data.labUtzAbn);
    setField("lab_utz_abn1", data.labUtzAbn1);
    setField("lab_utz_abn2", data.labUtzAbn2);

    // CBC
    setField("lab_cbc_norm", data.labCbcNorm);
    setField("lab_cbc_norm1", data.labCbcNorm1);
    setField("lab_cbc_abn", data.labCbcAbn);
    setField("lab_cbc_abn1", data.labCbcAbn1);
    setField("lab_cbc_abn2", data.labCbcAbn2);

    // Urinalysis
    setField("lab_uri_norm", data.labUriNorm);
    setField("lab_uri_norm1", data.labUriNorm1);
    setField("lab_uri_abn", data.labUriAbn);
    setField("lab_uri_abn1", data.labUriAbn1);
    setField("lab_uri_abn2", data.labUriAbn2);

    // Hepatitis B
    setField("lab_hepb_norm", data.labHepbNorm);
    setField("lab_hepb_norm1", data.labHepbNorm1);
    setField("lab_hepb_abn", data.labHepbAbn);
    setField("lab_hepb_abn1", data.labHepbAbn1);
    setField("lab_hepb_abn2", data.labHepbAbn2);

    // Physical Assessment
    setField("phy_bp", data.phyBp);
    setField("phy_pr", data.phyPr);
    setField("phy_rr", data.phyRr);
    setField("phy_temp", data.phyTemp);
    setField("phy_weight", data.phyWeight);
    setField("phy_ht", data.phyHt);
    setField("phy_fr", data.phyFr);
    setField("phy_fht", data.phyFht);
    setField("phy_uc", data.phyUc);
    setField("ie_dilatation", data.ieDilatation);

    // Physical Checkboxes
    // setCheck("phy_heent_norm", data.phyHeentNorm); // Field not found in PDF
    setCheck("phy_chest_norm", data.phyChestNorm);
    setCheck("phy_ext_norm", data.phyExtNorm);
    setCheck("bow_intact", data.bowIntact);
    setCheck("bow_ruptured", data.bowRuptured);

    // Delivery Table (The 4 Stages)
    setField("labor_onset_time", data.laborOnset.time);
    setField("labor_onset_stage", data.laborOnset.stage);
    setField("labor_onset_dur", data.laborOnset.duration);

    setField("labor_cervix_time", data.laborCervix.time);
    setField("labor_cervix_stage", data.laborCervix.stage);
    setField("labor_cervix_dur", data.laborCervix.duration);

    setField("labor_baby_time", data.laborBaby.time);
    setField("labor_baby_stage", data.laborBaby.stage);
    setField("labor_baby_dur", data.laborBaby.duration);

    setField("labor_placenta_time", data.laborPlacenta.time);
    setField("labor_placenta_stage", data.laborPlacenta.stage);
    setField("labor_placenta_dur", data.laborPlacenta.duration);

    // Delivery Details
    setField("del_patient_name", data.delPatientName);
    setField("del_case_number", data.delCaseNumber);
    setField("del_ph_id", data.delPhId);
    setCheck("epis_median", data.episMedian);
    setCheck("cond_awake", data.condAwake);
    setCheck("ut_contracted", data.utContracted);

    // Vitals Monitor (Loop 4 rows)
    data.vitalsMonitor.forEach((item, index) => {
      const row = index + 1;
      if (row > 4) return;
      setField(`mon_r${row}_hour`, item.hour);
      setField(`mon_r${row}_bp`, item.bp);
      setField(`mon_r${row}_pr`, item.pr);
      setField(`mon_r${row}_rr`, item.rr);
      // setField(`mon_r${row}_temp`, item.temp); // Field not found
      // setField(`mon_r${row}_fht`, item.fht); // Field not found
    });

    setField("midwife_name", data.midwifeName);
    setField("nurse_name", data.nurseName);
    setField("mon_staff_name", data.monStaffName);

    // Serialize
    const pdfBytes = await pdfDoc.save();

    // Trigger Download
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Labor_Record_${data.patientName.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Error generating Labor PDF:", error);
    alert(
      "Failed to generate Labor PDF. Please check the console for details.",
    );
  }
}
