import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, WeekInfo, GammeOperatoire } from '../types';
import { getGammeForEquipment } from '../data/gammesData';
import { 
  FileCheck2, 
  Printer, 
  Search, 
  Calendar, 
  Building, 
  User, 
  Wrench, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles,
  Zap,
  Droplets,
  Filter,
  Eye,
  PlusCircle,
  ShieldCheck
} from 'lucide-react';

interface WorkOrdersBTViewProps {
  equipments: Equipment[];
  tasks: PlannedTask[];
  executions: Record<string, ExecutionRecord>;
  weeks: WeekInfo[];
  currentWeekNumber: number;
  onSelectTask: (task: PlannedTask, equipment: Equipment, execution?: ExecutionRecord) => void;
  onSaveExecution: (record: ExecutionRecord) => void;
  gammesList?: GammeOperatoire[];
}

export const WorkOrdersBTView: React.FC<WorkOrdersBTViewProps> = ({
  equipments,
  tasks,
  executions,
  weeks,
  currentWeekNumber,
  onSelectTask,
  onSaveExecution,
  gammesList,
}) => {
  // Selected Month Filter - Default to 'AVRIL' for testing as requested by user
  const [selectedMonth, setSelectedMonth] = useState<string>('AVRIL');
  const [selectedLot, setSelectedLot] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const equipmentMap = useMemo(() => new Map(equipments.map(e => [e.id, e])), [equipments]);
  const weekMap = useMemo(() => new Map(weeks.map(w => [w.weekNumber, w])), [weeks]);

  // List of unique months
  const monthsList = [
    { key: 'all', label: '🗓️ Tous les Mois (S1 à S52)' },
    { key: 'AVRIL', label: '🎯 TEST SPECIAL : AVRIL 2026 (S15 à S18)' },
    { key: 'JANVIER', label: 'Janvier (S1 - S5)' },
    { key: 'FÉVRIER', label: 'Février (S6 - S9)' },
    { key: 'MARS', label: 'Mars (S10 - S14)' },
    { key: 'MAI', label: 'Mai (S19 - S22)' },
    { key: 'JUIN', label: 'Juin (S23 - S27)' },
    { key: 'JUILLET', label: 'Juillet (S28 - S31)' },
    { key: 'AOÛT', label: 'Août (S32 - S36)' },
    { key: 'SEPTEMBRE', label: 'Septembre (S37 - S40)' },
    { key: 'OCTOBRE', label: 'Octobre (S41 - S44)' },
    { key: 'NOVEMBRE', label: 'Novembre (S45 - S49)' },
    { key: 'DÉCEMBRE', label: 'Décembre (S50 - S53)' },
  ];

  // Filter tasks by selected month, lot, status and search
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const weekInfo = weekMap.get(t.weekNumber);
      if (!weekInfo) return false;

      // Month filter
      if (selectedMonth !== 'all' && weekInfo.monthName !== selectedMonth) {
        return false;
      }

      // Equipment lot filter
      const eq = equipmentMap.get(t.equipmentId);
      if (selectedLot !== 'all' && eq?.lot !== selectedLot) {
        return false;
      }

      // Execution status filter
      const exec = executions[t.id];
      const status = exec?.status || (t.weekNumber < currentWeekNumber ? 'retard' : 'planifie');
      if (statusFilter !== 'all' && status !== statusFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesEq = eq?.description.toLowerCase().includes(query) || eq?.id.toLowerCase().includes(query);
        const matchesBt = exec?.btNumber?.toLowerCase().includes(query);
        if (!matchesEq && !matchesBt) return false;
      }

      return true;
    });
  }, [tasks, selectedMonth, selectedLot, statusFilter, searchQuery, equipmentMap, weekMap, executions, currentWeekNumber]);

  // Mass action: Print all BTs in current view
  const handlePrintAllBT = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* User Focus Banner for Avril / Test Al Hoceima */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
              <Building className="w-4 h-4 text-blue-400" />
              BANK AL-MAGHRIB • AGENCE AL HOCEIMA
              <span className="text-slate-400">•</span>
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-md border border-amber-400/30">
                HAROON PM SERVICES
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <FileCheck2 className="w-7 h-7 text-blue-400" />
              Gestion des Bons de Travail (BT) & Gammes Opératoires
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Consultez, éditez et validez les Bons de Travail officiels pour chaque équipement de l'Agence d'Al Hoceima.
              <strong className="text-amber-200 ml-1">
                Gamme opératoire réelle chargée avec codes actions (PS-GPLC-1H-01, PS-ASC-1M-01, PS-SPT-1S-01...).
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedMonth('AVRIL')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                selectedMonth === 'AVRIL'
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-black'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-800" />
              Focus Test Avril (S15 - S18)
            </button>

            <button
              onClick={handlePrintAllBT}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              Imprimer Les BTs ({filteredTasks.length})
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Month Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Période / Mois :
            </label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              {monthsList.map(m => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          {/* Lot Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Lot d'Équipement :
            </label>
            <select
              value={selectedLot}
              onChange={e => setSelectedLot(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les Lots (Électricité, Fluide...)</option>
              <option value="ÉLECTRICITÉ">Électricité</option>
              <option value="FLUIDE">Fluide / HVAC</option>
              <option value="SÉCURITÉ">Sécurité</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Statut du Bon de Travail :
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
            >
              <option value="all">Tous les Statuts</option>
              <option value="conforme">Réalisé / Conforme</option>
              <option value="en_cours">En Cours</option>
              <option value="non_conforme">Avec Réserve</option>
              <option value="retard">En Retard / Non Réalisé</option>
              <option value="planifie">Planifié / À Venir</option>
            </select>
          </div>

          {/* Search Query */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Rechercher Équipement / Code BT :
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Ex: GROUPE, ONDULEUR, BT-HCM..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

        </div>

        {/* Quick Month Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-500 mr-1">Raccourcis Mois :</span>
          {['AVRIL', 'JANVIER', 'FÉVRIER', 'MARS', 'MAI', 'JUIN', 'AOÛT', 'all'].map(mKey => (
            <button
              key={mKey}
              onClick={() => setSelectedMonth(mKey)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                selectedMonth === mKey
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mKey === 'all' ? 'Tous' : mKey}
            </button>
          ))}
        </div>
      </div>

      {/* BT List Table / Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-blue-600" />
              Liste des Bons de Travail (BT) — {selectedMonth === 'all' ? 'Exercice 2026 Complete' : `Mois de ${selectedMonth}`}
            </h3>
            <p className="text-xs text-slate-500">
              {filteredTasks.length} Bons de Travail générés avec gammes opératoires associées
            </p>
          </div>

          <div className="text-xs text-slate-600 font-medium bg-slate-100 px-3 py-1.5 rounded-xl">
            Agence Al Hoceima • <strong className="text-blue-900">{filteredTasks.length} Tâches</strong>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <FileCheck2 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">Aucun Bon de Travail ne correspond aux filtres sélections.</p>
            <p className="text-xs text-slate-500 mt-1">Essayez de sélectionner un autre mois ou de réinitialiser la recherche.</p>
            <button
              onClick={() => { setSelectedMonth('AVRIL'); setSelectedLot('all'); setStatusFilter('all'); setSearchQuery(''); }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl hover:bg-blue-500 transition-colors cursor-pointer"
            >
              Afficher le Mois d'Avril (Test Al Hoceima)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map(t => {
              const eq = equipmentMap.get(t.equipmentId);
              const exec = executions[t.id];
              const weekInfo = weekMap.get(t.weekNumber);
              const status = exec?.status || (t.weekNumber < currentWeekNumber ? 'retard' : 'planifie');
              const gammeItems = getGammeForEquipment(t.equipmentId, t.frequency, gammesList);
              const btCode = exec?.btNumber || `BT-HCM-2026-S${String(t.weekNumber).padStart(2, '0')}-${t.equipmentId.replace('BAM-HCM_AG-', '')}`;

              return (
                <div
                  key={t.id}
                  className="bg-slate-50 border border-slate-200 hover:border-blue-300 rounded-2xl p-4 flex flex-col justify-between transition-all hover:shadow-md group"
                >
                  <div>
                    {/* Header Code BT & Status */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-black text-blue-900 bg-blue-100/80 px-2.5 py-1 rounded-lg border border-blue-200">
                        {btCode}
                      </span>

                      {/* Status Badge */}
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        status === 'conforme'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : status === 'en_cours'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : status === 'non_conforme'
                          ? 'bg-purple-100 text-purple-900 border-purple-300'
                          : status === 'retard'
                          ? 'bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-slate-200 text-slate-800 border-slate-300'
                      }`}>
                        {status === 'conforme' && '✓ EXÉCUTÉ'}
                        {status === 'en_cours' && '⏳ EN COURS'}
                        {status === 'non_conforme' && '⚠️ AVEC RÉSERVE'}
                        {status === 'retard' && '🔴 EN RETARD'}
                        {status === 'planifie' && '📅 PLANIFIÉ'}
                      </span>
                    </div>

                    {/* Equipment Details */}
                    <div className="space-y-1 my-2">
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {eq?.description || t.equipmentId}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-mono">
                        Code: <strong className="text-slate-800">{t.equipmentId}</strong>
                      </p>
                    </div>

                    {/* Task Info Chips */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-600 my-2">
                      <span className="bg-white border border-slate-200 px-2 py-0.5 rounded-md font-semibold">
                        Semaine {t.weekNumber} ({weekInfo?.monthName || '2026'})
                      </span>
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                        Fréq: {t.frequency}
                      </span>
                      <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-semibold">
                        Lot: {eq?.lot}
                      </span>
                    </div>

                    {/* Gamme info preview */}
                    <div className="mt-3 p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 space-y-1">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span className="flex items-center gap-1 text-blue-800">
                          <Wrench className="w-3.5 h-3.5" /> Gamme Opératoire
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {gammeItems.length} points de contrôle
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 line-clamp-1">
                        Ex: {gammeItems[0]?.actionCode || ''} - {gammeItems[0]?.label || 'Inspection générale'}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">
                      Technicien: <strong className="text-slate-800">{exec?.technicianName || 'Karim Bennani'}</strong>
                    </span>

                    <button
                      onClick={() => eq && onSelectTask(t, eq, exec)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Renseigner BT
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
