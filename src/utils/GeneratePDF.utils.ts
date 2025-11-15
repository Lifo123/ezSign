import { $files } from "@Stores/File.store";
import { $appInterface } from "@Stores/AppInterface.store";
import { PDFDocument, PageSizes } from "pdf-lib"; // Importa PageSizes
import { toast } from "@lifo123/library";

export async function generatePDF() {
    const { pdf, asideLeft } = $appInterface.get();
    const { originalFile } = $files.get();

    if (!pdf || !originalFile) {
        toast.error('No file selected or the file is not valid.', { richColors: true });
        return;
    }

    const firmaBytes = await fetch(`${asideLeft?.currentItem?.url}`).then((res) => res.arrayBuffer());
    const originalFileBytes = await originalFile.arrayBuffer();

    const pdfDoc = await PDFDocument.load(originalFileBytes);

    const firmaImage = await pdfDoc.embedJpg(firmaBytes);

    const factor = 0.75;
    const pdf_x = pdf?.x as number * factor;
    const pdf_y = pdf?.y as number * factor;
    const pdf_width = pdf?.width as number * factor;
    const pdf_height = pdf?.height as number * factor;

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
    //$appInterface.setKey('visor.isImgVisible', false)
}