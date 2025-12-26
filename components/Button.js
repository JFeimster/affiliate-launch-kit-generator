// Button.js - Enhanced button component with loading states

/**
 * Button Component
 * Reusable button with loading states, variants, and accessibility
 */

class Button {
    constructor(config = {}) {
        this.config = {
            text: config.text || 'Click Me',
            variant: config.variant || 'primary', // primary, secondary, outline
            size: config.size || 'medium', // small, medium, large
            disabled: config.disabled || false,
            loading: config.loading || false,
            icon: config.icon || null,
            onClick: config.onClick || (() => {}),
            className: config.className || ''
        };
        
        this.element = null;
        this.loadingSpinner = null;
        this.render();
    }

    /**
     * Render button element
     */
    render() {
        this.element = document.createElement('button');
        this.element.className = this.getButtonClasses();
        this.element.disabled = this.config.disabled || this.config.loading;
        this.element.setAttribute('role', 'button');
        
        // Add click handler
        this.element.addEventListener('click', (e) => {
            if (!this.config.disabled &amp;&amp; !this.config.loading) {
                this.config.onClick(e);
            }
        });
        
        this.updateContent();
        
        return this.element;
    }

    /**
     * Get button CSS classes
     */
    getButtonClasses() {
        const baseClass = 'btn';
        const variantClass = `btn-${this.config.variant}`;
        const sizeClass = `btn-${this.config.size}`;
        const loadingClass = this.config.loading ? 'btn-loading' : '';
        const disabledClass = this.config.disabled ? 'btn-disabled' : '';
        
        return `${baseClass} ${variantClass} ${sizeClass} ${loadingClass} ${disabledClass} ${this.config.className}`.trim();
    }

    /**
     * Update button content
     */
    updateContent() {
        this.element.innerHTML = '';
        
        if (this.config.loading) {
            this.loadingSpinner = this.createLoadingSpinner();
            this.element.appendChild(this.loadingSpinner);
            
            const loadingText = document.createElement('span');
            loadingText.textContent = 'Loading...';
            loadingText.className = 'btn-loading-text';
            this.element.appendChild(loadingText);
        } else {
            if (this.config.icon) {
                const icon = document.createElement('span');
                icon.className = 'btn-icon';
                icon.innerHTML = this.config.icon;
                this.element.appendChild(icon);
            }
            
            const text = document.createElement('span');
            text.textContent = this.config.text;
            text.className = 'btn-text';
            this.element.appendChild(text);
        }
    }

    /**
     * Create loading spinner
     */
    createLoadingSpinner() {
        const spinner = document.createElement('span');
        spinner.className = 'btn-spinner';
        spinner.innerHTML = `
            &lt;svg class="spinner-svg" viewBox="0 0 50 50"&gt;
                &lt;circle class="spinner-circle" cx="25" cy="25" r="20" fill="none" stroke-width="5"&gt;&lt;/circle&gt;
            &lt;/svg&gt;
        `;
        return spinner;
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.config.loading = loading;
        this.element.disabled = this.config.disabled || loading;
        this.element.className = this.getButtonClasses();
        this.updateContent();
    }

    /**
     * Set disabled state
     */
    setDisabled(disabled) {
        this.config.disabled = disabled;
        this.element.disabled = disabled || this.config.loading;
        this.element.className = this.getButtonClasses();
    }

    /**
     * Update button text
     */
    setText(text) {
        this.config.text = text;
        if (!this.config.loading) {
            this.updateContent();
        }
    }

    /**
     * Get button element
     */
    getElement() {
        return this.element;
    }
}

/**
 * Button CSS Styles
 */
const buttonStyles = `
/* Base Button Styles */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

.btn:active:not(.btn-disabled):not(.btn-loading) {
    transform: translateY(1px);
}

/* Button Sizes */
.btn-small {
    padding: 8px 16px;
    font-size: 14px;
    border-radius: 8px;
}

.btn-medium {
    padding: 12px 24px;
    font-size: 16px;
}

.btn-large {
    padding: 16px 32px;
    font-size: 18px;
    border-radius: 14px;
}

/* Button Variants */
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.btn-primary:hover:not(.btn-disabled):not(.btn-loading) {
    background: linear-gradient(135deg, #5568d3 0%, #65408a 100%);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transform: translateY(-2px);
}

.btn-secondary {
    background: #f0f4f8;
    color: #667eea;
}

.btn-secondary:hover:not(.btn-disabled):not(.btn-loading) {
    background: #e1e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-outline {
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
}

.btn-outline:hover:not(.btn-disabled):not(.btn-loading) {
    background: rgba(102, 126, 234, 0.1);
    border-color: #5568d3;
}

/* Button States */
.btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-loading {
    cursor: wait;
    pointer-events: none;
}

.btn-loading .btn-text {
    opacity: 0;
}

/* Loading Spinner */
.btn-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner-svg {
    width: 20px;
    height: 20px;
    animation: rotate 1s linear infinite;
}

.spinner-circle {
    stroke: currentColor;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes dash {
    0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
    }
}

.btn-loading-text {
    margin-left: 30px;
}

/* Button Icon */
.btn-icon {
    display: flex;
    align-items: center;
}

.btn-icon svg {
    width: 18px;
    height: 18px;
}
`;

/**
 * Usage Examples
 */

// Example 1: Primary button with loading state
const submitButton = new Button({
    text: 'Generate Kit',
    variant: 'primary',
    size: 'large',
    onClick: async (e) => {
        submitButton.setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        submitButton.setLoading(false);
        submitButton.setText('Kit Generated! ✓');
    }
});

// Example 2: Secondary button with icon
const downloadButton = new Button({
    text: 'Download Kit',
    variant: 'secondary',
    size: 'medium',
    icon: `&lt;svg width="18" height="18" viewBox="0 0 24 24" fill="none"&gt;
        &lt;path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
        &lt;path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
        &lt;path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
    &lt;/svg&gt;`,
    onClick: () => {
        console.log('Downloading kit...');
    }
});

// Example 3: Outline button
const cancelButton = new Button({
    text: 'Cancel',
    variant: 'outline',
    size: 'medium',
    onClick: () => {
        console.log('Cancelled');
    }
});

// Example 4: Disabled button
const disabledButton = new Button({
    text: 'Not Available',
    variant: 'primary',
    size: 'medium',
    disabled: true
});

// Append to DOM
document.getElementById('button-container').appendChild(submitButton.getElement());
document.getElementById('button-container').appendChild(downloadButton.getElement());
document.getElementById('button-container').appendChild(cancelButton.getElement());
document.getElementById('button-container').appendChild(disabledButton.getElement());

// Export for use in other modules
if (typeof module !== 'undefined' &amp;&amp; module.exports) {
    module.exports = Button;
}
