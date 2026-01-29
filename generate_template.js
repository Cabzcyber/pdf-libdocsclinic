const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');

async function createTemplate() {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const form = pdfDoc.getForm();

    page.drawText('Patient Record Form', { x: 50, y: 750, size: 20, font });

    const fields = [
      { name: 'case_number_box', label: 'Case No:', x: 50, y: 700, w: 100 },
      { name: 'last_name_box', label: 'Last Name:', x: 200, y: 700, w: 150 },
      { name: 'first_name_box', label: 'First Name:', x: 50, y: 650, w: 150 },
      { name: 'middle_name_box', label: 'Middle Name:', x: 250, y: 650, w: 100 },
      { name: 'age_box', label: 'Age:', x: 400, y: 650, w: 50 },
      
      { name: 'address_box', label: 'Address:', x: 50, y: 600, w: 300 },
      { name: 'contact_number_box', label: 'Contact:', x: 400, y: 600, w: 100 },
      
      { name: 'civil_status_box', label: 'Civil Status:', x: 50, y: 550, w: 100 },
      { name: 'occupation_box', label: 'Occupation:', x: 200, y: 550, w: 150 },
      
      { name: 'lmp_box', label: 'LMP:', x: 50, y: 500, w: 100 },
      { name: 'edd_box', label: 'EDD:', x: 200, y: 500, w: 100 },
      
      { name: 'gravida_box', label: 'Gravida:', x: 50, y: 450, w: 50 },
      { name: 'para_box', label: 'Para:', x: 150, y: 450, w: 50 },
      
      { name: 'bp_box', label: 'BP:', x: 50, y: 400, w: 100 },
      { name: 'weight_box', label: 'Weight:', x: 200, y: 400, w: 100 },
    ];

    fields.forEach(f => {
      page.drawText(f.label, { x: f.x, y: f.y + 15, size: 10, font });
      const textField = form.createTextField(f.name);
      textField.setText('');
      textField.addToPage(page, { x: f.x, y: f.y, width: f.w, height: 20 });
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('public/template.pdf', pdfBytes);
    console.log('Template created successfully at public/template.pdf');
  } catch (err) {
    console.error('Error creating template:', err);
  }
}

createTemplate();
