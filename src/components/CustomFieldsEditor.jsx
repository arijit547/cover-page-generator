import GlassButton from './GlassButton';
import FieldLineControls from './FieldLineControls';
import styles from './FormFields.module.css';

export default function CustomFieldsEditor({
  fields,
  section,
  addCustomField,
  updateCustomField,
  removeCustomField,
  fieldLineCounts = {},
  setFieldLineCount,
}) {
  return (
    <div className={styles.customFields}>
      {fields.map((field) => (
        <div key={field.id} className={styles.customFieldRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Label (e.g. Co-Teacher)"
            value={field.label}
            onChange={(e) => updateCustomField(section, field.id, 'label', e.target.value)}
          />
          <input
            type="text"
            className={styles.input}
            placeholder="Value"
            value={field.value}
            onChange={(e) => updateCustomField(section, field.id, 'value', e.target.value)}
          />
          {setFieldLineCount && (
            <FieldLineControls
              fieldId={field.id}
              lineCount={fieldLineCounts[field.id] || 0}
              onChange={(lineCount) => setFieldLineCount(field.id, lineCount)}
            />
          )}
          <button
            type="button"
            className={styles.removeBtn}
            onClick={() => removeCustomField(section, field.id)}
            title="Remove field"
          >
            ×
          </button>
        </div>
      ))}
      <GlassButton
        className={styles.addBtn}
        onClick={() => addCustomField(section)}
      >
        + Add custom field
      </GlassButton>
    </div>
  );
}
