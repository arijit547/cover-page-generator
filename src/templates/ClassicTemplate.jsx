import { useState } from 'react';
import CoverSections from './shared/CoverSections';
import { formatSubmissionDate } from '../utils/formatDate';
import styles from './ClassicTemplate.module.css';

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

export default function ClassicTemplate({ university, formData, coverType, reorderField }) {
  const title = coverType === 'assignment' ? 'Assignment' : 'Lab Report';
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId && reorderField) {
      reorderField('courseDetails', draggedItem, targetId);
    }
    setDraggedItem(null);
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

  const courseDetailsOrder = formData.courseDetailsOrder || [];

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
        <div className={styles.divider} />
        <h2 className={styles.title}>{title}</h2>
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
              onDrop={handleDrop}
            />
          );
        })}
      </div>

      <CoverSections formData={formData} reorderField={reorderField} />
    </div>
  );
}
