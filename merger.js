const PDFMerger = require("pdf-merger-js");
const path = require("path");
var merger = new PDFMerger();

const mergePDF = async (pdf1, pdf2) => {
  await merger.add(pdf1); //merge all pages. parameter is the path to file and filename.
  await merger.add(pdf2);
  //   await merger.add("pdf2.pdf", 2); // merge only page 2
  //   await merger.add("pdf2.pdf", [1, 3]); // merge the pages 1 and 3
  //   await merger.add("pdf2.pdf", "4, 7, 8"); // merge the pages 4, 7 and 8
  //   await merger.add("pdf3.pdf", "3 to 5"); //merge pages 3 to 5 (3,4,5)
  //   await merger.add("pdf3.pdf", "3-5"); //merge pages 3 to 5 (3,4,5)
  let date = Date.now();
  location = `./static/mergedPdf/merged${date}.pdf`;
  await merger.save(path.join(__dirname, `${location}`)); //save under given name and reset the internal document
  return location;
};

module.exports = { mergePDF };
// mergePDF();
