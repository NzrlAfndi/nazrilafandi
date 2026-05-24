import { Star } from 'lucide-react'

const testimonials = [
  { name: "Raka Adipura", role: "Founder Kopi Temu", text: "Website kafe yang dibuat KodingMulu bener-bener ngebantu pelanggan buat reservasi dan lihat menu digital. Tampilannya pas banget sama suasana kafe saya, simpel tapi elegan." },
  { name: "Siti Aminah", role: "Pemilik Butik Muslimah", text: "Saya gaptek, tapi tim KodingMulu sabar banget bantuin bikin toko online dari nol. Sekarang jualan gamis bisa ke luar pulau karena punya website sendiri yang terpercaya." },
  { name: "Bambang Santoso", role: "Juragan Mebel Jepara", text: "Website katalog produk yang dikerjakan KodingMulu bikin usaha mebel saya kelihatan lebih bonafide. Klien-klien besar jadi lebih yakin buat order." },
];

export default function Testimoni() {
  return (
    <section id="testimoni" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-section pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="section-badge mb-3 inline-block">TESTIMONI</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Kata Mereka</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-7 flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(249,115,22,.16)]">
              <div className="flex text-amber-400 mb-4 gap-0.5">
                {[...Array(5)].map((_,j) => <Star key={j} size={14} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic text-sm leading-relaxed flex-grow mb-5">&quot;{t.text}&quot;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/50">
                <div className="w-9 h-9 rounded-full gradient-orange flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}