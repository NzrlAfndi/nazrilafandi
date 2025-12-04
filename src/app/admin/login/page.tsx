'use client'
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation'; 
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
     const router = useRouter();
     const [showPassword, setShowPassword] = useState(false);
     const [isLoading, setIsLoading] = useState(false);
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleLogin = async (e: React.FormEvent) => {
          e.preventDefault();
          setIsLoading(true); // Mulai loading
          
          console.log("Mencoba login dengan:", email); // Cek apakah fungsi terpanggil

          try {
               const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
               });

               // Cek response di console browser (Tekan F12 -> Console)
               console.log("Supabase Response:", { data, error });

               if (error) {
                    throw error;
               }

               if (data.user) {
                    console.log("Login berhasil, mencoba redirect...");
                    router.replace('/admin/dashboard'); 
               }

          } catch (error) {
               console.error("Terjadi Error:", error); // Cek error di console
               
               let message = "Gagal Login";
               if (error instanceof Error) {
                    message = error.message;
               } else if (typeof error === 'object' && error !== null && 'message' in error) {
                    message = (error as { message: string }).message;
               }
               
               alert(message);
          } finally {
               // PENTING: Matikan loading di akhir
               setIsLoading(false); 
          }
     };

     return (
          <div className="min-h-screen flex items-center justify-center font-sans bg-gradient-to-br from-orange-600 to-amber-600 p-4 relative overflow-hidden">
               <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                         <circle cx="90" cy="10" r="20" fill="white" />
                    </svg>
               </div>

               <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-2xl shadow-orange-900/20 p-8 md:p-10 relative z-10 animate-fadeIn">
                    <div className="text-center mb-10">
                         <div className="inline-block mb-4">
                              <div className="text-3xl font-extrabold tracking-tight text-gray-800">
                                   KodingMulu<span className="text-orange-500">.</span>
                              </div>
                         </div>
                         <h2 className="text-xl font-bold text-gray-700">Selamat Datang Kembali</h2>
                         <p className="text-sm text-gray-400 mt-2">Masuk untuk mengelola dashboard Anda</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                         <div>
                              <label className="block text-xs font-bold text-gray-600 uppercase mb-2 ml-1">Email</label>
                              <div className="relative group">
                                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                   </div>
                                   <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                                        placeholder="Email"
                                   />
                              </div>
                         </div>

                         <div>
                              <div className="relative group">
                                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                                   </div>
                                   <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-11 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium"
                                        placeholder="Password"
                                   />
                                   <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                   >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                   </button>
                              </div>
                         </div>

                         <button
                              type="submit"
                              disabled={isLoading}
                              className="w-full flex justify-center items-center py-3.5 px-4 mt-6 rounded-xl shadow-lg shadow-orange-500/30 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                         >
                              {isLoading ? (
                                   <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Memproses...
                                   </>
                              ) : (
                                   <>
                                        Masuk Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                                   </>
                              )}
                         </button>
                    </form>
               </div>

               {/* Copyright Footer (Optional) */}
               <div className="absolute bottom-6 text-orange-100/60 text-xs">
                    &copy; 2024 Kodingmulu. All rights reserved.
               </div>

          </div>
     );
}