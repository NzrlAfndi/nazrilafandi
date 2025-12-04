"use client"
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

const AnimatedText = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < text.length) {
          const nextIndex = prevIndex + 1;
          setDisplayedText(text.slice(0, nextIndex)); 
          return nextIndex;
        } else {
          clearInterval(timer);
          return prevIndex;
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default function StatsCounter() {
     const [projectsDone, setProjectsDone] = useState('0');

     useEffect(() => {
          const fetchStats = async () => {
               try {
                    const { data, error } = await supabase
                         .from('site_settings')
                         .select('stats_projects')
                         .single();
                    
                    if (data && !error) {
                         setProjectsDone(String(data.stats_projects || '0'));
                    }
               } catch (error) {
                    console.error("Gagal memuat nama website:", error);
               }
          };

          fetchStats();
     }, [])

     return (
          <section className="py-10 bg-white shadow-md relative z-20 -mt-10 mx-6 rounded-xl max-w-6xl md:mx-auto">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div>
                         <p className="text-4xl font-bold text-orange-600 min-h-[40px]">
                              <AnimatedText text={projectsDone} speed={150} />
                         </p>
                         <p className="text-gray-500 text-sm mt-1">Projek Selesai</p>
                    </div>
                    <div>
                         <p className="text-4xl font-bold text-orange-600 min-h-[40px]">
                              <AnimatedText text="3+" speed={200} />
                         </p>
                         <p className="text-gray-500 text-sm mt-1">Tahun Pengalaman</p>
                    </div>
                    <div>
                         <p className="text-4xl font-bold text-orange-600 min-h-[40px]">
                              <AnimatedText text="24/7" speed={150} />
                         </p>
                         <p className="text-gray-500 text-sm mt-1">Layanan Support</p>
                    </div>
                    <div>
                         <p className="text-4xl font-bold text-orange-600 min-h-[40px]">
                              <AnimatedText text="100%" speed={150} />
                         </p>
                         <p className="text-gray-500 text-sm mt-1">Kepuasan Klien</p>
                    </div>
               </div>
          </section>
     )
}
