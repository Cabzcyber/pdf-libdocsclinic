const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function checkFields() {
  try {
    console.log('Reading PDF...');
    const pdfBytes = fs.readFileSync('public/template.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields().map(f => f.getName());
    
    console.log(`Found ${fields.length} fields.`);
    console.log('Fields list:');
    fields.forEach(f => console.log(`- "${f}"`));
    
    const expectedFields = [
      'case_number_box', 'last_name_box', 'first_name_box', 'middle_name_box', 
      'address_box', 'age_box', 'civil_status_box', 'occupation_box', 
      'contact_number_box', 'lmp_box', 'edd_box', 'gravida_box', 'para_box', 
      'bp_box', 'weight_box'
    ];
    
    const missing = expectedFields.filter(f => !fields.includes(f));
    if (missing.length > 0) {
      console.log('MISSING FIELDS:');
      missing.forEach(f => console.log(`- ${f}`));
    } else {
      console.log('SUCCESS: All expected fields are present.');
    }
  } catch (e) {
    console.error('Error reading PDF:', e);
  }
}

checkFields();
