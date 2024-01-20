export const getInputError = (errors, name) => {
  // input: form errors object, name of input element
  // returns object containing error for name
  return errors[name] ? errors[name] : null 
}