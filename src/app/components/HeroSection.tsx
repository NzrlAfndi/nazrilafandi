"use client"
import { ArrowRight, Sparkles, Code2, Globe, Zap } from 'lucide-react'
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="tahoe-bg min-h-screen flex items-center relative overflow-hidden pt-28 pb-24"
    >
      {/* Ambient orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-300/30 to-orange-400/20 blur-[80px] animate-orb pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-60px] w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-orange-400/25 to-yellow-300/15 blur-[70px] animate-orb delay-700 pointer-events-none" style={{animationDelay:'4s'}} />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-amber-200/20 to-transparent blur-[60px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(234,88,12,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,88,12,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* ── Left: Text content ── */}
          <div className="lg:w-1/2 opacity-0 animate-fadeInUp" style={{animationFillMode:'forwards'}}>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 opacity-0 animate-badge-pop delay-200">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-semibold text-orange-700">🚀 Jasa Pembuatan Website Terpercaya</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight text-gray-900">
              Bangun Bisnis{' '}
              <br />
              <span className="text-shimmer">Digital Anda</span>{' '}
              <br />
              <span className="relative inline-block">
                Sekarang
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9C60 3 120 3 150 5C180 7 240 3 298 3" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-xl leading-relaxed opacity-0 animate-fadeInUp delay-300">
              Kami membantu UMKM dan perusahaan bertransformasi digital dengan website yang
              <span className="font-semibold text-orange-600"> cepat, aman, dan memikat pelanggan</span> — dari konsep hingga live dalam hitungan hari.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14 opacity-0 animate-fadeInUp delay-400">
              <Link
                href="#portfolio"
                className="btn-tahoe-primary px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                Lihat Projek <ArrowRight size={18} />
              </Link>
              <Link
                href="#contact"
                className="btn-tahoe-ghost px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                Konsultasi Gratis
              </Link>
            </div>

            {/* Mini trust badges */}
            <div className="flex flex-wrap gap-3 opacity-0 animate-fadeInUp delay-500">
              {[
                { icon: Code2, label: 'Next.js & React' },
                { icon: Globe, label: 'SEO Friendly' },
                { icon: Zap, label: 'Super Cepat' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-orange-800">
                  <Icon size={15} className="text-orange-500" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Glass mockup card ── */}
          <div className="lg:w-1/2 flex justify-center relative opacity-0 animate-slide-right delay-300" style={{animationFillMode:'forwards'}}>
            
            {/* Floating decorative orb behind card */}
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-gradient-to-br from-amber-400/40 to-orange-500/30 blur-2xl animate-float pointer-events-none" />
            <div className="absolute bottom-[-10px] left-[-10px] w-24 h-24 rounded-full bg-gradient-to-tr from-orange-300/30 to-yellow-400/20 blur-xl animate-float-rev pointer-events-none" />

            {/* Main browser mockup glass card */}
            <div className="glass-strong rounded-[28px] p-3 w-full max-w-[480px] animate-float">
              {/* Browser chrome */}
              <div className="glass rounded-[18px] px-4 py-3 flex items-center gap-3 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 glass rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-gray-500 font-mono">kodingmulu.com</span>
                </div>
              </div>

              {/* Website content mockup */}
              <div className="rounded-[14px] overflow-hidden">
                {/* Hero area */}
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-6 pb-8 relative">
                  <div className="w-28 h-3 bg-white/40 rounded-full mb-3" />
                  <div className="w-40 h-5 bg-white/60 rounded-full mb-2" />
                  <div className="w-32 h-5 bg-white/50 rounded-full mb-5" />
                  <div className="flex gap-2">
                    <div className="w-24 h-8 bg-white rounded-lg" />
                    <div className="w-24 h-8 bg-white/25 border border-white/50 rounded-lg" />
                  </div>
                  {/* Floating card inside hero */}
                  <div className="absolute right-4 top-4 glass rounded-xl p-3 w-28">
                    <div className="w-full h-12 bg-white/30 rounded-lg mb-2" />
                    <div className="w-full h-2 bg-white/40 rounded-full mb-1.5" />
                    <div className="w-3/4 h-2 bg-white/30 rounded-full" />
                  </div>
                </div>

                {/* Stats bar */}
                <div className="bg-white/80 backdrop-blur-sm px-5 py-4 grid grid-cols-3 gap-4">
                  {['50+ Projek', '3+ Tahun', '100% Happy'].map((stat) => (
                    <div key={stat} className="text-center">
                      <div className="text-[10px] font-bold text-orange-600">{stat.split(' ')[0]}</div>
                      <div className="text-[9px] text-gray-400">{stat.split(' ').slice(1).join(' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Cards row */}
                <div className="bg-orange-50/90 px-4 py-4 grid grid-cols-2 gap-3">
                  {[
                    { color: 'from-orange-100 to-amber-50', label: 'Landing Page' },
                    { color: 'from-amber-100 to-yellow-50', label: 'Toko Online' },
                  ].map(({ color, label }) => (
                    <div key={label} className={`bg-gradient-to-br ${color} rounded-xl p-3`}>
                      <div className="w-6 h-6 bg-orange-400/30 rounded-lg mb-2" />
                      <div className="w-full h-2 bg-orange-300/40 rounded-full mb-1.5" />
                      <div className="w-3/4 h-2 bg-orange-200/40 rounded-full" />
                      <div className="text-[9px] font-bold text-orange-600 mt-2">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating notification chips */}
            <div className="absolute -left-6 top-16 glass-card px-4 py-2.5 flex items-center gap-3 animate-float delay-200 hidden lg:flex" style={{animationDelay:'1s'}}>
              <div className="w-8 h-8 rounded-full gradient-orange flex items-center justify-center text-white">
                <Sparkles size={14} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Projek Baru!</p>
                <p className="text-[10px] text-gray-500">Landing Page selesai 🎉</p>
              </div>
            </div>

            <div className="absolute -right-4 bottom-20 glass-card px-4 py-2.5 flex items-center gap-3 animate-float-rev hidden lg:flex">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-base font-bold">✓</div>
              <div>
                <p className="text-xs font-bold text-gray-800">100% Satisfied</p>
                <p className="text-[10px] text-gray-500">Klien senang selalu</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}