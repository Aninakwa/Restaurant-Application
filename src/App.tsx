import { useState, useEffect, useRef } from 'react'
import elenaMorettiImg from '@/imports/image-1.png'
import yukiTanakaImg from '@/imports/image-3.png'

const NAV_LINKS = ['Menu', 'Reservations', 'Chefs', 'Contact']

const MENU_CATEGORIES = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

const MENU_ITEMS = [
  {
    id: 1,
    category: 'Starters',
    name: 'Burrata & Heirloom Tomato',
    description: 'House-made burrata, candied balsamic, wild basil oil, toasted sourdough',
    price: 24,
    image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=400&fit=crop&auto=format',
    tag: 'Chef\'s Pick',
  },
  {
    id: 2,
    category: 'Starters',
    name: 'Scallop Crudo',
    description: 'Hand-dived scallop, cucumber water, yuzu, micro shiso, caviar',
    price: 32,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=600&h=400&fit=crop&auto=format',
    tag: 'Seasonal',
  },
  {
    id: 3,
    category: 'Mains',
    name: 'Dry-Aged Duck Breast',
    description: '42-day dry-aged Gressingham duck, cherry gastrique, celeriac purée, crispy leg croquette',
    price: 58,
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=600&h=400&fit=crop&auto=format',
    tag: 'Signature',
  },
  {
    id: 4,
    category: 'Mains',
    name: 'Wagyu Bavette',
    description: 'A5 Japanese wagyu, bone marrow butter, smoked shallot, watercress, triple-cooked chips',
    price: 89,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format',
    tag: null,
  },
  {
    id: 5,
    category: 'Mains',
    name: 'Wild Sea Bass',
    description: 'Line-caught sea bass, saffron bouillabaisse, fennel confit, Aleppo oil',
    price: 52,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop&auto=format',
    tag: 'Seasonal',
  },
  {
    id: 6,
    category: 'Desserts',
    name: 'Valrhona Chocolate Délice',
    description: 'Guanaja 70% ganache, hazelnut praline, salted caramel ice cream, gold leaf',
    price: 19,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&auto=format',
    tag: null,
  },
  {
    id: 7,
    category: 'Desserts',
    name: 'Lemon Verbena Tart',
    description: 'Crisp pâte sablée, verbena curd, Italian meringue, elderflower sorbet',
    price: 17,
    image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&h=400&fit=crop&auto=format',
    tag: 'Chef\'s Pick',
  },
  {
    id: 8,
    category: 'Drinks',
    name: 'Negroni Selvatico',
    description: 'Gin Mazzetti, Campari, Martini Rosso, forest herb tincture, orange peel',
    price: 18,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop&auto=format',
    tag: null,
  },
]

const CHEFS = [
  {
    name: 'Joseph Odoom',
    title: 'Executive Chef',
    bio: 'Trained at Ducasse Paris and Noma Copenhagen, Joseph brings 20 years of instinct-driven Italian-Nordic cuisine to every plate. His philosophy: the ingredient is always the hero.',
    image: elenaMorettiImg,
    awards: ['2 Michelin Stars', "World's 50 Best #18"],
  },
  {
    name: 'James Okafor',
    title: 'Head Pastry Chef',
    bio: 'James studied confectionery in Lyon and São Paulo, fusing European technique with West African spice. His desserts are the reason guests linger long after the bill.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&h=600&fit=crop&auto=format',
    awards: ['Best Pastry Chef 2023', 'Art of Plating Award'],
  },
  {
    name: 'Razak Fazia',
    title: 'Sommelier',
    bio: 'With a cellar of 1,400 labels across six continents, Fazia curates pairings that transform a meal into a journey. Her natural wine flights are the talk of the city.',
    image: yukiTanakaImg,
    awards: ['Best Sommelier UK 2022', 'Wine Spectator Award'],
  },
]

