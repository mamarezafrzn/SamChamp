export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required!";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format!";
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return "Password is required!";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long!";
  }
  return "";
};

export const validateRequired = (value: string, fieldName: string): string => {
  if (!value.trim()) {
    return `${fieldName} is required!`;
  }
  return "";
};

/** Accepts an empty value, or a real date in `YYYY-MM-DD` that is not in the future. */
export const validateBirthday = (date: string): string => {
  if (!date) {
    return "";
  }
  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  // `Date` silently rolls invalid parts over (e.g. 31/02 becomes 03/03), so compare them back.
  const isRealDate =
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day;
  if (!isRealDate) {
    return "Invalid date!";
  }
  if (parsed > new Date()) {
    return "Birthday cannot be in the future!";
  }
  return "";
};
