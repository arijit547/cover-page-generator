import { useState } from 'react';
import { exportToPdf, waitForImages } from '../utils/exportPdf';
import { exportToPng } from '../utils/exportImage';
import GlassButton from './GlassButton';
import styles from './ExportButtons.module.css';

export default function ExportButtons({
  coverType,
  universityId,
  designId,
  disabled,
}) {
  const [status, setStatus] = useState(null);

  const baseName = `${coverType}-cover-${universityId}-${designId}`;

  async function handleExport(type) {
    const element = document.getElementById('cover-preview');
    if (!element) return;

    setStatus('Preparing…');
    try {
      await waitForImages(element);
      if (type === 'pdf') {
        await exportToPdf(element, `${baseName}.pdf`);
      } else {
        await exportToPng(element, `${baseName}.png`);
      }
      setStatus('Downloaded!');
      setTimeout(() => setStatus(null), 2000);
    } catch {
      setStatus('Export failed');
      setTimeout(() => setStatus(null), 3000);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <GlassButton
          className={styles.btnPrimary}
          disabled={!!status}
          onClick={() => handleExport('pdf')}
        >
          Download PDF
        </GlassButton>
        <GlassButton
          className={styles.btnSecondary}
          disabled={disabled || !!status}
          onClick={() => handleExport('png')}
        >
          Download PNG
        </GlassButton>
      </div>
      {disabled && (
        <p className={styles.hint}>Fill in course title and student name to enable PNG export.</p>
      )}
      {status && <p className={styles.status}>{status}</p>}
    </div>
  );
}
