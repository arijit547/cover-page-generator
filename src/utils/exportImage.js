import html2canvas from 'html2canvas';
import { waitForImages } from './exportPdf';

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

export async function exportToPng(element, filename) {
  await waitForImages(element);
  const canvas = await capturePreview(element);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create image'));
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      resolve();
    }, 'image/png');
  });
}
