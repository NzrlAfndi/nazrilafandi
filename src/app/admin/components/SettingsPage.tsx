'use client'
import { useEffect, useState } from 'react';
import { Save, Globe, Phone, Mail, Instagram, CreditCard, BarChart3, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

type GeneralInfo = {
    appName: string;
    phone: string;
    email: string;
    instagram: string;
    statsProjects: string;
}

type Package = {
    id: string;
    name: string;
    price: string;
    features: string;
}

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
        appName: '',
        phone: '',
        email: '',
        instagram: '',
        statsProjects: ''
    });

    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackageId, setSelectedPackageId] = useState('basic');
    const currentPackage = packages.find(p => p.id === selectedPackageId) || packages[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const { data: settingsData, error: settingsError } = await supabase
                    .from('site_settings')
                    .select('*')
                    .single();

                if (settingsError) throw settingsError;

                const { data: packagesData, error: packagesError } = await supabase
                    .from('packages')
                    .select('*')
                    .order('price', { ascending: true });

                if (packagesError) throw packagesError;

                if (settingsData) {
                    setGeneralInfo({
                        appName: settingsData.app_name,
                        phone: settingsData.phone,
                        email: settingsData.email,
                        instagram: settingsData.instagram,
                        statsProjects: settingsData.stats_projects
                    });
                }

                if (packagesData) {
                    setPackages(packagesData);
                    if (packagesData.length > 0) setSelectedPackageId(packagesData[0].id);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Gagal mengambil data dari server.');
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, []);

    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
    };

    const handlePackageChange = (field: keyof Package, value: string) => {
        setPackages(prev => prev.map(pkg =>
            pkg.id === selectedPackageId ? { ...pkg, [field]: value } : pkg
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error: settingsError } = await supabase
                .from('site_settings')
                .update({
                    app_name: generalInfo.appName,
                    phone: generalInfo.phone,
                    email: generalInfo.email,
                    instagram: generalInfo.instagram,
                    stats_projects: generalInfo.statsProjects
                })
                .eq('id', 1);

            if (settingsError) throw settingsError;
            const { error: packagesError } = await supabase
                .from('packages')
                .upsert(packages);

            if (packagesError) throw packagesError;

            alert("Pengaturan berhasil disimpan ke Database!");

        } catch (error) {
            console.error('Error saving data:', error);
            alert('Gagal menyimpan perubahan.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="animate-spin text-orange-500" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Pengaturan Website</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola informasi global yang tampil di landing page.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/30 disabled:opacity-70"
                >
                    {isLoading ? 'Menyimpan...' : <><Save size={18} /> Simpan Perubahan</>}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                                <Globe size={20} />
                            </div>
                            <h3 className="font-bold text-gray-800">Identitas & Statistik</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Website / Brand</label>
                                <input
                                    type="text"
                                    name="appName"
                                    value={generalInfo.appName}
                                    onChange={handleGeneralChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Total Projek Selesai</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <BarChart3 size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="statsProjects"
                                        value={generalInfo.statsProjects}
                                        onChange={handleGeneralChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <Phone size={20} />
                            </div>
                            <h3 className="font-bold text-gray-800">Kontak & Media Sosial</h3>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                        <Phone size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={generalInfo.phone}
                                        onChange={handleGeneralChange}
                                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Bisnis</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={generalInfo.email}
                                            onChange={handleGeneralChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Username Instagram</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                            <Instagram size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="instagram"
                                            value={generalInfo.instagram}
                                            onChange={handleGeneralChange}
                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-full sticky top-6">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <CreditCard size={20} />
                            </div>
                            <h3 className="font-bold text-gray-800">Edit Harga Paket</h3>
                        </div>

                        {packages.length === 0 ? (
                            <div className="text-center text-gray-500">Memuat paket...</div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pilih Paket untuk Diedit</label>
                                    <div className="relative">
                                        <select
                                            value={selectedPackageId}
                                            onChange={(e) => setSelectedPackageId(e.target.value)}
                                            className="w-full pl-4 pr-10 py-3 bg-orange-50 border border-orange-200 rounded-xl font-bold text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer appearance-none"
                                        >
                                            {packages.map(pkg => (
                                                <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-orange-600">
                                            <ChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>

                                {currentPackage && (
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4 animate-fadeIn">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama Label</label>
                                            <input
                                                type="text"
                                                value={currentPackage.name}
                                                onChange={(e) => handlePackageChange('name', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-orange-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Harga Display</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={currentPackage.price}
                                                    onChange={(e) => handlePackageChange('price', e.target.value)}
                                                    className="w-full pl-3 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-lg font-bold text-gray-800 focus:outline-none focus:border-orange-500 transition"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Fitur (Pisahkan Koma)</label>
                                            <textarea
                                                rows={4}
                                                value={currentPackage.features}
                                                onChange={(e) => handlePackageChange('features', e.target.value)}
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-orange-500 transition resize-none"
                                            ></textarea>
                                            <p className="text-[10px] text-gray-400 mt-1">*Contoh: Hosting, Domain, 3 Halaman</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}