import path from "path";
import * as fs from "fs"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { uploadBasic } from "./driveConfig";
import 'dotenv/config'


const clientId = "937382554924-m106suu4mufeh4o8apr6ipl88datq21f.apps.googleusercontent.com";;
const clientSecret = "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";
const redirectUri = "https://developers.google.com/oauthplayground"
const refreshToken = "1//04VttoLklnCsbCgYIARAAGAQSNwF-L9Irzs9bwJtUiIF1KrEFAewi6uhjkGVBfcvtkaE7ZjXgH5Q9w8V5Cvubpc4WIrY8G4OMj2c"



export async function modifyPdf(name:string, date:string, courseName: string, email:string) {

    const pdfFile = fs.readFileSync(path.join(__dirname, '../assets/TDC.pdf'));
    const pdfDoc = await PDFDocument.load(pdfFile);
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

    const modifiedPdfBytes = await pdfDoc.save();

    await uploadBasic (name, modifiedPdfBytes, clientId, clientSecret, refreshToken, redirectUri, email);
  }
