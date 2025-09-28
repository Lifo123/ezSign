import { $file } from "@Stores/FileStore";
import { $visor } from "@Stores/Visor.Store";
import { PDFDocument } from "pdf-lib";

export async function generatePDF() {
    const file = $file.get().file
    const VISOR = $visor.get()

    const doc = await file?.arrayBuffer()
    const firmaBytes = await fetch('images/firma_001.jpg').then((res) => res.arrayBuffer())

    if (!doc) return;

    const pdfDoc = await PDFDocument.load(doc);

    const firmaImage = await pdfDoc.embedJpg(firmaBytes)
    const firmaDims = firmaImage.scale(VISOR.general.scale)

    
    for (let i = 0; i < VISOR.numPages; i++) {
        const page = pdfDoc.getPage(i);

        page.drawImage(firmaImage, {
            x: ((VISOR.general.x / 100) * page.getWidth()) ,
            y: ((VISOR.general.y / 100) * page.getHeight()) ,
            width: firmaDims.width,
            height: firmaDims.height,
            blendMode: VISOR.general.blendMode, //ITS OK DONT CHANGE
        });
        
    }

    const pdfBytes = await pdfDoc.save();
    const pdfFile = new File([new Uint8Array(pdfBytes)], file!.name, { type: "application/pdf" });
    $file.setKey('file', pdfFile)


}