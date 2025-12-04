"use client"
import { Check, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react';

type Package = {
  id: string;
  name: string;
  price: string;
  features: string;
}

export default function Pricing() {
     const [packages, setPackages] = useState<Package[]>([]);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const fetchPackages = async () => {
               try {
                    const { data, error } = await supabase
                         .from('packages')
                         .select('*');
                    
                    if (data && !error) {
                         const order = ['basic', 'business', 'custom'];
                         const sortedData = data.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
                         setPackages(sortedData);
                    }
               } catch (error) {
                    console.error("Gagal memuat harga:", error);
               } finally {
                    setIsLoading(false);
               }
          };

          fetchPackages();
     }, []);

     return (
          <section id="pricing" className="py-20 bg-orange-50">
               <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Daftar Harga Paket</h2>
                    {isLoading ? (
                         <div className="flex justify-center py-10">
                              <Loader2 className="animate-spin text-orange-500" size={40} />
                         </div>
                    ) : (
                         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                              {packages.map((pkg) => {
                                   const isPopular = pkg.id === 'business';
                                   const featureList = pkg.features ? pkg.features.split(',').map(f => f.trim()) : [];

                                   return (
                                        <div 
                                             key={pkg.id} 
                                             className={`
                                                  bg-white rounded-xl p-8 border-t-4 transition duration-300
                                                  ${isPopular 
                                                       ? 'shadow-xl border-orange-500 transform md:scale-105 relative z-10' 
                                                       : 'shadow-lg border-gray-300 hover:scale-105 hover:shadow-xl'
                                                  }
                                             `}
                                        >
                                             {isPopular && (
                                                  <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-lg font-bold">
                                                       Terlaris
                                                  </span>
                                             )}

                                             <h3 className={`text-xl font-bold ${isPopular ? 'text-orange-600' : 'text-gray-500'}`}>
                                                  {pkg.name}
                                             </h3>
                                             
                                             <div className="my-4">
                                                  <span className="text-3xl font-bold">{pkg.price}</span>
                                             </div>

                                             <ul className="text-sm space-y-3 text-gray-600 mb-8 min-h-[120px]">
                                                  {featureList.map((feature, idx) => (
                                                       <li key={idx} className="flex gap-2 items-start">
                                                            <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> 
                                                            <span>{feature}</span>
                                                       </li>
                                                  ))}
                                             </ul>

                                             <a 
                                                  href="#contact" 
                                                  className={`
                                                       block w-full py-2 text-center rounded-lg transition font-medium
                                                       ${isPopular 
                                                            ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:shadow-lg' 
                                                            : 'border border-orange-500 text-orange-500 hover:bg-orange-50'
                                                       }
                                                  `}
                                             >
                                                  {pkg.id === 'custom' ? 'Diskusi Dulu' : 'Pilih Paket'}
                                             </a>
                                        </div>
                                   );
                              })}
                         </div>
                    )}
               </div>
          </section>
     )
}
