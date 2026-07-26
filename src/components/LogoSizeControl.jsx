import styles from './LogoSizeControl.module.css';

export default function LogoSizeControl({ value, onChange }) {
  const scale = Number.isFinite(Number(value)) ? Number(value) : 1.1;
  const percent = Math.round(scale * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <label htmlFor="logo-size" className={styles.label}>
          Logo Size
        </label>
        <span className={styles.value}>{percent}%</span>
      </div>
      <input
        id="logo-size"
        className={styles.range}
        type="range"
        min="0.8"
        max="1.45"
        step="0.05"
        value={scale}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}
