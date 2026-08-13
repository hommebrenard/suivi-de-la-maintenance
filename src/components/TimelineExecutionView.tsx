import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, FilterOptions, WeekInfo } from '../types';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertOctagon, 
  AlertTriangle, 
  SlidersHorizontal,
  Info
} from 'lucide-react';

interface TimelineExecutionViewProps {
  equipments: Equipment[];
  tasks: PlannedTask[];
  executions: Record<string, ExecutionRecord>;
  weeks: WeekInfo[];
  currentWeekNumber: number;
  onSelectTask: (task: PlannedTask, equipment: Equipment, execution?: ExecutionRecord) => void;
}

export const TimelineExecutionView: React.FC<TimelineExecutionViewProps> = ({
  equipments,
  tasks,
  executions,
  weeks,
  currentWeekNumber,
  onSelectTask,
}) => {
  // Filters State
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    lot: 'all',
    family: 'all',
    frequency: 'all',
    status: 'all',
  });

  // Week Range Pagination (e.g. 10 or 14 weeks view at a time for optimal density)
  const [weekRangeStart, setWeekRangeStart] = useState<number>(Math.max(1, currentWeekNumber - 4));
  const weekWindowSize = 14;

  const visibleWeeks = useMemo(() => {
    return weeks.filter(w => w.weekNumber >= weekRangeStart && w.weekNumber < weekRangeStart + weekWindowSize);
  }, [weeks, weekRangeStart]);

  const handlePrevWeeks = () => {
    setWeekRangeStart(prev => Math.max(1, prev - 6));
  };

  const handleNextWeeks = () => {
    setWeekRangeStart(prev => Math.min(53 - weekWindowSize, prev + 6));
  };

  const handleJumpToCurrentWeek = () => {
    setWeekRangeStart(Math.max(1, currentWeekNumber - 4));
  };

  // Filter Unique Families
  const families = useMemo(() => {
    const set = new Set(equipments.map(e => e.family));
    return Array.from(set).sort();
  }, [equipments]);

  // Filtered Equipments
  const filteredEquipments = useMemo(() => {
    return equipments.filter(eq => {
      // Search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const match = 
          eq.id.toLowerCase().includes(query) ||
          eq.description.toLowerCase().includes(query) ||
          eq.family.toLowerCase().includes(query) ||
          (eq.location && eq.location.toLowerCase().includes(query));
        if (!match) return false;
      }

      // Lot
      if (filters.lot !== 'all' && eq.lot !== filters.lot) return false;

      // Family
      if (filters.family !== 'all' && eq.family !== filters.family) return false;

      // Frequency / Status filters match equipment's tasks
      if (filters.frequency !== 'all' || filters.status !== 'all') {
        const eqTasks = tasks.filter(t => t.equipmentId === eq.id);
        const matchesCondition = eqTasks.some(t => {
          if (filters.frequency !== 'all' && t.frequency !== filters.frequency) return false;
          
          if (filters.status !== 'all') {
            const exec = executions[t.id];
            const currentStatus = exec?.status || (t.weekNumber < currentWeekNumber ? 'retard' : 'planifie');
            if (currentStatus !== filters.status) return false;
          }
          return true;
        });
        if (!matchesCondition) return false;
      }

      return true;
    });
  }, [equipments, tasks, executions, filters, currentWeekNumber]);

  // Task map for fast lookup: equipmentId -> weekNumber -> task
  const taskMap = useMemo(() => {
    const map = new Map<string, Map<number, PlannedTask>>();
    tasks.forEach(t => {
      if (!map.has(t.equipmentId)) {
        map.set(t.equipmentId, new Map());
      }
      map.get(t.equipmentId)!.set(t.weekNumber, t);
    });
    return map;
  }, [tasks]);

  // Helper for Status Style
  const getStatusBadgeStyle = (status: string, freq: string) => {
    switch (status) {
      case 'conforme':
        return {
          bg: 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs',
          border: 'ring-2 ring-emerald-300',
          label: 'Réalisé - Conforme',
          icon: <CheckCircle2 className="w-3 h-3 text-white" />
        };
      case 'en_cours':
        return {
          bg: 'bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold shadow-xs animate-pulse',
          border: 'ring-2 ring-amber-300',
          label: 'En Cours',
          icon: <Clock className="w-3 h-3 text-slate-900" />
        };
      case 'non_conforme':
        return {
          bg: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs',
          border: 'ring-2 ring-purple-300',
          label: 'Avec Réserve',
          icon: <AlertTriangle className="w-3 h-3 text-white" />
        };
      case 'retard':
        return {
          bg: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs',
          border: 'ring-2 ring-rose-400',
          label: 'En Retard',
          icon: <AlertOctagon className="w-3 h-3 text-white" />
        };
      default:
        // Planifié
        return {
          bg: 'bg-sky-100 hover:bg-sky-200 text-sky-800 border border-sky-300',
          border: '',
          label: 'Planifié',
          icon: null
        };
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-full overflow-hidden">
      
      {/* Controls & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => setFilters(f => ({ ...f, searchQuery: e.target.value }))}
              placeholder="Rechercher équipement, ID, local..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50/50"
            />
          </div>

          {/* Lot Filter */}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <select
              value={filters.lot}
              onChange={e => setFilters(f => ({ ...f, lot: e.target.value }))}
              className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">Tous les Lots</option>
              <option value="ÉLECTRICITÉ">Électricité</option>
              <option value="FLUIDE">Fluide / HVAC</option>
            </select>
          </div>

          {/* Family Filter */}
          <select
            value={filters.family}
            onChange={e => setFilters(f => ({ ...f, family: e.target.value }))}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[180px]"
          >
            <option value="all">Toutes les Familles</option>
            {families.map(fam => (
              <option key={fam} value={fam}>{fam}</option>
            ))}
          </select>

          {/* Frequency Filter */}
          <select
            value={filters.frequency}
            onChange={e => setFilters(f => ({ ...f, frequency: e.target.value }))}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Toutes Fréquences</option>
            <option value="H">Hebdomadaire (H)</option>
            <option value="M">Mensuel (M)</option>
            <option value="T">Trimestriel (T)</option>
            <option value="S">Semestriel (S)</option>
            <option value="A">Annuel (A)</option>
          </select>

          {/* Status Filter */}
          <select
            value={filters.status}
            onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
            className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tous Statuts</option>
            <option value="conforme">Réalisé (Conforme)</option>
            <option value="en_cours">En Cours</option>
            <option value="retard">En Retard</option>
            <option value="non_conforme">Avec Réserve</option>
            <option value="planifie">Planifié</option>
          </select>
        </div>

        {/* Timeline Navigation Controls */}
        <div className="flex items-center justify-between sm:justify-end gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
          <button
            onClick={handleJumpToCurrentWeek}
            className="px-3 py-1.5 bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            Aujourd'hui (S{currentWeekNumber})
          </button>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={handlePrevWeeks}
              disabled={weekRangeStart <= 1}
              className="p-1.5 hover:bg-white text-slate-700 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
              title="Semaines précédentes"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 px-2 min-w-[120px] text-center">
              Semaines {weekRangeStart} – {Math.min(52, weekRangeStart + weekWindowSize - 1)}
            </span>
            <button
              onClick={handleNextWeeks}
              disabled={weekRangeStart + weekWindowSize > 52}
              className="p-1.5 hover:bg-white text-slate-700 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
              title="Semaines suivantes"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Status Color Legend Bar (Directly matching UI Mockup style) */}
      <div className="bg-slate-900 text-white rounded-xl p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Légende Statuts d'Exécution :</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500 ring-2 ring-emerald-300 inline-block"></span>
            <span className="text-slate-200">Réalisé / Conforme</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-400 ring-2 ring-amber-300 inline-block animate-pulse"></span>
            <span className="text-slate-200">En Cours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-600 ring-2 ring-rose-400 inline-block"></span>
            <span className="text-slate-200">En Retard / Non Réalisé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-600 ring-2 ring-purple-300 inline-block"></span>
            <span className="text-slate-200">Anomalie / Avec Réserve</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-sky-200 border border-sky-400 inline-block"></span>
            <span className="text-slate-300">Planifié (A venir)</span>
          </div>
        </div>
      </div>

      {/* Main Execution Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto relative">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          
          {/* Table Header */}
          <thead>
            <tr className="bg-slate-800 text-slate-200 text-xs uppercase tracking-wider border-b border-slate-700">
              
              {/* Equipment Header (Sticky Left) */}
              <th className="p-3 pl-4 w-72 sticky left-0 z-20 bg-slate-800 border-r border-slate-700 shadow-sm">
                Équipements & Localisation ({filteredEquipments.length})
              </th>

              {/* Weeks Header */}
              {visibleWeeks.map(w => {
                const isCurrent = w.weekNumber === currentWeekNumber;
                return (
                  <th
                    key={w.weekNumber}
                    className={`p-2 text-center border-r border-slate-700 min-w-[55px] relative ${
                      isCurrent ? 'bg-amber-500 text-slate-950 font-extrabold' : ''
                    }`}
                  >
                    <div className="text-[11px] font-bold">S{w.weekNumber}</div>
                    <div className={`text-[9px] font-normal mt-0.5 ${isCurrent ? 'text-slate-950' : 'text-slate-400'}`}>
                      {w.startDate}
                    </div>

                    {/* Red Current Date Marker Bar */}
                    {isCurrent && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-[500px] bg-rose-500 z-10 pointer-events-none opacity-80 shadow-md"></div>
                    )}
                  </th>
                );
              })}

            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredEquipments.length === 0 ? (
              <tr>
                <td colSpan={visibleWeeks.length + 1} className="p-8 text-center text-slate-500">
                  Aucun équipement ne correspond à vos filtres.
                </td>
              </tr>
            ) : (
              filteredEquipments.map((eq, index) => {
                const eqMap = taskMap.get(eq.id);

                return (
                  <tr key={eq.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    
                    {/* Equipment Cell (Sticky) */}
                    <td className="p-3 pl-4 sticky left-0 z-10 bg-inherit border-r border-slate-200 shadow-xs">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 truncate max-w-[170px]" title={eq.description}>
                            {eq.description}
                          </span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            eq.lot === 'ÉLECTRICITÉ' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {eq.lot === 'ÉLECTRICITÉ' ? 'ELEC' : 'FLUIDE'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span className="font-mono text-slate-600 font-medium">{eq.id}</span>
                          <span>{eq.family}</span>
                        </div>
                      </div>
                    </td>

                    {/* Weeks Cells */}
                    {visibleWeeks.map(w => {
                      const task = eqMap?.get(w.weekNumber);
                      const isCurrent = w.weekNumber === currentWeekNumber;

                      if (!task) {
                        return (
                          <td key={w.weekNumber} className={`p-1.5 border-r border-slate-100 text-center ${isCurrent ? 'bg-amber-50/30' : ''}`}>
                            <span className="text-slate-200 text-[10px]">•</span>
                          </td>
                        );
                      }

                      const exec = executions[task.id];
                      // Determine status
                      let currentStatus = exec?.status;
                      if (!currentStatus) {
                        if (task.weekNumber < currentWeekNumber) {
                          currentStatus = 'retard';
                        } else {
                          currentStatus = 'planifie';
                        }
                      }

                      const badge = getStatusBadgeStyle(currentStatus, task.frequency);

                      return (
                        <td
                          key={w.weekNumber}
                          className={`p-1 border-r border-slate-100 text-center relative ${
                            isCurrent ? 'bg-amber-50/40' : ''
                          }`}
                        >
                          <button
                            onClick={() => onSelectTask(task, eq, exec)}
                            className={`w-full py-2 px-1 rounded-lg text-[10px] font-bold flex flex-col items-center justify-center gap-0.5 transition-all transform hover:scale-105 cursor-pointer ${badge.bg} ${badge.border}`}
                            title={`Semaine ${w.weekNumber} (${task.frequency}) : ${badge.label}. Cliquer pour ouvrir le rapport d'exécution.`}
                          >
                            <span className="leading-none flex items-center gap-1">
                              {badge.icon}
                              {task.frequency}
                            </span>
                          </button>
                        </td>
                      );
                    })}

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};
