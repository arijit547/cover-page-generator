const STORAGE_PREFIX = 'cover-form-';

export function getStorageKey(coverType) {
  return `${STORAGE_PREFIX}${coverType}`;
}

export function loadFormData(coverType) {
  try {
    const raw = localStorage.getItem(getStorageKey(coverType));
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveFormData(coverType, data) {
  try {
    localStorage.setItem(getStorageKey(coverType), JSON.stringify(data));
  } catch {
    // localStorage may be unavailable or full
  }
}

export function clearFormData(coverType) {
  try {
    localStorage.removeItem(getStorageKey(coverType));
  } catch {
    // ignore
  }
}
