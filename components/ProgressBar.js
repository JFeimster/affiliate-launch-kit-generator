// ProgressBar.js - Step indicator for the generation process

/**
 * ProgressBar Component
 * Visual step indicator showing progress through the kit generation process
 */

class ProgressBar {
    constructor(config = {}) {
        this.config = {
            steps: config.steps || [],
            currentStep: config.currentStep || 0,
            onStepClick: config.onStepClick || null,
            className: config.className || ''
        };
        
        this.element = null;
        this.stepElements = [];
        this.render();
    }

    /**
     * Render progress bar
     */
    render() {
        this.element = document.createElement('div');
        this.element.className = `progress-bar ${this.config.className}`.trim();
        
        // Create progress line container
        const progressLineContainer = document.createElement('div');
        progressLineContainer.className = 'progress-line-container';
        
        // Create background line
        const backgroundLine = document.createElement('div');
        backgroundLine.className = 'progress-line-background';
        progressLineContainer.appendChild(backgroundLine);
        
        // Create active line
        this.activeLine = document.createElement('div');
        this.activeLine.className = 'progress-line-active';
        this.updateLineProgress();
        progressLineContainer.appendChild(this.activeLine);
        
        this.element.appendChild(progressLineContainer);
        
        // Create steps container
        const stepsContainer = document.createElement('div');
        stepsContainer.className = 'progress-steps';
        
        this.config.steps.forEach((step, index) => {
            const stepElement = this.createStep(step, index);
            this.stepElements.push(stepElement);
            stepsContainer.appendChild(stepElement);
        });
        
        this.element.appendChild(stepsContainer);
        
        return this.element;
    }

    /**
     * Create individual step element
     */
    createStep(step, index) {
        const stepElement = document.createElement('div');
        stepElement.className = this.getStepClasses(index);
        stepElement.setAttribute('data-step-index', index);
        
        // Create step circle
        const stepCircle = document.createElement('div');
        stepCircle.className = 'progress-step-circle';
        
        // Add step number or checkmark
        if (index < this.config.currentStep) {
            stepCircle.innerHTML = `
                &lt;svg class="step-checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                    &lt;path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/&gt;
                &lt;/svg&gt;
            `;
        } else {
            stepCircle.textContent = index + 1;
        }
        
        stepElement.appendChild(stepCircle);
        
        // Create step label
        const stepLabel = document.createElement('div');
        stepLabel.className = 'progress-step-label';
        
        const stepTitle = document.createElement('div');
        stepTitle.className = 'progress-step-title';
        stepTitle.textContent = step.title;
        stepLabel.appendChild(stepTitle);
        
        if (step.description) {
            const stepDescription = document.createElement('div');
            stepDescription.className = 'progress-step-description';
            stepDescription.textContent = step.description;
            stepLabel.appendChild(stepDescription);
        }
        
        stepElement.appendChild(stepLabel);
        
        // Add click handler if enabled
        if (this.config.onStepClick &amp;&amp; index <= this.config.currentStep) {
            stepElement.style.cursor = 'pointer';
            stepElement.addEventListener('click', () => {
                this.config.onStepClick(index, step);
            });
        }
        
        return stepElement;
    }

    /**
     * Get step CSS classes
     */
    getStepClasses(index) {
        const classes = ['progress-step'];
        
        if (index < this.config.currentStep) {
            classes.push('step-completed');
        } else if (index === this.config.currentStep) {
            classes.push('step-active');
        } else {
            classes.push('step-upcoming');
        }
        
        return classes.join(' ');
    }

    /**
     * Update active line progress
     */
    updateLineProgress() {
        if (!this.activeLine) return;
        
        const totalSteps = this.config.steps.length;
        const progress = (this.config.currentStep / (totalSteps - 1)) * 100;
        
        this.activeLine.style.width = `${Math.min(progress, 100)}%`;
    }

    /**
     * Update current step
     */
    setCurrentStep(stepIndex) {
        this.config.currentStep = stepIndex;
        
        // Update step elements
        this.stepElements.forEach((stepElement, index) => {
            stepElement.className = this.getStepClasses(index);
            
            const stepCircle = stepElement.querySelector('.progress-step-circle');
            
            if (index < this.config.currentStep) {
                stepCircle.innerHTML = `
                    &lt;svg class="step-checkmark" width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                        &lt;path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/&gt;
                    &lt;/svg&gt;
                `;
            } else {
                stepCircle.textContent = index + 1;
            }
        });
        
        // Update line progress
        this.updateLineProgress();
    }

    /**
     * Go to next step
     */
    nextStep() {
        if (this.config.currentStep < this.config.steps.length - 1) {
            this.setCurrentStep(this.config.currentStep + 1);
        }
    }

