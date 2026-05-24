import { Search, Smartphone, Zap } from 'lucide-react'

export default function WhyChoose() {
  const cards = [
    { icon: Zap, title: 'Performa Cepat', desc: 'Website dioptimasi untuk kecepatan loading maksimal agar pengunjung tidak kabur.', color: 'text-amber-500', bg: 'bg-amber-100' },
    { icon: Smartphone, title: 'Responsif Mobile', desc: 'Tampilan menyesuaikan dengan sempurna di semua perangkat, dari HP hingga Desktop.', color: 'text-orange-500', bg: 'bg-orange-100' },
    { icon: Search, title: 'SEO Friendly', desc: 'Struktur kode yang disukai Google untuk membantu website Anda naik peringkat.', color: 'text-rose-500', bg: 'bg-rose-100' },
  ];

  return (
    <section id="why-us" className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="section-badge mb-3 inline-block">KEUNGGULAN</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kenapa Memilih Jasa Kami?</h2>
          <div className="w-16 h-1 rounded-full gradient-orange mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="glass-card p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(249,115,22,.18)]">
              <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center mb-5`}>
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}