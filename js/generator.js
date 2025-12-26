/**
 * Affiliate Launch Kit Generator - Main Generator Module
 * Handles the core logic for generating personalized launch plans
 */

import { templates } from './templates.js';
import { validateInputs } from './validation.js';
import { trackEvent } from './analytics.js';

class LaunchKitGenerator {
  constructor() {
    this.affiliateData = null;
    this.generatedPlan = null;
  }

  /**
   * Generate a complete 30-day launch plan
   * @param {Object} inputs - User inputs from the form
   * @returns {Object} Generated launch plan with all content
   */
  async generatePlan(inputs) {
    try {
      // Validate inputs
      const validation = validateInputs(inputs);
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }

      // Track generation start
      trackEvent('generate_plan_start', {
        platform: inputs.platform,
        experience: inputs.experience,
      });

      // Store affiliate data
      this.affiliateData = {
        name: inputs.name,
        email: inputs.email,
        platform: inputs.platform,
        experience: inputs.experience,
        niche: inputs.niche,
        timezone: inputs.timezone || 'America/New_York',
        affiliateId: this.generateAffiliateId(inputs.email),
        generatedAt: new Date().toISOString(),
      };

      // Generate all content sections
      this.generatedPlan = {
        overview: this.generateOverview(),
        weeklyPlans: this.generateWeeklyPlans(),
        socialContent: this.generateSocialContent(),
        videoScripts: this.generateVideoScripts(),
        emailSequence: this.generateEmailSequence(),
        trackingLinks: this.generateTrackingLinks(),
        resources: this.generateResources(),
      };

      // Track successful generation
      trackEvent('generate_plan_success', {
        platform: inputs.platform,
      });

      return this.generatedPlan;
    } catch (error) {
      trackEvent('generate_plan_error', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Generate overview section
   */
  generateOverview() {
    const { name, platform, experience } = this.affiliateData;
    
    return {
      title: `${name}'s 30-Day Launch Plan`,
      subtitle: `Personalized for ${platform} | ${experience} Level`,
      introduction: templates.overview.introduction
        .replace('{name}', name)
        .replace('{platform}', platform),
      goals: this.getGoalsByExperience(experience),
      keyMetrics: templates.overview.keyMetrics,
    };
  }

  /**
   * Generate weekly breakdown
   */
  generateWeeklyPlans() {
    const weeks = [];
    const weekTemplates = templates.weeklyPlans[this.affiliateData.experience];

    for (let i = 1; i <= 4; i++) {
      weeks.push({
        week: i,
        title: weekTemplates[i - 1].title,
        focus: weekTemplates[i - 1].focus,
        objectives: weekTemplates[i - 1].objectives,
        dailyTasks: this.generateDailyTasks(i),
        expectedResults: weekTemplates[i - 1].expectedResults,
      });
    }

    return weeks;
  }

  /**
   * Generate daily tasks for a specific week
   */
  generateDailyTasks(week) {
    const tasksTemplate = templates.dailyTasks[this.affiliateData.platform];
    const weekTasks = tasksTemplate[`week${week}`];

    return weekTasks.map((task, index) => ({
      day: index + 1 + (week - 1) * 7,
      task: task.replace('{niche}', this.affiliateData.niche),
      duration: this.estimateDuration(task),
      priority: this.calculatePriority(week, index),
    }));
  }

  /**
   * Generate social media content
   */
  generateSocialContent() {
    const platform = this.affiliateData.platform;
    const content = [];

    // Generate posts for each week
    for (let week = 1; week <= 4; week++) {
      const weekPosts = templates.socialContent[platform][`week${week}`];
      
      weekPosts.forEach((post, index) => {
        content.push({
          week: week,
          day: (week - 1) * 7 + index * 2 + 1,
          platform: platform,
          contentType: post.type,
          caption: this.personalizeSocialPost(post.caption),
          hashtags: post.hashtags,
          callToAction: post.cta,
          bestTimeToPost: this.calculateBestPostTime(platform),
          trackingLink: this.generateTrackingLink(`social_${platform}_w${week}_p${index + 1}`),
        });
      });
    }

    return content;
  }

  /**
   * Generate video scripts
   */
  generateVideoScripts() {
    const scripts = [];
    const scriptTemplates = templates.videoScripts[this.affiliateData.experience];

    scriptTemplates.forEach((script, index) => {
      scripts.push({
        videoNumber: index + 1,
        title: script.title.replace('{niche}', this.affiliateData.niche),
        hook: script.hook,
        outline: script.outline,
        script: this.expandVideoScript(script),
        duration: script.targetDuration,
        callToAction: script.cta,
        trackingLink: this.generateTrackingLink(`video_${index + 1}`),
      });
    });

    return scripts;
  }

  /**
   * Generate email sequence
   */
  generateEmailSequence() {
    const emails = [];
    const emailTemplates = templates.emailSequence;

    emailTemplates.forEach((email, index) => {
      emails.push({
        emailNumber: index + 1,
        dayToSend: email.day,
        subject: email.subject.replace('{name}', this.affiliateData.name),
        preheader: email.preheader,
        body: this.personalizeEmailBody(email.body),
        callToAction: email.cta,
        trackingLink: this.generateTrackingLink(`email_${index + 1}`),
      });
    });

    return emails;
  }

  /**
   * Generate tracking links
   */
  generateTrackingLinks() {
    const links = [];
    const baseUrl = 'https://moonshinecapital.com/affiliate';
    const affiliateId = this.affiliateData.affiliateId;

    // Main landing page
    links.push({
      name: 'Main Landing Page',
      url: `${baseUrl}?ref=${affiliateId}`,
      utmParams: `utm_source=${this.affiliateData.platform}&utm_medium=affiliate&utm_campaign=launch_kit`,
      shortUrl: this.generateShortUrl(affiliateId, 'main'),
    });

    // Platform-specific links
    const platforms = ['social', 'video', 'email', 'blog'];
    platforms.forEach(platform => {
      links.push({
        name: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`,
        url: `${baseUrl}?ref=${affiliateId}&source=${platform}`,
        utmParams: `utm_source=${this.affiliateData.platform}&utm_medium=${platform}&utm_campaign=launch_kit`,
        shortUrl: this.generateShortUrl(affiliateId, platform),
      });
    });

    return links;
  }

  /**
   * Generate resources section
   */
  generateResources() {
    return {
      brandAssets: {
        logo: 'https://moonshinecapital.com/assets/logo.png',
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
        },
        fonts: ['Inter', 'SF Mono'],
      },
      templates: [
        'Social Media Templates',
        'Email Templates',
        'Video Thumbnail Templates',
        'Banner Ads',
      ],
      supportLinks: {
        affiliateDashboard: 'https://moonshinecapital.com/affiliate/dashboard',
        knowledgeBase: 'https://moonshinecapital.com/affiliate/kb',
        supportEmail: 'affiliate@moonshinecapital.com',
        communityForum: 'https://community.moonshinecapital.com',
      },
    };
  }

  /**
   * Helper: Generate unique affiliate ID
   */
  generateAffiliateId(email) {
    const hash = this.simpleHash(email);
    const timestamp = Date.now().toString(36);
    return `MC${hash}${timestamp}`.toUpperCase().substring(0, 12);
  }

  /**
   * Helper: Simple hash function
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36).substring(0, 6);
  }

  /**
   * Helper: Generate tracking link
   */
  generateTrackingLink(campaign) {
    const affiliateId = this.affiliateData.affiliateId;
    return `https://moonshinecapital.com/go/${affiliateId}/${campaign}`;
  }

  /**
   * Helper: Generate short URL
   */
  generateShortUrl(affiliateId, type) {
    return `https://msc.to/${affiliateId}-${type}`;
  }

  /**
   * Helper: Personalize social post
   */
  personalizeSocialPost(caption) {
    return caption
      .replace('{name}', this.affiliateData.name)
      .replace('{niche}', this.affiliateData.niche)
      .replace('{platform}', this.affiliateData.platform);
  }

  /**
   * Helper: Personalize email body
   */
  personalizeEmailBody(body) {
    return body
      .replace('{name}', this.affiliateData.name)
      .replace('{email}', this.affiliateData.email)
      .replace('{niche}', this.affiliateData.niche);
  }

  /**
   * Helper: Expand video script
   */
  expandVideoScript(scriptTemplate) {
    const sections = scriptTemplate.outline.map(section => {
      return `${section}\n\n${scriptTemplate.script || '[Expand on this point with specific details and examples]'}`;
    });
    return sections.join('\n\n---\n\n');
  }

  /**
   * Helper: Get goals by experience level
   */
  getGoalsByExperience(experience) {
    const goalSets = {
      beginner: [
        'Generate first 10 referrals',
        'Build foundational content library',
        'Establish consistent posting schedule',
        'Learn tracking and analytics',
      ],
      intermediate: [
        'Generate 25-50 referrals',
        'Optimize conversion rates',
        'Build email list of 100+ subscribers',
        'Create advanced content strategy',
      ],
      advanced: [
        'Generate 100+ referrals',
        'Scale successful campaigns',
        'Build automated funnel system',
        'Develop brand partnerships',
      ],
    };
    return goalSets[experience] || goalSets.beginner;
  }

  /**
   * Helper: Calculate best post time
   */
  calculateBestPostTime(platform) {
    const bestTimes = {
      instagram: '9:00 AM, 2:00 PM, 7:00 PM',
      youtube: '2:00 PM, 5:00 PM',
      tiktok: '6:00 AM, 10:00 AM, 10:00 PM',
      twitter: '8:00 AM, 12:00 PM, 5:00 PM',
      linkedin: '8:00 AM, 12:00 PM, 5:00 PM',
      facebook: '9:00 AM, 1:00 PM, 3:00 PM',
    };
    return bestTimes[platform.toLowerCase()] || '9:00 AM, 2:00 PM';
  }

  /**
   * Helper: Estimate task duration
   */
  estimateDuration(task) {
    if (task.includes('video') || task.includes('script')) {
      return '60-90 minutes';
    }
    if (task.includes('post') || task.includes('content')) {
      return '30-45 minutes';
    }
    return '15-30 minutes';
  }

  /**
   * Helper: Calculate priority
   */
  calculatePriority(week, taskIndex) {
    if (week === 1 && taskIndex < 3) {
      return 'high';
    }
    if (taskIndex % 3 === 0) {
      return 'high';
    }
    if (taskIndex % 3 === 1) {
      return 'medium';
    }
    return 'low';
  }

  /**
   * Export plan as JSON
   */
  exportAsJSON() {
    return JSON.stringify({
      affiliate: this.affiliateData,
      plan: this.generatedPlan,
    }, null, 2);
  }

  /**
   * Get plan summary for display
   */
  getSummary() {
    if (!this.generatedPlan) {
      return null;
    }

    return {
      totalDays: 30,
      totalPosts: this.generatedPlan.socialContent.length,
      totalVideos: this.generatedPlan.videoScripts.length,
      totalEmails: this.generatedPlan.emailSequence.length,
      estimatedTimePerWeek: '8-12 hours',
      generatedAt: this.affiliateData.generatedAt,
    };
  }
}

// Export singleton instance
export const generator = new LaunchKitGenerator();
