// FormField.js - Styled form inputs with validation

/**
 * FormField Component
 * Reusable form field with validation, error handling, and accessibility
 */

class FormField {
    constructor(config = {}) {
        this.config = {
            type: config.type || 'text', // text, email, select, textarea
            name: config.name || '',
            label: config.label || '',
            placeholder: config.placeholder || '',
            required: config.required || false,
            value: config.value || '',
            options: config.options || [], // For select fields
            validation: config.validation || null, // Custom validation function
            helpText: config.helpText || '',
            className: config.className || '',
            onChange: config.onChange || (() => {})
        };
        
        this.element = null;
        this.input = null;
        this.errorElement = null;
        this.isValid = true;
        this.render();
    }

    /**
     * Render form field
     */
    render() {
        this.element = document.createElement('div');
        this.element.className = `form-field ${this.config.className}`.trim();
        
        // Create label
        if (this.config.label) {
            const label = document.createElement('label');
            label.className = 'form-label';
            label.textContent = this.config.label;
            if (this.config.required) {
                const required = document.createElement('span');
                required.className = 'form-required';
                required.textContent = '*';
                label.appendChild(required);
            }
            label.setAttribute('for', this.config.name);
            this.element.appendChild(label);
        }
        
        // Create input based on type
        this.input = this.createInput();
        this.element.appendChild(this.input);
        
        // Create help text
        if (this.config.helpText) {
            const helpText = document.createElement('span');
            helpText.className = 'form-help-text';
            helpText.textContent = this.config.helpText;
            this.element.appendChild(helpText);
        }
        
        // Create error message container
        this.errorElement = document.createElement('span');
        this.errorElement.className = 'form-error';
        this.element.appendChild(this.errorElement);
        
        return this.element;
    }

    /**
     * Create input element based on type
     */
    createInput() {
        let input;
        
        switch (this.config.type) {
            case 'select':
                input = this.createSelect();
                break;
            case 'textarea':
                input = this.createTextarea();
                break;
            default:
                input = this.createTextInput();
        }
        
        input.id = this.config.name;
        input.name = this.config.name;
        input.value = this.config.value;
        
        // Add event listeners
        input.addEventListener('input', (e) => this.handleInput(e));
        input.addEventListener('blur', () => this.validate());
        
        return input;
    }

    /**
     * Create text input
     */
    createTextInput() {
        const input = document.createElement('input');
        input.type = this.config.type;
        input.className = 'form-input';
        input.placeholder = this.config.placeholder;
        input.required = this.config.required;
        return input;
    }

    /**
     * Create select dropdown
     */
    createSelect() {
        const select = document.createElement('select');
        select.className = 'form-select';
        select.required = this.config.required;
        
        // Add placeholder option
        if (this.config.placeholder) {
            const placeholderOption = document.createElement('option');
            placeholderOption.value = '';
            placeholderOption.textContent = this.config.placeholder;
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            select.appendChild(placeholderOption);
        }
        
        // Add options
        this.config.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = typeof option === 'object' ? option.value : option;
            optionElement.textContent = typeof option === 'object' ? option.label : option;
            select.appendChild(optionElement);
        });
        
        return select;
    }

    /**
     * Create textarea
     */
    createTextarea() {
        const textarea = document.createElement('textarea');
        textarea.className = 'form-textarea';
        textarea.placeholder = this.config.placeholder;
        textarea.required = this.config.required;
        textarea.rows = 4;
        return textarea;
    }

    /**
     * Handle input changes
     */
    handleInput(e) {
        this.config.value = e.target.value;
        this.clearError();
        this.config.onChange(e.target.value);
    }

    /**
     * Validate field
     */
    validate() {
        this.clearError();
        
        // Check required
        if (this.config.required &amp;&amp; !this.config.value.trim()) {
            this.setError(`${this.config.label || 'This field'} is required`);
            return false;
        }
        
        // Check custom validation
        if (this.config.validation) {
            const validationResult = this.config.validation(this.config.value);
            if (validationResult !== true) {
                this.setError(validationResult);
                return false;
            }
        }
        
        // Built-in validations
        if (this.config.type === 'email' &amp;&amp; this.config.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.config.value)) {
                this.setError('Please enter a valid email address');
                return false;
            }
        }
        
        this.isValid = true;
        this.input.classList.remove('form-input-error');
        return true;
    }

    /**
     * Set error message
     */
    setError(message) {
        this.isValid = false;
        this.errorElement.textContent = message;
        this.errorElement.style.display = 'block';
        this.input.classList.add('form-input-error');
    }

    /**
     * Clear error message
     */
    clearError() {
        this.isValid = true;
        this.errorElement.textContent = '';
        this.errorElement.style.display = 'none';
        this.input.classList.remove('form-input-error');
    }

    /**
     * Get field value
     */
    getValue() {
        return this.config.value;
    }

    /**
     * Set field value
     */
    setValue(value) {
        this.config.value = value;
        this.input.value = value;
    }

    /**
     * Get field element
     */
    getElement() {
        return this.element;
    }

    /**
     * Check if field is valid
     */
    isValidField() {
        return this.validate();
    }
}

