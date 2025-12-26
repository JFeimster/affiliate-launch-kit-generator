// KitPreview.js - Preview cards for generated content

/**
 * KitPreview Component
 * Displays preview cards for generated affiliate launch kit content
 */

class KitPreview {
    constructor(config = {}) {
        this.config = {
            type: config.type || 'plan', // plan, post, script, link
            data: config.data || {},
            expanded: config.expanded || false,
            onDownload: config.onDownload || null,
            onCopy: config.onCopy || null,
            className: config.className || ''
        };
        
        this.element = null;
        this.render();
    }

    /**
     * Render preview card
     */
    render() {
        this.element = document.createElement('div');
        this.element.className = `kit-preview kit-preview-${this.config.type} ${this.config.className}`.trim();
        
        switch (this.config.type) {
            case 'plan':
                this.renderPlanPreview();
                break;
            case 'post':
                this.renderPostPreview();
                break;
            case 'script':
                this.renderScriptPreview();
                break;
            case 'link':
                this.renderLinkPreview();
                break;
            default:
                this.renderDefaultPreview();
        }
        
        return this.element;
    }

    /**
     * Render 7-day plan preview
     */
    renderPlanPreview() {
        const { day, task, focus, description, timeEstimate, deliverables } = this.config.data;
        
        this.element.innerHTML = `
            &lt;div class="kit-preview-header"&gt;
                &lt;div class="kit-preview-day"&gt;
                    &lt;span class="day-number"&gt;Day ${day}&lt;/span&gt;
                    &lt;span class="day-focus"&gt;${focus}&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="kit-preview-actions"&gt;
                    ${this.renderActionButtons()}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="kit-preview-body"&gt;
                &lt;h3 class="kit-preview-title"&gt;${task}&lt;/h3&gt;
                &lt;p class="kit-preview-description"&gt;${description}&lt;/p&gt;
                &lt;div class="kit-preview-meta"&gt;
                    &lt;span class="meta-item"&gt;
                        &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                            &lt;circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/&gt;
                            &lt;path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/&gt;
                        &lt;/svg&gt;
                        ${timeEstimate}
                    &lt;/span&gt;
                &lt;/div&gt;
                ${this.config.expanded ? `
                    &lt;div class="kit-preview-details"&gt;
                        &lt;h4&gt;Deliverables:&lt;/h4&gt;
                        &lt;ul&gt;
                            ${deliverables.map(d =&gt; `&lt;li&gt;${d}&lt;/li&gt;`).join('')}
                        &lt;/ul&gt;
                    &lt;/div&gt;
                ` : ''}
            &lt;/div&gt;
        `;
    }

    /**
     * Render social post preview
     */
    renderPostPreview() {
        const { id, title, content, platform, type, bestTimeToPost, engagement } = this.config.data;
        
        this.element.innerHTML = `
            &lt;div class="kit-preview-header"&gt;
                &lt;div class="kit-preview-badge"&gt;
                    &lt;span class="badge-type"&gt;${type}&lt;/span&gt;
                    &lt;span class="badge-platform"&gt;${platform}&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="kit-preview-actions"&gt;
                    ${this.renderActionButtons()}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="kit-preview-body"&gt;
                &lt;h3 class="kit-preview-title"&gt;${title}&lt;/h3&gt;
                &lt;div class="kit-preview-content"&gt;
                    &lt;div class="social-post-preview"&gt;
                        ${this.formatPostContent(content)}
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="kit-preview-meta"&gt;
                    &lt;span class="meta-item"&gt;
                        &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                            &lt;rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/&gt;
                            &lt;path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/&gt;
                        &lt;/svg&gt;
                        ${bestTimeToPost}
                    &lt;/span&gt;
                    &lt;span class="meta-item engagement-${engagement.toLowerCase().replace(/\s+/g, '-')}"&gt;
                        &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                            &lt;path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                        &lt;/svg&gt;
                        ${engagement} Engagement
                    &lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        `;
    }

    /**
     * Render script preview
     */
    renderScriptPreview() {
        const { title, script, useCase, tips } = this.config.data;
        
        this.element.innerHTML = `
            &lt;div class="kit-preview-header"&gt;
                &lt;div class="kit-preview-badge"&gt;
                    &lt;span class="badge-type"&gt;Script&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="kit-preview-actions"&gt;
                    ${this.renderActionButtons()}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="kit-preview-body"&gt;
                &lt;h3 class="kit-preview-title"&gt;${title}&lt;/h3&gt;
                &lt;p class="kit-preview-usecase"&gt;&lt;strong&gt;Use Case:&lt;/strong&gt; ${useCase}&lt;/p&gt;
                &lt;div class="kit-preview-content"&gt;
                    &lt;div class="script-preview"&gt;
                        ${this.formatScriptContent(script)}
                    &lt;/div&gt;
                &lt;/div&gt;
                ${this.config.expanded &amp;&amp; tips ? `
                    &lt;div class="kit-preview-tips"&gt;
                        &lt;h4&gt;💡 Tips:&lt;/h4&gt;
                        &lt;ul&gt;
                            ${tips.map(tip =&gt; `&lt;li&gt;${tip}&lt;/li&gt;`).join('')}
                        &lt;/ul&gt;
                    &lt;/div&gt;
                ` : ''}
            &lt;/div&gt;
        `;
    }

