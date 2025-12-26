// analytics.js - Event tracking for Affiliate Launch Kit Generator

/**
 * Analytics and event tracking utilities
 * Supports Google Analytics 4, custom events, and affiliate tracking
 */

const Analytics = {
    /**
     * Initialize analytics
     */
    init(trackingId) {
        this.trackingId = trackingId;
        this.sessionId = this.generateSessionId();
        this.userId = this.getUserId();
        
        // Track page load
        this.trackPageView();
        
        console.log('Analytics initialized:', {
            sessionId: this.sessionId,
            userId: this.userId
        });
    },

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Get or create user ID
     */
    getUserId() {
        let userId = localStorage.getItem('analytics_user_id');
        
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('analytics_user_id', userId);
        }
        
        return userId;
    },

    /**
     * Track page view
     */
    trackPageView() {
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    },

    /**
     * Track custom event
     */
    trackEvent(eventName, eventParams = {}) {
        const eventData = {
            event: eventName,
            timestamp: new Date().toISOString(),
            session_id: this.sessionId,
            user_id: this.userId,
            ...eventParams
        };
        
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventParams);
        }
        
        // Custom analytics endpoint (optional)
        this.sendToAnalytics(eventData);
        
        console.log('Event tracked:', eventData);
    },

    /**
     * Track kit generation
     */
    trackKitGeneration(niche, audienceSize, platform) {
        this.trackEvent('generate_kit', {
            event_category: 'Kit Generation',
            event_label: niche,
            niche: niche,
            audience_size: audienceSize,
            platform: platform,
            value: 1
        });
    },

    /**
     * Track kit download
     */
    trackKitDownload(niche, audienceSize) {
        this.trackEvent('download_kit', {
            event_category: 'Conversion',
            event_label: niche,
            niche: niche,
            audience_size: audienceSize,
            value: 10
        });
    },

    /**
     * Track form submission
     */
    trackFormSubmit(formName) {
        this.trackEvent('form_submit', {
            event_category: 'Form',
            event_label: formName,
            form_name: formName
        });
    },

    /**
     * Track button click
     */
    trackButtonClick(buttonName, buttonLocation) {
        this.trackEvent('button_click', {
            event_category: 'Engagement',
            event_label: buttonName,
            button_name: buttonName,
            button_location: buttonLocation
        });
    },

    /**
     * Track CTA click
     */
    trackCTAClick(ctaText, ctaLocation) {
        this.trackEvent('cta_click', {
            event_category: 'CTA',
            event_label: ctaText,
            cta_text: ctaText,
            cta_location: ctaLocation
        });
    },

    /**
     * Track affiliate link click
     */
    trackAffiliateLinkClick(linkType, destination) {
        this.trackEvent('affiliate_link_click', {
            event_category: 'Affiliate',
            event_label: linkType,
            link_type: linkType,
            destination: destination
        });
    },

    /**
     * Track section view
     */
    trackSectionView(sectionName) {
        this.trackEvent('section_view', {
            event_category: 'Engagement',
            event_label: sectionName,
            section_name: sectionName
        });
    },

    /**
     * Track scroll depth
     */
    trackScrollDepth() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
            }
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !tracked.has(milestone)) {
                    tracked.add(milestone);
                    this.trackEvent('scroll_depth', {
                        event_category: 'Engagement',
                        event_label: `${milestone}%`,
                        scroll_depth: milestone
                    });
                }
            });
        });
    },

    /**
     * Track time on page
     */
    trackTimeOnPage() {
        const startTime = Date.now();
        
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            
            this.trackEvent('time_on_page', {
                event_category: 'Engagement',
                event_label: `${timeSpent}s`,
                time_spent: timeSpent
            });
        });
    },

    /**
     * Track form field interactions
     */
    trackFormFieldInteraction(fieldName) {
        this.trackEvent('form_field_interaction', {
            event_category: 'Form',
            event_label: fieldName,
            field_name: fieldName
        });
    },

    /**
     * Track validation errors
     */
    trackValidationError(fieldName, errorType) {
        this.trackEvent('validation_error', {
            event_category: 'Form',
            event_label: `${fieldName} - ${errorType}`,
            field_name: fieldName,
            error_type: errorType
        });
    },

    /**
     * Send data to custom analytics endpoint
     */
    async sendToAnalytics(eventData) {
        // Optional: Send to custom analytics backend
        try {
            // Uncomment and configure when backend is ready
            /*
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventData)
            });
            */
        } catch (error) {
            console.error('Error sending analytics:', error);
        }
    },

    /**
     * Setup automatic tracking
     */
    setupAutoTracking() {
        // Track all CTA clicks
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const ctaText = e.target.textContent.trim();
                const ctaLocation = e.target.closest('section')?.className || 'unknown';
                this.trackCTAClick(ctaText, ctaLocation);
            });
        });
        
        // Track all external links
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const destination = e.target.href;
                this.trackAffiliateLinkClick('external_link', destination);
            });
        });
        
        // Setup scroll depth tracking
        this.trackScrollDepth();
        
        // Setup time on page tracking
        this.trackTimeOnPage();
        
        // Track section views with Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.className || entry.target.id || 'unnamed_section';
                    this.trackSectionView(sectionName);
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    },

    /**
     * Get analytics summary
     */
    getAnalyticsSummary() {
        return {
            sessionId: this.sessionId,
            userId: this.userId,
            pageViews: this.getStoredValue('page_views', 0),
            kitsGenerated: this.getStoredValue('kits_generated', 0),
            kitsDownloaded: this.getStoredValue('kits_downloaded', 0)
        };
    },

    /**
     * Store analytics value
     */
    storeValue(key, value) {
        localStorage.setItem(`analytics_${key}`, value.toString());
    },

    /**
     * Get stored analytics value
     */
    getStoredValue(key, defaultValue = 0) {
        const value = localStorage.getItem(`analytics_${key}`);
        return value ? parseInt(value) : defaultValue;
    },

    /**
     * Increment analytics counter
     */
    incrementCounter(key) {
        const currentValue = this.getStoredValue(key, 0);
        this.storeValue(key, currentValue + 1);
    }
};

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        // Initialize with your GA4 tracking ID
        const trackingId = 'G-XXXXXXXXXX'; // Replace with actual tracking ID
        Analytics.init(trackingId);
        Analytics.setupAutoTracking();
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Analytics;
}