    /**
     * Go to previous step
     */
    previousStep() {
        if (this.config.currentStep > 0) {
            this.setCurrentStep(this.config.currentStep - 1);
        }
    }

    /**
     * Reset to first step
     */
    reset() {
        this.setCurrentStep(0);
    }

    /**
     * Get progress bar element
     */
    getElement() {
        return this.element;
    }

    /**
     * Get current step index
     */
    getCurrentStep() {
        return this.config.currentStep;
    }
}

/**
 * ProgressBar CSS Styles
 */
const progressBarStyles = `
/* Progress Bar Container */
.progress-bar {
    width: 100%;
    padding: 40px 0;
    position: relative;
}

/* Progress Line */
.progress-line-container {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    height: 4px;
    z-index: 0;
}

.progress-line-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #e2e8f0;
    border-radius: 2px;
}

.progress-line-active {
    position: absolute;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Steps Container */
.progress-steps {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
}

/* Individual Step */
.progress-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
}

/* Step Circle */
.progress-step-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    background: white;
    border: 3px solid #e2e8f0;
    color: #a0aec0;
    transition: all 0.3s ease;
    position: relative;
    z-index: 2;
}

/* Step States */
.step-completed .progress-step-circle {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: white;
}

.step-active .progress-step-circle {
    background: white;
    border-color: #667eea;
    color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    animation: pulse 2s infinite;
}

.step-upcoming .progress-step-circle {
    background: white;
    border-color: #e2e8f0;
    color: #cbd5e0;
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
    }
    50% {
        box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.1);
    }
}

/* Step Checkmark */
.step-checkmark {
    animation: checkmark-appear 0.3s ease;
}

@keyframes checkmark-appear {
    0% {
        transform: scale(0) rotate(-45deg);
        opacity: 0;
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}

/* Step Label */
.progress-step-label {
    margin-top: 16px;
    text-align: center;
    max-width: 150px;
}

.progress-step-title {
    font-size: 14px;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 4px;
    transition: color 0.3s ease;
}

.progress-step-description {
    font-size: 12px;
    color: #718096;
    line-height: 1.4;
}

/* Step Label States */
.step-completed .progress-step-title {
    color: #667eea;
}

.step-active .progress-step-title {
    color: #667eea;
    font-weight: 700;
}

.step-upcoming .progress-step-title {
    color: #a0aec0;
}

/* Clickable Steps */
.progress-step:hover .progress-step-circle {
    transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
    .progress-bar {
        padding: 30px 0;
    }
    
    .progress-step-circle {
        width: 40px;
        height: 40px;
        font-size: 16px;
    }
    
    .progress-line-container {
        top: 42px;
    }
    
    .progress-step-label {
        max-width: 100px;
    }
    
    .progress-step-title {
        font-size: 12px;
    }
    
    .progress-step-description {
        display: none;
    }
}

@media (max-width: 480px) {
    .progress-step-circle {
        width: 32px;
        height: 32px;
        font-size: 14px;
    }
    
    .progress-line-container {
        top: 38px;
    }
    
    .step-checkmark {
        width: 12px;
        height: 12px;
    }
}
`;

/**
 * Usage Example
 */

// Define generation steps
const generationSteps = [
    {
        title: 'Input Details',
        description: 'Enter your niche and audience size'
    },
    {
        title: 'Generate Kit',
        description: 'AI creates your personalized content'
    },
    {
        title: 'Review Content',
        description: 'Preview and customize your kit'
    },
    {
        title: 'Download',
        description: 'Get your complete launch kit'
    }
];

// Create progress bar
const progressBar = new ProgressBar({
    steps: generationSteps,
    currentStep: 0,
    onStepClick: (index, step) => {
        console.log('Clicked step:', index, step.title);
        // Optionally allow navigation to previous steps
        if (index < progressBar.getCurrentStep()) {
            progressBar.setCurrentStep(index);
        }
    }
});

// Add to page
document.getElementById('progress-container').appendChild(progressBar.getElement());

// Simulate step progression
let currentStep = 0;
const simulateProgress = setInterval(() => {
    if (currentStep < generationSteps.length - 1) {
        currentStep++;
        progressBar.nextStep();
    } else {
        clearInterval(simulateProgress);
    }
}, 2000);

// Manual controls
document.getElementById('next-btn').addEventListener('click', () => {
    progressBar.nextStep();
});

document.getElementById('prev-btn').addEventListener('click', () => {
    progressBar.previousStep();
});

document.getElementById('reset-btn').addEventListener('click', () => {
    progressBar.reset();
});

// Export for use in other modules
if (typeof module !== 'undefined' &amp;&amp; module.exports) {
    module.exports = ProgressBar;
}
