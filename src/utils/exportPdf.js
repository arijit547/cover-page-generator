import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

async function capturePreview(element) {
  return html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    onclone: (documentClone) => {
      documentClone
        .querySelectorAll('[data-export-placeholder="true"]')
        .forEach((placeholder) => {
          placeholder.textContent = '';
        });
    },
  });
}

export async function exportToPdf(element, filename) {
  const canvas = await capturePreview(element);
  const imgData = canvas.toDataURL('image/jpeg', 0.9);

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'MEDIUM');
  pdf.save(filename);
}

export async function waitForImages(element) {
  const images = element.querySelectorAll('img');
  await Promise.all(
    Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    )
  );
}
