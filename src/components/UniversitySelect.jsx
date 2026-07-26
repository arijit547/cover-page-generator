import { universities } from '../data/universities';
import styles from './UniversitySelect.module.css';

export default function UniversitySelect({ value, onChange }) {
  return (
    <div className={styles.field}>
      <label htmlFor="university" className={styles.label}>
        University
      </label>
      <select
        id="university"
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {universities.map((uni) => (
          <option key={uni.id} value={uni.id}>
            {uni.name}
          </option>
        ))}
      </select>
    </div>
  );
}
