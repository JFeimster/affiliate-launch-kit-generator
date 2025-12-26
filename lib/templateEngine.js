// templateEngine.js - Dynamic content generation for Affiliate Launch Kit Generator

/**
 * Template Engine for generating personalized affiliate launch kits
 * Handles dynamic content creation based on niche, audience size, and platform
 */

class TemplateEngine {
    constructor() {
        this.templates = {
            plans: {},
            posts: {},
            scripts: {}
        };
        this.loadTemplates();
    }

    /**
     * Load all template data
     */
    async loadTemplates() {
        try {
            // In production, these would be loaded from JSON files
            this.templates.plans = this.getDefaultPlanTemplates();
            this.templates.posts = this.getDefaultPostTemplates();
            this.templates.scripts = this.getDefaultScriptTemplates();
        } catch (error) {
            console.error('Error loading templates:', error);
        }
    }

    /**
     * Generate complete launch kit
     */
    generateKit(niche, audienceSize, platform = 'Multi-platform') {
        const strategy = this.getAudienceStrategy(audienceSize);
        
        return {
            metadata: {
                niche: niche,
                audienceSize: audienceSize,
                platform: platform,
                generatedDate: new Date().toISOString(),
                strategy: strategy.name
            },
            plan: this.generate7DayPlan(niche, audienceSize, strategy),
            posts: this.generateSocialPosts(niche, audienceSize, platform),
            scripts: this.generateScripts(niche, audienceSize),
            trackingLinks: this.generateTrackingLinks(niche, platform)
        };
    }

    /**
     * Get strategy based on audience size
     */
    getAudienceStrategy(audienceSize) {
        const strategies = {
            '0-1k': {
                name: 'DM-First Strategy',
                focus1: 'Direct Outreach',
                focus2: 'One-on-One Engagement',
                contentVolume: 'low',
                personalTouch: 'high'
            },
            '1-10k': {
                name: 'Content + DM Strategy',
                focus1: 'Content Creation',
                focus2: 'Targeted Outreach',
                contentVolume: 'medium',
                personalTouch: 'medium'
            },
            '10-100k': {
                name: 'Content + Lead Magnet Strategy',
                focus1: 'Content Marketing',
                focus2: 'Lead Generation',
                contentVolume: 'high',
                personalTouch: 'low'
            },
            '100k+': {
                name: 'Scaling Strategy',
                focus1: 'Automation & Systems',
                focus2: 'Community Building',
                contentVolume: 'high',
                personalTouch: 'automated'
            }
        };
        
        return strategies[audienceSize] || strategies['1-10k'];
    }

    /**
     * Generate 7-day action plan
     */
    generate7DayPlan(niche, audienceSize, strategy) {
        const basePlan = [
            {
                day: 1,
                task: `Set up ${niche} tracking and analytics`,
                focus: 'Foundation',
                description: `Initialize your affiliate dashboard, set up tracking links, and configure analytics for ${niche}.`,
                timeEstimate: '2-3 hours',
                deliverables: ['Tracking links created', 'Analytics configured', 'Dashboard familiarized']
            },
            {
                day: 2,
                task: `Create content calendar for ${niche}`,
                focus: strategy.focus1,
                description: `Plan your content strategy targeting ${niche} with ${strategy.contentVolume} volume approach.`,
                timeEstimate: '2-4 hours',
                deliverables: ['7-day content calendar', 'Post ideas documented', 'Hashtags researched']
            },
            {
                day: 3,
                task: 'Launch first outreach campaign',
                focus: strategy.focus2,
                description: `Execute your ${strategy.name} with ${strategy.personalTouch} personal touch level.`,
                timeEstimate: '3-4 hours',
                deliverables: ['First batch of outreach completed', 'Response tracking started', 'Follow-up schedule created']
            },
            {
                day: 4,
                task: 'Engage with target audience',
                focus: 'Engagement',
                description: `Build relationships within the ${niche} community through comments, shares, and interactions.`,
                timeEstimate: '2-3 hours',
                deliverables: ['20+ meaningful interactions', 'New connections made', 'Community presence established']
            },
            {
                day: 5,
                task: 'Optimize and adjust messaging',
                focus: 'Optimization',
                description: `Review analytics, adjust messaging based on response rates, and refine your ${niche} positioning.`,
                timeEstimate: '2-3 hours',
                deliverables: ['Performance analyzed', 'Messaging refined', 'A/B tests planned']
            },
            {
                day: 6,
                task: 'Scale successful tactics',
                focus: 'Growth',
                description: `Double down on what's working. Increase volume of top-performing content and outreach methods.`,
                timeEstimate: '3-5 hours',
                deliverables: ['Successful tactics identified', 'Scaling plan created', 'Additional outreach executed']
            },
            {
                day: 7,
                task: 'Review metrics and plan next phase',
                focus: 'Analysis',
                description: `Comprehensive review of week 1 performance, document learnings, and plan week 2 strategy.`,
                timeEstimate: '2-3 hours',
                deliverables: ['Week 1 report completed', 'Key metrics documented', 'Week 2 plan outlined']
            }
        ];

        return basePlan;
    }

