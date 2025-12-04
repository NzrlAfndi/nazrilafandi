import { Check, Laptop, LineChart, Palette, Wrench } from 'lucide-react'
import React from 'react'

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Layanan Yang Kami Tawarkan</h2>
            <p className="text-gray-600 mb-6">Kami menyediakan solusi digital lengkap mulai dari perancangan hingga pemeliharaan.</p>
            <ul className="space-y-4">
              {[
                "Pembuatan Landing Page",
                "Website Company Profile",
                "Toko Online (E-Commerce)",
                "Aplikasi Web Custom (Sistem Informasi)"
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <Check className="text-orange-500" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[
              { icon: <Laptop size={32} />, title: "Web Design" },
              { icon: <Wrench size={32} />, title: "Maintenance" },
              { icon: <Palette size={32} />, title: "UI/UX" },
              { icon: <LineChart size={32} />, title: "SEO" },
            ].map((service, index) => (
              <div key={index} className="bg-orange-100 p-6 rounded-lg text-center hover:bg-orange-200 transition cursor-default">
                <div className="flex justify-center text-orange-600 mb-2">{service.icon}</div>
                <h4 className="font-bold text-gray-800">{service.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
