import { getDesignById } from '../data/designs';
import styles from './CoverPreview.module.css';

export default function CoverPreview({ university, formData, coverType, updateField, reorderField }) {
  const design = getDesignById(formData.designId);
  const Template = design.component;
  const logoScale = Math.min(Math.max(Number(formData.logoScale) || 1.1, 0.8), 1.45);

  const cssVars = {
    '--uni-primary': university.colors.primary,
    '--uni-accent': university.colors.accent,
    '--uni-text': university.colors.text,
    '--logo-size-classic': `${Math.round(90 * logoScale)}px`,
    '--logo-size-modern': `${Math.round(72 * logoScale)}px`,
    '--logo-size-bordered-seal': `${Math.round(100 * logoScale)}px`,
    '--logo-size-bordered-logo': `${Math.round(80 * logoScale)}px`,
    '--logo-size-rounded': `${Math.round(80 * logoScale)}px`,
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.hint}>Live preview — A4 (210 × 297 mm)</p>
      <div className={styles.scaleContainer}>
        <div
          id="cover-preview"
          className={styles.preview}
          style={cssVars}
        >
          <Template
            university={university}
            formData={formData}
            coverType={coverType}
            updateField={updateField}
            reorderField={reorderField}
          />
        </div>
      </div>
    </div>
  );
}
