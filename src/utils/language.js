const { validateFieldMaximumLength, validateRegexField } = require("./generalValidations");

async function validateLanguage(language) {
  validateRegexField(language.languageIcon, /(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg)/, 'The icon image URL has an invalid format')
}

module.exports = validateLanguage