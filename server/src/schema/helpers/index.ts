export function errorHandler(error: any) {
  if (error.code === 11000) {
    return 'That email address is already in use';
  } else {
    const errors = [];
    for (const prop in error.errors) {
      errors.push(error.errors[prop].message);
    }

    return errors[0];
  }
}