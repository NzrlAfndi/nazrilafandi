export default function Workflow() {
  const steps = [
    { step: 1, title: "Konsultasi", desc: "Diskusi kebutuhan website." },
    { step: 2, title: "Deal & DP", desc: "Kesepakatan harga & pembayaran." },
    { step: 3, title: "Pengerjaan", desc: "Desain dan coding dimulai." },
    { step: 4, title: "Selesai", desc: "Revisi & website siap online.", accent: true },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <span className="section-badge mb-3 inline-block">PROSES</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Alur Kerja Kami</h2>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[12.5%] w-3/4 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-green-400 z-0 rounded-full" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 relative z-10">
            {steps.map(({ step, title, desc, accent }) => (
              <div key={step} className="glass-card p-6 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(249,115,22,.18)]">
                <div className={`w-10 h-10 ${accent ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'gradient-orange'} text-white rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-base shadow-lg`}>
                  {step}
                </div>
                <h4 className="font-extrabold text-gray-900 mb-1.5 text-sm">{title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}