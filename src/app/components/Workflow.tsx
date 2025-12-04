import React from 'react'

export default function Workflow() {
     return (
          <section className="py-20 bg-orange-50">
               <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12">Alur Kerja Kami</h2>
                    <div className="relative">
                         <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-orange-200 -translate-y-1/2 z-0"></div>

                         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                              {[
                                   { step: 1, title: "Konsultasi", desc: "Diskusi kebutuhan website." },
                                   { step: 2, title: "Deal & DP", desc: "Kesepakatan harga & pembayaran." },
                                   { step: 3, title: "Pengerjaan", desc: "Desain dan coding dimulai." },
                                   { step: 4, title: "Selesai", desc: "Revisi & website siap online." },
                              ].map((item, index) => (
                                   <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center transform hover:-translate-y-2 transition duration-300">
                                        <div className={`w-10 h-10 ${index === 3 ? 'bg-green-500' : 'bg-orange-500'} text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg`}>
                                             {item.step}
                                        </div>
                                        <h4 className="font-bold mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                   </div>
                              ))}
                         </div>
                    </div>
               </div>
          </section>
     )
}
