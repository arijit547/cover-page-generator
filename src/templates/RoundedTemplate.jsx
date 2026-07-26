import { useRef, useState } from 'react';
import { formatSubmissionDate } from '../utils/formatDate';
import styles from './RoundedTemplate.module.css';

function ExtraBlankLines({ count = 0 }) {
  return Array.from({ length: count }, (_, index) => (
    <span key={index} className={styles.blankLine} aria-hidden="true" />
  ));
}

function FieldLine({ id, label, value, placeholder, lineCount = 0, isDraggable, onDragStart, onDragOver, onDrop }) {
  const display = value?.trim() || placeholder;
  const isPlaceholder = !value?.trim();
  return (
    <>
      <p 
        className={`${styles.line} ${isDraggable ? styles.draggable : ''}`}
        draggable={isDraggable}
        onDragStart={isDraggable ? (e) => onDragStart(e, id) : undefined}
        onDragOver={isDraggable ? onDragOver : undefined}
        onDrop={isDraggable ? (e) => onDrop(e, id) : undefined}
      >
        <strong>{label}:</strong>{' '}
        <span className={isPlaceholder ? styles.placeholder : undefined} data-export-placeholder={isPlaceholder || undefined}>{display}</span>
      </p>
      <ExtraBlankLines count={lineCount} />
    </>
  );
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
        <span className={styles.label}>{label}:</span>{' '}
        <span className={isPlaceholder ? styles.placeholder : styles.value} data-export-placeholder={isPlaceholder || undefined}>
          {display}
        </span>
      </p>
      <ExtraBlankLines count={lineCount} />
    </>
  );
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const MAX_ROUNDED_BOX_WIDTH = 124;

export default function RoundedTemplate({ university, formData, coverType, updateField, reorderField }) {
  const title = coverType === 'assignment' ? 'Assignment' : 'Lab Report';
  const [draggedItem, setDraggedItem] = useState(null);
  const submissionBoxRef = useRef(null);

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

  const handleBoxResizeStart = (event) => {
    if (!updateField || !submissionBoxRef.current) return;

    event.preventDefault();
    event.stopPropagation();

    const box = submissionBoxRef.current;
    const parent = box.parentElement;
    const startX = event.clientX;
    const startY = event.clientY;
    const startWidth = box.offsetWidth;
    const startHeight = box.offsetHeight;
    const startRect = box.getBoundingClientRect();
    const scaleX = startRect.width / startWidth || 1;
    const scaleY = startRect.height / startHeight || 1;
    const parentStyle = parent ? getComputedStyle(parent) : null;
    const parentPaddingX = (parseFloat(parentStyle?.paddingLeft) || 0) + (parseFloat(parentStyle?.paddingRight) || 0);
    const parentFullWidth = parent?.clientWidth || startWidth;
    const parentContentWidth = parentFullWidth - parentPaddingX || startWidth;
    const minWidth = Math.min(parentContentWidth, 360);
    const maxWidth = parentFullWidth;

    const handlePointerMove = (moveEvent) => {
      const nextWidthPx = clamp(startWidth + (moveEvent.clientX - startX) / scaleX, minWidth, maxWidth);
      const nextHeight = clamp(startHeight + (moveEvent.clientY - startY) / scaleY, 180, 520);

      updateField('roundedBoxWidth', Math.round((nextWidthPx / parentContentWidth) * 100));
      updateField('roundedBoxHeight', Math.round(nextHeight));
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const getCourseFieldProps = (id) => {
    if (id === 'courseTitle') return { label: 'Course Title', value: formData.courseTitle, placeholder: 'Course title' };
    if (id === 'courseCode') return { label: 'Course Code', value: formData.courseCode, placeholder: 'Course code' };
    if (id === 'topicName') return { label: 'Topic Name', value: formData.topicName, placeholder: 'Topic name' };
    if (id === 'experimentNo') return { label: 'Experiment No.', value: formData.experimentNo, placeholder: 'Experiment no.' };
    if (id === 'experimentName') return { label: 'Experiment Name', value: formData.experimentName, placeholder: 'Experiment name' };
    if (id === 'submissionDate') return { label: 'Submission Date', value: formatSubmissionDate(formData.submissionDate), placeholder: 'Date' };

    const custom = formData.customCourseDetails?.find(f => f.id === id);
    if (custom) return { label: custom.label || 'Custom Field', value: custom.value, placeholder: '' };

    return null;
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
  const courseDetailsOrder = formData.courseDetailsOrder || [];
  const roundedBoxWidth = clamp(Number(formData.roundedBoxWidth) || 100, 55, MAX_ROUNDED_BOX_WIDTH);
  const roundedBoxHeight = clamp(Number(formData.roundedBoxHeight) || 250, 180, 520);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img
          src={university.logoUrl}
          alt={`${university.shortName} logo`}
          className={styles.logo}
          crossOrigin="anonymous"
        />
        <h1 className={styles.universityName}>{university.name}</h1>
        
        <div className={styles.titlePill}>{title}</div>
      </div>

      <div className={styles.courseBlock}>
        {courseDetailsOrder.map((id) => {
          const props = getCourseFieldProps(id);
          if (!props) return null;
          return (
            <FieldLine 
              key={id} 
              id={id}
              {...props}
              lineCount={formData.fieldLineCounts?.[id] || 0}
              isDraggable={!!reorderField}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, id, 'courseDetails')}
            />
          );
        })}
      </div>

      <div
        ref={submissionBoxRef}
        className={styles.submissionBox}
        style={{
          width: `${roundedBoxWidth}%`,
          minHeight: `${roundedBoxHeight}px`,
        }}
      >
        <div className={styles.colLeft}>
          <h3 className={styles.colTitle}>Submitted by</h3>
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
        </div>
        
        <div className={styles.colRight}>
          <h3 className={styles.colTitle}>Submitted to</h3>
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
        </div>
        {updateField && (
          <button
            type="button"
            className={styles.resizeHandle}
            onPointerDown={handleBoxResizeStart}
            title="Resize box"
            aria-label="Resize submitted by and submitted to box"
            data-html2canvas-ignore="true"
          />
        )}
      </div>
    </div>
  );
}
