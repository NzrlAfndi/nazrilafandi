'use client'
import { useEffect, useState } from 'react';
import { Settings, Bell, Search, Menu, X, LayoutDashboard, Package, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import DashboardHome from '../components/DashboardHome';
import SettingsPage from '../components/SettingsPage';
import PortfolioManager from '../components/PortfolioManager';

export default function AdminDashboard() {
     const router = useRouter();
     const [sidebarOpen, setSidebarOpen] = useState(true);
     const [activeMenu, setActiveMenu] = useState('dashboard');
     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

     const [branding, setBranding] = useState({
          appName: 'KodingMulu',
          email: 'admin@kodingmulu.com'
     });

     useEffect(() => {
          const fetchBranding = async () => {
               try {
                    const { data, error } = await supabase
                         .from('site_settings')
                         .select('app_name, email')
                         .single();

                    if (data && !error) {
                         setBranding({
                              appName: data.app_name || 'KodingMulu',
                              email: data.email || 'admin@kodingmulu.com'
                         });
                    }
               } catch (error) {
                    console.error("Gagal memuat branding:", error);
               }
          };

          fetchBranding();
     }, []);

     const handleLogout = async () => {
          try {
               await supabase.auth.signOut();
               router.push('/');
               router.refresh();
          } catch (error) {
               console.error("Gagal logout:", error);
          }
     };

     const menuItems = [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'portfolio', label: 'Kelola Portofolio', icon: Package },
          { id: 'settings', label: 'Pengaturan', icon: Settings },
     ];

     // Logic Render Konten
     const renderContent = () => {
          switch (activeMenu) {
               case 'dashboard': return <DashboardHome />;
               case 'portfolio': return <PortfolioManager />;
               case 'settings': return <SettingsPage />;
               default: return <DashboardHome />;
          }
     };

     return (
          <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
               {mobileMenuOpen && (
                    <div
                         className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                         onClick={() => setMobileMenuOpen(false)}
                    />
               )}

               <aside className={`
                    fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
                    ${sidebarOpen ? 'w-72' : 'w-20 hidden md:flex'}
                    ${mobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'}
                    `}>
                    <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                         <div className={`flex items-center gap-2 transition-opacity duration-300 ${!sidebarOpen && 'md:hidden'}`}>
                              <div className="text-xl font-extrabold tracking-tight text-gray-800">
                                   {branding.appName}<span className="text-orange-500">.</span>
                              </div>
                         </div>

                         <button
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              className="hidden md:flex p-2 hover:bg-orange-50 rounded-lg text-gray-400 hover:text-orange-600 transition"
                         >
                              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                         </button>

                         <button
                              onClick={() => setMobileMenuOpen(false)}
                              className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-500"
                         >
                              <X size={20} />
                         </button>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                         {menuItems.map((item) => {
                              const Icon = item.icon;
                              const isActive = activeMenu === item.id;
                              return (
                                   <button
                                        key={item.id}
                                        onClick={() => {
                                             setActiveMenu(item.id);
                                             setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'} ${!sidebarOpen && 'justify-center px-2'}`}>
                                        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r-full" />}
                                        <Icon size={22} className={`${isActive ? 'text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                        {(sidebarOpen || mobileMenuOpen) && (
                                             <span>{item.label}</span>
                                        )}
                                   </button>
                              );
                         })}
                    </nav>

                    <div className="p-4 border-t border-gray-100">
                         <div className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer ${!sidebarOpen && 'justify-center'}`}>
                              <button
                                   onClick={handleLogout}
                                   className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer ${!sidebarOpen && 'justify-center'}`}
                              >
                                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-500/20">
                                        AD
                                   </div>
                                   {(sidebarOpen || mobileMenuOpen) && (
                                        <div className="flex-1 overflow-hidden">
                                             <p className="text-sm font-bold text-gray-800 truncate">Admin User</p>
                                             <p className="text-xs text-gray-500 truncate">{branding.email}</p>
                                        </div>
                                   )}
                                   {(sidebarOpen || mobileMenuOpen) && (
                                        <LogOut size={18} className="text-gray-400 hover:text-red-500 transition" />
                                   )}
                              </button>
                         </div>
                    </div>
               </aside>

               <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-6 z-10">
                         <div className="flex items-center gap-4">
                              <button
                                   onClick={() => setMobileMenuOpen(true)}
                                   className="md:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                              >
                                   <Menu size={24} />
                              </button>

                              <div className="hidden md:flex relative w-96">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                   <input
                                        type="text"
                                        placeholder="Cari pesanan, pelanggan, atau dokumen..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-gray-700 placeholder-gray-400"
                                   />
                              </div>
                         </div>
                    </header>

                    <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 scroll-smooth">
                         <div className="max-w-7xl mx-auto">
                              {renderContent()}
                         </div>
                    </main>
               </div>
          </div>
     );
}