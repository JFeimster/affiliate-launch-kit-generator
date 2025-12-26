/**
 * Content Templates for Launch Kit Generator
 * Contains all template strings and structures
 */

export const templates = {
  overview: {
    introduction: `Welcome {name}! This personalized 30-day launch plan is designed to help you succeed as a Moonshine Capital affiliate on {platform}. Whether you're just starting out or looking to scale, this guide provides a clear roadmap with daily tasks, content ideas, and proven strategies.`,
    
    keyMetrics: [
      { metric: 'Referrals', target: '10-50', description: 'Quality referrals matter more than quantity' },
      { metric: 'Content Pieces', target: '30-60', description: 'Consistent posting builds momentum' },
      { metric: 'Engagement Rate', target: '3-5%', description: 'Focus on genuine connections' },
      { metric: 'Click-Through Rate', target: '2-4%', description: 'Optimize your calls-to-action' },
    ],
  },

  weeklyPlans: {
    beginner: [
      {
        title: 'Week 1: Foundation & Setup',
        focus: 'Getting started with the basics',
        objectives: [
          'Set up affiliate account and tracking',
          'Understand the product and brand',
          'Create first pieces of content',
          'Introduce yourself to your audience',
        ],
        expectedResults: '1-3 referrals, foundation established',
      },
      {
        title: 'Week 2: Content Creation',
        focus: 'Building your content library',
        objectives: [
          'Create consistent posting schedule',
          'Develop 3-5 core content pieces',
          'Start email list building',
          'Engage with your community',
        ],
        expectedResults: '3-5 referrals, content momentum',
      },
      {
        title: 'Week 3: Optimization',
        focus: 'Improving what works',
        objectives: [
          'Analyze performance metrics',
          'Double down on successful content',
          'Test different approaches',
          'Expand reach strategies',
        ],
        expectedResults: '5-8 referrals, optimization insights',
      },
      {
        title: 'Week 4: Scale & Systemize',
        focus: 'Building sustainable systems',
        objectives: [
          'Create content templates',
          'Automate where possible',
          'Plan next 30 days',
          'Celebrate wins and learn',
        ],
        expectedResults: '8-12 referrals, systems in place',
      },
    ],
    
    intermediate: [
      {
        title: 'Week 1: Advanced Setup',
        focus: 'Optimizing your foundation',
        objectives: [
          'Audit existing content and strategy',
          'Set up advanced tracking systems',
          'Create content calendar',
          'Identify growth opportunities',
        ],
        expectedResults: '5-10 referrals, strategy refined',
      },
      {
        title: 'Week 2: Content Amplification',
        focus: 'Scaling successful content',
        objectives: [
          'Repurpose top-performing content',
          'Create multi-platform campaigns',
          'Build email automation sequences',
          'Develop brand partnerships',
        ],
        expectedResults: '10-15 referrals, amplified reach',
      },
      {
        title: 'Week 3: Conversion Optimization',
        focus: 'Improving conversion rates',
        objectives: [
          'A/B test landing pages',
          'Optimize call-to-actions',
          'Refine audience targeting',
          'Improve funnel efficiency',
        ],
        expectedResults: '12-20 referrals, higher conversions',
      },
      {
        title: 'Week 4: Scale & Automate',
        focus: 'Building scalable systems',
        objectives: [
          'Implement automation tools',
          'Create evergreen content',
          'Develop passive income streams',
          'Plan scaling strategy',
        ],
        expectedResults: '15-25 referrals, automated systems',
      },
    ],
    
    advanced: [
      {
        title: 'Week 1: Strategic Positioning',
        focus: 'Establishing authority',
        objectives: [
          'Launch strategic campaign',
          'Create high-value content series',
          'Build strategic partnerships',
          'Optimize entire funnel',
        ],
        expectedResults: '20-30 referrals, authority positioned',
      },
      {
        title: 'Week 2: Multi-Channel Domination',
        focus: 'Expanding across platforms',
        objectives: [
          'Coordinate cross-platform campaigns',
          'Leverage paid advertising',
          'Build advanced automations',
          'Create viral content strategies',
        ],
        expectedResults: '30-50 referrals, multi-channel presence',
      },
      {
        title: 'Week 3: Optimization at Scale',
        focus: 'Data-driven scaling',
        objectives: [
          'Advanced analytics and attribution',
          'ROI optimization across channels',
          'Team building and delegation',
          'Strategic content investments',
        ],
        expectedResults: '40-60 referrals, optimized operations',
      },
      {
        title: 'Week 4: Sustainable Growth',
        focus: 'Long-term strategy',
        objectives: [
          'Build predictable systems',
          'Develop passive revenue streams',
          'Create scalable processes',
          'Plan 90-day strategy',
        ],
        expectedResults: '50+ referrals, sustainable growth',
      },
    ],
  },

  dailyTasks: {
    instagram: {
      week1: [
        'Set up Instagram bio with affiliate link',
        'Create introduction post about your {niche} journey',
        'Post first Reel showcasing product benefits',
        'Share story with swipe-up link',
        'Create carousel post explaining key features',
        'Go live to answer questions',
        'Post user testimonial or case study',
      ],
      week2: [
        'Create tutorial Reel',
        'Post before/after transformation',
        'Share behind-the-scenes story',
        'Post comparison content',
        'Create educational carousel',
        'Host Q&A session',
        'Post community spotlight',
      ],
      week3: [
        'Create trending audio Reel',
        'Post success story',
        'Share tips and tricks',
        'Create collaborative content',
        'Post myth-busting content',
        'Share personal experience',
        'Create compilation Reel',
      ],
      week4: [
        'Post monthly recap',
        'Create results showcase',
        'Share lessons learned',
        'Post strategic content',
        'Create final week push',
        'Share exclusive offer',
        'Post celebration content',
      ],
    },
    
    youtube: {
      week1: [
        'Upload introduction video',
        'Create product review video',
        'Post tutorial video',
        'Share comparison video',
        'Create FAQ video',
        'Post first impressions',
        'Upload weekly vlog',
      ],
      week2: [
        'Create how-to series part 1',
        'Post case study video',
        'Share tips compilation',
        'Create interview content',
        'Post troubleshooting guide',
        'Share success story',
        'Upload weekly update',
      ],
      week3: [
        'Create advanced tutorial',
        'Post behind-the-scenes',
        'Share optimization tips',
        'Create best practices guide',
        'Post community Q&A',
        'Share results reveal',
        'Upload weekly wrap-up',
      ],
      week4: [
        'Create monthly results video',
        'Post lessons learned',
        'Share future plans',
        'Create ultimate guide',
        'Post testimonial compilation',
        'Share special announcement',
        'Upload celebration video',
      ],
    },
    
    tiktok: {
      week1: [
        'Post quick intro video',
        'Create trending sound video',
        'Share product demo',
        'Post day-in-life video',
        'Create transition video',
        'Share quick tip',
        'Post storytime video',
      ],
      week2: [
        'Create educational series',
        'Post before/after',
        'Share hack video',
        'Create duet content',
        'Post reaction video',
        'Share mini tutorial',
        'Create compilation video',
      ],
      week3: [
        'Post trending challenge',
        'Create POV video',
        'Share transformation',
        'Post green screen video',
        'Create stitch content',
        'Share results video',
        'Post viral trend',
      ],
      week4: [
        'Create recap video',
        'Post highlights reel',
        'Share testimonials',
        'Create final push video',
        'Post celebration content',
        'Share exclusive offer',
        'Create thank you video',
      ],
    },
  },

  socialContent: {
    instagram: {
      week1: [
        {
          type: 'Reel',
          caption: 'Starting my journey with Moonshine Capital! Here's why I'm excited... #affiliate #entrepreneur #passiveincome',
          hashtags: ['affiliate', 'entrepreneur', 'passiveincome', 'sidehustle', 'financialfreedom'],
          cta: 'Link in bio to learn more!',
        },
        {
          type: 'Carousel',
          caption: '5 reasons why I chose Moonshine Capital as my affiliate partner 👇',
          hashtags: ['affiliatemarketing', 'makemoneyonline', 'workfromhome'],
          cta: 'Swipe to see all 5 reasons!',
        },
        {
          type: 'Story',
          caption: 'Day 3 update: Already seeing results! 📈',
          hashtags: [],
          cta: 'Swipe up to get started',
        },
      ],
      week2: [
        {
          type: 'Reel',
          caption: 'My affiliate marketing routine 🎯 Save this for later!',
          hashtags: ['affiliatemarketing', 'marketingstrategy', 'contentcreator'],
          cta: 'Follow for more tips!',
        },
        {
          type: 'Post',
          caption: 'Week 2 results are in! Here's what I learned...',
          hashtags: ['resultsdriven', 'affiliatesuccess', 'entrepreneurlife'],
          cta: 'Comment "RESULTS" for the full breakdown',
        },
      ],
      week3: [
        {
          type: 'Reel',
          caption: 'The 3 things that changed everything for my affiliate business',
          hashtags: ['businessgrowth', 'affiliatetips', 'entrepreneurmindset'],
          cta: 'Save this and thank me later!',
        },
      ],
      week4: [
        {
          type: 'Carousel',
          caption: '30 days of affiliate marketing: My complete results + lessons learned',
          hashtags: ['monthlyrecap', 'affiliateresults', 'transparency'],
          cta: 'DM me "START" to begin your journey',
        },
      ],
    },
    
    youtube: {
      week1: [
        {
          type: 'Video',
          caption: 'Why I Became a Moonshine Capital Affiliate (My Honest Review)',
          hashtags: [],
          cta: 'Link in description to join',
        },
      ],
      week2: [
        {
          type: 'Video',
          caption: 'How I Made My First Affiliate Sale in 7 Days',
          hashtags: [],
          cta: 'Subscribe for weekly updates',
        },
      ],
      week3: [
        {
          type: 'Video',
          caption: 'My Affiliate Marketing Strategy Revealed (Copy This)',
          hashtags: [],
          cta: 'Download my free template in description',
        },
      ],
      week4: [
        {
          type: 'Video',
          caption: '30-Day Affiliate Marketing Results (Showing Everything)',
          hashtags: [],
          cta: 'Join the program using my link below',
        },
      ],
    },
    
    tiktok: {
      week1: [
        {
          type: 'Video',
          caption: 'POV: You just found the perfect affiliate program #affiliatemarketing #sidehustle',
          hashtags: ['affiliatemarketing', 'sidehustle', 'makemoney', 'entrepreneur'],
          cta: 'Link in bio!',
        },
      ],
      week2: [
        {
          type: 'Video',
          caption: 'Day in the life of an affiliate marketer 📱',
          hashtags: ['dayinmylife', 'affiliate', 'workfromhome'],
          cta: 'Follow for more!',
        },
      ],
      week3: [
        {
          type: 'Video',
          caption: 'The affiliate marketing hack nobody talks about 🤫',
          hashtags: ['marketinghacks', 'affiliatetips', 'businesstips'],
          cta: 'Save this for later',
        },
      ],
      week4: [
        {
          type: 'Video',
          caption: 'My results after 30 days of affiliate marketing (shocked)',
          hashtags: ['results', 'affiliateresults', 'passive income'],
          cta: 'Comment for details',
        },
      ],
    },
  },

  videoScripts: {
    beginner: [
      {
        title: 'Why I Chose Moonshine Capital as My Affiliate Partner',
        hook: 'I spent 3 weeks researching affiliate programs, and here's why I chose Moonshine Capital...',
        outline: [
          'Introduction and background',
          'What I was looking for in an affiliate program',
          'Why Moonshine Capital stood out',
          'The commission structure explained',
          'Support and resources provided',
          'My plan for the next 30 days',
        ],
        targetDuration: '8-10 minutes',
        cta: 'Link in description to join as an affiliate',
      },
      {
        title: 'My First Week as a Moonshine Capital Affiliate',
        hook: 'I just completed my first week, and the results surprised me...',
        outline: [
          'Quick recap of the program',
          'What I did in week 1',
          'Challenges I faced',
          'Results and metrics',
          'Key lessons learned',
          'What I'm doing differently in week 2',
        ],
        targetDuration: '6-8 minutes',
        cta: 'Subscribe to follow my journey',
      },
    ],
    
    intermediate: [
      {
        title: 'How I Generate {niche} Referrals on Autopilot',
        hook: 'This simple system generates referrals while I sleep...',
        outline: [
          'Overview of my automation setup',
          'Content strategy breakdown',
          'Email funnel walkthrough',
          'Social media automation',
          'Results and ROI',
          'How to replicate this system',
        ],
        targetDuration: '12-15 minutes',
        cta: 'Download my automation template',
      },
    ],
    
    advanced: [
      {
        title: 'Scaling to $10K/Month in Affiliate Commissions',
        hook: 'Here's the exact strategy I used to scale from $0 to $10K per month...',
        outline: [
          'Starting point and goals',
          'The systems I built',
          'Traffic sources breakdown',
          'Conversion optimization strategies',
          'Scaling tactics that worked',
          'Mistakes to avoid',
          'Next steps to $20K+',
        ],
        targetDuration: '20-25 minutes',
        cta: 'Book a strategy call for personalized help',
      },
    ],
  },

  emailSequence: [
    {
      day: 1,
      subject: 'Welcome {name}! Your Launch Kit is Ready 🚀',
      preheader: 'Everything you need to succeed as an affiliate',
      body: `Hi {name},

Welcome to the Moonshine Capital affiliate family!

I'm excited to share your personalized 30-day launch plan. This isn't just another generic guide – it's specifically designed for your experience level and platform.

Inside your kit:
• Day-by-day action plan
• Ready-to-post content
• Video scripts and templates
• Email sequences
• Custom tracking links

Ready to get started? Your first task is simple...

[Continue to dashboard]

To your success,
The Moonshine Capital Team`,
      cta: 'Access Your Dashboard',
    },
    {
      day: 3,
      subject: 'Quick win: Your first referral strategy',
      preheader: 'Get your first commission this week',
      body: `Hey {name},

Hope your first couple days have been great!

Let me share the fastest way to get your first referral...

[Strategy details]

Try this today and let me know how it goes!

Questions? Just reply to this email.

Cheers,
The MC Team`,
      cta: 'Try This Strategy Now',
    },
    {
      day: 7,
      subject: 'Week 1 check-in: How's it going?',
      preheader: 'Let's review your progress',
      body: `Hi {name},

You've completed week 1! 🎉

Here's what successful affiliates did in their first week:
• Posted at least 3 times
• Sent tracking links to 10+ people
• Set up their email capture
• Joined the community forum

How are you doing on these? If you're stuck anywhere, I'm here to help.

Your week 2 focus...

[Week 2 preview]

Keep going!
The MC Team`,
      cta: 'View Week 2 Plan',
    },
    {
      day: 14,
      subject: 'Halfway there! Here's what's working...',
      preheader: 'Your mid-month progress report',
      body: `{name},

You're halfway through your 30-day launch!

Based on your activity, here's what I'm seeing:
• [Metric 1]
• [Metric 2]
• [Metric 3]

For the second half, let's focus on...

[Optimization strategies]

You've got this!
The MC Team`,
      cta: 'See Your Analytics',
    },
    {
      day: 30,
      subject: '30 days complete! 🎊 What's next?',
      preheader: 'Your results + next steps',
      body: `Congratulations {name}!

You completed your 30-day launch plan! 🎉

Your results:
• [Referrals generated]
• [Content created]
• [Systems built]

This is just the beginning. Here's your next 30-day plan...

[Next steps]

Proud of your progress!
The MC Team`,
      cta: 'Get Your Next 30-Day Plan',
    },
  ],
};

export default templates;