    /**
     * Generate social media posts
     */
    generateSocialPosts(niche, audienceSize, platform) {
        const posts = [
            {
                id: 1,
                title: 'Introduction Post',
                content: `🚀 Excited to share solutions specifically for ${niche}! \n\nI've partnered with an incredible funding program that's perfect for this space. Let's connect if you're looking to grow. 💼\n\n#${niche.replace(/\s+/g, '')} #BusinessGrowth #Funding`,
                platform: platform === 'Multi-platform' ? 'All' : platform,
                type: 'Introduction',
                bestTimeToPost: 'Morning (8-10 AM)',
                engagement: 'High'
            },
            {
                id: 2,
                title: 'Value Post',
                content: `Top 3 ways to succeed in ${niche}: 📊\n\n1️⃣ Access to capital when you need it\n2️⃣ Strong partner network\n3️⃣ Proven systems that work\n\nI help ${niche} professionals get all three. DM me to learn how. 👇`,
                platform: 'LinkedIn/Facebook',
                type: 'Educational',
                bestTimeToPost: 'Midday (12-2 PM)',
                engagement: 'Medium-High'
            },
            {
                id: 3,
                title: 'Success Story',
                content: `Just helped another ${niche} business secure funding! 🎉\n\nThe process was smooth, fast, and tailored to their specific needs.\n\nThat's what happens when you have the right partner. Want similar results? Let's talk. 💬`,
                platform: 'Instagram/Facebook',
                type: 'Social Proof',
                bestTimeToPost: 'Evening (5-7 PM)',
                engagement: 'High'
            },
            {
                id: 4,
                title: 'Educational Post',
                content: `💡 Did you know? Most ${niche} businesses don't realize they qualify for funding options beyond traditional banks.\n\nThere are programs specifically designed for your industry. I can show you what's available. Drop a 🔥 if you want to know more!`,
                platform: 'All',
                type: 'Educational',
                bestTimeToPost: 'Morning (9-11 AM)',
                engagement: 'Medium'
            },
            {
                id: 5,
                title: 'Call to Action',
                content: `Ready to take your ${niche} business to the next level? 📈\n\nI'm offering free consultations this week to discuss funding options that actually work for ${niche}.\n\nLimited spots available. Comment "INFO" or send me a DM to claim yours! ⏰`,
                platform: 'All',
                type: 'CTA',
                bestTimeToPost: 'Afternoon (2-4 PM)',
                engagement: 'Very High'
            }
        ];

        return posts;
    }

