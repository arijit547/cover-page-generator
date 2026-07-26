import React, { useRef, useEffect } from 'react';
import UniversitySelect from '../components/UniversitySelect';
import DesignPicker from '../components/DesignPicker';
import LogoSizeControl from '../components/LogoSizeControl';
import FormAssignment from '../components/FormAssignment';
import CoverPreview from '../components/CoverPreview';
import ExportButtons from '../components/ExportButtons';
import GlassButton from '../components/GlassButton';
import { useCoverForm } from '../hooks/useCoverForm';
import liquidGlass from '../utils/liquid-glass';
import styles from './CreatePage.module.css';

export default function AssignmentPage() {
  const {
    formData,
    university,
    updateField,
    setUniversity,
    setDesign,
    isExportReady,
    addCustomField,
    updateCustomField,
    removeCustomField,
    removeStandardField,
    setFieldLineCount,
    resetForm,
    reorderField,
  } = useCoverForm('assignment');

  const asideRef = useRef(null);

  useEffect(() => {
    const glass = liquidGlass(asideRef.current, { scale: -120, blur: 5, saturate: 1.3 });
    return () => glass.destroy();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Assignment Cover Page</h1>
        <p className={styles.subtitle}>Fill in your details and download a ready-to-print cover page.</p>
      </header>

      <div className={styles.layout}>
        <aside className={styles.formPanel} ref={asideRef}>
          <UniversitySelect
            value={formData.universityId}
            onChange={setUniversity}
          />
          <DesignPicker
            value={formData.designId}
            onChange={setDesign}
          />
          <LogoSizeControl
            value={formData.logoScale}
            onChange={(value) => updateField('logoScale', value)}
          />
          <FormAssignment 
            formData={formData} 
            updateField={updateField}
            addCustomField={addCustomField}
            updateCustomField={updateCustomField}
            removeCustomField={removeCustomField}
            removeStandardField={removeStandardField}
            setFieldLineCount={setFieldLineCount}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <ExportButtons
              coverType="assignment"
              universityId={formData.universityId}
              designId={formData.designId}
              disabled={!isExportReady}
            />
            <GlassButton 
              onClick={resetForm}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                color: '#111',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '800',
                border: 'none',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6))',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -8px 20px rgba(255, 255, 255, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.4)'
              }}
            >
              Reset to Defaults
            </GlassButton>
          </div>
        </aside>

        <main className={styles.previewPanel}>
          <CoverPreview
            university={university}
            formData={formData}
            coverType="assignment"
            updateField={updateField}
            reorderField={reorderField}
          />
        </main>
      </div>
    </div>
  );
}
