import styles from './FormFields.module.css';

export default function FieldLineControls({ fieldId, lineCount = 0, onChange }) {
  return (
    <div className={styles.lineControls} aria-label={`Extra lines for ${fieldId}`}>
      <button
        type="button"
        className={styles.lineBtn}
        onClick={() => onChange(lineCount - 1)}
        disabled={lineCount <= 0}
        title="Remove blank line"
      >
        -
      </button>
      <span className={styles.lineCount}>{lineCount}</span>
      <button
        type="button"
        className={styles.lineBtn}
        onClick={() => onChange(lineCount + 1)}
        disabled={lineCount >= 3}
        title="Add blank line"
      >
        +
      </button>
    </div>
  );
}
