import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import liquidGlass from '../utils/liquid-glass';
import styles from './Home.module.css';

function GlassCard({ to, icon, title, desc, cta }) {
  const ref = useRef(null);

  useEffect(() => {
    const glass = liquidGlass(ref.current, { scale: -150, chroma: 8, blur: 4 });
    return () => glass.destroy();
  }, []);

  return (
    <Link to={to} className={styles.card} ref={ref}>
      <span className={styles.cardIcon}>{icon}</span>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDesc}>{desc}</p>
      <span className={styles.cardCta}>{cta}</span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay}>
        <div className={styles.home}>
          <section className={styles.hero}>
            <h1 className={styles.title}>Create your cover page in seconds</h1>
            <p className={styles.subtitle}>
              Generate professional assignment and lab report cover pages for your university.
              Pick a design, fill in your details, and download as PDF or PNG.
            </p>
          </section>

          <section className={styles.cards}>
            <GlassCard 
              to="/create/assignment"
              icon="📄"
              title="Assignment Cover Page"
              desc="Course title, topic name, and submission details for your assignment cover."
              cta="Create Assignment →"
            />

            <GlassCard 
              to="/create/lab-report"
              icon="🔬"
              title="Lab Report Cover Page"
              desc="Experiment details, course info, and submission blocks for lab reports."
              cta="Create Lab Report →"
            />
          </section>

          <footer className={styles.footer}>
            <p>
              <strong>Privacy:</strong> All form data stays in your browser. Nothing is sent to any server.
              Your entries are autosaved locally so you can pick up where you left off.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
