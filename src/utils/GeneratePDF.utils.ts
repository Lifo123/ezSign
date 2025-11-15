import { $files } from "@Stores/File.store";
import { $appInterface } from "@Stores/AppInterface.store";
import { PDFDocument, PageSizes } from "pdf-lib"; // Importa PageSizes

export async function generatePDF() {
    const { pdf } = $appInterface.get() as any;
    const { originalFile } = $files.get();

    if (!pdf || !originalFile) {
        console.error("Faltan coordenadas o el archivo original");
        return;
    }

    const firmaBytes = await fetch('images/firma_001.jpg').then((res) => res.arrayBuffer());
    const originalFileBytes = await originalFile.arrayBuffer();

    const pdfDoc = await PDFDocument.load(originalFileBytes);

    const firmaImage = await pdfDoc.embedJpg(firmaBytes);

    const factor = 0.75;
    const pdf_x = pdf?.x * factor;
    const pdf_y = pdf?.y * factor;
    const pdf_width = firmaImage.width * factor;
    const pdf_height = firmaImage.height * factor;

    const pages = pdfDoc.getPages();

    for (const page of pages) {
        const { height } = page.getSize();

        page.drawImage(firmaImage, {
            x: pdf_x,
            y: (height - pdf_y) - pdf_height,
            width: pdf_width,
            height: pdf_height,
            blendMode: 'Multiply' as any,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const pdfFile = new File([new Uint8Array(pdfBytes)], originalFile.name, { type: "application/pdf" });

    $files.setKey('processedFile', pdfFile);
    $appInterface.setKey('visor.isImgVisible', false)
}