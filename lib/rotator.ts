// Title and description rotator - generates human-like variations
// to avoid Craigslist duplicate detection

const titlePrefixes = [
  "🚀", "⚡", "💻", "🔧", "✅", "🌐", "📱", "🛠️", "✨", "🎯",
];

const titlePatterns = [
  "{emoji} {skill} - {benefit}",
  "{emoji} {benefit} | {skill}",
  "{skill} — {benefit} {emoji}",
  "{benefit} • {skill} {emoji}",
  "{emoji} Need {skill}? {benefit}",
  "{skill} for Your Business {emoji} {benefit}",
  "{emoji} Professional {skill} — {benefit}",
  "{benefit} with Expert {skill} {emoji}",
];

const skills = [
  "Web Development",
  "Full-Stack Developer",
  "Website Builder",
  "Web App Development",
  "React & Node.js Developer",
  "Next.js Developer",
  "Frontend & Backend Dev",
  "Custom Web Solutions",
];

const benefits = [
  "Fast, Secure, Scalable",
  "10+ Years Experience",
  "Affordable & Professional",
  "Quick Turnaround",
  "Modern & Responsive",
  "Clean Code, Real Results",
  "Performance-First Approach",
  "From Concept to Launch",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateTitle(): string {
  const pattern = pickRandom(titlePatterns);
  return pattern
    .replace("{emoji}", pickRandom(titlePrefixes))
    .replace("{skill}", pickRandom(skills))
    .replace("{benefit}", pickRandom(benefits));
}

export function generateTitles(count: number): string[] {
  const titles = new Set<string>();
  while (titles.size < count) {
    titles.add(generateTitle());
  }
  return Array.from(titles);
}

const descriptionBlocks = {
  intro: [
    "Looking for a developer who actually delivers? You found one.",
    "I build fast, modern websites and web apps that just work.",
    "Need a website that performs? Let's talk.",
    "Professional web development — no fluff, just results.",
    "Full-stack developer with 10+ years of shipping real products.",
  ],
  services: [
    `What I build:
• Custom websites & web apps
• React / Next.js frontends
• Node.js / Python backends
• REST & GraphQL APIs
• Database design & optimization`,
    `Services:
✔ Modern responsive websites
✔ Full-stack web applications
✔ API development & integrations
✔ Performance optimization
✔ AWS / cloud architecture`,
    `My stack:
→ React, Next.js, TypeScript
→ Node.js, Express, Python
→ PostgreSQL, MongoDB, Redis
→ AWS, Vercel, Docker
→ Tailwind CSS, modern UI/UX`,
  ],
  whyMe: [
    `Why work with me:
- 10+ years professional experience
- Clean, maintainable code
- Security-first development
- Fast communication & delivery`,
    `What sets me apart:
- Real production experience (not just tutorials)
- I optimize for speed & SEO
- Transparent pricing, no surprises
- Available for ongoing support`,
    `Why clients choose me:
✓ Fast turnaround times
✓ Code that scales
✓ Clear communication
✓ Fair, honest pricing`,
  ],
  cta: [
    "📩 Send me a message with your project details for a free estimate.",
    "📧 Email me today — I usually respond within a few hours.",
    "💬 Reach out and let's discuss your project. Free consultation.",
    "📩 Contact me for a quick quote. No obligation, no pressure.",
  ],
};

export function generateDescription(): string {
  const intro = pickRandom(descriptionBlocks.intro);
  const services = pickRandom(descriptionBlocks.services);
  const whyMe = pickRandom(descriptionBlocks.whyMe);
  const cta = pickRandom(descriptionBlocks.cta);

  return `${intro}\n\n${services}\n\n${whyMe}\n\n${cta}`;
}

export function rotateContent(baseTitle: string, baseDescription: string) {
  // If user provided custom content, make small variations
  // Otherwise generate from templates
  if (baseTitle && baseDescription) {
    return {
      title: baseTitle,
      description: baseDescription,
    };
  }
  return {
    title: generateTitle(),
    description: generateDescription(),
  };
}
