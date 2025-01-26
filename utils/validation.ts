export const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required!';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Invalid email format!';
    }
    return '';
  };
  
  export const validatePassword = (password: string): string => {
    if (!password.trim()) {
      return 'Password is required!';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long!';
    }
    return '';
  };
  
  export const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) {
      return `${fieldName} is required!`;
    }
    return '';
  };