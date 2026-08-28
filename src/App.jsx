import React, { useState, useEffect, useRef, useCallback } from 'react'
import heroImg from './assets/hero-plant.jpg'
import processImg from './assets/solutions-process.jpg'
import aerialImg from './assets/plant-aerial.jpg'
import flotationImg from './assets/flotation-cells.jpg'
import controlImg from './assets/control-room.jpg'
import conveyorImg from './assets/conveyor-screening.jpg'
import './App.css'

/* ─── Scroll reveal hook ─── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el) } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`reveal ${delay ? `reveal-delay-${delay}` : ''} ${className}`}>
      {children}
    </div>
  )
}

/* ─── Arrow icon ─── */
function Arrow() {
  return <span className="arrow">→</span>
}

/* ─────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = useCallback((id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} id="nav">
      <div className="nav__inner container--wide">
        <a href="#" className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="nav__logo-mark">PIOUS</span>
        </a>

        <div className={`nav__links ${mobileOpen ? 'nav__links--open' : ''}`}>
          <button onClick={() => scrollTo('solutions')}>Solutions</button>
          <button onClick={() => scrollTo('products')}>Products &amp; Technology</button>
          <button onClick={() => scrollTo('industries')}>Industries</button>
          <button onClick={() => scrollTo('plant-performance')}>Services</button>
          <button onClick={() => scrollTo('insights')}>Insights</button>
          <button onClick={() => scrollTo('about')}>About</button>
        </div>

        <a href="#contact" className="nav__cta btn btn--primary" onClick={(e) => { e.preventDefault(); scrollTo('contact') }}>
          Talk to an Expert <Arrow />
        </a>

        <button className={`nav__hamburger ${mobileOpen ? 'nav__hamburger--open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function Hero() {
  const [audience, setAudience] = useState('plant')

  return (
    <section className="hero" id="hero">
      <div className="hero__bg">
        <img src={heroImg} alt="Mineral processing plant operations" loading="eager" />
        <div className="hero__overlay" />
      </div>
      <div className="hero__content container">
        <div className="hero__audience-tabs">
          <button
            className={`hero__tab ${audience === 'plant' ? 'hero__tab--active' : ''}`}
            onClick={() => setAudience('plant')}
          >
            I Operate a Processing Plant
          </button>
          <button
            className={`hero__tab ${audience === 'oem' ? 'hero__tab--active' : ''}`}
            onClick={() => setAudience('oem')}
          >
            I Run an OEM Business
          </button>
        </div>
        <h1>
          Mineral Processing<br />
          Operations Advisory
        </h1>
        <p className="hero__sub">
          {audience === 'plant'
            ? 'Independent, hands-on advisory for mineral processing operations. We improve recovery, throughput, cost and sustainability — with measurable results, not just reports.'
            : 'Technology evaluation, market positioning and application engineering support for OEM equipment and systems in the Indian mineral processing industry.'
          }
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary btn--rounded" onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Advisory Services <Arrow />
          </button>
          <button className="btn btn--outline-white btn--rounded" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book a Discussion
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   POSITIONING STRIP
   ───────────────────────────────────────────── */
