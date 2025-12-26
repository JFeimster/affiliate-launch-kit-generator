/**
 * Input Validation Module
 * Validates user inputs before generating launch plan
 */

export class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.field = field;
    this.name = 'ValidationError';
  }
}

/**
 * Validate all inputs from the form
 * @param {Object} inputs - Form input values
 * @returns {Object} Validation result with isValid flag and errors array
 */
export function validateInputs(inputs) {
  const errors = [];

  // Validate name
  const nameValidation = validateName(inputs.name);
  if (!nameValidation.isValid) {
    errors.push(nameValidation.error);
  }

  // Validate email
  const emailValidation = validateEmail(inputs.email);
  if (!emailValidation.isValid) {
    errors.push(emailValidation.error);
  }

  // Validate platform
  const platformValidation = validatePlatform(inputs.platform);
  if (!platformValidation.isValid) {
    errors.push(platformValidation.error);
  }

  // Validate experience
  const experienceValidation = validateExperience(inputs.experience);
  if (!experienceValidation.isValid) {
    errors.push(experienceValidation.error);
  }

  // Validate niche
  const nicheValidation = validateNiche(inputs.niche);
  if (!nicheValidation.isValid) {
    errors.push(nicheValidation.error);
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
  };
}

/**
 * Validate name field
 */
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      error: 'Name is required',
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: 'Name must be at least 2 characters',
    };
  }

  if (name.trim().length > 100) {
    return {
      isValid: false,
      error: 'Name must be less than 100 characters',
    };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      error: 'Name contains invalid characters',
    };
  }

  return { isValid: true };
}

/**
 * Validate email field
 */
export function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return {
      isValid: false,
      error: 'Email is required',
    };
  }

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(email.trim())) {
    return {
      isValid: false,
      error: 'Please enter a valid email address',
    };
  }

  if (email.trim().length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long',
    };
  }

  return { isValid: true };
}

/**
 * Validate platform field
 */
export function validatePlatform(platform) {
  const validPlatforms = [
    'instagram',
    'youtube',
    'tiktok',
    'twitter',
    'linkedin',
    'facebook',
    'blog',
    'podcast',
    'newsletter',
  ];

  if (!platform || platform.trim().length === 0) {
    return {
      isValid: false,
      error: 'Platform is required',
    };
  }

  if (!validPlatforms.includes(platform.toLowerCase().trim())) {
    return {
      isValid: false,
      error: `Platform must be one of: ${validPlatforms.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate experience level
 */
export function validateExperience(experience) {
  const validLevels = ['beginner', 'intermediate', 'advanced'];

  if (!experience || experience.trim().length === 0) {
    return {
      isValid: false,
      error: 'Experience level is required',
    };
  }

  if (!validLevels.includes(experience.toLowerCase().trim())) {
    return {
      isValid: false,
      error: `Experience must be one of: ${validLevels.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Validate niche field
 */
export function validateNiche(niche) {
  if (!niche || niche.trim().length === 0) {
    return {
      isValid: false,
      error: 'Niche is required',
    };
  }

  if (niche.trim().length < 3) {
    return {
      isValid: false,
      error: 'Niche must be at least 3 characters',
    };
  }

  if (niche.trim().length > 100) {
    return {
      isValid: false,
      error: 'Niche must be less than 100 characters',
    };
  }

  // Check for inappropriate content (basic filter)
  const inappropriateWords = ['spam', 'scam', 'fake'];
  const lowerNiche = niche.toLowerCase();
  
  for (const word of inappropriateWords) {
    if (lowerNiche.includes(word)) {
      return {
        isValid: false,
        error: 'Please enter a valid niche',
      };
    }
  }

  return { isValid: true };
}

/**
 * Validate optional fields
 */
export function validateOptionalFields(inputs) {
  const warnings = [];

  // Validate timezone if provided
  if (inputs.timezone) {
    const timezoneValidation = validateTimezone(inputs.timezone);
    if (!timezoneValidation.isValid) {
      warnings.push(`Timezone: ${timezoneValidation.error}`);
    }
  }

  // Validate website if provided
  if (inputs.website) {
    const websiteValidation = validateWebsite(inputs.website);
    if (!websiteValidation.isValid) {
      warnings.push(`Website: ${websiteValidation.error}`);
    }
  }

  // Validate social handle if provided
  if (inputs.socialHandle) {
    const handleValidation = validateSocialHandle(inputs.socialHandle);
    if (!handleValidation.isValid) {
      warnings.push(`Social handle: ${handleValidation.error}`);
    }
  }

  return {
    hasWarnings: warnings.length > 0,
    warnings: warnings,
  };
}

/**
 * Validate timezone
 */
function validateTimezone(timezone) {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'Invalid timezone',
    };
  }
}

/**
 * Validate website URL
 */
function validateWebsite(website) {
  try {
    const url = new URL(website);
    if (!['http:', 'https:'].includes(url.protocol)) {
      return {
        isValid: false,
        error: 'Website must use http or https protocol',
      };
    }
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: 'Please enter a valid URL',
    };
  }
}

/**
 * Validate social media handle
 */
function validateSocialHandle(handle) {
  // Remove @ symbol if present
  const cleanHandle = handle.replace('@', '');

  if (cleanHandle.length < 1) {
    return {
      isValid: false,
      error: 'Handle cannot be empty',
    };
  }

  if (cleanHandle.length > 30) {
    return {
      isValid: false,
      error: 'Handle is too long',
    };
  }

  // Check for valid characters (alphanumeric, underscore, period)
  const handleRegex = /^[a-zA-Z0-9_.]+$/;
  if (!handleRegex.test(cleanHandle)) {
    return {
      isValid: false,
      error: 'Handle contains invalid characters',
    };
  }

  return { isValid: true };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return input;
  }

  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validate form data structure
 */
export function validateFormStructure(formData) {
  const requiredFields = ['name', 'email', 'platform', 'experience', 'niche'];
  const missingFields = [];

  for (const field of requiredFields) {
    if (!(field in formData)) {
      missingFields.push(field);
    }
  }

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`,
    };
  }

  return { isValid: true };
}

/**
 * Real-time field validation for UI feedback
 */
export function validateFieldRealtime(fieldName, value) {
  switch (fieldName) {
    case 'name':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'platform':
      return validatePlatform(value);
    case 'experience':
      return validateExperience(value);
    case 'niche':
      return validateNiche(value);
    default:
      return { isValid: true };
  }
}

/**
 * Get validation message for display
 */
export function getValidationMessage(validation) {
  if (validation.isValid) {
    return '';
  }
  return validation.error || 'Invalid input';
}

/**
 * Check if all required fields are filled
 */
export function areRequiredFieldsFilled(inputs) {
  return Boolean(
    inputs.name &&
    inputs.email &&
    inputs.platform &&
    inputs.experience &&
    inputs.niche
  );
}

export default {
  validateInputs,
  validateName,
  validateEmail,
  validatePlatform,
  validateExperience,
  validateNiche,
  validateOptionalFields,
  sanitizeInput,
  validateFormStructure,
  validateFieldRealtime,
  getValidationMessage,
  areRequiredFieldsFilled,
};
