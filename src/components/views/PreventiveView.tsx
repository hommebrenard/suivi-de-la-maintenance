import React, { useState } from 'react';
import { CalendarClock, CalendarCheck, Search, Plus, Play } from 'lucide-react';

export const PreventiveView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [plans, setPlans] = useState([
    {
      id: 'pm-1',
      title: 'Vidange et contrôle annuel des filtres AC-100',
      equipment: 'compresseur (AC-100)',
      frequency: 'Chaque année (ou 5000h)',
      nextDueDate: '2026-10-15',
      assignedTo: 'Jean Dupont'
    },
    {
      id: 'pm-2',
      title: 'Graissage mensuel des glissières d usinage',
      equipment: 'Fraiseuse CNC 5 Axes (CNC-200)',
      frequency: 'Tous les 30 jours',
      nextDueDate: '2026-08-10',
      assignedTo: 'Marc Antoine'
    }
  ]);

  const [showToast, setShowToast] = useState(false);

  const filtered = plans.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.equipment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGenerateDue = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col relative">
      {showToast && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-xs font-bold animate-bounce">
          <CalendarCheck className="w-4 h-4" />
          <span>Les ordres de travail préventifs dus ont été générés avec succès !</span>
        </div>
      )}
      {/* Header matching Screenshot 9 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Maintenance préventive</h1>
            <p className="text-sm text-gray-500 mt-1">
              Maintenance préventive par équipement. Ouvrez un équipement pour ajouter ou modifier ses plans.
            </p>
          </div>

          <button
            onClick={handleGenerateDue}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <CalendarCheck className="w-4 h-4 text-gray-500" />
            <span>Générer les MP dues</span>
          </button>
        </div>

        {/* Search row with counter matching Screenshot 9 */}
        <div className="mt-5 flex items-center justify-between">
          <div className="relative min-w-[280px] max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un équipement ou une tâche..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-xs text-gray-500 font-medium">
            {filtered.length} équipements · {filtered.length} plans préventifs
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {filtered.length === 0 ? (
          /* Empty state matching Screenshot 9 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <CalendarClock className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucune maintenance préventive pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Ouvrez un équipement et ajoutez-y sa maintenance préventive.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-5xl mx-auto">
            {filtered.map(plan => (
              <div key={plan.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {plan.equipment}
                  </span>
                  <h3 className="text-base font-bold text-gray-900">{plan.title}</h3>
                  <div className="text-xs text-gray-500 flex items-center gap-4 pt-1">
                    <span>Fréquence: <strong>{plan.frequency}</strong></span>
                    <span>Prochaine échéance: <strong>{plan.nextDueDate}</strong></span>
                    <span>Responsable: <strong>{plan.assignedTo}</strong></span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateDue}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-2xs"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Déclencher maintenant</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
