'use client'

import React, { useState, ChangeEvent, useEffect } from 'react';
import { Save, Image as ImageIcon, Upload, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export type PortfolioItem = {
    id?: number;
    title: string;
    client: string;
    category: string;
    completion_date: string;
    live_url: string;
    description: string;
    image_url: string;
    status: string;
}

interface AddPortfolioProps {
    onBack: () => void;
    initialData?: PortfolioItem | null;
    onSuccess?: () => void;
}

export default function AddPortfolio({ onBack, initialData, onSuccess }: AddPortfolioProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<PortfolioItem>({
        title: '',
        client: '',
        category: 'Website Development',
        completion_date: '',
        live_url: '',
        description: '',
        image_url: '',
        status: 'published'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setImagePreview(initialData.image_url);
        }
    }, [initialData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = (val: string) => {
        setFormData(prev => ({ ...prev, status: val }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                alert("Ukuran file terlalu besar! Maksimal 1MB.");
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || (!imageFile && !formData.image_url)) {
            alert("Mohon lengkapi Nama Projek dan Gambar Thumbnail.");
            return;
        }

        setIsLoading(true);

        try {
            let publicUrl = formData.image_url;
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('portfolio-images')
                    .getPublicUrl(filePath);

                publicUrl = data.publicUrl;
            }

            if (initialData?.id) {
                const { error } = await supabase
                    .from('portfolios')
                    .update({
                        title: formData.title,
                        client: formData.client,
                        category: formData.category,
                        completion_date: formData.completion_date,
                        live_url: formData.live_url,
                        description: formData.description,
                        status: formData.status,
                        image_url: publicUrl
                    })
                    .eq('id', initialData.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('portfolios')
                    .insert({
                        title: formData.title,
                        client: formData.client,
                        category: formData.category,
                        completion_date: formData.completion_date,
                        live_url: formData.live_url,
                        description: formData.description,
                        status: formData.status,
                        image_url: publicUrl
                    });

                if (error) throw error;
            }

            alert(initialData ? "Projek berhasil diperbarui!" : "Projek berhasil ditambahkan!");
            if (onSuccess) onSuccess();
            onBack();
        } catch (error) {
            console.error('Error:', error);
            let message = 'Terjadi kesalahan yang tidak diketahui.';

            if (error instanceof Error) {
                message = error.message;
            } else if (typeof error === 'object' && error !== null && 'message' in error) {
                message = (error as { message: string }).message;
            }

            alert(`Gagal menyimpan: ${message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{initialData ? 'Edit Portofolio' : 'Tambah Portofolio'}</h1>
                        <p className="text-gray-500 text-sm mt-1">{initialData ? 'Perbarui detail karya Anda.' : 'Upload karya terbaru Anda ke website.'}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button type="button" onClick={onBack} className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition">
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/30 disabled:opacity-70"
                    >
                        {isLoading ? <><Loader2 size={18} className="animate-spin" /> Menyimpan...</> : <><Save size={18} /> Simpan</>}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-4">Thumbnail Projek</label>
                        <div className={`relative w-full aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all group ${imagePreview ? 'border-orange-300 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-gray-50'}`}>
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                        <span className="text-white font-medium text-sm flex items-center gap-2"><Upload size={16} /> Ganti Gambar</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-3"><ImageIcon size={24} /></div>
                                    <p className="text-sm font-medium text-gray-600">Upload Gambar</p>
                                </div>
                            )}
                            <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-3">Status</label>
                        <div className="space-y-3">
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${formData.status === 'published' ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                                <input type="radio" name="status" className="text-orange-600 focus:ring-orange-500" checked={formData.status === 'published'} onChange={() => handleStatusChange('published')} />
                                <span className="ml-2 text-sm font-bold text-orange-800">Publish</span>
                            </label>
                            <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${formData.status === 'draft' ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                                <input type="radio" name="status" className="text-gray-400 focus:ring-gray-400" checked={formData.status === 'draft'} onChange={() => handleStatusChange('draft')} />
                                <span className="ml-2 text-sm font-medium text-gray-600">Draft</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Projek</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none" placeholder="Nama Projek" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Klien</label>
                                <input type="text" name="client" value={formData.client} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori</label>
                                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none">
                                    <option>Website Development</option>
                                    <option>UI/UX Design</option>
                                    <option>Mobile App</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal</label>
                                <input type="date" name="completion_date" value={formData.completion_date || ''} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Link</label>
                                <input type="url" name="live_url" value={formData.live_url} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi</label>
                            <textarea rows={5} name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-orange-500 outline-none"></textarea>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}