import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import pdfFile from "@/assets/TDC.pdf";


export async function modifyPdf(name:string, date:string, courseName: string) {
    console.log("Clicked");
    const existingPdfBytes = await fetch(pdfFile).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width,height } = firstPage.getSize();
    const nameFont = 35;
    const midTextFont = 20;
    const lastTextFont = 20;
    const nameText = `${name}`;
    const midText = `For successfully completing the ${courseName}`
    const lastText = `course on ${date}`
    const nameTextWidth = helveticaFont.widthOfTextAtSize(nameText, nameFont);
    const midTextWidth = helveticaFont.widthOfTextAtSize(midText, midTextFont);
    const lastTextWidth = helveticaFont.widthOfTextAtSize(lastText, lastTextFont);
    firstPage.drawText(name, {
      x: (width - nameTextWidth) / 1.9,
      y: height/1.55,
      size: 30,
      font: helveticaFont,
      color: rgb(0.9, 0.5, 0.2),
    });
    firstPage.drawText(`For successfully completing the ${courseName}`, {
      x: (width - midTextWidth) / 2,
      y: height/1.7,
      size: 20,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    firstPage.drawText(`course on ${date}`, {
      x: (width - lastTextWidth) / 2,
      y: height/1.9,
      size: 20,
      font: helveticaFont,
      color: rgb(0,0,0),
    });
    const pdfBytes = await pdfDoc.save();
    const dataUri = await createDataUri(pdfBytes);
    console.log (dataUri);
    return (dataUri);
  }

  async function createDataUri(pdfBytes: Uint8Array): Promise<string> {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }