const { validateFieldMaximumLength, validateRegexField } = require("./generalValidations");

async function validateProject(project) {
  validateFieldMaximumLength(project.projectName, 'The project name must have a minimum of 20 characters.', 20)
  
  validateRegexField(project.coverImageUrl, /(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg)/, 'The cover image URL has an invalid format')

  validateRegexField(project.littleCoverImageUrl, /(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg)/, 'The little cover image has an invalid format')
}

module.exports = validateProject