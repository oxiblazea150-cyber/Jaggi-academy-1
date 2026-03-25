import { getDb } from '@/lib/db';
import TimetableTabs from '@/components/TimetableTabs';
import Navbar from '@/components/Navbar';
import ScrollReveal from '@/components/ScrollReveal';
import { GraduationCap, Trophy, Lightbulb, HeartHandshake, User, MapPin, Phone, MessageCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Jaggi Academy — IIT, NEET & Board Excellence',
  description: 'Elite coaching for JEE, NEET, Class 11 & 12 by Dr. Harjeet Singh Jaggi. Proven results, expert faculty, personal attention.',
};

const WA_NUM = process.env.NEXT_PUBLIC_WA_NUMBER || '910000000000';
const WA_MSG = process.env.NEXT_PUBLIC_WA_MESSAGE || 'Hi Jaggi Academy, I would like to book a free trial class!';
const WHATSAPP = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(WA_MSG)}`;
const PHONE = process.env.NEXT_PUBLIC_ACADEMY_PHONE || '+91 98XXX XXXXX';
const ADDRESS = process.env.NEXT_PUBLIC_ACADEMY_ADDRESS || 'Picasso Kedari Icon, Salunke Vihar Road, Kondhwa, Pune — 411040';

const FACULTY = [
  {
    name: 'Dr. Anurag Sharma',
    subject: 'Physics',
    qualification: 'M.Sc IIT Delhi, Ph.D. Physics',
    blurb: 'Demystifying mechanics, electrodynamics, and optics through problem-first thinking. 12+ years of JEE/NEET success.',
    linkedin: '#',
    accent: 'bg-blue-50 border-blue-200',
    badge: 'text-blue-700 bg-blue-100',
  },
  {
    name: 'Prof. Kavita Mehta',
    subject: 'Mathematics',
    qualification: 'M.Sc. Mathematics, IIT Bombay',
    blurb: 'From calculus to coordinate geometry — building intuition, not just formula recall. 100+ JEE AIR toppers guided.',
    linkedin: '#',
    accent: 'bg-amber-50 border-amber-200',
    badge: 'text-amber-700 bg-amber-100',
  },
  {
    name: 'Dr. Ritu Nair',
    subject: 'Biology',
    qualification: 'MBBS, MD Physiology',
    blurb: 'Every cell, system, and process mapped visually. NEET-focused curriculum with deep conceptual grounding.',
    linkedin: '#',
    accent: 'bg-rose-50 border-rose-200',
    badge: 'text-rose-700 bg-rose-100',
  },
  {
    name: 'Dr. Sameer Kapoor',
    subject: 'Chemistry',
    qualification: 'M.Sc. Chemistry, IIT Roorkee',
    blurb: 'Physical, Organic & Inorganic mastered through storytelling and structured mnemonics. Zero rote learning.',
    linkedin: '#',
    accent: 'bg-green-50 border-green-200',
    badge: 'text-green-700 bg-green-100',
  },
];

const TESTIMONIALS = [
  {
    quote: "Highly intellectual classes, with sir having profound knowledge of physics. Very hospitable environment. Had a great experience with this great-hearted sir.",
    name: 'Jagjyot Singh',
    role: 'Class 12 Student',
  },
  {
    quote: "Jaggi sir is an amazing and friendly teacher. He made physics feel like child's play. It was an amazing experience to study from him.",
    name: 'Shivam Pandey',
    role: 'NDA (Airforce) Selected',
  },
  {
    quote: "Best physics teacher in Pune. Anyone who wants to pursue a physics tuition for Class 12 boards, Jaggi Sir is the answer for you. Loved his teaching and he can clear your chemistry and maths doubts also.",
    name: 'Mayank',
    role: 'Class 12 Board Student',
  },
  {
    quote: "Jaggi Sir's approach to Chemistry is phenomenal. The concept-first teaching helped me understand the hardest organic and physical chemistry topics with ease.",
    name: 'Aditya R.',
    role: 'JEE Aspirant',
  },
  {
    quote: "Excellent teacher, with very good knowledge. He understands every child's capabilities and helps them grow. And Motivates all children to do better.",
    name: 'Archana Jadhav',
    role: 'Parent',
  },
  {
    quote: "A very hospitable environment for learning. Jaggi Academy's focus on foundational concepts in both Physics and Chemistry transformed my academic journey.",
    name: 'Pooja K.',
    role: 'NEET Aspirant',
  },
];

const WA_ICON = (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default async function Home() {
  let wallOfFame: any[] = [];
  let timetable: any[] = [];
  let siteMedia: Record<string, string> = {};
  try {
    const db = getDb();
    wallOfFame = (await db`SELECT * FROM "WallOfFame" ORDER BY "createdAt" DESC`) as any[];
    timetable = (await db`SELECT * FROM "TimetableEntry" ORDER BY "createdAt" ASC`) as any[];
    const mediaRows = (await db`SELECT key, "imageUrl" FROM "SiteMedia"`) as any[];
    mediaRows.forEach(({ key, imageUrl }: any) => { siteMedia[key] = imageUrl; });
  } catch (e) {
    console.warn('DB not ready:', e);
  }

  return (
    <div style={{ background: 'var(--paper)' }}>
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-20 pb-28 px-5 sm:px-8" style={{ background: 'linear-gradient(160deg, var(--cobalt-dark) 0%, var(--cobalt) 60%, #2A5298 100%)' }}>
        {/* Typographic watermark */}
        <div className="absolute -right-8 top-8 font-display text-[22vw] font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(255,255,255,0.04)' }}>JA</div>
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: '200px' }} />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr_400px] gap-12 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-8" style={{ background: 'rgba(212,130,10,0.2)', color: 'var(--amber-light)', border: '1px solid rgba(212,130,10,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--amber-light)' }} />
              Admissions Open · Batch 2025–26
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] text-white mb-6">
              Master the Sciences.<br />
              <em className="not-italic" style={{ color: 'var(--amber-light)' }}>Conquer your</em><br />
              Exams.
            </h1>
            <p className="text-lg leading-relaxed max-w-xl mb-10 mx-auto lg:mx-0" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Elite, focused coaching for JEE, NEET, Class 11 & 12 — by faculty who have produced hundreds of top rankers. Serious about your results? Let's talk.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="wa-pulse inline-flex items-center justify-center gap-3 text-white font-bold text-lg rounded-2xl px-6 sm:px-8 py-5 transition-transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              style={{ background: 'var(--whatsapp)', boxShadow: '0 8px 32px rgba(26,122,71,0.45)' }}>
              {WA_ICON}
              <span>Chat on WhatsApp<span className="hidden sm:inline"> · Book a Free Trial</span></span>
            </a>
            <p className="mt-4 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>No forms. No calls. Just a quick chat.</p>
          </div>

          <div className="hidden lg:block relative">
            {siteMedia['portrait-jaggi'] ? (
              <img src={siteMedia['portrait-jaggi']} alt="Dr. Harjeet Singh Jaggi" className="rounded-2xl aspect-[4/5] w-full object-cover" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }} />
            ) : (
              <div className="img-placeholder rounded-2xl aspect-[4/5]" style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="w-16 h-16 rounded-full bg-white/10 mb-4 border border-white/20 flex items-center justify-center text-white/50"><User size={28} /></div>
                <p className="text-white/60 text-sm font-medium">Portrait coming soon</p>
              </div>
            )}
            <div className="absolute -bottom-4 -left-6 rounded-2xl px-5 py-4 shadow-xl" style={{ background: 'var(--amber)', color: 'white' }}>
              <div className="font-display font-bold text-2xl leading-none">500+</div>
              <div className="text-xs font-medium mt-0.5 opacity-90">IIT & NEET Selections</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <div className="py-5 border-b" style={{ background: 'var(--cream)', borderColor: 'var(--divider)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-medium" style={{ color: 'var(--muted)' }}>
          {['10+ Years Experience', 'IITian & Researcher', '389+ Citations', 'Small Batch Sizes', 'JEE · NEET · Boards'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span style={{ color: 'var(--amber)' }}>✦</span> {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <div className="ink-divider" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--cobalt-dark)' }}>
                About<br /><em>Jaggi Sir</em>
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
                Founder of Jaggi Academy and an UrbanPro Excellence Award Winner 2024, Dr. Harjeet Singh Jaggi brings the rigour of an IIT education (Ph.D. & M.Tech, IIT Delhi) and the warmth of a mentor who genuinely cares about every student's journey.
              </p>
              <p className="leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
                His "Concept-First" methodology abandons rote learning entirely — students understand the <em>why</em> before the <em>how</em>. The results speak for themselves.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <GraduationCap size={24} />, text: 'Ph.D. & M.Tech from IIT Delhi, B.Tech from CUSAT' },
                  { icon: <Trophy size={24} />, text: 'UrbanPro Excellence Award Winner 2024 (10+ Years Exp)' },
                  { icon: <Lightbulb size={24} />, text: 'Physics & Materials Science Researcher (389+ Citations)' },
                  { icon: <HeartHandshake size={24} />, text: 'Known personally by thousands of alumni families' },
                ].map(({ icon, text }, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="mt-0.5" style={{ color: 'var(--amber)' }}>{icon}</span>
                    <span className="font-medium" style={{ color: 'var(--ink)' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="relative">
              {siteMedia['portrait-jaggi'] ? (
                <img src={siteMedia['portrait-jaggi']} alt="Dr. Harjeet Singh Jaggi" className="rounded-2xl aspect-square max-w-sm mx-auto w-full object-cover" style={{ boxShadow: '0 24px 64px rgba(26,58,107,0.1)' }} />
              ) : (
                <div className="img-placeholder rounded-2xl aspect-square max-w-sm mx-auto" style={{ boxShadow: '0 24px 64px rgba(26,58,107,0.1)' }}>
                  <div className="w-20 h-20 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-[var(--muted)]"><User size={36} /></div>
                  <p className="text-sm text-[var(--muted)]">Portrait coming soon</p>
                </div>
              )}
              <div className="absolute top-4 -right-4 w-20 h-20 rounded-full flex flex-col items-center justify-center text-center text-white shadow-lg" style={{ background: 'var(--cobalt)' }}>
                <span className="font-display font-bold text-2xl leading-none">10+</span>
                <span className="text-[10px] font-medium opacity-80">Years</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FACULTY ─── */}
      <section id="faculty" className="py-24 px-5 sm:px-8" style={{ background: 'var(--cream)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-xl mb-16">
              <div className="ink-divider" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--cobalt-dark)' }}>Our Expert<br />Faculty</h2>
              <p className="mt-4 text-lg" style={{ color: 'var(--muted)' }}>Each department head — a domain specialist and human mentor.</p>
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FACULTY.map(({ name, subject, qualification, blurb, linkedin, accent, badge }, i) => (
              <ScrollReveal key={subject} delay={i * 80}>
                <div className={`hc-card rounded-2xl p-6 border ${accent} bg-white flex flex-col h-full`} style={{ boxShadow: '0 4px 24px rgba(26,58,107,0.07)' }}>
                  {siteMedia[`faculty-${subject.toLowerCase()}`] ? (
                    <img src={siteMedia[`faculty-${subject.toLowerCase()}`]} alt={name} className="rounded-xl aspect-square mb-5 w-full object-cover" />
                  ) : (
                    <div className="img-placeholder rounded-xl aspect-square mb-5 w-full">
                      <div className="mb-3 text-[var(--muted)]"><User size={40} strokeWidth={1.5} /></div>
                      <span className="text-xs">Photo coming soon</span>
                    </div>
                  )}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 self-start ${badge}`}>{subject}</div>
                  <h3 className="font-display font-bold text-lg mb-0.5" style={{ color: 'var(--cobalt-dark)' }}>{name}</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>{qualification}</p>
                  <p className="text-sm leading-relaxed flex-grow" style={{ color: 'var(--muted)' }}>{blurb}</p>
                  <div className="mt-5 flex flex-col gap-2">
                    <a href={WHATSAPP} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-2 text-white rounded-xl py-2.5 text-sm font-semibold transition-transform hover:scale-105 active:scale-95"
                      style={{ background: 'var(--whatsapp)', boxShadow: '0 2px 8px rgba(26,122,71,0.3)' }}>
                      {WA_ICON} Message Reception
                    </a>
                    <a href={linkedin} className="sweep-link flex items-center justify-center gap-1.5 text-xs font-medium py-1" style={{ color: 'var(--cobalt-light)' }}>
                      View on LinkedIn <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TIMETABLE ─── */}
      <section id="classes" className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-xl mb-4">
              <div className="ink-divider" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--cobalt-dark)' }}>Class<br />Schedules</h2>
            </div>
          </ScrollReveal>
          <TimetableTabs entries={timetable} />
          <div className="mt-10 p-6 rounded-2xl border" style={{ background: 'var(--cream)', borderColor: 'var(--divider)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--muted)' }}>
              Want to know which batch suits you?{' '}
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="sweep-link font-semibold" style={{ color: 'var(--cobalt)' }}>
                Chat with us on WhatsApp
              </a>{' '}
              — we'll guide you personally.
            </p>
          </div>
        </div>
      </section>

      {/* ─── WALL OF FAME ─── */}
      <section id="fame" className="py-24 px-5 sm:px-8" style={{ background: 'var(--cobalt-dark)' }}>
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="mb-16">
              <div className="ink-divider" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">Wall of<br />Fame</h2>
              <p className="mt-4 text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>Achievements that define the Jaggi Academy legacy.</p>
            </div>
          </ScrollReveal>

          {wallOfFame.length === 0 ? (
            <div className="rounded-3xl p-16 text-center border" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <p className="font-accent italic text-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
                New ranks from the recent season will appear here soon.<br />Every topper was once a student who refused to give up.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wallOfFame.map((s: any, i: number) => (
                <ScrollReveal key={s.id} delay={i * 70}>
                  <div className="polaroid bg-white rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>
                    {s.imageUrl ? (
                      <img src={s.imageUrl} alt={s.studentName} className="w-full h-52 object-cover" />
                    ) : (
                      <div className="img-placeholder h-52">
                        <div className="mb-3 text-white/50"><GraduationCap size={44} strokeWidth={1.5} /></div>
                        <span className="text-xs">Photo coming soon</span>
                      </div>
                    )}
                    <div className="p-5 relative">
                      <div className="absolute -top-4 right-5 rounded-full px-4 py-1.5 font-display font-bold text-sm" style={{ background: 'var(--amber)', color: 'white', boxShadow: '0 4px 12px rgba(212,130,10,0.4)' }}>
                        Rank {s.rank}
                      </div>
                      <h4 className="font-display font-bold text-xl mt-2" style={{ color: 'var(--cobalt-dark)' }}>{s.studentName}</h4>
                      <p className="text-sm font-medium mt-1" style={{ color: 'var(--amber)' }}>{s.examName}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-xl mb-16">
              <div className="ink-divider" />
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--cobalt-dark)' }}>What Families<br />Are Saying</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {TESTIMONIALS.map(({ quote, name, role }, i) => (
              <ScrollReveal key={name} delay={i * 90}>
                <div className="rounded-3xl p-8 relative h-full" style={{ background: 'var(--warm-white)', border: '1px solid var(--divider)', boxShadow: '0 8px 40px rgba(26,58,107,0.06)' }}>
                  <div className="absolute top-6 left-8 font-display text-8xl leading-none select-none" style={{ color: 'var(--divider)' }}>"</div>
                  <p className="font-accent italic text-lg leading-relaxed relative z-10 mt-8 mb-6" style={{ color: 'var(--ink)' }}>{quote}</p>
                  <div className="flex items-center gap-3 border-t pt-5" style={{ borderColor: 'var(--divider)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-white text-sm shrink-0" style={{ background: 'var(--cobalt)' }}>
                      {name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>{name}</div>
                      <div className="text-xs" style={{ color: 'var(--muted)' }}>{role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 px-5 sm:px-8 text-center" style={{ background: 'var(--cream)', borderTop: '1px solid var(--divider)' }}>
        <ScrollReveal>
          <div className="max-w-2xl mx-auto">
            <p className="font-accent italic text-lg mb-4" style={{ color: 'var(--muted)' }}>Every journey starts with one conversation.</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-8" style={{ color: 'var(--cobalt-dark)' }}>Ready to Start?</h2>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="wa-pulse inline-flex items-center gap-3 text-white font-bold text-xl rounded-2xl px-10 py-6 transition-transform hover:scale-105 active:scale-95"
              style={{ background: 'var(--whatsapp)', boxShadow: '0 8px 48px rgba(26,122,71,0.4)' }}>
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Book Your Free Trial Class
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-16 px-5 sm:px-8" style={{ background: 'var(--cobalt-dark)' }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm" style={{ background: 'var(--amber)', color: 'white' }}>JA</div>
              <div>
                <div className="font-display font-bold text-white text-lg">Jaggi Academy</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Shaping minds since 2008</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Elite coaching for JEE, NEET, and Boards. Concept-first. Results-driven. Human at heart.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {[['#about', 'About Jaggi Sir'], ['#faculty', 'Our Faculty'], ['#classes', 'Timetables'], ['#fame', 'Wall of Fame']].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="sweep-link text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              <li className="flex items-start gap-3">
                <span className="mt-1"><MapPin size={18} /></span>
                <span>{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <span><Phone size={18} /></span>
                <a href={`tel:${PHONE}`} className="sweep-link" style={{ color: 'rgba(255,255,255,0.55)' }}>{PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <span><MessageCircle size={18} /></span>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="sweep-link font-semibold" style={{ color: 'var(--amber-light)' }}>Chat on WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>© 2026 Jaggi Academy. All rights reserved.</p>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>Built with ❤️</span>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP FAB ─── */}
      <a href={WHATSAPP} target="_blank" rel="noreferrer"
        className="wa-pulse fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
        style={{ background: 'var(--whatsapp)', boxShadow: '0 8px 32px rgba(26,122,71,0.5)' }}
        aria-label="Chat on WhatsApp">
        <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        <span className="absolute right-full mr-3 bg-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap" style={{ color: 'var(--cobalt)' }}>Chat with us!</span>
      </a>
    </div>
  );
}
