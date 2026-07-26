import styles from './FormFields.module.css';
import CustomFieldsEditor from './CustomFieldsEditor';
import FieldLineControls from './FieldLineControls';

function Field({ label, id, value, onChange, type = 'text', onRemove, lineCount = 0, onLineCountChange }) {
  return (
    <div className={styles.field}>
      <div className={styles.fieldHeader}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <div className={styles.fieldActions}>
          <FieldLineControls fieldId={id} lineCount={lineCount} onChange={onLineCountChange} />
          {onRemove && (
            <button type="button" onClick={onRemove} className={styles.removeBtn} aria-label="Remove field" title="Remove field">
              &times;
            </button>
          )}
        </div>
      </div>
      <input
        id={id}
        type={type}
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>{title}</legend>
      {children}
    </fieldset>
  );
}

export default function FormAssignment({ 
  formData, 
  updateField, 
  addCustomField, 
  updateCustomField, 
  removeCustomField,
  removeStandardField,
  setFieldLineCount
}) {
  const courseDetailsOrder = formData.courseDetailsOrder || [];
  const submittedToOrder = formData.submittedToOrder || [];
  const submittedByOrder = formData.submittedByOrder || [];
  const fieldLineCounts = formData.fieldLineCounts || {};

  const getLineProps = (id) => ({
    lineCount: fieldLineCounts[id] || 0,
    onLineCountChange: (lineCount) => setFieldLineCount(id, lineCount),
  });

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Section title="Course Details">
        {courseDetailsOrder.includes('courseTitle') && (
          <Field
            label="Course Title"
            id="courseTitle"
            value={formData.courseTitle}
            onChange={(v) => updateField('courseTitle', v)}
            onRemove={() => removeStandardField('courseDetailsOrder', 'courseTitle')}
            {...getLineProps('courseTitle')}
          />
        )}
        {courseDetailsOrder.includes('courseCode') && (
          <Field
            label="Course Code"
            id="courseCode"
            value={formData.courseCode}
            onChange={(v) => updateField('courseCode', v)}
            onRemove={() => removeStandardField('courseDetailsOrder', 'courseCode')}
            {...getLineProps('courseCode')}
          />
        )}
        {courseDetailsOrder.includes('topicName') && (
          <Field
            label="Topic Name"
            id="topicName"
            value={formData.topicName}
            onChange={(v) => updateField('topicName', v)}
            onRemove={() => removeStandardField('courseDetailsOrder', 'topicName')}
            {...getLineProps('topicName')}
          />
        )}
        {courseDetailsOrder.includes('submissionDate') && (
          <Field
            label="Submission Date"
            id="submissionDate"
            type="date"
            value={formData.submissionDate}
            onChange={(v) => updateField('submissionDate', v)}
            onRemove={() => removeStandardField('courseDetailsOrder', 'submissionDate')}
            {...getLineProps('submissionDate')}
          />
        )}
        <CustomFieldsEditor 
          fields={formData.customCourseDetails || []} 
          section="customCourseDetails"
          addCustomField={addCustomField}
          updateCustomField={updateCustomField}
          removeCustomField={removeCustomField}
          fieldLineCounts={fieldLineCounts}
          setFieldLineCount={setFieldLineCount}
        />
      </Section>

      <Section title="Submitted To">
        {submittedToOrder.includes('teacherName') && (
          <Field
            label="Teacher's Name"
            id="teacherName"
            value={formData.teacherName}
            onChange={(v) => updateField('teacherName', v)}
            onRemove={() => removeStandardField('submittedToOrder', 'teacherName')}
            {...getLineProps('teacherName')}
          />
        )}
        {submittedToOrder.includes('designation') && (
          <Field
            label="Designation"
            id="designation"
            value={formData.designation}
            onChange={(v) => updateField('designation', v)}
            onRemove={() => removeStandardField('submittedToOrder', 'designation')}
            {...getLineProps('designation')}
          />
        )}
        {submittedToOrder.includes('teacherDepartment') && (
          <Field
            label="Department"
            id="teacherDepartment"
            value={formData.teacherDepartment}
            onChange={(v) => updateField('teacherDepartment', v)}
            onRemove={() => removeStandardField('submittedToOrder', 'teacherDepartment')}
            {...getLineProps('teacherDepartment')}
          />
        )}
        {submittedToOrder.includes('teacherUniversity') && (
          <Field
            label="University"
            id="teacherUniversity"
            value={formData.teacherUniversity}
            onChange={(v) => updateField('teacherUniversity', v)}
            onRemove={() => removeStandardField('submittedToOrder', 'teacherUniversity')}
            {...getLineProps('teacherUniversity')}
          />
        )}
        <CustomFieldsEditor 
          fields={formData.customSubmittedTo || []} 
          section="customSubmittedTo"
          addCustomField={addCustomField}
          updateCustomField={updateCustomField}
          removeCustomField={removeCustomField}
          fieldLineCounts={fieldLineCounts}
          setFieldLineCount={setFieldLineCount}
        />
      </Section>

      <Section title="Submitted By">
        {submittedByOrder.includes('studentName') && (
          <Field
            label="Student's Name"
            id="studentName"
            value={formData.studentName}
            onChange={(v) => updateField('studentName', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'studentName')}
            {...getLineProps('studentName')}
          />
        )}
        {submittedByOrder.includes('studentId') && (
          <Field
            label="Student ID"
            id="studentId"
            value={formData.studentId}
            onChange={(v) => updateField('studentId', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'studentId')}
            {...getLineProps('studentId')}
          />
        )}
        {submittedByOrder.includes('section') && (
          <Field
            label="Section"
            id="section"
            value={formData.section}
            onChange={(v) => updateField('section', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'section')}
            {...getLineProps('section')}
          />
        )}
        {submittedByOrder.includes('semester') && (
          <Field
            label="Semester"
            id="semester"
            value={formData.semester}
            onChange={(v) => updateField('semester', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'semester')}
            {...getLineProps('semester')}
          />
        )}
        {submittedByOrder.includes('studentDepartment') && (
          <Field
            label="Department"
            id="studentDepartment"
            value={formData.studentDepartment}
            onChange={(v) => updateField('studentDepartment', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'studentDepartment')}
            {...getLineProps('studentDepartment')}
          />
        )}
        {submittedByOrder.includes('studentUniversity') && (
          <Field
            label="University"
            id="studentUniversity"
            value={formData.studentUniversity}
            onChange={(v) => updateField('studentUniversity', v)}
            onRemove={() => removeStandardField('submittedByOrder', 'studentUniversity')}
            {...getLineProps('studentUniversity')}
          />
        )}
        <CustomFieldsEditor 
          fields={formData.customSubmittedBy || []} 
          section="customSubmittedBy"
          addCustomField={addCustomField}
          updateCustomField={updateCustomField}
          removeCustomField={removeCustomField}
          fieldLineCounts={fieldLineCounts}
          setFieldLineCount={setFieldLineCount}
        />
      </Section>
    </form>
  );
}
