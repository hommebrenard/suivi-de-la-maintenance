import React, { useState } from 'react';
import { CheckSquare, Lock, Search } from 'lucide-react';
import { Procedure } from '../../types';

interface ProceduresViewProps {
  procedures: Procedure[];
  onAddProcedure: (proc: Omit<Procedure, 'id' | 'createdAt'>) => void;
}

export const ProceduresView: React.FC<ProceduresViewProps> = ({
  procedures,
  onAddProcedure
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const filtered = procedures.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddProcedure({
      title,
      description,
      stepsCount: 5
    });

    setTitle('');
    setDescription('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header matching Screenshot 11 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Procédures</h1>
            <p className="text-sm text-gray-500 mt-1">
              Check-lists et modèles d'inspection réutilisables.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            <span>Nouvelle procédure</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
              Offre Pro
            </span>
          </button>
        </div>

        {/* Search */}
        <div className="mt-5 max-w-sm">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des procédures..."
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
          /* Empty state matching Screenshot 11 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <CheckSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucune procédure pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Créez des check-lists et des inspections à rattacher aux ordres de travail, aux équipements et aux emplacements.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg shadow-xs transition-colors"
            >
              <Lock className="w-4 h-4 text-gray-400" />
              <span>Nouvelle procédure</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
                Offre Pro
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {filtered.map(proc => (
              <div key={proc.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-gray-900 text-base">{proc.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded font-medium">
                    {proc.stepsCount} points de contrôle
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{proc.description}</p>
                <div className="text-xs text-gray-400 pt-2 border-t">
                  Créé le {proc.createdAt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Nouvelle procédure d'inspection</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Titre de la procédure *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Check-list sécurité armoire électrique"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Instructions générales..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
