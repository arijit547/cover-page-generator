import { useState } from 'react';
import styles from './CoverSections.module.css';

function ExtraBlankLines({ count = 0 }) {
  return Array.from({ length: count }, (_, index) => (
    <span key={index} className={styles.blankLine} aria-hidden="true" />
  ));
}

function Field({ id, label, value, placeholder, lineCount = 0, isDraggable, onDragStart, onDragOver, onDrop }) {
  const display = value?.trim() || placeholder;
  const isPlaceholder = !value?.trim();
  
  return (
    <>
      <p 
        className={`${styles.field} ${isDraggable ? styles.draggable : ''}`}
        draggable={isDraggable}
        onDragStart={isDraggable ? (e) => onDragStart(e, id) : undefined}
        onDragOver={isDraggable ? onDragOver : undefined}
        onDrop={isDraggable ? (e) => onDrop(e, id) : undefined}
      >
        <span className={styles.label}>{label}</span>
        <span className={styles.colon}>:</span>
        <span className={isPlaceholder ? styles.placeholder : styles.value} data-export-placeholder={isPlaceholder || undefined}>
          {display}
        </span>
      </p>
      <ExtraBlankLines count={lineCount} />
    </>
  );
}

export default function CoverSections({ formData, reorderField }) {
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId, section) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId && reorderField) {
      reorderField(section, draggedItem, targetId);
    }
    setDraggedItem(null);
  };

  const getFieldProps = (id, isSubmittedTo) => {
    if (id === 'teacherName') return { label: "Teacher's Name", value: formData.teacherName, placeholder: "Teacher's name" };
    if (id === 'designation') return { label: 'Designation', value: formData.designation, placeholder: 'Designation' };
    if (id === 'teacherDepartment') return { label: 'Department', value: formData.teacherDepartment, placeholder: 'Department' };
    if (id === 'teacherUniversity') return { label: 'University', value: formData.teacherUniversity, placeholder: 'University' };
    
    if (id === 'studentName') return { label: "Student's Name", value: formData.studentName, placeholder: "Your name here" };
    if (id === 'studentId') return { label: 'Student ID', value: formData.studentId, placeholder: 'Student ID' };
    if (id === 'section') return { label: 'Section', value: formData.section, placeholder: 'Section' };
    if (id === 'semester') return { label: 'Semester', value: formData.semester, placeholder: 'Semester' };
    if (id === 'studentDepartment') return { label: 'Department', value: formData.studentDepartment, placeholder: 'Department' };
    if (id === 'studentUniversity') return { label: 'University', value: formData.studentUniversity, placeholder: 'University' };
    
    const customFields = isSubmittedTo ? formData.customSubmittedTo : formData.customSubmittedBy;
    const custom = customFields?.find(f => f.id === id);
    if (custom) return { label: custom.label || 'Custom Field', value: custom.value, placeholder: '' };
    
    return null;
  };

  const submittedToOrder = formData.submittedToOrder || ['teacherName', 'designation', 'teacherDepartment', 'teacherUniversity'];
  const submittedByOrder = formData.submittedByOrder || ['studentName', 'studentId', 'section', 'semester', 'studentDepartment', 'studentUniversity'];

  return (
    <div className={styles.sections}>
      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Submitted To</h3>
        {submittedToOrder.map((id) => {
          const props = getFieldProps(id, true);
          if (!props) return null;
          return (
            <Field 
              key={id} 
              id={id}
              {...props}
              lineCount={formData.fieldLineCounts?.[id] || 0}
              isDraggable={!!reorderField}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id, 'submittedTo')}
            />
          );
        })}
      </section>

      <section className={styles.block}>
        <h3 className={styles.blockTitle}>Submitted By</h3>
        {submittedByOrder.map((id) => {
          const props = getFieldProps(id, false);
          if (!props) return null;
          return (
            <Field 
              key={id} 
              id={id}
              {...props}
              lineCount={formData.fieldLineCounts?.[id] || 0}
              isDraggable={!!reorderField}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id, 'submittedBy')}
            />
          );
        })}
      </section>
    </div>
  );
}
