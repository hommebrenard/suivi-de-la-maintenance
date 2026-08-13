import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, WeekInfo } from '../types';
import { Search, Download, RefreshCw, FileText } from 'lucide-react';

interface MatrixScheduleViewProps {
  equipments: Equipment[];
  tasks: PlannedTask[];
  executions: Record<string, ExecutionRecord>;
  weeks: WeekInfo[];
  currentWeekNumber: number;
  onSelectTask: (task: PlannedTask, equipment: Equipment, execution?: ExecutionRecord) => void;
}

export const MatrixScheduleView: React.FC<MatrixScheduleViewProps> = ({
  equipments,
  tasks,
  executions,
  weeks,
  currentWeekNumber,
  onSelectTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lotFilter, setLotFilter] = useState('all');

  const filteredEquipments = useMemo(() => {
    return equipments.filter(eq => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = 
          eq.id.toLowerCase().includes(q) ||
          eq.description.toLowerCase().includes(q) ||
          eq.family.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (lotFilter !== 'all' && eq.lot !== lotFilter) return false;
      return true;
    });
  }, [equipments, searchQuery, lotFilter]);

  // Lookup map: equipmentId -> weekNumber -> PlannedTask
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

  // Group weeks by Month for top header row
  const monthGroups = useMemo(() => {
    const groups: { monthName: string; weeks: WeekInfo[] }[] = [];
    let currentMonth = '';
    let currentGroup: WeekInfo[] = [];

    weeks.forEach(w => {
      if (w.monthName !== currentMonth) {
        if (currentGroup.length > 0) {
          groups.push({ monthName: currentMonth, weeks: currentGroup });
        }
        currentMonth = w.monthName;
        currentGroup = [w];
      } else {
        currentGroup.push(w);
      }
    });
    if (currentGroup.length > 0) {
      groups.push({ monthName: currentMonth, weeks: currentGroup });
    }
    return groups;
  }, [weeks]);

  // Status color styles for matrix frequency badges (H, M, T, S, A)
  const getMatrixCellStyle = (freq: string, status?: string, isPast?: boolean) => {
    if (status === 'conforme') {
      return 'bg-emerald-500 text-white font-extrabold shadow-2xs';
    }
    if (status === 'en_cours') {
      return 'bg-amber-400 text-slate-900 font-extrabold ring-1 ring-amber-500 animate-pulse';
    }
    if (status === 'non_conforme') {
      return 'bg-purple-600 text-white font-extrabold';
    }
    if (status === 'retard' || (isPast && !status)) {
      return 'bg-rose-600 text-white font-extrabold';
    }

    // Default planned colors according to frequency letter
    switch (freq) {
      case 'H':
        return 'bg-amber-100 text-amber-900 border border-amber-300 font-bold';
      case 'M':
        return 'bg-orange-200 text-orange-900 border border-orange-400 font-bold';
      case 'T':
        return 'bg-emerald-200 text-emerald-900 border border-emerald-400 font-bold';
      case 'S':
        return 'bg-sky-200 text-sky-900 border border-sky-400 font-bold';
      case 'A':
        return 'bg-rose-200 text-rose-900 border border-rose-400 font-bold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 max-w-full">
      
      {/* Header Info & Filter */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Matrice du Planning Général (52 Semaines)
          </h2>
          <p className="text-xs text-slate-500">
            Modèle conforme Bank Al-Maghrib - Agence Al Hoceima (Fréquences : H=Hebdo, M=Mensuel, T=Trimestriel, S=Semestriel, A=Annuel)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filtrer matrice..."
              className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          <select
            value={lotFilter}
            onChange={e => setLotFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">Tous les Lots</option>
            <option value="ÉLECTRICITÉ">Électricité</option>
            <option value="FLUIDE">Fluide / HVAC</option>
          </select>
        </div>
      </div>

      {/* Main Full Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto relative">
        <table className="w-full text-left border-collapse text-[11px] min-w-[1400px]">
          
          {/* Top Month Header */}
          <thead>
            <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider border-b border-slate-800">
              <th colSpan={8} className="p-2 border-r border-slate-700 font-bold text-center bg-slate-950">
                IDENTIFICATION ÉQUIPEMENT & LOCALISATION
              </th>
              {monthGroups.map((mg, i) => (
                <th
                  key={i}
                  colSpan={mg.weeks.length}
                  className="p-2 border-r border-slate-700 font-bold text-center bg-slate-850"
                >
                  {mg.monthName}
                </th>
              ))}
            </tr>

            {/* Week Numbers Header */}
            <tr className="bg-slate-800 text-slate-200 text-[10px] font-bold border-b border-slate-700">
              <th className="p-2 border-r border-slate-700 min-w-[50px]">Zone</th>
              <th className="p-2 border-r border-slate-700 min-w-[80px]">Site</th>
              <th className="p-2 border-r border-slate-700 min-w-[110px]">ID-MAT</th>
              <th className="p-2 border-r border-slate-700 min-w-[180px]">Description Équipement</th>
              <th className="p-2 border-r border-slate-700 min-w-[90px]">Lot</th>
              <th className="p-2 border-r border-slate-700 min-w-[140px]">Famille</th>
              <th className="p-2 border-r border-slate-700 min-w-[40px] text-center">Nbr</th>

              {weeks.map(w => (
                <th
                  key={w.weekNumber}
                  className={`p-1 border-r border-slate-700 text-center min-w-[28px] ${
                    w.weekNumber === currentWeekNumber ? 'bg-amber-400 text-slate-950 font-black' : ''
                  }`}
                  title={`Semaine ${w.weekNumber} (${w.startDate})`}
                >
                  {w.weekNumber}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-200 font-mono">
            {filteredEquipments.map((eq, idx) => {
              const eqMap = taskMap.get(eq.id);

              return (
                <tr key={eq.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="p-1.5 border-r border-slate-200 font-semibold text-slate-700">{eq.zone}</td>
                  <td className="p-1.5 border-r border-slate-200 text-slate-600 truncate max-w-[90px]">{eq.site}</td>
                  <td className="p-1.5 border-r border-slate-200 font-bold text-blue-900">{eq.id}</td>
                  <td className="p-1.5 border-r border-slate-200 font-sans font-medium text-slate-900 truncate max-w-[200px]" title={eq.description}>
                    {eq.description}
                  </td>
                  <td className="p-1.5 border-r border-slate-200 font-sans text-slate-700">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      eq.lot === 'ÉLECTRICITÉ' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                    }`}>
                      {eq.lot}
                    </span>
                  </td>
                  <td className="p-1.5 border-r border-slate-200 text-slate-600 font-sans truncate max-w-[140px]">{eq.family}</td>
                  <td className="p-1.5 border-r border-slate-200 text-center font-bold text-slate-700">{eq.quantity}</td>

                  {/* 52 Weeks */}
                  {weeks.map(w => {
                    const task = eqMap?.get(w.weekNumber);
                    const isPast = w.weekNumber < currentWeekNumber;
                    const isCurrent = w.weekNumber === currentWeekNumber;

                    if (!task) {
                      return (
                        <td key={w.weekNumber} className={`p-1 border-r border-slate-200 text-center text-slate-200 ${isCurrent ? 'bg-amber-50' : ''}`}>
                          .
                        </td>
                      );
                    }

                    const exec = executions[task.id];
                    const cellStyle = getMatrixCellStyle(task.frequency, exec?.status, isPast && !exec);

                    return (
                      <td key={w.weekNumber} className={`p-0.5 border-r border-slate-200 text-center ${isCurrent ? 'bg-amber-100/50' : ''}`}>
                        <button
                          onClick={() => onSelectTask(task, eq, exec)}
                          className={`w-6 h-6 rounded flex items-center justify-center mx-auto text-[10px] transition-transform hover:scale-110 cursor-pointer ${cellStyle}`}
                          title={`Semaine ${w.weekNumber} (${task.frequency}) - Cliquer pour saisir ou voir le statut`}
                        >
                          {task.frequency}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

        </table>
      </div>

    </div>
  );
};
