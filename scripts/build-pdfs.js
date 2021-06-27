const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const simpleIcons = require('simple-icons');

// Create a fake CreationDate for PDFs that results in an empty string. This
// prevents changes to the PDF if the corresponding SVG didn't change.
const CreationData = new String('');
CreationData.getTime = () => '';

for (const title in simpleIcons) {
  const icon = simpleIcons.get(title);
  const iconSlug = icon.slug || titleToSlug(icon.title);
  let doc = new PDFDocument({
    size: [24, 24],
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
    info: {
      CreationDate: CreationData,
    },
  });
  let stream = fs.createWriteStream(`./icons/${iconSlug}.pdf`);
  let svg = icon.svg;
  SVGtoPDF(doc, svg, 0, 0);
  doc.pipe(stream);
  doc.end();
}
