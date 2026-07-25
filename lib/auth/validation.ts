const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type FieldErrors = Record<string, string>;

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();

  if (!trimmed) {
    return "Email is required.";
  }

  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address.";
  }

  return null;
}

export function validatePassword(
  password: string,
  options: { minLength?: number; label?: string } = {}
): string | null {
  const { minLength = 8, label = "Password" } = options;

  if (!password) {
    return `${label} is required.`;
  }

  if (password.length < minLength) {
    return `${label} must be at least ${minLength} characters.`;
  }

  return null;
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return "Full name is required.";
  }

  if (trimmed.length < 2) {
    return "Full name must be at least 2 characters.";
  }

  return null;
}

export function validateLoginForm(email: string, password: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);

  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password, {
    minLength: 1,
    label: "Password",
  });

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateSignupForm(
  name: string,
  email: string,
  password: string
): FieldErrors {
  const errors: FieldErrors = {};
  const nameError = validateName(name);

  if (nameError) {
    errors.name = nameError;
  }

  const emailError = validateEmail(email);

  if (emailError) {
    errors.email = emailError;
  }

  const passwordError = validatePassword(password);

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}

export function validateForgotPasswordForm(email: string): FieldErrors {
  const errors: FieldErrors = {};
  const emailError = validateEmail(email);

  if (emailError) {
    errors.email = emailError;
  }

  return errors;
}

export function getFirstError(errors: FieldErrors): string {
  return Object.values(errors)[0] ?? "Please fix the highlighted fields.";
}
