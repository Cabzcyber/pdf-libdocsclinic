const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function listFields() {
  try {
    const pdfPath = path.join(__dirname, '../public/template.pdf');
    console.log('Reading PDF from:', pdfPath);
    
    if (!fs.existsSync(pdfPath)) {
      console.error('File not found:', pdfPath);
      return;
    }

    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    console.log('--- PDF Fields ---');
    fields.forEach(field => {
      console.log(`Name: ${field.getName()}, Type: ${field.constructor.name}`);
    });
    console.log('------------------');

  } catch (error) {
    console.error('Error listing fields:', error);
  }
}

listFields();
