import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

async function extractTextFromPDF(fileURL) {
    const loadingTask = pdfjs.getDocument(fileURL);
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const allPagesText = [];

    for (let pageIndex = 1; pageIndex <= numPages; pageIndex++) {
        const pdfPage = await pdf.getPage(pageIndex);
        const textContent = await pdfPage.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        allPagesText.push(pageText);
    }

    return allPagesText.join('\n'); // Combine text from all pages with line breaks.
}

export default extractTextFromPDF;
