import { Check, Laptop, LineChart, Palette, Wrench } from 'lucide-react'

export default function Services() {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-section pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-14">

          <div className="md:w-1/2">
            <span className="section-badge mb-4 inline-block">LAYANAN</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Layanan Yang Kami Tawarkan</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">Kami menyediakan solusi digital lengkap mulai dari perancangan hingga pemeliharaan.</p>
            <ul className="space-y-3">
              {[
                "Pembuatan Landing Page",
                "Website Company Profile",
                "Toko Online (E-Commerce)",
                "Aplikasi Web Custom (Sistem Informasi)"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Check size={13} className="text-orange-600" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[
              { icon: Laptop, title: "Web Design", sub: "Tampilan modern & menarik" },
              { icon: Wrench, title: "Maintenance", sub: "Update & perbaikan rutin" },
              { icon: Palette, title: "UI/UX", sub: "Desain yang nyaman dipakai" },
              { icon: LineChart, title: "SEO", sub: "Naik peringkat di Google" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="glass-card p-6 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(249,115,22,.16)]">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <h4 className="font-extrabold text-gray-900 text-sm">{title}</h4>
                <p className="text-xs text-gray-400 mt-1">{sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}