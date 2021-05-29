const fs = require('fs');

const PDFDocument = require('pdfkit');
const SVGtoPDF = require('svg-to-pdfkit');
const simpleIcons = require('simple-icons');

for (const title in simpleIcons) {
  const icon = simpleIcons.Get(title);
  let doc = new PDFDocument({
    size: [24, 24],
    margins: { top: 0, bottom: 0, left: 0, right: 0 },
  });
  let stream = fs.createWriteStream(`./icons/${icon.slug}.pdf`);
  let svg = icon.svg;
  SVGtoPDF(doc, svg, 0, 0);
  doc.pipe(stream);
  doc.end();
}
