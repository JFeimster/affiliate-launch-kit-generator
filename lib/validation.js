// validation.js - Form validation for Affiliate Launch Kit Generator

/**
 * Validation utilities for form inputs
 */

const Validation = {
    /**
     * Validate niche input
     */
    validateNiche(niche) {
        const errors = [];
        
        if (!niche || niche.trim().length === 0) {
            errors.push('Niche is required');
        }
        
        if (niche && niche.trim().length < 3) {
            errors.push('Niche must be at least 3 characters long');
        }
        
        if (niche && niche.trim().length > 100) {
            errors.push('Niche must be less than 100 characters');
        }
        
        // Check for invalid characters
        const validPattern = /^[a-zA-Z0-9\s\-&.,()]+$/;
        if (niche && !validPattern.test(niche)) {
            errors.push('Niche contains invalid characters. Use only letters, numbers, spaces, and basic punctuation');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            value: niche ? niche.trim() : ''
        };
    },

    /**
     * Validate audience size selection
     */
    validateAudienceSize(audienceSize) {
        const errors = [];
        const validSizes = ['0-1k', '1-10k', '10-100k', '100k+'];
        
        if (!audienceSize) {
            errors.push('Audience size is required');
        }
        
        if (audienceSize && !validSizes.includes(audienceSize)) {
            errors.push('Please select a valid audience size');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            value: audienceSize
        };
    },

    /**
     * Validate platform selection (optional field)
     */
    validatePlatform(platform) {
        const errors = [];
        const validPlatforms = ['TikTok', 'Instagram', 'LinkedIn', 'Facebook', 'Twitter', 'Email', 'Multi-platform', ''];
        
        if (platform && !validPlatforms.includes(platform)) {
            errors.push('Please select a valid platform');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            value: platform || 'Multi-platform'
        };
    },

    /**
     * Validate email (for optional features)
     */
    validateEmail(email) {
        const errors = [];
        
        if (email && email.trim().length === 0) {
            return {
                isValid: true,
                errors: [],
                value: ''
            };
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email)) {
            errors.push('Please enter a valid email address');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors,
            value: email ? email.trim().toLowerCase() : ''
        };
    },

    /**
     * Validate entire form
     */
    validateForm(formData) {
        const nicheValidation = this.validateNiche(formData.niche);
        const audienceValidation = this.validateAudienceSize(formData.audience);
        const platformValidation = this.validatePlatform(formData.platform);
        
        const allErrors = [
            ...nicheValidation.errors,
            ...audienceValidation.errors,
            ...platformValidation.errors
        ];
        
        return {
            isValid: allErrors.length === 0,
            errors: allErrors,
            validatedData: {
                niche: nicheValidation.value,
                audience: audienceValidation.value,
                platform: platformValidation.value
            }
        };
    },

    /**
     * Show validation errors in UI
     */
    displayErrors(fieldId, errors) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        // Remove existing error messages
        const existingError = field.parentElement.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Remove error class
        field.parentElement.classList.remove('error');
        
        // Add new errors if any
        if (errors.length > 0) {
            field.parentElement.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'form-error';
            errorDiv.textContent = errors[0]; // Show first error
            
            field.parentElement.appendChild(errorDiv);
        }
    },

    /**
     * Clear all validation errors
     */
    clearErrors() {
        document.querySelectorAll('.form-error').forEach(el => el.remove());
        document.querySelectorAll('.form-group.error').forEach(el => {
            el.classList.remove('error');
        });
    },

    /**
     * Real-time field validation
     */
    setupRealtimeValidation(formId) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const nicheInput = form.querySelector('#niche');
        const audienceSelect = form.querySelector('#audience');
        const platformSelect = form.querySelector('#platform');
        
        if (nicheInput) {
            nicheInput.addEventListener('blur', (e) => {
                const result = this.validateNiche(e.target.value);
                this.displayErrors('niche', result.errors);
            });
            
            // Clear errors on input
            nicheInput.addEventListener('input', () => {
                this.displayErrors('niche', []);
            });
        }
        
        if (audienceSelect) {
            audienceSelect.addEventListener('change', (e) => {
                const result = this.validateAudienceSize(e.target.value);
                this.displayErrors('audience', result.errors);
            });
        }
        
        if (platformSelect) {
            platformSelect.addEventListener('change', (e) => {
                const result = this.validatePlatform(e.target.value);
                this.displayErrors('platform', result.errors);
            });
        }
    },

    /**
     * Sanitize input to prevent XSS
     */
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    /**
     * Format niche for display
     */
    formatNiche(niche) {
        return niche
            .trim()
            .split(/\s+/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validation;
}
