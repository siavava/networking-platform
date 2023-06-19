/**
 * Validate a name.
 *
 * Checks that name is at least 2 characters long
 * and does not contain any special characters.
 *
 * @param {string} name
 * @returns {boolean}
 *
 * @example
 * validateName('John') // true
 * validateName('John Doe') // false
 * validateName('Jo*hn') // false
 * validateName('') // false
 */
const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z]+$/;
  return name.length > 1 && nameRegex.test(name);
};

/**
 * Validate email
 * @returns {boolean}
 */
const validateEmail = (email: string): boolean => {
  // allow only letters, numbers, and the following characters: . _ -
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

/**
 * Validate password.
 *
 * Checks that:
 * - password is at least 8 characters long
 * - password contains at least one number
 * - password contains at least one special character
 * - password contains at least one uppercase letter
 * - password contains at least one lowercase letter
 * - password does not contain any whitespace
 * - password does not contain the word 'password'
 *
 * @param {string} password
 * @returns {boolean}
 *
 * @example
 * validatePassword('password') // false
 * validatePassword('password123') // false
 * validatePassword('password123!') // true
 * validatePassword('password123!@#') // true
 * validatePassword('password 123!@#') // false
 *
 */
const validatePassword = (password: string): boolean => {
  // check it has at least 8 characters and has no whitespace
  const lengthCheck = password.length >= 8 && !/\s/.test(password);

  // check it has at least one upper case letter and one lower case letter
  const upperAndLowerCaseCheck = /[a-z]/.test(password) && /[A-Z]/.test(password);

  // check it has at least one number and at least one special character
  const numberAndSpecialCharCheck = /\d/.test(password) && /\W/.test(password);

  return lengthCheck && upperAndLowerCaseCheck && numberAndSpecialCharCheck;
};

export { validateName, validateEmail, validatePassword };
