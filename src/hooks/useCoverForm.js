import { useCallback, useEffect, useMemo, useState } from 'react';
import { getUniversityById } from '../data/universities';
import { loadFormData, saveFormData } from '../utils/storage';

function createDefaultFormData(university, coverType) {
  const courseDetailsOrder = coverType === 'lab-report'
    ? ['courseTitle', 'courseCode', 'experimentNo', 'experimentName', 'submissionDate']
    : ['courseTitle', 'courseCode', 'topicName', 'submissionDate'];

  return {
    universityId: university.id,
    designId: 'classic',
    logoScale: 1.1,
    roundedBoxWidth: 100,
    roundedBoxHeight: 250,
    fieldLineCounts: {},
    courseTitle: '',
    courseCode: '',
    topicName: '',
    experimentNo: '',
    experimentName: '',
    teacherName: '',
    designation: '',
    teacherDepartment: '',
    teacherUniversity: university.name,
    studentName: '',
    studentId: '',
    section: '',
    semester: '',
    studentDepartment: '',
    studentUniversity: university.name,
    submissionDate: '',
    customSubmittedTo: [],
    customSubmittedBy: [],
    customCourseDetails: [],
    submittedToOrder: ['teacherName', 'designation', 'teacherDepartment', 'teacherUniversity'],
    submittedByOrder: ['studentName', 'studentId', 'section', 'semester', 'studentDepartment', 'studentUniversity'],
    courseDetailsOrder,
  };
}

export function useCoverForm(coverType) {
  const defaultUniversity = getUniversityById('sust');

  const [formData, setFormData] = useState(() => {
    const saved = loadFormData(coverType);
    const defaultData = createDefaultFormData(defaultUniversity, coverType);
    if (saved) {
      const merged = { ...defaultData, ...saved };
      if (!saved.courseDetailsOrder) merged.courseDetailsOrder = defaultData.courseDetailsOrder;
      return merged;
    }
    return defaultData;
  });

  const university = useMemo(
    () => getUniversityById(formData.universityId),
    [formData.universityId]
  );

  useEffect(() => {
    saveFormData(coverType, formData);
  }, [coverType, formData]);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setUniversity = useCallback((universityId) => {
    const uni = getUniversityById(universityId);
    setFormData((prev) => ({
      ...prev,
      universityId,
      teacherUniversity: uni.name,
      studentUniversity: uni.name,
    }));
  }, []);

  const setDesign = useCallback((designId) => {
    setFormData((prev) => ({ ...prev, designId }));
  }, []);

  const resetForm = useCallback(() => {
    const uni = getUniversityById(formData.universityId);
    setFormData(createDefaultFormData(uni, coverType));
  }, [formData.universityId, coverType]);

  const addCustomField = useCallback((section) => {
    const newId = Date.now().toString();
    const orderKey = section === 'customSubmittedTo' ? 'submittedToOrder' : 
                     section === 'customSubmittedBy' ? 'submittedByOrder' : 
                     'courseDetailsOrder';
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: newId, label: '', value: '' }],
      [orderKey]: [...(prev[orderKey] || []), newId],
    }));
  }, []);

  const updateCustomField = useCallback((section, id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const removeCustomField = useCallback((section, id) => {
    const orderKey = section === 'customSubmittedTo' ? 'submittedToOrder' : 
                     section === 'customSubmittedBy' ? 'submittedByOrder' : 
                     'courseDetailsOrder';
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((item) => item.id !== id),
      [orderKey]: (prev[orderKey] || []).filter((itemId) => itemId !== id),
      fieldLineCounts: Object.fromEntries(
        Object.entries(prev.fieldLineCounts || {}).filter(([fieldId]) => fieldId !== id)
      ),
    }));
  }, []);

  const removeStandardField = useCallback((orderKey, id) => {
    setFormData((prev) => ({
      ...prev,
      [orderKey]: (prev[orderKey] || []).filter((itemId) => itemId !== id),
      fieldLineCounts: Object.fromEntries(
        Object.entries(prev.fieldLineCounts || {}).filter(([fieldId]) => fieldId !== id)
      ),
    }));
  }, []);

  const setFieldLineCount = useCallback((fieldId, lineCount) => {
    const nextCount = Math.min(Math.max(Number(lineCount) || 0, 0), 3);

    setFormData((prev) => {
      const nextLineCounts = { ...(prev.fieldLineCounts || {}) };

      if (nextCount === 0) {
        delete nextLineCounts[fieldId];
      } else {
        nextLineCounts[fieldId] = nextCount;
      }

      return { ...prev, fieldLineCounts: nextLineCounts };
    });
  }, []);

  const reorderField = useCallback((section, sourceId, destinationId) => {
    const orderKey = section === 'submittedTo' ? 'submittedToOrder' : 
                     section === 'submittedBy' ? 'submittedByOrder' : 
                     'courseDetailsOrder';
    
    setFormData((prev) => {
      const order = [...(prev[orderKey] || [])];
      const sourceIndex = order.indexOf(sourceId);
      const destinationIndex = order.indexOf(destinationId);
      
      if (sourceIndex === -1 || destinationIndex === -1) return prev;
      
      const [movedId] = order.splice(sourceIndex, 1);
      order.splice(destinationIndex, 0, movedId);
      
      return { ...prev, [orderKey]: order };
    });
  }, []);

  const isExportReady = useMemo(() => {
    const hasStudent = formData.studentName.trim().length > 0;
    const hasCourse = formData.courseTitle.trim().length > 0;
    if (coverType === 'assignment') {
      return hasStudent && hasCourse;
    }
    return hasStudent && hasCourse;
  }, [coverType, formData.studentName, formData.courseTitle]);

  return {
    formData,
    university,
    updateField,
    setUniversity,
    setDesign,
    resetForm,
    isExportReady,
    addCustomField,
    updateCustomField,
    removeCustomField,
    removeStandardField,
    setFieldLineCount,
    reorderField,
  };
}
