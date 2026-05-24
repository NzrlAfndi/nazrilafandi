"use client"
import { Check, Loader2, Sparkles } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react';

type Package = { id: string; name: string; price: string; features: string; }

export default function Pricing() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.from('packages').select('*').then(({ data }) => {
      if (data) {
        const order = ['basic','business','custom'];
        setPackages(data.sort((a,b) => order.indexOf(a.id) - order.indexOf(b.id)));
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 glass-section pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <span className="section-badge mb-3 inline-block">HARGA</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Daftar Harga Paket</h2>
          <p className="text-gray-500 mt-3 text-sm">Transparan, tanpa biaya tersembunyi.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-orange-400" size={36} />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {packages.map((pkg) => {
              const isPopular = pkg.id === 'business';
              const featureList = pkg.features ? pkg.features.split(',').map(f => f.trim()) : [];
              return (
                <div key={pkg.id} className={`relative flex flex-col rounded-[24px] p-7 transition-all duration-300
                  ${isPopular
                    ? 'glass-strong md:scale-105 z-10 shadow-[0_20px_60px_rgba(249,115,22,.22)] border-orange-300/50'
                    : 'glass-card hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(249,115,22,.14)]'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 btn-tahoe-primary px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        <Sparkles size={11} /> Terlaris
                      </span>
                    </div>
                  )}

                  <h3 className={`text-base font-extrabold mb-1 ${isPopular ? 'text-orange-600' : 'text-gray-500'}`}>
                    {pkg.name}
                  </h3>
                  <div className="mb-5">
                    <span className="text-3xl font-extrabold text-gray-900">{pkg.price}</span>
                  </div>

                  <ul className="space-y-2.5 text-sm text-gray-600 mb-7 flex-grow">
                    {featureList.map((f, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} className="text-green-600" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" className={`block w-full py-3 text-center rounded-xl font-bold text-sm transition-all
                    ${isPopular ? 'btn-tahoe-primary' : 'btn-outline-orange'}`}>
                    {pkg.id === 'custom' ? 'Diskusi Dulu' : 'Pilih Paket'}
                  </a>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}