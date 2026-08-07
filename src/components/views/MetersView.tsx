import React, { useState } from 'react';
import { Gauge, Lock, Search, Plus, Clock, Activity } from 'lucide-react';
import { Meter } from '../../types';

interface MetersViewProps {
  meters: Meter[];
  onAddMeter: (meter: Omit<Meter, 'id' | 'lastReadingDate'>) => void;
  onUpdateReading: (id: string, value: number) => void;
}

export const MetersView: React.FC<MetersViewProps> = ({
  meters,
  onAddMeter,
  onUpdateReading
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [name, setName] = useState('');
  const [equipmentName, setEquipmentName] = useState('');
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [unit, setUnit] = useState('heures');

  const filteredMeters = meters.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMeter({
      name,
      equipmentName: equipmentName || 'Général',
      currentValue: Number(currentValue),
      unit
    });

    setName('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header matching Screenshot 6 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Compteurs</h1>
            <p className="text-sm text-gray-500 mt-1">
              Suivez les relevés pour piloter la maintenance basée sur l'usage.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            <span>Nouveau compteur</span>
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
              placeholder="Rechercher des compteurs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {filteredMeters.length === 0 ? (
          /* Empty state matching Screenshot 6 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <Gauge className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucun compteur pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Enregistrez des relevés de compteur pour piloter la maintenance préventive basée sur l'usage.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg shadow-xs transition-colors"
            >
              <Lock className="w-4 h-4 text-gray-400" />
              <span>Nouveau compteur</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
                Offre Pro
              </span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {filteredMeters.map(meter => (
              <div key={meter.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{meter.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{meter.equipmentName}</p>
                  </div>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Gauge className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-baseline justify-between">
                  <span className="text-xs text-gray-500 font-medium">Dernier relevé</span>
                  <div className="text-2xl font-bold text-gray-900">
                    {meter.currentValue.toLocaleString()} <span className="text-xs font-normal text-gray-500">{meter.unit}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                  <span>Relevé le {meter.lastReadingDate}</span>
                  <button
                    onClick={() => {
                      const val = prompt('Nouveau relevé de compteur:', meter.currentValue.toString());
                      if (val && !isNaN(Number(val))) {
                        onUpdateReading(meter.id, Number(val));
                      }
                    }}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    + Enregistrer relevé
                  </button>
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
            <h3 className="text-lg font-bold text-gray-900">Ajouter un nouveau compteur</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nom du compteur</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Heures de marche compresseur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Équipement rattaché</label>
                <input
                  type="text"
                  placeholder="Ex: compresseur (AC-100)"
                  value={equipmentName}
                  onChange={(e) => setEquipmentName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Valeur initiale</label>
                  <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Unité</label>
                  <input
                    type="text"
                    placeholder="Ex: heures, km, cycles"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Ajouter compteur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
