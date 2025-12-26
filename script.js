// Affiliate Launch Kit Generator - Interactive Form Handler

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('generator-form');
    const generateBtn = document.getElementById('generate-btn');
    const previewCards = document.querySelectorAll('.preview-card');
    
    // Form submission handler
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const niche = document.getElementById('niche').value;
            const audience = document.getElementById('audience').value;
            const platform = document.getElementById('platform').value;
            
            if (!niche || !audience) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show loading state
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating Your Kit...';
            
            // Simulate generation process (replace with actual API call)
            await generateLaunchKit(niche, audience, platform);
            
            // Reset button
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generate Launch Kit';
        });
    }
    
    // Smooth scroll for CTA buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animate preview cards on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.card, .step, .preview-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Generate Launch Kit function
async function generateLaunchKit(niche, audience, platform) {
    try {
        // This would connect to your backend API
        // For now, simulate with a delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Create kit data
        const kitData = {
            niche: niche,
            audience: audience,
            platform: platform || 'Multi-platform',
            generatedDate: new Date().toISOString(),
            plan: generate7DayPlan(niche, audience),
            posts: generateSocialPosts(niche, audience),
            scripts: generateScripts(niche),
            trackingLinks: generateTrackingLinks(niche)
        };
        
        // Show success and download
        showSuccessModal(kitData);
        downloadKit(kitData);
        
    } catch (error) {
        console.error('Error generating kit:', error);
        alert('Error generating your kit. Please try again.');
    }
}

// Generate 7-day action plan
function generate7DayPlan(niche, audience) {
    const audienceStrategy = getAudienceStrategy(audience);
    
    return [
        { day: 1, task: `Set up ${niche} tracking and analytics`, focus: 'Foundation' },
        { day: 2, task: `Create content calendar for ${niche}`, focus: audienceStrategy.focus1 },
        { day: 3, task: 'Launch first outreach campaign', focus: audienceStrategy.focus2 },
        { day: 4, task: 'Engage with target audience', focus: 'Engagement' },
        { day: 5, task: 'Optimize and adjust messaging', focus: 'Optimization' },
        { day: 6, task: 'Scale successful tactics', focus: 'Growth' },
        { day: 7, task: 'Review metrics and plan next phase', focus: 'Analysis' }
    ];
}

// Generate social posts
function generateSocialPosts(niche, audience) {
    return [
        {
            title: 'Introduction Post',
            content: `Excited to share solutions for ${niche}! Let's connect.`,
            platform: 'All'
        },
        {
            title: 'Value Post',
            content: `Top 3 ways to succeed in ${niche}...`,
            platform: 'LinkedIn/Facebook'
        },
        {
            title: 'Testimonial Post',
            content: `Success story from the ${niche} space...`,
            platform: 'Instagram/Facebook'
        },
        {
            title: 'Educational Post',
            content: `Did you know about ${niche}?`,
            platform: 'All'
        },
        {
            title: 'Call-to-Action Post',
            content: `Ready to transform your ${niche} business?`,
            platform: 'All'
        }
    ];
}

// Generate scripts
function generateScripts(niche) {
    return {
        dm: `Hi [Name], I noticed you're in ${niche}. I have a resource that might help...`,
        call: `Thanks for taking my call. I specialize in helping ${niche} businesses...`,
        followUp: `Following up on our conversation about ${niche}...`
    };
}

// Generate tracking links
function generateTrackingLinks(niche) {
    const baseUrl = 'https://www.distilledfunding.com/partners';
    const utmParams = `?utm_source=affiliate&utm_medium=kit&utm_campaign=${encodeURIComponent(niche)}`;
    
    return {
        primary: baseUrl + utmParams,
        social: baseUrl + utmParams + '&utm_content=social',
        email: baseUrl + utmParams + '&utm_content=email'
    };
}

// Get audience-specific strategy
function getAudienceStrategy(audience) {
    const strategies = {
        '0-1k': { focus1: 'DM Outreach', focus2: 'Personal Connection' },
        '1-10k': { focus1: 'Content + DM', focus2: 'Community Building' },
        '10-100k': { focus1: 'Content Creation', focus2: 'Lead Magnet' },
        '100k+': { focus1: 'Content + Automation', focus2: 'Funnel Optimization' }
    };
    
    return strategies[audience] || strategies['0-1k'];
}

// Show success modal
function showSuccessModal(kitData) {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>🎉 Your Launch Kit is Ready!</h2>
            <p>Your personalized ${kitData.niche} kit has been generated.</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles dynamically
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .success-modal {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
            }
            .modal-content button {
                margin-top: 1rem;
                padding: 10px 20px;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
}

// Download kit as JSON (can be enhanced to create a ZIP)
function downloadKit(kitData) {
    const dataStr = JSON.stringify(kitData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${kitData.niche.replace(/\s+/g, '-')}-launch-kit.json`;
    link.click();
    URL.revokeObjectURL(url);
}

// Track button clicks for analytics
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const label = this.textContent.trim();
        console.log('CTA clicked:', label);
        // Add your analytics tracking here
        // Example: gtag('event', 'click', { event_category: 'CTA', event_label: label });
    });
});