/**
 * FormField CSS Styles
 */
const formFieldStyles = `
/* Form Field Container */
.form-field {
    margin-bottom: 24px;
    position: relative;
}

/* Form Label */
.form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 8px;
}

.form-required {
    color: #e53e3e;
    margin-left: 4px;
}

/* Form Inputs */
.form-input,
.form-select,
.form-textarea {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #2d3748;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.3s ease;
    box-sizing: border-box;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: #a0aec0;
}

/* Select Dropdown */
.form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
}

/* Textarea */
.form-textarea {
    resize: vertical;
    min-height: 100px;
}

/* Error State */
.form-input-error {
    border-color: #e53e3e !important;
}

.form-input-error:focus {
    box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
}

/* Error Message */
.form-error {
    display: none;
    color: #e53e3e;
    font-size: 13px;
    margin-top: 6px;
    font-weight: 500;
}

/* Help Text */
.form-help-text {
    display: block;
    color: #718096;
    font-size: 13px;
    margin-top: 6px;
}

/* Success State */
.form-input-success {
    border-color: #48bb78;
}

.form-input-success:focus {
    box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.1);
}

/* Disabled State */
.form-input:disabled,
.form-select:disabled,
.form-textarea:disabled {
    background-color: #f7fafc;
    color: #a0aec0;
    cursor: not-allowed;
}
`;

/**
 * Usage Examples
 */

// Example 1: Text input with validation
const nicheField = new FormField({
    type: 'text',
    name: 'niche',
    label: 'Business Niche',
    placeholder: 'e.g., Restaurants, Salons, Contractors',
    required: true,
    helpText: 'Enter the industry or niche you want to target',
    validation: (value) => {
        if (value.length &lt; 3) {
            return 'Niche must be at least 3 characters';
        }
        return true;
    },
    onChange: (value) => {
        console.log('Niche changed:', value);
    }
});

// Example 2: Select dropdown
const audienceSizeField = new FormField({
    type: 'select',
    name: 'audience_size',
    label: 'Current Audience Size',
    placeholder: 'Select your audience size',
    required: true,
    options: [
        { value: '0-1k', label: '0 - 1,000 followers' },
        { value: '1-10k', label: '1,000 - 10,000 followers' },
        { value: '10-100k', label: '10,000 - 100,000 followers' },
        { value: '100k+', label: '100,000+ followers' }
    ],
    onChange: (value) => {
        console.log('Audience size changed:', value);
    }
});

// Example 3: Email input with validation
const emailField = new FormField({
    type: 'email',
    name: 'email',
    label: 'Email Address',
    placeholder: 'your@email.com',
    required: true,
    onChange: (value) => {
        console.log('Email changed:', value);
    }
});

// Example 4: Textarea
const notesField = new FormField({
    type: 'textarea',
    name: 'notes',
    label: 'Additional Notes',
    placeholder: 'Any specific goals or requirements?',
    required: false,
    helpText: 'Optional: Tell us more about your specific needs',
    onChange: (value) => {
        console.log('Notes changed:', value);
    }
});

// Append to form
const form = document.getElementById('generator-form');
form.appendChild(nicheField.getElement());
form.appendChild(audienceSizeField.getElement());
form.appendChild(emailField.getElement());
form.appendChild(notesField.getElement());

// Validate all fields before submission
function validateForm() {
    const fields = [nicheField, audienceSizeField, emailField, notesField];
    return fields.every(field =&gt; field.isValidField());
}

// Export for use in other modules
if (typeof module !== 'undefined' &amp;&amp; module.exports) {
    module.exports = FormField;
}