const TESTIMONIALS = [
  {
    quote: 'The dry-aged duck was one of the finest things I have eaten in a decade. Selva is in a class entirely its own.',
    author: 'Marina K.',
    publication: 'The Guardian',
  },
  {
    quote: "Elena Moretti's cuisine is a conversation between disciplines — Italian soul, Nordic restraint, and pure instinct.",
    author: 'Thomas L.',
    publication: 'Financial Times',
  },
  {
    quote: 'Book six weeks ahead. It is worth every moment of the wait.',
    author: 'Priya N.',
    publication: 'Condé Nast Traveller',
  },
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeNav, setActiveNav] = useState('')
  const [reservationForm, setReservationForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMenuVisible(true)
      },
      { threshold: 0.1 }
    )
    if (menuRef.current) obs.observe(menuRef.current)
    return () => obs.disconnect()
  }, [])

  const filtered =
    activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((i) => i.category === activeCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1A2B1C', color: '#F5EDD6' }}>
      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5"
        style={{
          background: 'linear-gradient(to bottom, rgba(14,26,15,0.95) 0%, transparent 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <a href="#hero" className="font-serif text-2xl tracking-widest" style={{ color: '#F5EDD6', textDecoration: 'none' }}>
          SELVA
        </a>
        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-widest uppercase transition-colors duration-200"
                style={{
                  color: activeNav === link.toLowerCase() ? '#C9873A' : '#D4C9A8',
                  textDecoration: 'none',
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C9873A')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    activeNav === link.toLowerCase() ? '#C9873A' : '#D4C9A8')
                }
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#reservations"
          className="hidden md:inline-flex items-center gap-2 text-xs tracking-widest uppercase px-6 py-3 border transition-all duration-200"
          style={{
            color: '#1A2B1C',
            background: '#C9873A',
            borderColor: '#C9873A',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = '#E8A85A'
            el.style.borderColor = '#E8A85A'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = '#C9873A'
            el.style.borderColor = '#C9873A'
          }}
        >
          Reserve a Table
        </a>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&h=1100&fit=crop&auto=format)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,26,15,0.55) 0%, rgba(14,26,15,0.75) 60%, #1A2B1C 100%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-8"
            style={{ color: '#C9873A' }}
          >
            Est. 2019 &nbsp;·&nbsp; Accra, Abeka
          </p>
          <h1
            className="font-serif leading-none mb-8"
            style={{
              fontSize: 'clamp(4rem, 10vw, 8.5rem)',
              color: '#F5EDD6',
              letterSpacing: '-0.02em',
            }}
          >
            Where the Forest
            <br />
            <em style={{ color: '#C9873A' }}>Meets the Table</em>
          </h1>
          <p
            className="text-lg mb-12 max-w-xl mx-auto leading-relaxed"
            style={{ color: '#D4C9A8', fontWeight: 300 }}
          >
            Two Michelin stars. Seasonal tasting menus inspired by the wildest
            corners of the British Isles, re-imagined through a Ghanaian lens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#reservations"
              className="px-10 py-4 text-sm tracking-widest uppercase transition-all duration-200"
              style={{
                background: '#C9873A',
                color: '#1A2B1C',
                textDecoration: 'none',
                fontWeight: 500,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#E8A85A')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = '#C9873A')
              }
            >
              Reserve a Table
            </a>
            <a
              href="#menu"
              className="px-10 py-4 text-sm tracking-widest uppercase border transition-all duration-200"
              style={{
                borderColor: '#F5EDD6',
                color: '#F5EDD6',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(245,237,214,0.1)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
              }}
            >
              Explore the Menu
            </a>
          </div>
        </div>
        {/* scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: '#6B8C6E' }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div
            className="w-px animate-bounce"
            style={{ height: 48, background: 'linear-gradient(to bottom, #6B8C6E, transparent)' }}
          />
        </div>
      </section>

      {/* ── INTRO STRIP ── */}
      <section
        className="py-20 px-6"
        style={{ background: '#243327', borderTop: '1px solid rgba(107,140,110,0.2)' }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { label: 'Michelin Stars', value: '2' },
            { label: "World's 50 Best Ranking", value: '#18' },
            { label: 'Years of Excellence', value: '6' },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="font-serif leading-none mb-3"
                style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: '#C9873A' }}
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: '#6B8C6E' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" ref={menuRef as React.RefObject<HTMLElement>} className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9873A' }}>
              The Menu
            </p>
            <h2
              className="font-serif leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#F5EDD6' }}
            >
              Seasonal &amp; Considered
            </h2>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-14">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 text-xs tracking-widest uppercase border transition-all duration-200"
                style={{
                  borderColor: activeCategory === cat ? '#C9873A' : 'rgba(107,140,110,0.4)',
                  color: activeCategory === cat ? '#1A2B1C' : '#D4C9A8',
                  background: activeCategory === cat ? '#C9873A' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: '#243327',
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
                }}
              >
                <div className="relative overflow-hidden" style={{ height: 220, background: '#1A2B1C' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {item.tag && (
                    <span
                      className="absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1"
                      style={{ background: '#C9873A', color: '#1A2B1C' }}
                    >
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3
                      className="font-serif leading-snug"
                      style={{ fontSize: '1.2rem', color: '#F5EDD6' }}
                    >
                      {item.name}
                    </h3>
                    <span
                      className="font-serif text-lg shrink-0"
                      style={{ color: '#C9873A' }}
                    >
                      £{item.price}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#6B8C6E', fontWeight: 300 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-BLEED IMAGE DIVIDER ── */}
      <div
        className="relative overflow-hidden"
        style={{ height: '60vh', background: '#0E1A0F' }}
      >
        <img
          src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=1800&h=900&fit=crop&auto=format"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
          style={{ opacity: 0.6 }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          style={{ background: 'rgba(14,26,15,0.5)' }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: '#C9873A' }}>
            The Experience
          </p>
          <blockquote
            className="font-serif italic max-w-3xl"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#F5EDD6', lineHeight: 1.3 }}
          >
            "We do not cook for applause. We cook because the land demands it."
          </blockquote>
          <cite className="mt-6 text-sm tracking-widest not-italic" style={{ color: '#6B8C6E' }}>
            — Apea Kofi, Executive Chef
          </cite>
        </div>
      </div>

      {/* ── RESERVATIONS ── */}
      <section id="reservations" className="py-28 px-6" style={{ background: '#243327' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9873A' }}>
              Reserve a Table
            </p>
            <h2
              className="font-serif leading-none mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#F5EDD6' }}
            >
              Dine with Us
            </h2>
            <p className="leading-relaxed mb-10" style={{ color: '#D4C9A8', fontWeight: 300, maxWidth: '38ch' }}>
              We offer two sittings nightly — 6:30 PM and 9:00 PM. The tasting menu runs
              approximately three hours. Dietary requirements are always accommodated with pleasure.
            </p>
            <div className="space-y-4">
              {[
                { icon: '↗', label: 'Tuesday – Saturday', value: '6:30 PM · 9:00 PM' },
                { icon: '↗', label: 'Sunday Lunch', value: '12:30 PM · 3:00 PM' },
                { icon: '↗', label: 'Dress Code', value: 'Smart Casual' },
                { icon: '↗', label: 'Cancellation', value: '48 hours notice' },
              ].map((info) => (
                <div
                  key={info.label}
                  className="flex justify-between items-center py-4 border-b"
                  style={{ borderColor: 'rgba(107,140,110,0.2)' }}
                >
                  <span className="text-sm tracking-wide" style={{ color: '#6B8C6E' }}>
                    {info.label}
                  </span>
                  <span className="text-sm" style={{ color: '#F5EDD6' }}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <div
                className="p-12 text-center"
                style={{ background: '#1A2B1C', border: '1px solid rgba(201,135,58,0.3)' }}
              >
                <p className="font-serif text-3xl mb-4" style={{ color: '#C9873A' }}>
                  Thank You
                </p>
                <p style={{ color: '#D4C9A8', fontWeight: 300 }}>
                  Your reservation request has been received. We will confirm within 24 hours.
                </p>
                <button
                  className="mt-8 text-xs tracking-widest uppercase px-6 py-3 border"
                  style={{ borderColor: '#C9873A', color: '#C9873A', background: 'transparent', cursor: 'pointer' }}
                  onClick={() => setSubmitted(false)}
                >
                  Make Another Reservation
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                style={{ background: '#1A2B1C', padding: '2.5rem', border: '1px solid rgba(107,140,110,0.2)' }}
              >
                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Elena Moretti' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'elena@selva.com' },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block text-xs tracking-widest uppercase mb-2"
                      style={{ color: '#6B8C6E' }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={reservationForm[field.id as keyof typeof reservationForm]}
                      onChange={(e) =>
                        setReservationForm((p) => ({ ...p, [field.id]: e.target.value }))
                      }
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-200"
                      style={{
                        background: '#243327',
                        border: '1px solid rgba(107,140,110,0.3)',
                        color: '#F5EDD6',
                      }}
                      onFocus={(e) =>
                        (e.target.style.borderColor = '#C9873A')
                      }
                      onBlur={(e) =>
                        (e.target.style.borderColor = 'rgba(107,140,110,0.3)')
                      }
                    />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#6B8C6E' }}>
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={reservationForm.date}
                      onChange={(e) =>
                        setReservationForm((p) => ({ ...p, date: e.target.value }))
                      }
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: '#243327',
                        border: '1px solid rgba(107,140,110,0.3)',
                        color: '#F5EDD6',
                        colorScheme: 'dark',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9873A')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(107,140,110,0.3)')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#6B8C6E' }}>
                      Time
                    </label>
                    <select
                      required
                      value={reservationForm.time}
                      onChange={(e) =>
                        setReservationForm((p) => ({ ...p, time: e.target.value }))
                      }
                      className="w-full px-4 py-3 text-sm outline-none"
                      style={{
                        background: '#243327',
                        border: '1px solid rgba(107,140,110,0.3)',
                        color: reservationForm.time ? '#F5EDD6' : '#6B8C6E',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#C9873A')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(107,140,110,0.3)')}
                    >
                      <option value="" disabled>Select</option>
                      <option value="1230">12:30 PM (Sun only)</option>
                      <option value="1500">3:00 PM (Sun only)</option>
                      <option value="1830">6:30 PM</option>
                      <option value="2100">9:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#6B8C6E' }}>
                    Guests
                  </label>
                  <select
                    value={reservationForm.guests}
                    onChange={(e) =>
                      setReservationForm((p) => ({ ...p, guests: e.target.value }))
                    }
                    className="w-full px-4 py-3 text-sm outline-none"
                    style={{
                      background: '#243327',
                      border: '1px solid rgba(107,140,110,0.3)',
                      color: '#F5EDD6',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#C9873A')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(107,140,110,0.3)')}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: '#6B8C6E' }}>
                    Special Requests
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Dietary requirements, celebrations, accessibility needs…"
                    value={reservationForm.notes}
                    onChange={(e) =>
                      setReservationForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    className="w-full px-4 py-3 text-sm outline-none resize-none"
                    style={{
                      background: '#243327',
                      border: '1px solid rgba(107,140,110,0.3)',
                      color: '#F5EDD6',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#C9873A')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(107,140,110,0.3)')}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-widest uppercase transition-all duration-200"
                  style={{
                    background: '#C9873A',
                    color: '#1A2B1C',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#E8A85A')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = '#C9873A')
                  }
                >
                  Request Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CHEFS ── */}
      <section id="chefs" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9873A' }}>
              The Team
            </p>
            <h2
              className="font-serif leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#F5EDD6' }}
            >
              The Minds
              <br />
              <em style={{ color: '#6B8C6E' }}>Behind the Plates</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {CHEFS.map((chef, i) => (
              <div key={chef.name} className="group">
                <div
                  className="relative overflow-hidden mb-6"
                  style={{ height: 420, background: '#0E1A0F' }}
                >
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
                    style={{ filter: 'grayscale(20%)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(14,26,15,0.7) 0%, transparent 50%)',
                    }}
                  />
                  <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
                    {chef.awards.map((award) => (
                      <span
                        key={award}
                        className="text-xs tracking-wide px-2 py-1"
                        style={{ background: 'rgba(201,135,58,0.9)', color: '#1A2B1C' }}
                      >
                        {award}
                      </span>
                    ))}
                  </div>
                </div>
                <p
                  className="font-serif text-2xl mb-1"
                  style={{ color: '#F5EDD6' }}
                >
                  {chef.name}
                </p>
                <p
                  className="text-xs tracking-widest uppercase mb-4"
                  style={{ color: '#C9873A' }}
                >
                  {chef.title}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#6B8C6E', fontWeight: 300 }}
                >
                  {chef.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="py-24 px-6"
        style={{ background: '#0E1A0F', borderTop: '1px solid rgba(107,140,110,0.15)' }}
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase mb-16 text-center" style={{ color: '#C9873A' }}>
            What They Say
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="m-0">
                <blockquote
                  className="font-serif italic mb-6 leading-relaxed"
                  style={{ fontSize: '1.1rem', color: '#F5EDD6' }}
                >
                  "{t.quote}"
                </blockquote>
                <figcaption className="text-xs tracking-widest uppercase" style={{ color: '#6B8C6E' }}>
                  {t.author} &nbsp;·&nbsp; <span style={{ color: '#C9873A' }}>{t.publication}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 px-6" style={{ background: '#1A2B1C' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#C9873A' }}>
              Find Us
            </p>
            <h2
              className="font-serif leading-none mb-10"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F5EDD6' }}
            >
              Come &amp; Dine
            </h2>
            <div className="space-y-8">
              {[
                {
                  label: 'Address',
                  lines: ['12 Aldford Street', 'Mayfair, London W1K 2AA'],
                },
                {
                  label: 'Phone',
                  lines: ['+233558546765'],
                },
                {
                  label: 'Email',
                  lines: ['reservations@selva.com'],
                },
                {
                  label: 'Hours',
                  lines: ['Tue – Sat: 6:30 PM & 9:00 PM', 'Sunday Lunch: 12:30 PM & 3:00 PM'],
                },
              ].map((item) => (
                <div key={item.label}>
                  <p
                    className="text-xs tracking-widest uppercase mb-2"
                    style={{ color: '#C9873A' }}
                  >
                    {item.label}
                  </p>
                  {item.lines.map((line) => (
                    <p key={line} className="text-sm" style={{ color: '#D4C9A8', fontWeight: 300 }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative overflow-hidden"
            style={{ height: 480, background: '#243327' }}
          >
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c4a49f80?w=800&h=600&fit=crop&auto=format"
              alt="Restaurant exterior, Mayfair"
              className="w-full h-full object-cover"
              style={{ opacity: 0.7 }}
            />
            <div
              className="absolute bottom-6 left-6 right-6 p-5"
              style={{ background: 'rgba(14,26,15,0.88)', backdropFilter: 'blur(8px)' }}
            >
              <p className="font-serif text-lg mb-1" style={{ color: '#F5EDD6' }}>Selva, Mayfair</p>
              <p className="text-xs" style={{ color: '#6B8C6E' }}>Abeka Junction, Tesano Accra</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-12 px-10"
        style={{
          background: '#0E1A0F',
          borderTop: '1px solid rgba(107,140,110,0.2)',
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-2xl tracking-widest" style={{ color: '#F5EDD6' }}>
            SELVA
          </p>
          <p className="text-xs text-center" style={{ color: '#6B8C6E' }}>
            © 2026 Selva Restaurant, Mayfair. All rights reserved.
          </p>
          <div className="flex gap-8">
            {['Instagram', 'X', 'Press'].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ color: '#6B8C6E', textDecoration: 'none' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#C9873A')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6B8C6E')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
