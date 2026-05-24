const Database = require("better-sqlite3");
const db = new Database("/Users/bheng/Sites/cl-poster/cl-poster.db");

const IMG = '["/posts/post-5.jpg"]';
const LOC = "springfield";
const CAT = "services";
const SUB = "computer";

const posts = [
  // ========== RESTAURANTS & FOOD TRUCKS (3) ==========
  {
    title: "Restaurant Owners: Your Menu Deserves More Than a PDF on Facebook",
    description: `Still posting your menu as a blurry photo on social media? Customers are searching "best tacos near me" right now — and finding your competitor instead.

I build clean, appetizing restaurant websites with:
- Online menu with photos and descriptions
- Reservation / order-ahead integration
- Google Maps and hours front and center
- Mobile-friendly (because 80% of food searches happen on phones)

Flat rate, no monthly fees, done in under 2 weeks.

"The restaurants that show up online are the restaurants that stay open. Period."`,
    price: 0,
  },
  {
    title: "Food Truck Owners — Stop Relying on Instagram to Tell People Where You Are",
    description: `You spent thousands on your truck, your recipes, your brand. But when someone Googles your name, what do they find? A dead Facebook page?

I'll build you a food truck website with:
- Live location / schedule updater YOU can change from your phone
- Menu with mouthwatering photos
- Catering inquiry form
- Links to your social + review sites

Fast turnaround. One flat price. No contracts.

"Your food speaks for itself — but only if people can find you first."`,
    price: 0,
  },
  {
    title: "Restaurants: Get a Website That Actually Brings People Through the Door",
    description: `A website isn't a luxury for restaurants anymore — it's the front door. 77% of diners check a restaurant's website before visiting.

What I build for restaurant owners:
- Beautiful homepage with your best food photography
- Online ordering or reservation links
- Google Business integration so your hours/address are always correct
- Fast-loading, works perfectly on any phone

I've helped local eateries double their weekday traffic with just a website and proper Google setup.

"If your restaurant isn't online, it's invisible. And invisible restaurants close."`,
    price: 0,
  },

  // ========== REAL ESTATE AGENTS & BROKERS (3) ==========
  {
    title: "Real Estate Agents: Your Zillow Profile Isn't Enough Anymore",
    description: `Every agent has a Zillow page. The ones closing deals have their OWN website — with their brand, their listings, their testimonials.

I build real estate websites that:
- Showcase your active listings with photo galleries
- Capture buyer/seller leads with smart contact forms
- Feature your reviews and sold properties
- Rank on Google for "[your city] real estate agent"

You wouldn't sell a house without staging it. Don't sell yourself without a website.

"In real estate, your online presence IS your first impression. Make it count."`,
    price: 0,
  },
  {
    title: "Realtors — I'll Build You a Website That Generates Leads While You Sleep",
    description: `You're great at closing. But are you great at getting found online?

Most agents rely on their brokerage's generic page. That doesn't build YOUR brand. I create custom real estate websites with:
- IDX listing integration
- Neighborhood guides & market reports
- Lead capture with automatic email follow-up
- Testimonial showcase
- Blog-ready for SEO content

One-time investment. Your own corner of the internet.

"The agent with the best online presence wins the listing. Every time."`,
    price: 0,
  },
  {
    title: "Brokers & Teams: Custom Real Estate Website with Your Branding",
    description: `Running a team or brokerage? Your agents need a professional web presence under YOUR brand — not some cookie-cutter template.

I build brokerage websites featuring:
- Individual agent profile pages
- Team listings aggregated in one place
- CRM-ready lead forms
- Mobile-optimized property search
- Branded everything — your colors, your logo, your identity

Let's talk. I work fast and I understand the real estate business.

"Your brand is your business. Own it online or someone else will."`,
    price: 0,
  },

  // ========== DENTISTS & DOCTORS (3) ==========
  {
    title: "Dentists: Patients Are Googling You Before They Call. What Do They Find?",
    description: `83% of patients check a doctor's website before booking. If yours is outdated or nonexistent, they're booking with the dentist down the street.

I build dental practice websites with:
- Service pages (cleanings, implants, cosmetic, emergency)
- Online appointment request forms
- Insurance info & new patient forms (downloadable)
- Before/after galleries
- Google reviews integration

HIPAA-conscious design. Professional. Clean. Done in 10 days.

"Your smile is your business. Your website should make patients smile too."`,
    price: 0,
  },
  {
    title: "Medical Practices — A Professional Website Builds Patient Trust Instantly",
    description: `Patients don't just want a good doctor. They want a doctor who LOOKS professional online. An outdated website (or no website) raises red flags.

I create medical practice websites featuring:
- Provider bios with credentials and photos
- Service descriptions patients can actually understand
- HIPAA-compliant contact forms
- Telehealth scheduling links
- Mobile-responsive for on-the-go searches

Your expertise deserves a website that reflects it.

"Trust starts online. Before they ever sit in your chair, they've already judged your website."`,
    price: 0,
  },
  {
    title: "Doctor's Office Websites — Modern, Clean, Patient-Friendly Design",
    description: `Is your practice website from 2012? Patients notice. They associate an old website with outdated care — fair or not.

I redesign medical websites to be:
- Fast, modern, and mobile-first
- Easy to navigate (services, providers, contact, portal)
- ADA accessible (required for healthcare!)
- Integrated with your booking system
- SEO-optimized so new patients find you on Google

Affordable. Professional. No long-term contracts.

"A modern website tells patients you care about every detail — including their first impression."`,
    price: 0,
  },

  // ========== YOGA STUDIOS & GYMS (3) ==========
  {
    title: "Yoga Studios: Your Vibe Deserves a Website That Matches It",
    description: `You've created a beautiful, calming space for your students. But does your online presence reflect that? Or is it a cluttered Facebook page with inconsistent class times?

I design yoga studio websites with:
- Class schedule (easy for YOU to update)
- Instructor bios with photos
- Online class pass / membership sign-up
- Workshop & retreat announcements
- Peaceful, on-brand design that feels like YOUR studio

Your practice is intentional. Your website should be too.

"The energy you put into your studio should flow through every pixel of your website."`,
    price: 0,
  },
  {
    title: "Gym Owners — Get a Website That Converts Visitors into Members",
    description: `People search "gyms near me" hundreds of times a day in your city. When they find you, what do they see?

I build gym & fitness websites designed to convert:
- Membership plans with sign-up buttons
- Class schedules & trainer profiles
- Facility photo tours
- Free trial / first-visit offer capture
- Google Maps, hours, and contact info prominent

No fluff. Just a website that turns clicks into memberships.

"Your competition has a website. Your future members are already on it."`,
    price: 0,
  },
  {
    title: "Fitness Studios & Personal Training — Websites That Get You Clients",
    description: `Whether you run a CrossFit box, Pilates studio, or boxing gym — if people can't find you online, they're going somewhere else.

I build fitness websites with:
- Class booking integration
- Transformation galleries & testimonials
- Pricing pages that don't scare people away
- Blog section for workout tips & SEO traffic
- Fast, mobile-first, Instagram-connected

Let's build something as strong as the community you've created.

"Fitness is personal. Your website should feel that way too."`,
    price: 0,
  },

  // ========== AUTO REPAIR & DETAILING (3) ==========
  {
    title: "Auto Repair Shops: Your Customers Are Searching Google, Not the Yellow Pages",
    description: `When someone's car breaks down, they Google "auto repair near me." If you don't show up, you don't exist.

I build auto shop websites with:
- Services listed clearly (brakes, engine, transmission, oil, tires)
- Online appointment requests
- Google reviews displayed prominently
- Directions, hours, phone number — impossible to miss
- Mobile-friendly (because they're searching from the side of the road)

Simple. Affordable. Gets you more calls.

"The mechanic with the best Google presence gets the call. Make sure that's you."`,
    price: 0,
  },
  {
    title: "Auto Detailing Businesses — Show Off Your Work with a Stunning Website",
    description: `Your detail work is art. But if your only portfolio is Instagram stories that disappear in 24 hours, you're leaving money on the table.

I build auto detailing websites with:
- Before/after photo galleries that make jaws drop
- Service packages with clear pricing
- Online booking for appointments
- Google Business optimization
- Ceramic coating, PPF, interior detail pages

Your work speaks for itself. Let's give it a permanent stage.

"A picture is worth a thousand words. A website full of your best work is worth a thousand customers."`,
    price: 0,
  },
  {
    title: "Mechanics & Body Shops — A Simple Website That Brings Real Customers",
    description: `You don't need a fancy website. You need one that WORKS. One that shows up on Google, lists your services, and makes it easy to call or book.

That's exactly what I build:
- Clean homepage with your services and specialties
- Click-to-call button for mobile visitors
- Google Maps embedded
- Customer testimonials
- ASE certification and warranty info displayed

No monthly fees. No contracts. Just a website that pays for itself.

"Every day without a website, customers drive past your shop to the one they found on Google."`,
    price: 0,
  },

  // ========== PET GROOMERS & VET CLINICS (3) ==========
  {
    title: "Pet Groomers: Your Adorable Transformations Deserve a Real Website",
    description: `You turn scruffy pups into showstoppers every day. But where do people see your work? A Facebook album from 2019?

I build pet grooming websites with:
- Before/after photo galleries (the BEST marketing tool you have)
- Service menu with pricing
- Online booking integration
- New client intake forms
- "Meet the groomers" section with bios

Pet parents research online before trusting someone with their fur baby. Give them a reason to choose you.

"Pet parents don't pick groomers randomly. They pick the one with the best online presence."`,
    price: 0,
  },
  {
    title: "Veterinary Clinics — A Website That Builds Trust Before the First Visit",
    description: `Pet owners are fiercely loyal — but they choose their FIRST vet online. If your website looks outdated or hard to navigate, they'll call the clinic with the nicer site.

I build vet clinic websites featuring:
- Provider bios with credentials and friendly photos
- Services: wellness, surgery, dental, emergency
- Online appointment requests
- New patient registration forms
- Pet health resources & blog

Professional, warm, trustworthy design.

"Pet owners trust vets who look trustworthy — and that starts with your website."`,
    price: 0,
  },
  {
    title: "Dog Walkers, Pet Sitters & Boarding — Get a Website That Books You Solid",
    description: `Rover and Wag take a massive cut. Your own website? Zero commission. Plus you build YOUR brand, not theirs.

I create pet services websites with:
- Service packages and pricing
- Client testimonial section
- Photo gallery of happy pets
- Contact form / booking request
- Service area map
- Social media integration

Stop giving 20% to an app. Own your online presence.

"The best pet care providers don't rely on apps. They have their own website and their own clients."`,
    price: 0,
  },

  // ========== TUTORING & EDUCATION (3) ==========
  {
    title: "Tutors: Parents Google Before They Hire. Do You Show Up?",
    description: `Parents don't hire the first tutor they find. They research. They compare. They look for credentials, reviews, and professionalism.

I build tutor websites that:
- Highlight your qualifications and teaching philosophy
- List subjects, grade levels, and test prep specialties
- Show parent testimonials
- Allow online booking for sessions
- Include a blog for SEO (study tips, exam prep guides)

Stand out from the sea of Craigslist ads with a real website.

"The tutor with the professional website gets hired over the one with just a Craigslist ad. Every time."`,
    price: 0,
  },
  {
    title: "Online Tutoring & Course Creators — Websites That Sell Your Knowledge",
    description: `You're an expert. But are you packaging that expertise in a way that attracts students and commands premium rates?

I build education websites with:
- Course catalog with descriptions and pricing
- Student registration & payment integration
- Zoom/Google Meet scheduling
- Student testimonials & success stories
- Resource library (downloadable materials)

Your knowledge is valuable. Present it that way.

"Knowledge is power — but only if people can find you and trust you enough to pay for it."`,
    price: 0,
  },
  {
    title: "Learning Centers & After-School Programs — Professional Websites That Enroll Students",
    description: `Parents want to see your facility, your programs, your staff, and your results BEFORE they enroll their child. A website makes all of that possible.

I build learning center websites featuring:
- Program descriptions with age groups and schedules
- Staff bios and qualifications
- Photo gallery of your facility
- Online enrollment forms
- Parent portal links
- FAQ section

Make enrollment easy. Make your center impossible to ignore.

"Parents choose programs that look professional. Your website is your first interview."`,
    price: 0,
  },

  // ========== PHOTOGRAPHY STUDIOS (3) ==========
  {
    title: "Photographers: Your Portfolio Website Is Your #1 Sales Tool",
    description: `You can be the most talented photographer in town — but if your portfolio lives only on Instagram (where the algorithm decides who sees it), you're handicapping yourself.

I build photography portfolio websites with:
- Stunning, full-screen image galleries
- Category-based portfolios (weddings, portraits, commercial)
- Client inquiry forms
- Pricing guide pages
- Blog for SEO and behind-the-scenes content
- Fast loading even with high-res images

Own your portfolio. Own your brand.

"Instagram can change its algorithm tomorrow. Your website is yours forever."`,
    price: 0,
  },
  {
    title: "Wedding & Event Photographers — A Website That Books You Year-Round",
    description: `Couples planning a wedding look at 5-10 photographer websites before reaching out. If yours doesn't immediately wow them, you're not even in the running.

I design wedding photography sites with:
- Emotionally compelling gallery layouts
- "About me" sections that connect with couples
- Package pricing (or "inquire for pricing" approach)
- Testimonials from happy couples
- Blog for SEO: "Best wedding venues in [city]"

Let your work sell itself — on a website worthy of it.

"Your photos tell love stories. Your website should tell yours."`,
    price: 0,
  },
  {
    title: "Headshot & Commercial Photographers — Websites That Attract Corporate Clients",
    description: `Corporate clients don't find photographers on Instagram. They Google. They look for professionalism, portfolio quality, and easy booking.

I build commercial photography websites with:
- Corporate portfolio section (headshots, product, branding)
- Client logos / brands you've worked with
- Streamlined inquiry process
- Blog content targeting "corporate headshots [city]"
- Lightning-fast load times

Land bigger clients with a website that matches their expectations.

"Corporate clients judge your professionalism before they judge your photos. Your website is the test."`,
    price: 0,
  },

  // ========== TATTOO SHOPS (2) ==========
  {
    title: "Tattoo Artists: Your Portfolio Shouldn't Live Only on Instagram",
    description: `What happens when Instagram goes down? Or changes the algorithm? Or shadowbans your account because of skin content?

Your tattoo portfolio needs a permanent home:
- High-quality gallery organized by style (traditional, realism, blackwork, etc.)
- Artist profiles with individual portfolios
- Online booking / consultation request forms
- Aftercare instructions page
- Shop policies, hours, and location

Build something that's YOURS. Not Meta's.

"Your art is permanent. Your online presence should be too."`,
    price: 0,
  },
  {
    title: "Tattoo Shops — Book More Appointments with a Professional Website",
    description: `Walk-ins are great. But the big custom pieces? Those clients research. They browse portfolios. They compare artists. And they book through websites.

I build tattoo shop websites with:
- Individual artist pages with style-specific galleries
- Appointment request forms with design upload
- Flash sheet displays
- Guest artist announcements
- Google Maps and hours

Stop losing custom work to shops with better websites.

"In the tattoo world, your portfolio is everything. Put it where everyone can see it."`,
    price: 0,
  },

  // ========== FLORISTS & GIFT SHOPS (2) ==========
  {
    title: "Florists: Compete with 1-800-Flowers by Owning Your Local Market Online",
    description: `National delivery services are eating local florists alive. But here's the secret: people WANT to buy local. They just can't find you.

I build florist websites with:
- Beautiful product galleries organized by occasion
- Online ordering with delivery scheduling
- Subscription / recurring delivery options
- Wedding & event inquiry forms
- SEO targeting "florist in [your city]"

Take back your local market. The big companies can't match your quality — but they CAN outrank you on Google. Let's fix that.

"Local businesses win when local customers can find them. It's that simple."`,
    price: 0,
  },
  {
    title: "Gift Shops & Boutiques — An Online Store That Runs 24/7",
    description: `Your shop closes at 6pm. Your website never closes. Every hour you're not selling online is revenue you're leaving on the table.

I build boutique e-commerce websites with:
- Product catalog with categories and search
- Secure online payments
- Inventory management
- Gift card purchases
- "New arrivals" and "Staff picks" features
- Local pickup or shipping options

Your curated collection deserves more than four walls.

"A website turns your local shop into a 24/7 store that reaches the whole world."`,
    price: 0,
  },

  // ========== DAYCARE CENTERS (2) ==========
  {
    title: "Daycare Centers: Parents Won't Enroll Without Checking Your Website First",
    description: `Choosing childcare is one of the biggest decisions a parent makes. They research obsessively. If your center doesn't have a professional, trustworthy website, you lose enrollment to the one that does.

I build daycare websites with:
- Program info by age group (infants, toddlers, pre-K)
- Staff bios with photos and credentials
- Virtual tour / facility photo gallery
- Parent testimonials
- Online waitlist / enrollment inquiry forms
- Licensing and safety information

Trust is everything in childcare. Build it online.

"Parents choose the daycare that looks safest and most professional. That judgment starts on your website."`,
    price: 0,
  },
  {
    title: "Preschools & Childcare — Enroll More Families with a Website That Builds Trust",
    description: `Word of mouth is great. But even referrals check your website before they call. What will they find?

I create preschool websites featuring:
- Your educational philosophy and curriculum highlights
- Daily schedule samples
- Meal/nutrition information
- Parent communication portal links
- Calendar of events
- Easy-to-find enrollment information

Professional, warm, and reassuring — exactly what parents need to see.

"Every family that visits your website is a family considering your program. Make the answer easy."`,
    price: 0,
  },

  // ========== INSURANCE AGENTS (2) ==========
  {
    title: "Insurance Agents: Stop Relying on Your Carrier's Generic Page",
    description: `Your State Farm or Allstate page looks exactly like every other agent's page. Zero differentiation. Zero personality. Zero reason to pick YOU.

I build custom insurance agent websites with:
- Your personal brand and story
- Services breakdown (auto, home, life, business)
- Quote request forms that go directly to YOU
- Client testimonials and Google reviews
- Blog content for SEO: "Do I need umbrella insurance?"

Be the agent people remember, not the one they skip past.

"People don't buy insurance from companies. They buy from people they trust. Your website builds that trust."`,
    price: 0,
  },
  {
    title: "Independent Insurance Agencies — A Website That Generates Leads Daily",
    description: `Your agency offers something the big carriers can't: personal service and choice. But does your online presence communicate that?

I build agency websites that generate leads:
- Multi-carrier advantage explained clearly
- Quote request forms for each insurance type
- Client success stories / claims testimonials
- Team page with bios
- Educational content that ranks on Google
- Referral program promotion

Your independence is your strength. Advertise it.

"The agency with the best website gets the quote request. That's just how it works now."`,
    price: 0,
  },

  // ========== ACCOUNTING & TAX (2) ==========
  {
    title: "Tax Preparers & CPAs — Clients Are Comparing You Online Right Now",
    description: `Tax season is competitive. Clients don't just go to "their guy" anymore — they Google, compare, and choose the firm that looks most professional and trustworthy.

I build accounting firm websites with:
- Service pages: tax prep, bookkeeping, payroll, advisory
- Client portal links
- Secure document upload forms
- Team credentials and certifications
- Blog: tax tips, deadline reminders, deduction guides

Look like the established firm you are — not a side hustle.

"Clients trust CPAs who present themselves professionally. Your website is your business card, office, and first impression rolled into one."`,
    price: 0,
  },
  {
    title: "Bookkeepers & Accountants — A Website That Makes You Look as Good as Your Numbers",
    description: `You're meticulous with finances. Is your online presence just as polished? Or is it a bare-bones page that hasn't been updated since Obama's second term?

I create accounting websites with:
- Clean, professional design that screams "I'm organized"
- Service tiers with clear pricing
- Client onboarding forms
- QuickBooks/Xero integration mentions
- Testimonials from business owners you've helped

Your attention to detail should show in every pixel.

"The accountant who looks professional online gets the client. The one with no website gets passed over."`,
    price: 0,
  },

  // ========== MOVING COMPANIES (2) ==========
  {
    title: "Moving Companies: Every Call Starts with a Google Search. Are You There?",
    description: `Someone's moving next month. They Google "movers near me." They see 10 results. They click the first 3 with good websites and reviews. Are you one of them?

I build moving company websites with:
- Instant quote request forms
- Service pages: local, long-distance, commercial, packing
- Photo gallery of your trucks and team
- Google reviews integration
- Service area maps
- FAQ: insurance, timing, pricing transparency

Simple website. More phone calls. More booked moves.

"When someone needs a mover, they need one NOW. The company with the best website gets the call."`,
    price: 0,
  },
  {
    title: "Local Movers — A Website That Turns Google Searches Into Booked Jobs",
    description: `You've got the trucks, the crew, the experience. But if your website looks sketchy (or doesn't exist), people won't trust you with their entire household.

I build mover websites focused on trust:
- Professional photos of your team and equipment
- Clear pricing structure or quote calculator
- Licensing, insurance, and bonding info displayed
- Moving tips blog for SEO traffic
- Easy contact: click-to-call, text, or form

Moving is stressful. Your website should make people feel confident choosing you.

"Trust is the #1 factor in choosing a moving company. Your website is where trust begins."`,
    price: 0,
  },

  // ========== CLEANING SERVICES (3) ==========
  {
    title: "House Cleaners: Get a Website That Fills Your Schedule Every Week",
    description: `You're amazing at what you do. But you're still getting clients from word of mouth and Nextdoor posts? There's a bigger world out there.

I build cleaning service websites with:
- Service packages: standard, deep clean, move-in/out
- Online booking with date/time selection
- Pricing calculator or transparent pricing
- Before/after photo galleries
- Client testimonials and reviews
- Service area map

Professional cleaning deserves a professional website.

"The cleaning service with the best website books solid. The one without a website scrambles for clients."`,
    price: 0,
  },
  {
    title: "Commercial Cleaning Companies — Websites That Win Contracts",
    description: `Property managers and business owners don't hire cleaning companies from Craigslist ads. They Google, compare websites, and request proposals from the ones that look professional.

I build commercial cleaning websites with:
- Services: office, retail, medical, post-construction
- Client list / logos of businesses you serve
- Proposal request forms
- Green cleaning / sustainability certifications
- Case studies and testimonials
- Insurance and bonding information

Land bigger contracts with a website that matches their expectations.

"In commercial cleaning, professionalism wins contracts. Your website is your proposal before the proposal."`,
    price: 0,
  },
  {
    title: "Maid Services & Janitorial — Book More Recurring Clients with a Real Website",
    description: `Recurring clients are the lifeblood of cleaning businesses. But recurring clients do their research. They want to see your services, your reviews, and your professionalism before committing.

Your website will feature:
- Recurring service plans with pricing
- One-time deep clean options
- Client portal for scheduling changes
- Supply/product information (eco-friendly options)
- Team photos and background check info

Build trust. Book recurring. Grow predictably.

"A website doesn't just get you clients — it gets you the RIGHT clients. The ones who stay."`,
    price: 0,
  },

  // ========== HVAC COMPANIES (2) ==========
  {
    title: "HVAC Companies: When the AC Dies in July, They Google. Will They Find You?",
    description: `Emergency HVAC calls are the highest-value leads in your business. And every single one starts with a frantic Google search. If you're not on page one with a solid website, that call goes to someone else.

I build HVAC websites designed for leads:
- Emergency service prominently displayed
- Click-to-call buttons everywhere
- Services: install, repair, maintenance, duct cleaning
- Financing options highlighted
- Google reviews and BBB rating displayed
- Service area coverage map

The AC is broken. The search takes 30 seconds. Be the one they call.

"When it's 100 degrees and the AC is dead, nobody flips through the Yellow Pages. They Google. Be there."`,
    price: 0,
  },
  {
    title: "Heating & Cooling Pros — A Website That Generates Emergency Calls and Maintenance Plans",
    description: `Your business runs on two things: emergency calls and maintenance contracts. A great website delivers both.

I create HVAC websites with:
- Emergency service banner with phone number
- Seasonal maintenance plan sign-ups
- Equipment brand partnerships displayed
- Energy efficiency tips blog (great for SEO)
- Coupon/special offer sections
- Technician bios for trust-building

Your expertise keeps families comfortable. Your website should make finding you comfortable too.

"The HVAC company that shows up first on Google gets the call. That's the game now."`,
    price: 0,
  },

  // ========== ROOFING COMPANIES (2) ==========
  {
    title: "Roofers: Homeowners Google Before They Call. What Does Your Website Say?",
    description: `Roofing is a trust business. Homeowners are spending $8,000-$15,000. They're not calling the first name they see — they're researching. Hard.

I build roofing company websites that win jobs:
- Project galleries with before/after photos
- Services: repair, replacement, inspection, storm damage
- Manufacturer certifications (GAF, CertainTeed, Owens Corning)
- Free estimate request forms
- Financing options
- Google reviews and warranty information

You build roofs that last decades. Build a website that works just as hard.

"Homeowners choose roofers they trust. Trust starts with a professional website."`,
    price: 0,
  },
  {
    title: "Roofing Contractors — A Website That Turns Storm Season Into Your Best Quarter",
    description: `After every storm, homeowners panic-Google "roof repair near me." The companies with strong websites and good SEO book out for months. The ones without? They're waiting by the phone.

I build storm-ready roofing websites:
- Emergency storm damage page (instant quote form)
- Insurance claims assistance information
- Drone inspection gallery
- Material options with comparisons
- Service area with zip code targeting
- Fast-loading, mobile-first design

Be ready before the next storm hits.

"Storm season doesn't wait. Neither should your online presence."`,
    price: 0,
  },

  // ========== PAINTING COMPANIES (2) ==========
  {
    title: "Painters: Show Off Your Work Online — Before/After Galleries That Win Jobs",
    description: `Painting is visual. The best marketing you can do is SHOW your work. And a website is the best place to do it.

I build painting company websites with:
- Stunning before/after project galleries
- Interior and exterior service pages
- Color consultation information
- Free estimate forms
- Customer reviews and testimonials
- Service area map

Your work transforms homes. Let your website transform your business.

"A picture of your work is worth a thousand ads. A website full of them is priceless."`,
    price: 0,
  },
  {
    title: "House Painters & Commercial Painting — Get Found on Google, Book More Jobs",
    description: `"Painters near me" gets searched thousands of times per month. Are you showing up? Or is your competitor — the one with the nice website — getting all those calls?

I'll build you a painting website that ranks:
- SEO-optimized for your city + services
- Portfolio organized by project type
- Detailed service pages (interior, exterior, cabinet, deck)
- Instant quote request form
- Google Business Profile optimization included
- References and insurance info displayed

Paint the town — and the internet — with your brand.

"The painter with the best online portfolio gets the job. Make sure that's you."`,
    price: 0,
  },

  // ========== PERSONAL TRAINERS (2) ==========
  {
    title: "Personal Trainers: A Website That Gets You Clients Without the Gym's Cut",
    description: `The gym takes 40-60% of your training fees. With your own website and client base, you keep everything.

I build personal trainer websites with:
- Training philosophy and approach
- Client transformation galleries
- Package pricing and program descriptions
- Online booking for consultations
- Testimonials that sell your results
- Blog: workout tips, nutrition advice, motivation

Break free from the gym's payroll. Build your own brand.

"The trainers who build their own brand don't just survive — they thrive. It starts with a website."`,
    price: 0,
  },
  {
    title: "Fitness Coaches & Online Training — Websites That Scale Your Business Beyond 1-on-1",
    description: `You can only train so many people per day in person. But online? The ceiling disappears.

I build fitness coaching websites with:
- Online program sales pages
- Client intake questionnaires
- Progress tracking portal links
- Video content integration
- Meal plan / nutrition program pages
- Email list building for launches

Stop trading time for money. Start building a fitness brand.

"The best trainers don't just train people — they build empires. Every empire needs a home base."`,
    price: 0,
  },

  // ========== WEDDING PLANNERS (2) ==========
  {
    title: "Wedding Planners: Brides Find You Online. Make Sure They Stay.",
    description: `The modern bride starts planning on Pinterest and Google. She'll look at 10+ planner websites before reaching out. If yours doesn't instantly feel magical, organized, and trustworthy — she's gone.

I build wedding planner websites with:
- Dreamy, editorial-style design
- Portfolio of past weddings with gorgeous photos
- Service packages clearly explained
- Vendor team introductions
- Planning timeline / process overview
- Inquiry form that captures event details

You make dreams come true. Your website should feel like one.

"Every bride remembers how your website made her feel. Make her feel like she found THE one."`,
    price: 0,
  },
  {
    title: "Event Planners & Coordinators — A Website That Books Premium Clients",
    description: `Premium clients expect a premium online presence. If your website looks DIY, they'll assume your events do too.

I design event planner websites that attract high-end clients:
- Elegant, magazine-style layouts
- Event galleries organized by type (weddings, corporate, galas)
- Press features and publications
- Detailed planning process breakdown
- Client testimonials from memorable events
- Blog for SEO: "Best venues in [city]"

Charge what you're worth. Look like you're worth it.

"Your online presence sets the budget expectation. Cheap website = cheap clients."`,
    price: 0,
  },

  // ========== DJS & ENTERTAINMENT (2) ==========
  {
    title: "DJs: Your Mixcloud Page Isn't Booking You Gigs. A Real Website Will.",
    description: `Venues, event planners, and couples looking for a wedding DJ all do the same thing: Google. Your SoundCloud and Mixcloud profiles don't show up. A website does.

I build DJ & entertainment websites with:
- Embedded audio/video samples of your sets
- Event type specialties (weddings, clubs, corporate)
- Equipment list and setup photos
- Booking inquiry form with event details
- Client testimonials and past event gallery
- Press kit / EPK downloadable

Get off the platforms. Get your own stage online.

"DJs who have their own website get booked. DJs who don't get overlooked."`,
    price: 0,
  },
  {
    title: "Entertainment Companies — Band, DJ, Photo Booth — Websites That Book Events",
    description: `Whether you're a band, a DJ company, a photo booth rental, or a full entertainment company — your website is your audition tape.

I build entertainment websites with:
- Video reels and audio samples
- Package pricing for different event types
- Availability checker / inquiry calendar
- Reviews from event planners and couples
- Gallery of events you've rocked
- FAQ: what's included, setup requirements, etc.

Don't just perform. Market yourself like a pro.

"The entertainment company with the best website gets the wedding. The best playlist means nothing if nobody finds you."`,
    price: 0,
  },

  // ========== FOOD DELIVERY / MEAL PREP (2) ==========
  {
    title: "Meal Prep Businesses — Stop Using DoorDash. Build Your Own Online Ordering Site.",
    description: `DoorDash and UberEats take 30% of every order. That's YOUR profit. With your own website, you keep 100%.

I build meal prep & delivery websites with:
- Weekly menu with photos and nutrition info
- Online ordering with delivery zone setup
- Subscription meal plans (weekly, bi-weekly)
- Customer accounts for easy reordering
- Dietary filter: keto, vegan, gluten-free
- Delivery schedule and cutoff times

Own your customer relationship. Own your revenue.

"Every order through a third-party app costs you 30%. Every order through your website costs you nothing."`,
    price: 0,
  },
  {
    title: "Home Bakers & Cottage Food — A Website That Turns Your Kitchen Into a Business",
    description: `You make incredible food. Your customers rave about it. But you're taking orders through DMs and text messages? That's not scalable.

I build food business websites with:
- Product catalog with mouthwatering photos
- Order forms with date selection and customization
- Pricing clearly displayed
- Customer reviews and testimonials
- About page telling YOUR story
- FAQ: allergens, delivery, minimum orders

Go from side hustle to real business with a real website.

"The baker with a website looks like a business. The baker without one looks like a hobby."`,
    price: 0,
  },

  // ========== NONPROFIT ORGANIZATIONS (2) ==========
  {
    title: "Nonprofits: A Great Website Is Your Best Fundraising Tool",
    description: `Donors research before they give. Grant foundations check your website. Volunteers Google you before signing up. Your website is the foundation of every relationship your nonprofit builds.

I create nonprofit websites with:
- Mission statement and impact stories
- Online donation integration (one-time and recurring)
- Volunteer sign-up forms
- Event calendar
- Annual report / impact data
- Newsletter subscription

Amplify your mission. Make giving easy.

"Every dollar you don't raise because of a bad website is a life you don't change. Invest in your online presence."`,
    price: 0,
  },
  {
    title: "Charitable Organizations — Websites That Drive Donations and Volunteer Sign-Ups",
    description: `Your cause matters. But if your website doesn't clearly communicate what you do, who you help, and how people can get involved — you're leaving support on the table.

I build charity websites with:
- Compelling storytelling with photos and videos
- Secure donation processing
- Volunteer opportunity listings
- Sponsor and partner recognition
- Event registration
- Social media integration for sharing

Your mission deserves a megaphone. A great website IS that megaphone.

"People give to causes they understand and trust. Your website builds both."`,
    price: 0,
  },

  // ========== CHURCHES & RELIGIOUS ORGS (2) ==========
  {
    title: "Churches: First-Time Visitors Check Your Website Before They Walk Through the Door",
    description: `Someone new in town is looking for a church. They Google. They visit 3-4 church websites. They visit the ONE that felt welcoming, had service times, and showed what to expect.

I build church websites with:
- Welcome message and "what to expect" page
- Service times, location, and parking info
- Sermon archive (audio/video)
- Ministry and small group listings
- Online giving integration
- Event calendar and announcements

Be the church that welcomes people before they even arrive.

"Your website is your church's front door for the digital age. Make it wide open."`,
    price: 0,
  },
  {
    title: "Religious Organizations & Ministries — Connect Your Community Online",
    description: `Your congregation needs more than Sunday mornings. An active website keeps your community connected all week long.

I build ministry websites with:
- Live stream and sermon archive integration
- Small group finder
- Prayer request forms
- Event registration and church calendar
- Online tithing and donations
- Member directory (private, password-protected)

Bring your community closer — even when they can't be there in person.

"A connected church is a growing church. Your website is the connection point."`,
    price: 0,
  },

  // ========== LAWYERS & LEGAL SERVICES (3) ==========
  {
    title: "Attorneys: Your Website Is Your Most Important Client Acquisition Tool",
    description: `People facing legal issues Google before they call anyone. "Personal injury lawyer near me." "Divorce attorney [city]." "DUI lawyer."

If you're not on page one with a professional website, you're invisible to the people who need you most.

I build law firm websites with:
- Practice area pages optimized for SEO
- Attorney bios with credentials and bar admissions
- Case results and testimonials (within ethical guidelines)
- Free consultation request forms
- Blog for SEO: legal guides, FAQ articles
- Professional, trustworthy design

Your next client is Googling right now. Be there.

"The lawyer with the best website gets the consultation call. That's just how people find attorneys now."`,
    price: 0,
  },
  {
    title: "Solo Attorneys & Small Firms — Compete with Big Firms Online for a Fraction of the Cost",
    description: `Big firms spend $10K/month on their website and SEO. You don't have to. A well-built, SEO-optimized website can compete with firms 10x your size.

I build solo/small firm websites with:
- Clean, authoritative design
- Practice area landing pages (each optimized for Google)
- Client intake forms
- Avvo/Martindale rating badges
- Secure client portal links
- Mobile-first (most legal searches are on phones)

Punch above your weight online.

"The size of your firm doesn't matter online. The quality of your website does."`,
    price: 0,
  },
  {
    title: "Criminal Defense, Family Law, PI — Legal Websites That Generate Retainer Calls",
    description: `Different practice areas need different website strategies. A personal injury site needs case results. A family law site needs empathy. A criminal defense site needs urgency.

I build practice-specific legal websites:
- PI: case results, accident type pages, settlement calculator
- Family Law: compassionate design, divorce guides, custody FAQ
- Criminal: urgency-focused, 24/7 availability, case type pages
- Immigration: multilingual, visa type guides, success stories

Every practice area. Every angle. Every client touchpoint optimized.

"Your website should speak directly to the person in crisis who needs YOUR expertise. Generic doesn't convert."`,
    price: 0,
  },

  // ========== SEO & GOOGLE RANKING (3) ==========
  {
    title: "Is Your Business Invisible on Google? I'll Fix That.",
    description: `You have a website but nobody finds it. Sound familiar? Having a website isn't enough — it needs to RANK.

I offer SEO-focused website builds and redesigns:
- Keyword research specific to your industry and city
- On-page SEO: titles, descriptions, headers, schema markup
- Google Business Profile setup and optimization
- Page speed optimization (Google ranks fast sites higher)
- Mobile-first design (Google's #1 ranking factor)
- Monthly content strategy (optional)

Stop paying for a website that sits on page 5 of Google.

"A website on page 2 of Google might as well not exist. Let's get you on page 1."`,
    price: 0,
  },
  {
    title: "Local Business SEO: I'll Get You Found When Customers Search Your Services",
    description: `"Plumber near me." "Best pizza in Springfield." "Affordable dentist." These searches happen THOUSANDS of times per day in your area.

I build and optimize websites for local search:
- Google Maps pack optimization (the top 3 results with the map)
- City + service keyword targeting
- Google Business Profile management
- Review generation strategy
- Local backlink building
- Schema markup for local businesses

Your customers are already searching. Let them find YOU.

"90% of people don't go past the first page of Google. If you're not there, you don't exist."`,
    price: 0,
  },
  {
    title: "SEO Website Audit + Rebuild: Stop Wasting Money on a Website Nobody Finds",
    description: `You paid someone to build your website. Maybe it looks nice. But it's not bringing in any leads or calls. Why? Because it wasn't built for Google.

I'll audit your site and fix (or rebuild) it for SEO:
- Technical SEO audit: speed, mobile, indexing, errors
- Content audit: are your pages targeting the right keywords?
- Competitor analysis: what are your competitors doing that you're not?
- Rebuild plan with ROI-focused page structure
- Launch with proper redirects, sitemap, and Search Console setup

Stop guessing. Start ranking.

"If your website isn't on Google's first page, it's not a marketing tool. It's a digital business card nobody sees."`,
    price: 0,
  },

  // ========== SOCIAL MEDIA LANDING PAGES (2) ==========
  {
    title: "Need a Link-in-Bio Website? I Build Custom Landing Pages That Convert",
    description: `Linktree is fine for hobbies. But if you're running a business, you need a custom landing page that reflects YOUR brand — not someone else's.

I build custom link-in-bio pages and social media landing pages:
- Your branding, colors, and style
- Clickable links to your services, shop, booking
- Email capture / newsletter signup
- Social proof: reviews, press mentions
- Analytics so you know what's getting clicked
- Works as your link-in-bio AND standalone website

Look like a business, not a Linktree account.

"Your social media brings people to your link. Your landing page turns them into customers."`,
    price: 0,
  },
  {
    title: "Social Media Businesses: You Need a Website to Convert Followers Into Paying Clients",
    description: `You have 10K followers. But how many are paying clients? If the answer is "not enough," the problem isn't your content — it's that you don't have a website converting that attention into revenue.

I build conversion-focused websites for social media businesses:
- Sales pages for your services or products
- Booking/scheduling integration
- Email list building with lead magnets
- Testimonial showcase
- Portfolio or product gallery
- Instagram/TikTok feed integration

Followers are vanity. Revenue is sanity. Your website bridges the gap.

"Social media gets attention. Your website gets the sale. You need both."`,
    price: 0,
  },

  // ========== GOOGLE BUSINESS PROFILE (2) ==========
  {
    title: "Google Business Profile Optimization — Show Up in the Map Pack, Get More Calls",
    description: `When people search for local services, Google shows 3 businesses on the map BEFORE the regular results. That map pack gets 44% of all clicks.

I optimize your Google Business Profile AND build a website that strengthens it:
- Complete GBP setup with all categories and attributes
- Photo optimization (businesses with photos get 42% more direction requests)
- Review response strategy
- Q&A section management
- Website linked and optimized to support GBP rankings
- Weekly post strategy

Get into the map pack. Get more calls. It's that direct.

"The Google Map Pack is the most valuable real estate on the internet for local businesses. I'll get you there."`,
    price: 0,
  },
  {
    title: "Local Businesses: Your Google Listing Is Half-Empty. Let Me Fix It.",
    description: `I see it every day: businesses with incomplete Google Business Profiles. Wrong hours. No photos. No website link. No reviews response. It's costing you customers.

I offer complete GBP optimization + website build:
- Verify and complete every field in your profile
- Add professional photos (I'll guide you on what to shoot)
- Set up services, products, and attributes
- Create a website that reinforces your Google presence
- Implement review generation system
- Set up Google Posts calendar

This isn't complicated. But it IS the difference between 5 calls a month and 50.

"Your Google listing is often the FIRST thing people see. Make it perfect."`,
    price: 0,
  },

  // ========== WEBSITE REDESIGN / REBRAND (2) ==========
  {
    title: "Your Website Is Outdated. Let's Fix It Before It Costs You More Business.",
    description: `If your website was built more than 3 years ago, it's hurting you. Design trends change. Google's requirements change. User expectations change.

Signs you need a redesign:
- It's not mobile-friendly
- It loads slowly
- The design looks dated
- You're embarrassed to share the URL
- You're not getting leads or calls from it

I redesign websites with modern standards:
- Fresh, clean, professional design
- Mobile-first responsive layout
- SEO built into every page
- Fast loading (under 3 seconds)
- Clear calls to action

Stop apologizing for your website. Start being proud of it.

"Your website is your 24/7 salesperson. If it looks tired, so does your business."`,
    price: 0,
  },
  {
    title: "Rebranding? Your New Website Should Launch with Your New Look.",
    description: `New logo? New name? New direction? Your website needs to match. A rebrand without a website refresh is like a new paint job on a rusty car.

I handle full website rebrands:
- New visual identity applied consistently
- Content rewrite to match new messaging
- URL structure preserved (no SEO loss)
- 301 redirects for any changed pages
- Updated Google Business Profile
- Social media profile alignment

One cohesive brand. Everywhere. No loose ends.

"A rebrand is a promise to your customers. Your website is where you keep that promise."`,
    price: 0,
  },

  // ========== SPEED & PERFORMANCE (2) ==========
  {
    title: "Slow Website? You're Losing 40% of Visitors. I'll Make It Lightning Fast.",
    description: `Google says 53% of mobile users abandon sites that take longer than 3 seconds to load. If your website is slow, you're literally watching money walk away.

I optimize website speed and performance:
- Image compression and lazy loading
- Code minification (CSS, JavaScript)
- Server/hosting optimization
- Caching setup
- Core Web Vitals optimization (Google's speed metrics)
- CDN implementation for global speed

Before: 8-second load time. After: under 2 seconds. That's not a gimmick — it's what I do.

"Speed isn't a feature. It's a requirement. Every second of load time costs you customers."`,
    price: 0,
  },
  {
    title: "Website Running Like Molasses? I Fix Slow Sites — Fast.",
    description: `Your website loads... eventually. But your visitors don't wait. They hit the back button and go to your competitor. A slow site doesn't just frustrate users — it tanks your Google rankings too.

I diagnose and fix slow websites:
- Full speed audit with before/after metrics
- Database optimization
- Image and video optimization
- Remove bloated plugins and unnecessary scripts
- Upgrade hosting if needed (I'll recommend the best option)
- Ongoing monitoring setup

I've taken sites from 12-second load times to under 2 seconds. Let's talk.

"A fast website isn't optional anymore. Google ranks it. Users demand it. Your revenue depends on it."`,
    price: 0,
  },

  // ========== MOBILE-FIRST DESIGN (2) ==========
  {
    title: "60% of Your Visitors Are on Phones. Is Your Website Ready for Them?",
    description: `Pull out your phone. Visit your website. Is it easy to use? Can you read everything? Can you tap buttons without zooming? Can you find your phone number in 2 seconds?

If the answer to any of these is "no," you're losing more than half your potential customers.

I build mobile-first websites:
- Designed for phones FIRST, then scaled up to desktop
- Touch-friendly buttons and navigation
- Click-to-call phone numbers
- Fast loading on cellular connections
- Responsive images that don't eat data
- Google's mobile-first indexing compliant

Mobile isn't the future. It's the present. Is your website living in the past?

"If your website doesn't work on a phone, it doesn't work. Period."`,
    price: 0,
  },
  {
    title: "Mobile Website Design — Because Your Customers Aren't Sitting at Desks",
    description: `Here's a stat that should scare you: Google now uses the MOBILE version of your site to determine your search ranking. Not the desktop version. Mobile.

If your site isn't mobile-optimized, you're invisible on Google AND frustrating the 60%+ of visitors using phones.

I specialize in mobile-first web design:
- Thumb-friendly navigation
- Readable text without pinching/zooming
- Forms that are easy to fill on a phone
- Maps and directions one tap away
- Speed optimized for 4G/LTE connections

Your customers are mobile. Your website should be too.

"Google judges your website by its mobile version. If it's not mobile-first, you're last."`,
    price: 0,
  },

  // ========== ADA ACCESSIBILITY (2) ==========
  {
    title: "Is Your Website ADA Compliant? Lawsuits Are Skyrocketing. Get Protected.",
    description: `ADA website lawsuits increased 300% in the last 3 years. Small businesses are getting hit with $10,000-$75,000 lawsuits for inaccessible websites. This isn't theoretical — it's happening every day.

I build and retrofit websites for ADA/WCAG compliance:
- Screen reader compatibility
- Keyboard navigation
- Proper color contrast ratios
- Alt text for all images
- Accessible forms and error messages
- WCAG 2.1 AA compliance audit

Protect your business. Serve all customers. It's the law AND it's the right thing to do.

"ADA compliance isn't optional — it's a lawsuit waiting to happen. Fix it before a lawyer finds it."`,
    price: 0,
  },
  {
    title: "Website Accessibility Audit + Fixes — WCAG 2.1 Compliance for Your Business",
    description: `1 in 4 Americans has a disability. If your website isn't accessible, you're excluding 25% of the population — and opening yourself up to legal liability.

I audit and fix website accessibility:
- Automated + manual WCAG 2.1 AA audit
- Detailed findings report with priorities
- All fixes implemented (not just a report that collects dust)
- Ongoing compliance monitoring
- Accessibility statement page
- Staff training on maintaining accessibility

Do the right thing AND protect your business.

"Accessibility isn't charity. It's good business, good design, and the law."`,
    price: 0,
  },

  // ========== MULTI-LANGUAGE WEBSITES (2) ==========
  {
    title: "Reach More Customers with a Multi-Language Website — English, Spanish & More",
    description: `41 million native Spanish speakers in the US. Millions more speaking Chinese, Vietnamese, Korean, Arabic, and dozens of other languages.

If your website is English-only, you're ignoring a massive market.

I build multi-language websites:
- Professional translation integration (not Google Translate garbage)
- Language switcher that's easy to find
- SEO in each language (yes, people Google in Spanish too)
- Culturally appropriate design choices
- RTL language support (Arabic, Hebrew)
- Hreflang tags for Google's language targeting

Speak your customers' language. Literally.

"The business that speaks their customer's language gets their customer's money. It's that simple."`,
    price: 0,
  },
  {
    title: "Spanish-English Bilingual Websites for Local Businesses — Tap Into a Huge Market",
    description: `Your Spanish-speaking customers want to hire you. They want to buy from you. But they can't read your website. So they go to the competitor who bothered to translate theirs.

I build bilingual (English/Spanish) websites:
- Full site translation (not auto-translate junk)
- Toggle between languages seamlessly
- Google SEO in both English and Spanish
- Forms that work in both languages
- Culturally sensitive imagery and messaging

The ROI is immediate. More customers. More revenue. Zero downside.

"40+ million Spanish speakers in the US are ready to be your customers. Are you ready for them?"`,
    price: 0,
  },

  // ========== TATTOO SHOPS - BONUS (1) ==========
  {
    title: "Tattoo Studios — Custom Websites with Flash Galleries and Online Booking",
    description: `Your art lives on people's skin forever. Shouldn't it also live on a website that does it justice?

I build tattoo studio websites that showcase your craft:
- High-res gallery sorted by artist and style
- Flash sheet browser with pricing
- Online deposit and booking system
- Guest artist spotlight section
- Aftercare guide and FAQ
- Social media feed integration

Your needles are precise. Your website should be too.

"Great tattoo artists don't need to advertise — but the ones with great websites never have empty chairs."`,
    price: 0,
  },

  // ========== FLORISTS - BONUS (1) ==========
  {
    title: "Florists & Event Designers — Websites as Beautiful as Your Arrangements",
    description: `Your work is breathtaking. Your customers say "wow" every time. But your online presence? It's a Facebook page with blurry phone photos from 2020.

I create florist websites with:
- Seasonal collection galleries
- Same-day delivery ordering
- Wedding and event consultation forms
- Subscription flower service sign-up
- Blog: flower care tips, seasonal favorites
- Instagram integration for daily arrangements

Your arrangements are works of art. Frame them properly online.

"Beautiful work deserves a beautiful website. Your flowers already do the selling — your site just needs to get them there."`,
    price: 0,
  },

  // ========== DAYCARE - BONUS (1) ==========
  {
    title: "In-Home Daycare Providers — Look as Professional as the Big Centers Online",
    description: `You provide loving, personalized care that big centers can't match. But their websites make them LOOK more professional. That's costing you enrollments.

I build in-home daycare websites that level the playing field:
- Your philosophy and daily routine
- Licensing, certifications, and safety info
- Photo gallery of your space and activities
- Meal plan and nutrition approach
- Enrollment inquiry with waitlist
- Testimonials from grateful parents

Your care is personal. Your website should prove it.

"Parents don't choose the biggest daycare. They choose the one that feels safest. Your website creates that feeling."`,
    price: 0,
  },

  // ========== INSURANCE - BONUS (1) ==========
  {
    title: "Life Insurance Agents — A Website That Explains What You Do (Without the Jargon)",
    description: `Nobody wakes up excited to buy life insurance. But everyone needs it. Your website's job is to make a confusing product feel simple and necessary.

I build life insurance agent websites that educate and convert:
- Clear explanations: term vs. whole vs. universal
- Interactive needs calculator
- Quote request forms by coverage type
- Client testimonials (the "I'm so glad I called" stories)
- Blog: "How much life insurance do I need?" content
- About page that builds personal trust

Make insurance approachable. Make yourself unforgettable.

"People buy life insurance from people they trust. Your website builds that trust before you ever shake hands."`,
    price: 0,
  },

  // ========== ACCOUNTING - BONUS (1) ==========
  {
    title: "Tax Season Is Coming — Does Your Accounting Firm's Website Drive Clients or Drive Them Away?",
    description: `Every January through April, millions of people Google "tax preparer near me" and "CPA [city]." That's YOUR window. Is your website ready for it?

I build tax season-ready accounting websites:
- Seasonal landing pages for tax prep
- Document upload portal for returning clients
- New client intake forms
- Service tiers: individual, small business, corporate
- Tax deadline countdown and reminders
- Blog: deduction guides, tax law changes

Make tax season your most profitable season — starting with your website.

"When tax season hits, clients go where they feel confident. Your website is that confidence builder."`,
    price: 0,
  },

  // ========== MOVING - BONUS (1) ==========
  {
    title: "Junk Removal & Hauling Companies — Simple Websites That Generate Daily Calls",
    description: `Junk removal is an impulse decision. Someone looks at their garage, gets frustrated, and Googles "junk removal near me." They call the first company with a decent website and good reviews.

I build junk removal websites that capture those calls:
- Click-to-call button (massive, impossible to miss)
- Photo pricing guide (truck load, half load, items)
- Same-day service highlighted
- Service area map
- Before/after cleanup photos
- 5-star Google reviews displayed

Simple business. Simple website. Consistent calls.

"The junk removal company that shows up first and looks legit gets the call. Every single time."`,
    price: 0,
  },

  // ========== PERSONAL TRAINERS - BONUS (1) ==========
  {
    title: "Nutritionists & Health Coaches — Websites That Attract Premium Wellness Clients",
    description: `Your clients come to you because they want transformation. But premium clients expect a premium first impression — and that starts with your website.

I build health coaching websites with:
- Program descriptions with clear outcomes
- Client success stories with before/after
- Free resource downloads (meal plans, guides) for lead capture
- Online booking for discovery calls
- Blog: wellness tips, recipes, myth-busting
- Professional, clean, wellness-focused design

You help people transform their lives. Transform your business first.

"Premium clients pay premium prices — but only when your online presence matches the value you deliver."`,
    price: 0,
  },

  // ========== LAWYERS - BONUS (1) ==========
  {
    title: "Immigration Lawyers — Multilingual Websites That Reach the Clients Who Need You Most",
    description: `Your clients often speak limited English. If your website is English-only, you're invisible to the people who need you most.

I build immigration law websites with:
- Full Spanish (and other language) translations
- Visa type guides: H-1B, green card, asylum, DACA
- Client success stories (anonymized)
- Consultation request forms in multiple languages
- Know Your Rights resources
- FAQ addressing common fears and questions

Your clients are scared and searching. Be the website that feels safe.

"The immigration attorney who speaks their client's language — on their website — gets the call. Language is trust."`,
    price: 0,
  },

  // ========== MISC BONUS POSTS (remaining to reach 90) ==========
  {
    title: "Small Business Owners: I'll Build Your Entire Online Presence for One Flat Price",
    description: `Website. Google Business Profile. Social media setup. Email setup. All connected. All professional. All done in 2 weeks.

Here's what you get:
- Custom-designed, mobile-first website (5-7 pages)
- Google Business Profile fully optimized
- Facebook and Instagram business pages set up
- Professional email (you@yourbusiness.com)
- Basic SEO so Google can find you
- 30 days of free support after launch

Everything you need to look professional online. One price. No surprises.

"The businesses that show up online are the businesses that survive. The ones that don't? They become memories."`,
    price: 0,
  },
  {
    title: "Startup on a Budget? Get a Professional Website Without the Agency Price Tag",
    description: `Agencies charge $5,000-$20,000 for a website. You're just getting started. You need something professional but affordable.

I'm a solo developer — no overhead, no account managers, no fluff. You work directly with the person building your site.

What you get:
- Custom design (not a template with your logo slapped on)
- Mobile responsive
- SEO fundamentals
- Contact forms that actually work
- Fast hosting setup
- Training so you can update it yourself

Agency quality. Freelancer pricing. Real human support.

"You don't need a big budget to look like a big brand. You just need the right developer."`,
    price: 0,
  },
  {
    title: "Contractors & Tradespeople — You're Losing Jobs to Guys with Better Websites",
    description: `You're a better electrician/plumber/carpenter than the guy down the road. But he has a slick website with photos and reviews, and homeowners call HIM first.

That ends today. I build trade websites with:
- Service pages for every job type you do
- Photo gallery of completed projects
- License and insurance info displayed
- Free estimate request forms
- Google reviews front and center
- "Areas we serve" pages for SEO

Your skills are your product. Your website is your storefront.

"The tradesperson with the best website gets the call. Skill matters — but only if they find you first."`,
    price: 0,
  },
  {
    title: "E-Commerce Ready: I'll Build You an Online Store That Sells While You Sleep",
    description: `Want to sell products online but don't know where to start? I build complete e-commerce websites:

- Product catalog with categories, filters, and search
- Secure checkout with multiple payment options
- Inventory management
- Shipping calculator
- Customer accounts and order tracking
- Mobile shopping optimized
- Abandoned cart recovery

Whether you have 10 products or 10,000, I'll build a store that works.

"Your store closes at night. Your website doesn't. Every hour you're not selling online is money left on the table."`,
    price: 0,
  },
  {
    title: "Need a Website FAST? I Deliver Professional Sites in 7 Days or Less",
    description: `You needed a website yesterday. I get it. Some developers take months. I take days.

My rapid website delivery includes:
- Design mockup within 48 hours
- Your feedback incorporated within 24 hours
- Live website within 7 days
- Mobile-friendly, SEO-ready, fast-loading
- Content writing assistance included
- Post-launch support for 30 days

No corner-cutting. No template garbage. Just efficient, focused development.

"In business, speed wins. Get online fast. Get online right. Get online NOW."`,
    price: 0,
  },
];

// Verify we have exactly 90
console.log(`Prepared ${posts.length} posts to insert.`);

if (posts.length !== 90) {
  console.error(`ERROR: Expected 90 posts, got ${posts.length}. Aborting.`);
  process.exit(1);
}

const insert = db.prepare(`
  INSERT INTO posts (title, description, price, location, category, subcategory, email, images)
  VALUES (@title, @description, @price, @location, @category, @subcategory, @email, @images)
`);

const insertAll = db.transaction((posts) => {
  for (const p of posts) {
    insert.run({
      title: p.title,
      description: p.description,
      price: p.price || 0,
      location: p.location || LOC,
      category: p.category || CAT,
      subcategory: p.subcategory || SUB,
      email: p.email || "",
      images: p.images || IMG,
    });
  }
});

insertAll(posts);

const count = db.prepare("SELECT COUNT(*) as total FROM posts").get();
console.log(`Total posts in database: ${count.total}`);
console.log("Done!");
db.close();