    /**
     * Render tracking link preview
     */
    renderLinkPreview() {
        const { platform, baseUrl, utmParams, shortUrl } = this.config.data;
        
        this.element.innerHTML = `
            &lt;div class="kit-preview-header"&gt;
                &lt;div class="kit-preview-badge"&gt;
                    &lt;span class="badge-platform"&gt;${platform}&lt;/span&gt;
                &lt;/div&gt;
                &lt;div class="kit-preview-actions"&gt;
                    ${this.renderActionButtons()}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class="kit-preview-body"&gt;
                &lt;div class="link-preview"&gt;
                    &lt;div class="link-full"&gt;
                        &lt;label&gt;Full URL:&lt;/label&gt;
                        &lt;code&gt;${baseUrl}?${new URLSearchParams(utmParams).toString()}&lt;/code&gt;
                    &lt;/div&gt;
                    ${shortUrl ? `
                        &lt;div class="link-short"&gt;
                            &lt;label&gt;Short URL:&lt;/label&gt;
                            &lt;code&gt;${shortUrl}&lt;/code&gt;
                        &lt;/div&gt;
                    ` : ''}
                    &lt;div class="link-params"&gt;
                        &lt;label&gt;UTM Parameters:&lt;/label&gt;
                        &lt;ul&gt;
                            ${Object.entries(utmParams).map(([key, value]) =&gt; 
                                `&lt;li&gt;&lt;strong&gt;${key}:&lt;/strong&gt; ${value}&lt;/li&gt;`
                            ).join('')}
                        &lt;/ul&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        `;
    }

    /**
     * Render default preview
     */
    renderDefaultPreview() {
        this.element.innerHTML = `
            &lt;div class="kit-preview-body"&gt;
                &lt;p&gt;Preview not available for this content type.&lt;/p&gt;
            &lt;/div&gt;
        `;
    }

    /**
     * Render action buttons
     */
    renderActionButtons() {
        return `
            &lt;button class="preview-action-btn copy-btn" title="Copy to clipboard"&gt;
                &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                    &lt;rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" stroke-width="2"/&gt;
                    &lt;path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                &lt;/svg&gt;
                Copy
            &lt;/button&gt;
            ${this.config.onDownload ? `
                &lt;button class="preview-action-btn download-btn" title="Download"&gt;
                    &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                        &lt;path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                        &lt;path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                        &lt;path d="M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                    &lt;/svg&gt;
                    Download
                &lt;/button&gt;
            ` : ''}
        `;
    }

    /**
     * Format post content with line breaks
     */
    formatPostContent(content) {
        return content
            .split('\n')
            .map(line =&gt; `&lt;p&gt;${line || '&amp;nbsp;'}&lt;/p&gt;`)
            .join('');
    }

    /**
     * Format script content with line breaks
     */
    formatScriptContent(script) {
        return script
            .split('\n')
            .map(line =&gt; {
                if (line.trim().endsWith(':')) {
                    return `&lt;p class="script-section"&gt;&lt;strong&gt;${line}&lt;/strong&gt;&lt;/p&gt;`;
                }
                return `&lt;p&gt;${line || '&amp;nbsp;'}&lt;/p&gt;`;
            })
            .join('');
    }

    /**
     * Get preview element
     */
    getElement() {
        // Add event listeners after element is created
        setTimeout(() =&gt; this.attachEventListeners(), 0);
        return this.element;
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Copy button
        const copyBtn = this.element.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () =&gt; this.handleCopy());
        }
        
        // Download button
        const downloadBtn = this.element.querySelector('.download-btn');
        if (downloadBtn &amp;&amp; this.config.onDownload) {
            downloadBtn.addEventListener('click', () =&gt; this.config.onDownload(this.config.data));
        }
    }

    /**
     * Handle copy to clipboard
     */
    async handleCopy() {
        const copyBtn = this.element.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        
        try {
            let textToCopy = '';
            
            // Get text based on type
            if (this.config.type === 'post') {
                textToCopy = this.config.data.content;
            } else if (this.config.type === 'script') {
                textToCopy = this.config.data.script;
            } else if (this.config.type === 'link') {
                textToCopy = this.config.data.shortUrl || 
                    `${this.config.data.baseUrl}?${new URLSearchParams(this.config.data.utmParams).toString()}`;
            } else {
                textToCopy = JSON.stringify(this.config.data, null, 2);
            }
            
            await navigator.clipboard.writeText(textToCopy);
            
            // Show success feedback
            copyBtn.innerHTML = `
                &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                    &lt;path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/&gt;
                &lt;/svg&gt;
                Copied!
            `;
            copyBtn.classList.add('success');
            
            setTimeout(() =&gt; {
                copyBtn.innerHTML = originalHTML;
                copyBtn.classList.remove('success');
            }, 2000);
            
            if (this.config.onCopy) {
                this.config.onCopy(textToCopy);
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            copyBtn.innerHTML = `
                &lt;svg width="16" height="16" viewBox="0 0 24 24" fill="none"&gt;
                    &lt;path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/&gt;
                &lt;/svg&gt;
                Failed
            `;
            
            setTimeout(() =&gt; {
                copyBtn.innerHTML = originalHTML;
            }, 2000);
        }
    }
}

