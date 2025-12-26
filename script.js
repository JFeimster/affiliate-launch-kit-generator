// Affiliate Launch Kit Generator - Interactive Form Handler

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('generator-form');
  const generateBtn = document.getElementById('generate-btn');
  const results = document.getElementById('results');

  if (!form) return;

  if (!generateBtn) {
    console.error('Missing #generate-btn in index.html');
    return;
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const nicheEl = document.getElementById('niche');
    const audienceEl = document.getElementById('audience');
    const platformEl = document.getElementById('platform');

    const niche = nicheEl ? nicheEl.value.trim() : '';
    const audience = audienceEl ? audienceEl.value : '';
    const platform = platformEl ? platformEl.value : '';

    if (!niche || !audience) {
      alert('Please fill in all required fields');
      return;
    }

    generateBtn.disabled = true;
    const originalText = generateBtn.textContent;
    generateBtn.textContent = 'Generating Your Kit...';

    try {
      const kitData = await generateLaunchKit(niche, audience, platform);

      if (results) {
        results.innerHTML = renderResults(kitData);
      }

      downloadKit(kitData);
    } catch (err) {
      console.error(err);
      alert('Error generating your kit. Please try again.');
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = originalText;
    }
  });

  // Smooth scroll for hash links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});

async function generateLaunchKit(niche, audience, platform) {
  // Simulate generation latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const kitData = {
    niche,
    audience,
    platform: platform || 'Multi-platform',
    generatedDate: new Date().toISOString(),
    plan: generate7DayPlan(niche, audience),
    posts: generateSocialPosts(niche, audience),
    scripts: generateScripts(niche),
    trackingLinks: generateTrackingLinks(niche)
  };

  return kitData;
}

function generate7DayPlan(niche, audience) {
  const strategy = getAudienceStrategy(audience);

  return [
    { day: 1, task: `Set up your ${niche} positioning + offer`, focus: 'Foundation' },
    { day: 2, task: `Build a simple content calendar for ${niche}`, focus: strategy.focus1 },
    { day: 3, task: 'Send your first outreach batch (DM-first or content-first)', focus: strategy.focus2 },
    { day: 4, task: `Engage in 3 communities where ${niche} hangs out`, focus: 'Engagement' },
    { day: 5, task: 'Review clicks + replies; tighten hooks + CTA', focus: 'Optimization' },
    { day: 6, task: 'Double down on what got traction', focus: 'Growth' },
    { day: 7, task: 'Review results and plan week 2', focus: 'Analysis' }
  ];
}

function generateSocialPosts(niche, audience) {
  return [
    { title: 'Hook', content: `Most ${niche} owners don’t realize they can get funding without wasting weeks.\n\nIf you want the fast path, DM me “KIT”.` },
    { title: 'Value', content: `3 things that unlock approvals for ${niche}:\n1) Clean cash flow story\n2) Clear use of funds\n3) Simple documentation\n\nWant a checklist? DM “KIT”.` },
    { title: 'Myth', content: `Myth: You need perfect credit to get capital.\nReality: There are options based on business performance.\n\nIf you’re in ${niche}, DM “KIT”.` },
    { title: 'Proof angle', content: `Momentum beats motivation.\nA 7-day execution plan beats “someday”.\n\nIf you’re building in ${niche}, DM “KIT”.` },
    { title: 'CTA', content: `If you’re in ${niche} and want a simple launch plan + tracking links, I’ll send it.\n\nDM “KIT”.` }
  ];
}

function generateScripts(niche) {
  return {
    dm: `Hi [Name] — quick one.\nI work with ${niche} operators and can share a simple “7-day launch kit” to drive conversations + track results.\nWant it?`,
    call: `Thanks for taking the call. Before we talk options, what are you trying to accomplish in the next 30–60 days?`,
    followUp: `Circling back — do you want the ${niche} launch kit? If timing’s not right, no worries.`
  };
}

function generateTrackingLinks(niche) {
  // IMPORTANT: valid string (fixes your previous broken quote bug)
  const baseUrl = 'https://distilledfunding.com';
  const utm = `?utm_source=affiliate&utm_medium=kit&utm_campaign=${encodeURIComponent(niche)}`;

  return {
    primary: baseUrl + utm,
    social: baseUrl + utm + '&utm_content=social',
    email: baseUrl + utm + '&utm_content=email'
  };
}

function getAudienceStrategy(audience) {
  const strategies = {
    '0-1k': { focus1: 'DM Outreach', focus2: 'Personal Connection' },
    '1-10k': { focus1: 'Content + DM', focus2: 'Community Building' },
    '10-100k': { focus1: 'Content Creation', focus2: 'Lead Magnet' },
    '100k+': { focus1: 'Content + Automation', focus2: 'Funnel Optimization' }
  };
  return strategies[audience] || strategies['1-10k'];
}

function downloadKit(kitData) {
  const dataStr = JSON.stringify(kitData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${kitData.niche.replace(/\s+/g, '-')}-launch-kit.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderResults(kitData) {
  return `
    <div class="result-block">
      <h3>Launch Kit Generated</h3>
      <p class="subhead">Niche: <strong>${escapeHtml(kitData.niche)}</strong> · Audience: <strong>${escapeHtml(kitData.audience)}</strong> · Platform: <strong>${escapeHtml(kitData.platform)}</strong></p>
      <pre>${escapeHtml(JSON.stringify(kitData, null, 2))}</pre>
    </div>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
