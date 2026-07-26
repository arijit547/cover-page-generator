import { useRef, useEffect } from 'react';
import liquidGlass from '../utils/liquid-glass';

export default function GlassButton({ children, className, style, onClick, disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!disabled && ref.current) {
      const glass = liquidGlass(ref.current, { scale: -112, chroma: 6, radius: 8 });
      return () => glass.destroy();
    }
  }, [disabled]);

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
