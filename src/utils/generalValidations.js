function createError(status, message) {
  const error = new Error(message)
  error.status = status
  return error
}

function validateFieldMaximumLength(value, errorMessage, maximum) {
  if (value.length > maximum) {
    throw createError(400, errorMessage)
  }
}

function validateRegexField(value, regex, errorMessage) {
  if (!regex.test(value)) {
    throw createError(400, errorMessage)
  }
}

function validateRegexWithString(value, regex, errorMessage) {
  const regexFormat = new RegExp(regex);
  if (!regexFormat.test(value)) {
    throw createError(400, errorMessage);
  }
}

function validateEqual(value1, value2, errorMessage) {
  if (value1 !== value2) {
    throw createError(400, errorMessage)
  }
}

function validateRange(value, min, max, errorMessage) {
  if (value < min || value > max) {
    throw createError(400, errorMessage)
  }
}

module.exports = { validateFieldMaximumLength, validateEqual, validateRange, validateRegexField, validateRegexWithString }