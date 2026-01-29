const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createFieldMap() {
  try {
    const pdfBytes = fs.readFileSync('public/template.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    
    fields.forEach(f => {
      const name = f.getName();
      if (f.constructor.name === 'PDFTextField') {
        try {
            // Fill text fields with their own name
            f.setText(name);
            // Make font size small to fit
            f.setFontSize(8); 
        } catch (e) {
            console.log(`Could not set text for ${name}`);
        }
      } else if (f.constructor.name === 'PDFCheckBox') {
          try {
            // Check all checkboxes
            f.check();
          } catch (e) {
              console.log(`Could not check ${name}`);
          }
      }
    });

    const outBytes = await pdfDoc.save();
    fs.writeFileSync('public/field_map.pdf', outBytes);
    console.log('Generated public/field_map.pdf');
  } catch (error) {
    console.error('Error:', error);
  }
}

createFieldMap();
