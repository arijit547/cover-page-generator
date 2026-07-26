import { designs } from '../data/designs';
import styles from './DesignPicker.module.css';

export default function DesignPicker({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>Design Template</span>
      <div className={styles.grid}>
        {designs.map((design) => (
          <button
            key={design.id}
            type="button"
            className={`${styles.option} ${value === design.id ? styles.selected : ''}`}
            onClick={() => onChange(design.id)}
          >
            <span className={styles.name}>{design.name}</span>
            <span className={styles.desc}>{design.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
