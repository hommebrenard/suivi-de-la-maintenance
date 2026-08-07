import React, { useState } from 'react';
import { Package, Plus, Search, AlertTriangle, X } from 'lucide-react';
import { InventoryItem } from '../../types';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onAddPart: (part: Omit<InventoryItem, 'id'>) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({
  inventory,
  onAddPart,
  onUpdateQuantity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [reorderOnlyFilter, setReorderOnlyFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Consommable');
  const [quantity, setQuantity] = useState(10);
  const [minQuantity, setMinQuantity] = useState(5);
  const [unitPrice, setUnitPrice] = useState(25);
  const [location, setLocation] = useState('Magasin Central');

  const filtered = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesReorder = true;
    if (reorderOnlyFilter) {
      matchesReorder = item.quantity <= item.minQuantity;
    }

    return matchesSearch && matchesReorder;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddPart({
      code: code || `PART-${Math.floor(100 + Math.random()*900)}`,
      name,
      category,
      quantity: Number(quantity),
      minQuantity: Number(minQuantity),
      unitPrice: Number(unitPrice),
      location
    });

    setName('');
    setCode('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header matching Screenshot 8 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventaire des pièces</h1>
            <p className="text-sm text-gray-500 mt-1">
              Pièces détachées et consommables avec niveaux de stock.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle pièce</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[240px] max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des pièces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setReorderOnlyFilter(!reorderOnlyFilter)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              reorderOnlyFilter
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Doit être réapprovisionnée
          </button>

          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none">
            <option value="">Types de pièces ∨</option>
          </select>
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none">
            <option value="">Emplacement ∨</option>
          </select>
          <select className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none">
            <option value="">Équipement ∨</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {filtered.length === 0 ? (
          /* Empty state matching Screenshot 8 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucune pièce pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Suivez les pièces détachées et consommables, avec les niveaux de stock et les alertes de stock bas.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Nouvelle pièce</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xs overflow-hidden max-w-6xl mx-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Désignation</th>
                  <th className="px-4 py-3">Catégorie</th>
                  <th className="px-4 py-3">Emplacement</th>
                  <th className="px-4 py-3">Stock actuel</th>
                  <th className="px-4 py-3">Prix unitaire</th>
                  <th className="px-4 py-3 text-right">Ajustement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map(item => {
                  const isLow = item.quantity <= item.minQuantity;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono font-medium text-gray-600">{item.code}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {item.name}
                        {isLow && (
                          <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                            <AlertTriangle className="w-3 h-3" /> Stock bas
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{item.category}</td>
                      <td className="px-4 py-3 text-gray-600">{item.location}</td>
                      <td className="px-4 py-3">
                        <span className={`font-bold ${isLow ? 'text-amber-600' : 'text-gray-900'}`}>
                          {item.quantity}
                        </span>
                        <span className="text-xs text-gray-400 ml-1">(min: {item.minQuantity})</span>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-medium">{item.unitPrice.toFixed(2)} €</td>
                      <td className="px-4 py-3 text-right space-x-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 rounded"
                        >
                          +1
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Ajouter une nouvelle pièce</h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Désignation *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Filtre séparateur d'huile"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Code / Réf</label>
                  <input
                    type="text"
                    placeholder="Ex: FILT-99"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Consommable">Consommable</option>
                    <option value="Lubrifiant">Lubrifiant</option>
                    <option value="Pièce mécanique">Pièce mécanique</option>
                    <option value="Composant électrique">Composant électrique</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Quantité</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Seuil min</label>
                  <input
                    type="number"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Prix (€)</label>
                  <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                  Enregistrer pièce
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
