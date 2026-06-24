import Image from "next/image";
import { ArrowRight, Globe2, Linkedin } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Web Portfolio", href: "/web-portfolio" },
  { label: "Contact", href: "/#contact" }
];

const partners = [
  {
    name: "Ayisha Muneer",
    initials: "AM",
    label: "Founder & CEO",
    bio: "As the Founder & CEO of Fusion Ventures, Ayisha leads the company's mission to build and scale innovative businesses under a unified vision. Adding her expertise in marketing strategy, people leadership, and business growth, she focuses on creating sustainable ventures, adding strong teams, and transforming ambitious ideas into impactful, future-ready businesses.",
    website: "https://ayishamuneer.com",
    linkedin: "https://www.linkedin.com/in/ayishamuneer/"
  },
  {
    name: "Mohammad Fazil",
    initials: "MF",
    label: "Co-Founder, Technical & Business Development",
    bio: "As Co-Founder of Fusion Ventures, Fazil brings over 8+ years of experience in technology, product innovation, and business development. He plays a crucial role in shaping the company's technical vision, building scalable digital solutions, and transforming business concepts into sustainable ventures. His ability to bridge technology and business strategy enables Fusion Ventures to deliver innovative solutions and long-term value across diverse industries.",
    website: "https://fazildigital.com",
    linkedin: "https://www.linkedin.com/in/fazilfazi/"
  },
  {
    name: "Thameem AR",
    initials: "TA",
    label: "Co-Founder, Branding & Growth Strategy",
    bio: "As Co-Founder of Fusion Ventures, Thameem brings over 10+ years of experience in branding, growth strategy, and venture development. He leads strategic initiatives that drive business expansion, strengthen market positioning, and unlock new growth opportunities. With a strong focus on long-term value creation, Thameem plays a key role in shaping the vision and sustainable growth of the ventures within the Fusion Ventures ecosystem.",
    website: "https://thameemar.online",
    linkedin: "https://www.linkedin.com/in/thameemar/"
  }
];

const reasons = [
  "General Inquiry",
  "Partnership",
  "Investment / Business Opportunity",
  "Venture Collaboration",
  "Media / Press",
  "Other"
];

function Label({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
        dark ? "text-white/55" : "text-black/45"
      }`}
    >
      {children}
    </p>
  );
}

export default function GroupsPage() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060705]/94 text-white backdrop-blur-md">
        <div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
          <a href="/" aria-label="Fusion Ventures home">
            <Image
              src="/fusion-ventures-logo.webp"
              alt="Fusion Ventures"
              width={640}
              height={176}
              priority
              className="h-9 w-auto sm:h-10"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] font-bold uppercase tracking-[0.08em] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="/#contact"
            className="border border-[#b99a5b] bg-[#b99a5b] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-transparent hover:text-[#d8c38b]"
          >
            Partner With Us
          </a>
        </div>
      </header>

      <section className="bg-white px-6 py-20 sm:px-10 lg:px-24 lg:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[42%_58%]">
          <div className="fade-up">
            <Label>The People Behind The Group</Label>
            <h1 className="text-5xl font-medium leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Built by Operators, Builders, and Long-Term Thinkers.
            </h1>
          </div>
          <div className="fade-up-delay flex items-end">
            <div className="max-w-[660px] text-base leading-8 text-black/64">
              <p>
                Fusion Ventures is shaped by a close group of partners with experience across
                business building, digital products, commerce, operations, brand development, and
                market execution.
              </p>
              <p className="mt-6">
                Together, we build and operate companies with a long-term mindset, combining ideas,
                execution, technology, and commercial focus to create ventures that can grow with
                discipline and purpose.
              </p>
              <a
                href="#people"
                className="group mt-9 inline-flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.08em] text-black"
              >
                Learn More About The Group
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mist px-6 py-20 sm:px-10 lg:px-24" id="people">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 max-w-[620px] fade-up">
            <Label>Partner Group</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              The Group Behind Fusion Ventures.
            </h2>
          </div>

          <div className="grid gap-px bg-black/12 md:grid-cols-3 fade-up-delay">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="group flex min-h-[360px] flex-col bg-mist p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <div className="mb-8 grid h-16 w-16 place-items-center rounded-full border border-black/25 text-lg font-medium tracking-[0.12em]">
                  {partner.initials}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/42">
                  {partner.label}
                </p>
                <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">{partner.name}</h3>
                <p className="mt-5 flex-1 text-sm leading-7 text-black/62">{partner.bio}</p>
                <div className="mt-8 flex items-center gap-3">
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${partner.name} personal website`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-black/58 transition-colors hover:border-[#b99a5b] hover:text-[#7b6335]"
                  >
                    <Globe2 className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                  <a
                    href={partner.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${partner.name} LinkedIn profile`}
                    className="grid h-9 w-9 place-items-center rounded-full border border-black/15 text-black/58 transition-colors hover:border-[#b99a5b] hover:text-[#7b6335]"
                  >
                    <Linkedin className="h-4 w-4" strokeWidth={1.6} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-white sm:px-10 lg:px-24">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[34%_66%]">
          <div>
            <Label dark>Shared Platform</Label>
            <h2 className="text-3xl font-medium leading-tight tracking-[-0.03em] sm:text-4xl">
              A Shared Vision Across Multiple Ventures
            </h2>
          </div>
          <p className="max-w-[760px] text-base leading-8 text-white/68">
            Fusion Ventures brings together people, ideas, systems, and businesses under one group
            structure. Each venture operates with its own identity, while benefiting from shared
            thinking, operational support, and long-term direction from the group.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-20 sm:px-10 lg:px-24" id="contact">
        <div className="mx-auto grid max-w-[1280px] gap-14 lg:grid-cols-[38%_62%]">
          <div>
            <Label>Connect With Fusion Ventures</Label>
            <h2 className="text-4xl font-medium leading-tight tracking-[-0.04em] sm:text-5xl">
              Let&apos;s Build What&apos;s Next, Together.
            </h2>
            <p className="mt-7 text-sm leading-7 text-black/62">
              Whether you are a founder, partner, investor, operator, or business looking to connect
              with Fusion Ventures, we are open to meaningful conversations aligned with our group&apos;s
              long-term vision.
            </p>
          </div>

          <form className="grid gap-px bg-black/12 sm:grid-cols-2">
            {["Full Name", "Email Address", "Phone / WhatsApp", "Company / Organization"].map(
              (field) => (
                <label key={field} className="bg-white p-5">
                  <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                    {field}
                  </span>
                  <input className="w-full border-0 bg-transparent text-base outline-none" />
                </label>
              )
            )}
            <label className="bg-white p-5 sm:col-span-2">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                Reason for Contact
              </span>
              <select className="w-full border-0 bg-transparent text-base outline-none">
                {reasons.map((reason) => (
                  <option key={reason}>{reason}</option>
                ))}
              </select>
            </label>
            <label className="bg-white p-5 sm:col-span-2">
              <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.12em] text-black/45">
                Message
              </span>
              <textarea className="min-h-32 w-full resize-none border-0 bg-transparent text-base outline-none" />
            </label>
            <div className="bg-white p-5 sm:col-span-2">
              <button className="w-full border border-black bg-black px-8 py-4 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-black">
                Start A Conversation
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
