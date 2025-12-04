'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Edit, Trash2, Search, ExternalLink, ImageOff, Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import AddPortfolio, { PortfolioItem } from './AddPortfolio';

export default function PortfolioManager() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPortfolios = useCallback(async () => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('id', { ascending: false });

    if (!error && data) {
      setPortfolios(data);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { data } = await supabase
        .from('portfolios')
        .select('*')
        .order('id', { ascending: false });

      if (isMounted) {
        setPortfolios(data || []);
        setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddNew = () => {
    setEditingItem(null);
    setView('form');
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setView('form');
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus projek ini?')) return;
    const previous = portfolios;
    setPortfolios(prev => prev.filter(item => item.id !== id));
    const { error } = await supabase.from('portfolios').delete().eq('id', id);
    if (error) {
      alert('Gagal menghapus');
      setPortfolios(previous);
    }
  };

  const handleFormSuccess = () => {
    fetchPortfolios();
    setView('list');
  };

  const filteredData = portfolios.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (view === 'form') {
    return (
      <AddPortfolio
        onBack={() => setView('list')}
        initialData={editingItem}
        onSuccess={handleFormSuccess}
      />
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Portofolio</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola daftar projek yang tampil di website.</p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-500/30"
        >
          <Plus size={18} /> Tambah Projek
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama projek atau klien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-10 flex justify-center text-orange-500">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            <p>Belum ada projek ditemukan.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Projek</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Kategori</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-orange-50/30 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageOff size={16} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.client}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>

                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}>
                        {item.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">{item.completion_date || '-'}</td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.live_url && (
                          <a
                            href={item.live_url}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}

                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id!)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}