function Positioning() {
  const principles = [
    { title: 'Independent Advice', text: 'Objective recommendations based on what creates the greatest value for the operation.' },
    { title: 'Integrated Expertise', text: 'Connecting ore characteristics, technology, engineering, operations, maintenance and sustainability.' },
    { title: 'Measurable Impact', text: 'Recommendations focused on recovery, throughput, resource efficiency, operating cost and profitability.' },
  ]
  return (
    <section className="positioning section section--dark" id="positioning">
      <div className="container">
        <Reveal>
          <h2 className="positioning__headline">We look at the whole operation — not just the parts.</h2>
        </Reveal>
        <div className="positioning__grid">
          {principles.map((p, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="positioning__item">
                <h5>{p.title}</h5>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SOLUTIONS
   ───────────────────────────────────────────── */
const solutionsData = [
  {
    num: '01', title: 'Strategy & Business Performance',
    items: ['Operational performance improvement', 'Business performance optimisation', 'Technical due diligence', 'Asset performance reviews'],
    img: controlImg,
  },
  {
    num: '02', title: 'Process & Technology',
    items: ['Process audits', 'Technology selection', 'Flowsheet optimisation', 'Equipment & system upgrades', 'Debottlenecking'],
    img: processImg,
  },
  {
    num: '03', title: 'Engineering Solutions',
    items: ['Plant design review', 'Process engineering', 'Equipment & system selection', 'Plant expansion studies'],
    img: conveyorImg,
  },
  {
    num: '04', title: 'Operational Excellence',
    items: ['Plant optimisation', 'Recovery & grade improvement', 'Throughput enhancement', 'Water, energy & reagent optimisation'],
    img: flotationImg,
  },
  {
    num: '05', title: 'Maintenance & Reliability',
    items: ['Maintenance strategy', 'Plant uptime improvement', 'Asset management', 'Spares & wear parts management'],
    img: aerialImg,
  },
  {
    num: '06', title: 'Sustainability',
    items: ['Water optimisation', 'Energy optimisation', 'Reagent optimisation', 'ESG & resource efficiency'],
    img: heroImg,
  },
]

function Solutions() {
  const [active, setActive] = useState(null)

  return (
    <section className="solutions section" id="solutions">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">What We Do</span>
            <h2>Integrated Solutions Across the Mineral Processing Value Chain</h2>
          </div>
        </Reveal>
        <div className="solutions__grid">
          {solutionsData.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div
                className={`solutions__card ${active === i ? 'solutions__card--active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="solutions__card-header">
                  <span className="solutions__num">{s.num}</span>
                  <h4 className="solutions__title">{s.title}</h4>
                </div>
                <div className="solutions__card-reveal">
                  <ul className="solutions__items">
                    {s.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                  <button className="btn btn--text">
                    Explore solution <Arrow />
                  </button>
                </div>
                <div className="solutions__card-img">
                  <img src={s.img} alt={s.title} loading="lazy" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PRODUCTS & TECHNOLOGY
   ───────────────────────────────────────────── */
function Products() {
  const products = [
    { title: 'Technology Selection', desc: 'Equipment evaluation and selection based on plant performance requirements and ore characteristics.', img: processImg },
    { title: 'Process Technology', desc: 'Process audits, flowsheet optimisation and technology evaluation for improved recovery and throughput.', img: flotationImg },
    { title: 'Equipment & Systems', desc: 'Equipment and system upgrades, integration and debottlenecking for existing and new plants.', img: conveyorImg },
    { title: 'Specialist Technologies', desc: 'Partner and OEM technologies for inline analysis, modular processing and specialist applications.', img: controlImg },
  ]

  return (
    <section className="products section section--grey" id="products">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Products &amp; Technology</span>
            <h2>Technology that improves plant performance</h2>
            <p>Practical technology solutions selected and evaluated for real operating conditions — not laboratory conditions.</p>
          </div>
        </Reveal>
        <div className="products__grid">
          {products.map((p, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="products__card">
                <div className="products__card-img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="products__card-content">
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <button className="btn btn--text">
                    Learn more <Arrow />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   INDUSTRIES
   ───────────────────────────────────────────── */
function Industries() {
  const industries = [
    { name: 'Iron Ore', img: aerialImg },
    { name: 'Coal', img: conveyorImg },
    { name: 'Gold', img: processImg },
    { name: 'Copper', img: flotationImg },
    { name: 'Chrome', img: controlImg },
    { name: 'Mineral Sands', img: heroImg },
  ]
  return (
    <section className="industries section" id="industries">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Industries &amp; Applications</span>
            <h2>Mineral processing expertise across commodities</h2>
          </div>
        </Reveal>
        <div className="industries__grid">
          {industries.map((ind, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="industries__card">
                <div className="industries__card-img">
                  <img src={ind.img} alt={ind.name} loading="lazy" />
                  <div className="industries__card-overlay" />
                </div>
                <h5>{ind.name}</h5>
                <button className="btn btn--text">
                  Explore <Arrow />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PLANT PERFORMANCE
   ───────────────────────────────────────────── */
function PlantPerformance() {
  const questions = [
    { title: 'Recovery & Grade', q: 'Is the plant achieving optimum recovery and grade?' },
    { title: 'Throughput', q: 'Is the plant consistently delivering design capacity?' },
    { title: 'Resources', q: 'Are energy, water and consumables being used efficiently?' },
    { title: 'Tailings', q: 'Is tailings management meeting operational and environmental requirements?' },
    { title: 'Sustainability', q: 'Is the operation prepared for today\'s and tomorrow\'s sustainability obligations?' },
    { title: 'Future Readiness', q: 'Is the plant prepared for increasingly complex and lower-grade ores?' },
  ]

  return (
    <section className="plant-perf section section--dark" id="plant-performance">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label label--white">Plant Performance</span>
            <h2>Is your plant delivering its full potential?</h2>
          </div>
        </Reveal>
        <div className="plant-perf__grid">
          {questions.map((q, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="plant-perf__item">
                <div className="plant-perf__marker" />
                <h5>{q.title}</h5>
                <p>{q.q}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   VALUE CREATION FRAMEWORK
   ───────────────────────────────────────────── */
function ValueFramework() {
  const chain = [
    'Ore Characteristics', 'Technology', 'Engineering',
    'Operations', 'Maintenance', 'Sustainability', 'Business Performance'
  ]
  const outcomes = [
    'Higher Recovery', 'Greater Throughput', 'Lower Operating Cost',
    'Better Resource Utilisation', 'Improved Sustainability', 'Superior Business Performance'
  ]

  return (
    <section className="framework section" id="framework">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '100%' }}>
            <span className="label">Our Approach</span>
            <h2 style={{ margin: '0 auto', maxWidth: '640px' }}>The PIOUS Value Creation Framework</h2>
            <p style={{ margin: '16px auto 0', maxWidth: '560px', textAlign: 'center' }}>We optimise the operation as a whole.</p>
          </div>
        </Reveal>

        <div className="framework__visual">
          <div className="framework__chain">
            {chain.map((step, i) => (
              <Reveal key={i} delay={Math.min(i + 1, 6)}>
                <div className="framework__step">
                  <div className="framework__step-dot" />
                  <span>{step}</span>
                  {i < chain.length - 1 && <div className="framework__step-line" />}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="framework__arrow-down">
              <svg width="2" height="48" viewBox="0 0 2 48"><line x1="1" y1="0" x2="1" y2="48" stroke="var(--color-orange)" strokeWidth="2" /></svg>
            </div>
          </Reveal>

          <Reveal>
            <div className="framework__outcomes">
              <h5>Outcomes</h5>
              <div className="framework__outcomes-grid">
                {outcomes.map((o, i) => (
                  <div key={i} className="framework__outcome">{o}</div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   HOW WE WORK
   ───────────────────────────────────────────── */
function HowWeWork() {
  const steps = [
    { title: 'Understand', desc: 'Define the operational context, constraints and objectives.' },
    { title: 'Assess', desc: 'Evaluate current performance against potential.' },
    { title: 'Prioritise', desc: 'Identify highest-value improvement opportunities.' },
    { title: 'Recommend', desc: 'Develop practical, implementable recommendations.' },
    { title: 'Support', desc: 'Assist implementation with technical and operational expertise.' },
    { title: 'Measure', desc: 'Track outcomes and verify value delivered.' },
  ]
  return (
    <section className="how-we-work section section--border-top" id="how-we-work">
      <div className="container">
        <Reveal>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="label">How We Work</span>
            <h2 style={{ margin: '0 auto', maxWidth: '640px' }}>A clear path from opportunity to measurable value</h2>
          </div>
        </Reveal>
        <div className="hww__strip">
          {steps.map((s, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="hww__step">
                <span className="hww__step-num">{String(i + 1).padStart(2, '0')}</span>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   WHY PIOUS
   ───────────────────────────────────────────── */
function WhyPious() {
  const reasons = [
    { title: 'Independent & Unbiased', text: 'Recommendations are based on what creates the greatest value for the operation.' },
    { title: 'Rich Domain Experience', text: 'Experience across the mineral-processing value chain — from ore to final product.' },
    { title: 'Integrated', text: 'Ore variability, engineering, operations, maintenance and sustainability considered together.' },
    { title: 'Practical & Implementable', text: 'Recommendations designed to work with existing organisations and resources wherever possible.' },
    { title: 'Focused on Measurable Value', text: 'Plant performance, operating cost, resource utilisation, profitability and ROI.' },
    { title: 'A Long-Term Partner', text: 'Working alongside leadership and operational teams to build lasting capability.' },
  ]
  return (
    <section className="why-pious section section--grey" id="about">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Why PIOUS</span>
            <h2>The difference is in the depth</h2>
          </div>
        </Reveal>
        <div className="why-pious__grid">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="why-pious__item">
                <h4>{r.title}</h4>
                <p>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   TECHNOLOGY PARTNERS
   ───────────────────────────────────────────── */
function Partners() {
  const partners = [
    {
      name: 'SOPAT',
      desc: 'Inline particle-size analysis technology for real-time process monitoring and optimisation in grinding and flotation circuits.',
      tag: 'Process Analytics'
    },
    {
      name: 'MechProTech',
      desc: 'Mining and mineral-processing equipment and systems — comminution, classification, materials handling and modular plant solutions.',
      tag: 'Equipment & Systems'
    },
  ]
  return (
    <section className="partners section section--border-top" id="partners">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Technology &amp; Industry Partnerships</span>
            <h2>Technology partnerships that strengthen the value chain</h2>
            <p>We work with specialist technology providers to bring proven, practical solutions to mineral processing operations.</p>
          </div>
        </Reveal>
        <div className="partners__grid">
          {partners.map((p, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="partners__card">
                <span className="label label--muted">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   LEADERSHIP
   ───────────────────────────────────────────── */
function Leadership() {
  const leaders = [
    { name: 'C. M. Purohit', role: 'Director', initials: 'CP' },
    { name: 'Sudhir Srivastava', role: 'Director', initials: 'SS' },
    { name: 'Pankaj Srivastava', role: 'Director', initials: 'PS' },
  ]
  return (
    <section className="leadership section" id="leadership">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Leadership</span>
            <h2>Experience that matters</h2>
            <p>Deep expertise across mineral processing, mining, engineering, business development, lifecycle services and strategy.</p>
          </div>
        </Reveal>
        <div className="leadership__grid">
          {leaders.map((l, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="leadership__card">
                <div className="leadership__avatar">
                  <span>{l.initials}</span>
                </div>
                <h4>{l.name}</h4>
                <p className="leadership__role">{l.role}</p>
                <button className="btn btn--text">View profile <Arrow /></button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   INSIGHTS
   ───────────────────────────────────────────── */
function Insights() {
  const articles = [
    { category: 'Plant Optimisation', title: 'Identifying recovery improvement opportunities in operating concentrators', featured: true, img: flotationImg },
    { category: 'Technology', title: 'Inline particle size analysis — from laboratory to process control', img: controlImg },
    { category: 'Sustainability', title: 'Water optimisation in mineral processing — practical approaches', img: aerialImg },
    { category: 'Operations', title: 'Throughput constraints — systematic identification and resolution', img: conveyorImg },
  ]
  return (
    <section className="insights section section--grey" id="insights">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Insights</span>
            <h2>Technical perspectives and industry knowledge</h2>
          </div>
        </Reveal>
        <div className="insights__layout">
          <Reveal>
            <div className="insights__featured">
              <div className="insights__featured-img">
                <img src={articles[0].img} alt={articles[0].title} loading="lazy" />
              </div>
              <div className="insights__featured-content">
                <span className="label">{articles[0].category}</span>
                <h3>{articles[0].title}</h3>
                <button className="btn btn--text">Read article <Arrow /></button>
              </div>
            </div>
          </Reveal>
          <div className="insights__list">
            {articles.slice(1).map((a, i) => (
              <Reveal key={i} delay={i + 1}>
                <div className="insights__item">
                  <div className="insights__item-img">
                    <img src={a.img} alt={a.title} loading="lazy" />
                  </div>
                  <div className="insights__item-content">
                    <span className="label">{a.category}</span>
                    <h5>{a.title}</h5>
                    <button className="btn btn--text">Read <Arrow /></button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CASE STUDIES
   ───────────────────────────────────────────── */
function CaseStudies() {
  return (
    <section className="case-studies section section--border-top" id="case-studies">
      <div className="container">
        <Reveal>
          <div className="section-header">
            <span className="label">Case Studies</span>
            <h2>From opportunity to measurable value</h2>
            <p>Detailed case studies demonstrating the challenge, assessment, intervention and measurable results from PIOUS engagements.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="case-studies__placeholder">
            <div className="case-studies__template">
              <div className="case-studies__template-col">
                <span className="label label--muted">Challenge</span>
                <p>Operational context and performance gap identified.</p>
              </div>
              <div className="case-studies__template-col">
                <span className="label label--muted">Assessment</span>
                <p>Systematic evaluation of root causes and improvement potential.</p>
              </div>
              <div className="case-studies__template-col">
                <span className="label label--muted">Intervention</span>
                <p>Practical recommendations implemented with operational teams.</p>
              </div>
              <div className="case-studies__template-col">
                <span className="label label--muted">Result</span>
                <p>Measurable improvements in plant performance and business value.</p>
              </div>
            </div>
            <p className="case-studies__note">Case studies with verified results will be published here.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CONTACT / GET IN TOUCH
   ───────────────────────────────────────────── */
function Contact() {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', phone: '',
    advisoryLine: '', message: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your inquiry. A PIOUS director will respond within one business day.')
  }

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <Reveal>
          <div className="contact__layout">
            {/* Left: Office Info */}
            <div className="contact__info">
              <h2>Office &amp; Contact Information</h2>

              <div className="contact__details">
                <div className="contact__detail-item">
                  <div className="contact__detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13L2 4" />
                    </svg>
                  </div>
                  <div>
                    <span className="label">Email</span>
                    <a href="mailto:info@pioustechnology.com" className="contact__link">info@pioustechnology.com</a>
                  </div>
                </div>

                <div className="contact__detail-item">
                  <div className="contact__detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <span className="label">Phone</span>
                    <a href="tel:+91124456789" className="contact__link">+91 124 456 7890</a>
                  </div>
                </div>

                <div className="contact__detail-item">
                  <div className="contact__detail-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <span className="label">Office</span>
                    <p className="contact__address">
                      PIOUS Technology &amp; Sales Pvt. Ltd.<br />
                      Gurugram, Haryana 122001<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact__directors">
                <span className="label">Directors</span>
                <div className="contact__directors-list">
                  <p><strong>C M Purohit</strong> — Director</p>
                  <p><strong>Sudhir Srivastava</strong> — Director</p>
                  <p><strong>Pankaj Srivastava</strong> — Director</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="contact__form-wrap">
              <h3>Submit an Advisory Inquiry</h3>
              <p className="contact__form-desc">Provide details regarding your operational facility or business requirements. An operating director will respond within one business day.</p>

              <form onSubmit={handleSubmit} className="contact__form">
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input type="text" id="contact-name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-company">Company *</label>
                    <input type="text" id="contact-company" name="company" placeholder="Your company" value={formData.company} onChange={handleChange} required />
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-email">Email *</label>
                    <input type="email" id="contact-email" name="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-phone">Phone</label>
                    <input type="tel" id="contact-phone" name="phone" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-advisory">Advisory Line *</label>
                  <select id="contact-advisory" name="advisoryLine" value={formData.advisoryLine} onChange={handleChange} required>
                    <option value="" disabled>Select an advisory area</option>
                    <option value="strategy">Strategy &amp; Business Performance</option>
                    <option value="process">Process &amp; Technology</option>
                    <option value="engineering">Engineering Solutions</option>
                    <option value="operations">Operational Excellence</option>
                    <option value="maintenance">Maintenance &amp; Reliability</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="oem">OEM &amp; Equipment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea id="contact-message" name="message" rows="5" placeholder="Tell us briefly about your business and what you'd like to discuss..." value={formData.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn--primary btn--rounded contact__submit">
                  Submit Inquiry <Arrow />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="nav__logo-mark">PIOUS</span>
            <p className="footer__tagline">Value Integration for Mineral Processing</p>
          </div>
          <div className="footer__nav">
            <div className="footer__nav-col">
              <h6>Company</h6>
              <button onClick={() => scrollTo('solutions')}>Solutions</button>
              <button onClick={() => scrollTo('products')}>Products &amp; Technology</button>
              <button onClick={() => scrollTo('industries')}>Industries</button>
            </div>
            <div className="footer__nav-col">
              <h6>Resources</h6>
              <button onClick={() => scrollTo('plant-performance')}>Services</button>
              <button onClick={() => scrollTo('insights')}>Insights</button>
              <button onClick={() => scrollTo('about')}>About</button>
            </div>
            <div className="footer__nav-col">
              <h6>Contact</h6>
              <p>Gurugram, Haryana<br />India</p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} PIOUS Technology & Sales Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────
   APP
   ───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Positioning />
      <Solutions />
      <Products />
      <Industries />
      <PlantPerformance />
      <ValueFramework />
      <HowWeWork />
      <WhyPious />
      <Partners />
      <Leadership />
      <Insights />
      <CaseStudies />
      <Contact />
      <Footer />
    </>
  )
}