/**
 * KitPreview CSS Styles
 */
const kitPreviewStyles = `
/* Kit Preview Container */
.kit-preview {
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    transition: all 0.3s ease;
}

.kit-preview:hover {
    border-color: #cbd5e0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Preview Header */
.kit-preview-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
}

.kit-preview-day {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.day-number {
    font-size: 24px;
    font-weight: 700;
    color: #667eea;
}

.day-focus {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Preview Badge */
.kit-preview-badge {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.badge-type,
.badge-platform {
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    background: #f0f4f8;
    color: #667eea;
}

/* Preview Actions */
.kit-preview-actions {
    display: flex;
    gap: 8px;
}

.preview-action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 600;
    color: #667eea;
    background: transparent;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.preview-action-btn:hover {
    background: #f0f4f8;
    border-color: #667eea;
}

.preview-action-btn.success {
    color: #48bb78;
    border-color: #48bb78;
}

/* Preview Body */
.kit-preview-body {
    margin-top: 16px;
}

.kit-preview-title {
    font-size: 18px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 12px;
}

.kit-preview-description,
.kit-preview-usecase {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 12px;
}

/* Preview Content */
.kit-preview-content {
    background: #f7fafc;
    border-radius: 8px;
    padding: 16px;
    margin: 12px 0;
}

.social-post-preview p,
.script-preview p {
    font-size: 14px;
    color: #2d3748;
    line-height: 1.6;
    margin-bottom: 8px;
}

.script-section {
    font-weight: 700;
    color: #667eea;
    margin-top: 12px;
}

/* Preview Meta */
.kit-preview-meta {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 12px;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #718096;
}

.meta-item svg {
    color: #a0aec0;
}

.engagement-high {
    color: #48bb78;
}

.engagement-medium-high {
    color: #4299e1;
}

.engagement-medium {
    color: #ed8936;
}

/* Preview Details */
.kit-preview-details {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
}

.kit-preview-details h4,
.kit-preview-tips h4 {
    font-size: 14px;
    font-weight: 700;
    color: #2d3748;
    margin-bottom: 8px;
}

.kit-preview-details ul,
.kit-preview-tips ul {
    padding-left: 20px;
}

.kit-preview-details li,
.kit-preview-tips li {
    font-size: 14px;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 6px;
}

/* Link Preview */
.link-preview {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.link-full,
.link-short,
.link-params {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.link-preview label {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.link-preview code {
    background: #f7fafc;
    padding: 12px;
    border-radius: 6px;
    font-size: 13px;
    color: #2d3748;
    font-family: 'Monaco', 'Menlo', monospace;
    word-break: break-all;
}

.link-params ul {
    background: #f7fafc;
    padding: 12px;
    border-radius: 6px;
    list-style: none;
}

.link-params li {
    font-size: 13px;
    color: #4a5568;
    padding: 4px 0;
}

.link-params li strong {
    color: #2d3748;
    font-weight: 600;
}
`;

/**
 * Usage Example
 */

// Example: Display generated kit previews
const kit = {
    plan: [
        {
            day: 1,
            task: 'Set up Restaurants tracking and analytics',
            focus: 'Foundation',
            description: 'Initialize your affiliate dashboard, set up tracking links, and configure analytics for Restaurants.',
            timeEstimate: '2-3 hours',
            deliverables: ['Tracking links created', 'Analytics configured', 'Dashboard familiarized']
        }
    ],
    posts: [
        {
            id: 1,
            title: 'Introduction Post',
            content: '🚀 Excited to share solutions specifically for Restaurants!\n\nI\'ve partnered with an incredible funding program that\'s perfect for this space. Let\'s connect if you\'re looking to grow. 💼\n\n#Restaurants #BusinessGrowth #Funding',
            platform: 'All',
            type: 'Introduction',
            bestTimeToPost: 'Morning (8-10 AM)',
            engagement: 'High'
        }
    ]
};

// Display plan previews
kit.plan.forEach(day =&gt; {
    const preview = new KitPreview({
        type: 'plan',
        data: day,
        expanded: true,
        onCopy: (text) =&gt; console.log('Copied plan:', text)
    });
    document.getElementById('plan-container').appendChild(preview.getElement());
});

// Display post previews
kit.posts.forEach(post =&gt; {
    const preview = new KitPreview({
        type: 'post',
        data: post,
        onCopy: (text) =&gt; console.log('Copied post:', text),
        onDownload: (data) =&gt; console.log('Download post:', data)
    });
    document.getElementById('posts-container').appendChild(preview.getElement());
});

// Export for use in other modules
if (typeof module !== 'undefined' &amp;&amp; module.exports) {
    module.exports = KitPreview;
}