    /**
     * Generate communication scripts
     */
    generateScripts(niche, audienceSize) {
        return {
            dmOpener: {
                title: 'Direct Message Opener',
                script: `Hi [Name]! 👋\n\nI saw you're in the ${niche} space and wanted to reach out. I work with a funding program that's been helping ${niche} businesses scale faster.\n\nWould you be open to a quick 5-minute conversation about how it might help you? No pressure—just want to share what's working.\n\nBest,\n[Your Name]`,
                useCase: 'Initial cold outreach',
                tips: ['Personalize with their specific business', 'Mention a recent post or achievement', 'Keep it casual and brief']
            },
            callScript: {
                title: 'Phone Call Script',
                script: `Introduction:\n"Hi [Name], this is [Your Name]. Thanks for taking my call! I know you're busy, so I'll keep this brief."\n\nPurpose:\n"I work with ${niche} businesses and help them access capital when they need it most. I wanted to see if funding is something you're currently exploring or might need in the near future."\n\nDiscovery:\n"What are your biggest growth goals right now for your ${niche} business?"\n"Have you looked into funding options before? What was that experience like?"\n\nValue Proposition:\n"Based on what you've shared, I think our program could be a great fit because [specific reason]. We've helped several ${niche} businesses in similar situations."\n\nNext Steps:\n"I'd love to send you some information and set up a time to dive deeper. Does [day/time] work for a 15-minute follow-up call?"`,
                useCase: 'Initial discovery call',
                tips: ['Listen more than you talk', 'Ask open-ended questions', 'Focus on their needs, not your pitch']
            },
            followUp: {
                title: 'Follow-Up Message',
                script: `Hey [Name],\n\nJust following up on my last message about funding options for ${niche} businesses.\n\nI know timing might not have been right, but wanted to check in—are you still interested in learning more?\n\nIf now isn't the time, totally understand. Just let me know when makes sense for you! 👍\n\nBest,\n[Your Name]`,
                useCase: 'Second touch after no response',
                tips: ['Wait 3-5 days before following up', 'Keep it light and low-pressure', 'Give them an easy out']
            },
            objectionHandlers: {
                title: 'Common Objection Responses',
                objections: [
                    {
                        objection: "I'm not interested right now",
                        response: "I totally understand! Timing is everything. Can I ask—is it just the timing, or are there other concerns I should know about? That way when you are ready, I can make sure I address what matters most to you."
                    },
                    {
                        objection: "How much does it cost?",
                        response: "Great question! The actual cost depends on your specific situation and needs. The consultation is completely free, and I can give you exact numbers once I understand your ${niche} business better. When's a good time to discuss your specific scenario?"
                    },
                    {
                        objection: "I need to think about it",
                        response: "Absolutely, this is an important decision. Can I ask what specifically you'd like to think about? Maybe I can provide some additional information that would be helpful for your decision."
                    }
                ]
            }
        };
    }

    /**
     * Generate tracking links
     */
    generateTrackingLinks(niche, platform) {
        const baseUrl = 'https://www.distilledfunding.com/partners';
        const affiliateId = 'AFF' + Date.now();
        const nicheSlug = niche.toLowerCase().replace(/\s+/g, '-');
        
        return {
            primary: {
                url: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=${platform.toLowerCase()}`,
                description: 'Main affiliate link for all channels',
                utmParams: {
                    utm_source: platform.toLowerCase(),
                    utm_medium: 'affiliate',
                    utm_campaign: nicheSlug,
                    utm_content: affiliateId
                }
            },
            social: {
                facebook: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=facebook&utm_source=facebook&utm_medium=social&utm_campaign=${nicheSlug}`,
                instagram: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=instagram&utm_source=instagram&utm_medium=social&utm_campaign=${nicheSlug}`,
                linkedin: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=linkedin&utm_source=linkedin&utm_medium=social&utm_campaign=${nicheSlug}`,
                twitter: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=twitter&utm_source=twitter&utm_medium=social&utm_campaign=${nicheSlug}`,
                tiktok: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=tiktok&utm_source=tiktok&utm_medium=social&utm_campaign=${nicheSlug}`
            },
            email: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=email&utm_source=email&utm_medium=email&utm_campaign=${nicheSlug}`,
            bio: `${baseUrl}?ref=${affiliateId}&niche=${nicheSlug}&source=bio&utm_source=bio&utm_medium=referral&utm_campaign=${nicheSlug}`
        };
    }

    /**
     * Get default plan templates
     */
    getDefaultPlanTemplates() {
        return {
            ecommerce: [],
            coaching: [],
            finance: [],
            default: []
        };
    }

    /**
     * Get default post templates
     */
    getDefaultPostTemplates() {
        return {
            tiktok: [],
            instagram: [],
            linkedin: [],
            email: []
        };
    }

    /**
     * Get default script templates
     */
    getDefaultScriptTemplates() {
        return {
            dm: [],
            call: [],
            followUp: []
        };
    }

    /**
     * Export kit as JSON
     */
    exportKit(kitData) {
        const dataStr = JSON.stringify(kitData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `affiliate-launch-kit-${kitData.metadata.niche.replace(/\s+/g, '-')}-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TemplateEngine;
}
