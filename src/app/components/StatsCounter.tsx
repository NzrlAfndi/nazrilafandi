"use client"
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

const AnimatedText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [shown, setShown] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!text) return;
    const t = setInterval(() => {
      setIdx(p => {
        if (p < text.length) { setShown(text.slice(0, p+1)); return p+1; }
        clearInterval(t); return p;
      });
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return <span>{shown}</span>;
};

export default function StatsCounter() {
  const [projects, setProjects] = useState('0');
  useEffect(() => {
    supabase.from('site_settings').select('stats_projects').single()
      .then(({ data }) => { if (data) setProjects(String(data.stats_projects || '0')); });
  }, []);

  const stats = [
    { value: projects, label: 'Projek Selesai', speed: 150 },
    { value: '3+', label: 'Tahun Pengalaman', speed: 200 },
    { value: '24/7', label: 'Layanan Support', speed: 150 },
    { value: '100%', label: 'Kepuasan Klien', speed: 150 },
  ];

  return (
    <section className="relative z-20 -mt-14 mx-4 md:mx-auto max-w-5xl px-0">
      <div className="glass-strong rounded-[24px] px-6 py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i} className={`flex flex-col items-center ${i < 3 ? 'md:border-r md:border-orange-100/60' : ''}`}>
              <p className="text-4xl font-extrabold text-gradient-orange min-h-[44px]">
                <AnimatedText text={s.value} speed={s.speed} />
              </p>
              <p className="text-gray-400 text-xs mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}