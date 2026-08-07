import React, { useState } from 'react';
import { Tag as TagIcon, Plus, Search } from 'lucide-react';
import { Tag } from '../../types';

interface TagsViewProps {
  tags: Tag[];
  onAddTag: (tag: Omit<Tag, 'id'>) => void;
}

export const TagsView: React.FC<TagsViewProps> = ({ tags, onAddTag }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3B82F6');

  const filtered = tags.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddTag({
      name,
      color,
      usedCount: 0
    });

    setName('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header matching Screenshot 12 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Étiquettes</h1>
            <p className="text-sm text-gray-500 mt-1">
              Étiquettes personnalisées pour organiser les éléments de votre compte.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle étiquette</span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-5 max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des étiquettes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {filtered.length === 0 ? (
          /* Empty state matching Screenshot 12 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <TagIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucune étiquette pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Les étiquettes vous aident à catégoriser et filtrer les ordres de travail, les équipements, et plus encore.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle étiquette</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 max-w-4xl mx-auto">
            {filtered.map(tag => (
              <div
                key={tag.id}
                className="bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-2"
              >
                <div
                  className="w-3.5 h-3.5 rounded-full shrink-0"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="font-semibold text-gray-800 text-sm">{tag.name}</span>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {tag.usedCount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Créer une étiquette</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nom du tag *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Sécurité, Hydraulique, Critique..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Couleur</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 p-1 border rounded-lg cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
