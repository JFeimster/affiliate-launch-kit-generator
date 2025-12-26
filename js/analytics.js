/**
 * Analytics and Tracking Module
 * Handles event tracking, user analytics, and performance monitoring
 */

class Analytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = null;
    this.events = [];
    this.initialized = false;
    this.debug = false;
  }

  /**
   * Initialize analytics
   */
  init(config = {}) {
    this.debug = config.debug || false;
    this.userId = config.userId || this.getOrCreateUserId();
    this.initialized = true;

    // Track page load
    this.trackPageView();

    // Set up automatic tracking
    this.setupAutoTracking();

    this.log('Analytics initialized', { sessionId: this.sessionId, userId: this.userId });
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName, properties = {}) {
    if (!this.initialized) {
      console.warn('Analytics not initialized. Call init() first.');
      return;
    }

    const event = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId,
        userId: this.userId,
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
      },
    };

    this.events.push(event);
    this.sendToAnalytics(event);
    this.log('Event tracked:', event);
  }

  /**
   * Track page view
   */
  trackPageView() {
    this.trackEvent('page_view', {
      title: document.title,
      path: window.location.pathname,
    });
  }

  /**
   * Track form submission
   */
  trackFormSubmit(formName, formData = {}) {
    this.trackEvent('form_submit', {
      formName,
      ...formData,
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName, properties = {}) {
    this.trackEvent('button_click', {
      buttonName,
      ...properties,
    });
  }

  /**
   * Track generation start
   */
  trackGenerationStart(inputs) {
    this.trackEvent('generation_start', {
      platform: inputs.platform,
      experience: inputs.experience,
      niche: inputs.niche,
    });
  }

  /**
   * Track generation complete
   */
  trackGenerationComplete(duration, resultSize) {
    this.trackEvent('generation_complete', {
      duration,
      resultSize,
    });
  }

  /**
   * Track PDF export
   */
  trackPdfExport() {
    this.trackEvent('pdf_export');
  }

  /**
   * Track ZIP download
   */
  trackZipDownload() {
    this.trackEvent('zip_download');
  }

  /**
   * Track email capture
   */
  trackEmailCapture(email) {
    this.trackEvent('email_capture', {
      email: this.hashEmail(email),
    });
  }

  /**
   * Track error
   */
  trackError(errorType, errorMessage, context = {}) {
    this.trackEvent('error', {
      errorType,
      errorMessage,
      ...context,
    });
  }

  /**
   * Track timing (performance)
   */
  trackTiming(category, variable, time) {
    this.trackEvent('timing', {
      category,
      variable,
      time,
    });
  }

  /**
   * Track social share
   */
  trackSocialShare(platform) {
    this.trackEvent('social_share', {
      platform,
    });
  }

  /**
   * Track link click
   */
  trackLinkClick(linkUrl, linkText) {
    this.trackEvent('link_click', {
      linkUrl,
      linkText,
    });
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth(depth) {
    this.trackEvent('scroll_depth', {
      depth,
    });
  }

  /**
   * Track time on page
   */
  trackTimeOnPage() {
    const timeOnPage = Date.now() - this.pageLoadTime;
    this.trackEvent('time_on_page', {
      duration: timeOnPage,
    });
  }

  /**
   * Set up automatic tracking
   */
  setupAutoTracking() {
    // Track page load time
    this.pageLoadTime = Date.now();

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // Track at 25%, 50%, 75%, 100%
        if (scrollDepth >= 25 && maxScrollDepth < 50) {
          this.trackScrollDepth(25);
        } else if (scrollDepth >= 50 && maxScrollDepth < 75) {
          this.trackScrollDepth(50);
        } else if (scrollDepth >= 75 && maxScrollDepth < 100) {
          this.trackScrollDepth(75);
        } else if (scrollDepth >= 100) {
          this.trackScrollDepth(100);
        }
      }
    });

    // Track time on page before unload
    window.addEventListener('beforeunload', () => {
      this.trackTimeOnPage();
    });

    // Track errors
    window.addEventListener('error', (event) => {
      this.trackError('javascript_error', event.message, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    });

    // Track unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError('unhandled_rejection', event.reason);
    });
  }

  /**
   * Send event to analytics service
   */
  async sendToAnalytics(event) {
    // In production, send to your analytics service
    // For now, we'll just store locally and log
    
    try {
      // Example: Send to Google Analytics
      if (window.gtag) {
        window.gtag('event', event.name, event.properties);
      }

      // Example: Send to custom endpoint
      // await fetch('/api/analytics', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(event),
      // });

      // Store in localStorage for offline analysis
      this.storeEventLocally(event);
    } catch (error) {
      this.log('Error sending analytics:', error);
    }
  }

  /**
   * Store event locally
   */
  storeEventLocally(event) {
    try {
      const storageKey = 'affiliate_kit_analytics';
      const stored = localStorage.getItem(storageKey);
      const events = stored ? JSON.parse(stored) : [];
      
      events.push(event);
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.shift();
      }
      
      localStorage.setItem(storageKey, JSON.stringify(events));
    } catch (error) {
      this.log('Error storing event locally:', error);
    }
  }

  /**
   * Get stored events
   */
  getStoredEvents() {
    try {
      const storageKey = 'affiliate_kit_analytics';
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      this.log('Error retrieving stored events:', error);
      return [];
    }
  }

  /**
   * Clear stored events
   */
  clearStoredEvents() {
    try {
      const storageKey = 'affiliate_kit_analytics';
      localStorage.removeItem(storageKey);
    } catch (error) {
      this.log('Error clearing stored events:', error);
    }
  }

  /**
   * Generate session ID
   */
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
  }

  /**
   * Get or create user ID
   */
  getOrCreateUserId() {
    try {
      const storageKey = 'affiliate_kit_user_id';
      let userId = localStorage.getItem(storageKey);
      
      if (!userId) {
        userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem(storageKey, userId);
      }
      
      return userId;
    } catch (error) {
      this.log('Error managing user ID:', error);
      return 'user_anonymous';
    }
  }

  /**
   * Hash email for privacy
   */
  hashEmail(email) {
    // Simple hash for demonstration
    // In production, use a proper hashing library
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return 'email_' + Math.abs(hash).toString(36);
  }

  /**
   * Get analytics summary
   */
  getSummary() {
    const events = this.getStoredEvents();
    
    const summary = {
      totalEvents: events.length,
      sessionId: this.sessionId,
      userId: this.userId,
      eventTypes: {},
      timeRange: {
        start: events[0]?.properties?.timestamp,
        end: events[events.length - 1]?.properties?.timestamp,
      },
    };

    // Count event types
    events.forEach(event => {
      summary.eventTypes[event.name] = (summary.eventTypes[event.name] || 0) + 1;
    });

    return summary;
  }

  /**
   * Export analytics data
   */
  exportData() {
    return {
      summary: this.getSummary(),
      events: this.getStoredEvents(),
    };
  }

  /**
   * Log (only in debug mode)
   */
  log(...args) {
    if (this.debug) {
      console.log('[Analytics]', ...args);
    }
  }
}

// Create singleton instance
const analytics = new Analytics();

// Export for use in other modules
export { analytics };

// Export functions for convenience
export function trackEvent(eventName, properties) {
  analytics.trackEvent(eventName, properties);
}

export function trackPageView() {
  analytics.trackPageView();
}

export function trackFormSubmit(formName, formData) {
  analytics.trackFormSubmit(formName, formData);
}

export function trackButtonClick(buttonName, properties) {
  analytics.trackButtonClick(buttonName, properties);
}

export function trackError(errorType, errorMessage, context) {
  analytics.trackError(errorType, errorMessage, context);
}

export default analytics;
