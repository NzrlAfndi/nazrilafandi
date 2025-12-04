'use client'

import React, { useEffect, useState } from 'react';
import {
     Briefcase, Users, Eye, FileEdit,
     Calendar, MoreHorizontal, Star, Loader2, Image as ImageIcon
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type Project = {
     id: number;
     title: string;
     client: string;
     image_url: string;
     created_at: string;
     status: string;
}

export default function DashboardHome() {
     const [isLoading, setIsLoading] = useState(true);
     const [totalProjects, setTotalProjects] = useState(0);
     const [draftProjects, setDraftProjects] = useState(0);
     const [recentProjects, setRecentProjects] = useState<Project[]>([]);
     const [manualStats, setManualStats] = useState({
          views: 0,
          happyClients: '0'
     });
     const [chartData, setChartData] = useState<number[]>([5, 5, 5, 5, 5, 5, 5]);

     useEffect(() => {
          const fetchDashboardData = async () => {
               try {
                    const { count: publishedCount } = await supabase
                         .from('portfolios').select('*', { count: 'exact', head: true }).eq('status', 'published');
                    if (publishedCount !== null) setTotalProjects(publishedCount);

                    const { count: draftCount } = await supabase
                         .from('portfolios').select('*', { count: 'exact', head: true }).eq('status', 'draft');
                    if (draftCount !== null) setDraftProjects(draftCount);

                    const { data: projectData } = await supabase
                         .from('portfolios').select('id, title, client, image_url, created_at, status')
                         .order('created_at', { ascending: false }).limit(5);
                    if (projectData) setRecentProjects(projectData);

                    const { data: settingsData } = await supabase
                         .from('site_settings').select('total_views, happy_clients').single();

                    let currentViews = 0;

                    if (settingsData) {
                         currentViews = settingsData.total_views || 0;
                         setManualStats({
                              views: currentViews,
                              happyClients: settingsData.happy_clients || '0'
                         });
                    }

                    const generatedChart = Array(7).fill(0).map(() => {
                         if (currentViews === 0) return 2;
                         const intensity = Math.min(currentViews * 15, 100);
                         return Math.floor(Math.random() * (intensity - 5) + 5);
                    });

                    setChartData(generatedChart);
               } catch (error) {
                    console.error("Error loading dashboard", error);
               } finally {
                    setIsLoading(false);
               }
          };
          fetchDashboardData();
     }, []);

     const stats = [
          { label: 'Projek Publish', value: totalProjects, desc: 'Portofolio aktif', icon: Briefcase, color: 'bg-blue-500', trend: 'Real' },
          { label: 'Klien Puas', value: manualStats.happyClients, desc: 'Manual Input', icon: Users, color: 'bg-green-500', trend: 'High' },
          { label: 'Total Views', value: manualStats.views.toLocaleString(), desc: 'Estimasi Traffic', icon: Eye, color: 'bg-purple-500', trend: 'Total' },
          { label: 'Projek Draft', value: draftProjects, desc: 'Belum dipublish', icon: FileEdit, color: 'bg-orange-500', trend: 'Draft' },
     ];

     const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

     if (isLoading) return <div className="flex h-[80vh] items-center justify-center"><Loader2 size={40} className="animate-spin text-orange-500" /></div>;

     return (
          <div className="space-y-8 animate-fadeIn pb-10">
               <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                         <h1 className="text-3xl font-bold text-gray-800">Halo, Admin! 👋</h1>
                         <p className="text-gray-500 mt-1">Pantau perkembangan portofolio website Anda di sini.</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                         <Calendar size={16} className="text-orange-500" />
                         <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                         const Icon = stat.icon;
                         return (
                              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                   <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-xl text-white ${stat.color} shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                                             <Icon size={24} />
                                        </div>
                                        <span className="flex items-center text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{stat.trend}</span>
                                   </div>
                                   <div className="mt-4">
                                        <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                        <p className="text-xs text-gray-400 mt-1">{stat.desc}</p>
                                   </div>
                              </div>
                         );
                    })}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                         <div className="flex justify-between items-center mb-8 relative z-10">
                              <div>
                                   <h3 className="text-lg font-bold">Analitik Kunjungan</h3>
                                   <p className="text-gray-400 text-sm">Traffic mingguan (Simulasi)</p>
                              </div>
                              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition">
                                   <MoreHorizontal size={20} />
                              </button>
                         </div>

                         <div className="flex items-end justify-between gap-3 h-64 relative z-10 pb-2">
                              {chartData.map((height, i) => (
                                   <div key={i} className="h-full w-full flex flex-col items-center gap-2 group cursor-pointer">
                                        <div className="relative w-full flex-1 bg-gray-700/30 rounded-t-lg overflow-hidden">
                                             <div
                                                  style={{ height: `${height}%` }}
                                                  className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-90 origin-bottom"
                                             >
                                                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded shadow-lg transition-opacity">
                                                       {height}%
                                                  </div>
                                             </div>
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{days[i]}</span>
                                   </div>
                              ))}
                         </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col h-[450px]">
                         <div className="flex justify-between items-center mb-6">
                              <h3 className="text-lg font-bold text-gray-800">Upload Terbaru</h3>
                              <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-lg">Top 5</span>
                         </div>

                         <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                              {recentProjects.length === 0 ? (
                                   <div className="text-center text-gray-400 py-10 flex flex-col items-center">
                                        <Briefcase size={32} className="mb-2 opacity-50" />
                                        <p className="text-sm">Belum ada projek.</p>
                                   </div>
                              ) : (
                                   recentProjects.map((proj) => (
                                        <div key={proj.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition cursor-pointer group border border-transparent hover:border-gray-100">
                                             <div className="w-12 h-12 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200">
                                                  {proj.image_url ? (
                                                       <img src={proj.image_url} alt="" className="w-full h-full object-cover" />
                                                  ) : (
                                                       <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={16} /></div>
                                                  )}
                                             </div>
                                             <div className="flex-1 min-w-0">
                                                  <div className="flex justify-between items-start">
                                                       <h4 className="text-sm font-bold text-gray-800 truncate">{proj.title}</h4>
                                                       <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${proj.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                            {proj.status === 'published' ? 'Pub' : 'Draft'}
                                                       </span>
                                                  </div>
                                                  <p className="text-xs text-orange-600 mb-0.5">{proj.client}</p>
                                                  <p className="text-[10px] text-gray-400">{new Date(proj.created_at).toLocaleDateString('id-ID')}</p>
                                             </div>
                                        </div>
                                   ))
                              )}
                         </div>

                         <button className="w-full mt-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition">
                              Kelola Semua Projek
                         </button>
                    </div>
               </div>

               <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm">
                              <Star size={24} fill="currentColor" />
                         </div>
                         <div>
                              <h3 className="text-lg font-bold text-gray-800">Siap Update Website?</h3>
                              <p className="text-gray-600 text-sm">Pastikan portofolio selalu fresh agar klien makin yakin.</p>
                         </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                         <button className="flex-1 md:flex-none py-2.5 px-6 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-500/20">
                              + Upload Projek
                         </button>
                    </div>
               </div>
          </div>
     );
};