import React from 'react';
import { KPIStats, Equipment, PlannedTask, ExecutionRecord } from '../types';
import { 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Droplets, 
  ShieldAlert, 
  Wrench,
  TrendingUp,
  Building
} from 'lucide-react';

interface KPIDashboardViewProps {
  stats: KPIStats;
  equipments: Equipment[];
  tasks: PlannedTask[];
  executions: Record<string, ExecutionRecord>;
  currentWeekNumber: number;
  onSelectTask: (task: PlannedTask, equipment: Equipment, execution?: ExecutionRecord) => void;
}

export const KPIDashboardView: React.FC<KPIDashboardViewProps> = ({
  stats,
  equipments,
  tasks,
  executions,
  currentWeekNumber,
  onSelectTask,
}) => {
  // Find overdue or non-compliant critical tasks
  const urgentTasks = tasks.filter(t => {
    if (t.weekNumber > currentWeekNumber) return false;
    const exec = executions[t.id];
    if (exec) {
      return exec.status === 'retard' || exec.status === 'non_conforme';
    }
    return t.weekNumber < currentWeekNumber;
  });

  const equipmentMap = new Map<string, Equipment>(equipments.map(e => [e.id, e]));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-2">
              <Building className="w-4 h-4" />
              BANK AL-MAGHRIB • AGENCE AL HOCEIMA
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Tableau de Bord & Performance de Maintenance
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Analyse en temps réel du taux d'exécution des gammes préventives, conformité des équipements et suivi des retards opérationnels pour l'exercice 2026.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 ring-1 ring-white/20 flex items-center gap-6">
            <div className="text-center">
              <span className="text-3xl font-black text-blue-400">{stats.executionRate}%</span>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">Taux d'Exécution</p>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center">
              <span className="text-3xl font-black text-emerald-400">{stats.conformityRate}%</span>
              <p className="text-[11px] text-slate-300 font-medium mt-0.5">Taux de Conformité</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lot Performance Comparison (Électricité vs Fluide) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lot Électricité */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Lot Électricité</h3>
                  <p className="text-xs text-slate-500">Transformateurs, GE, Onduleurs, TGBT, Éclairage, Ascenseurs</p>
                </div>
              </div>
              <span className="text-2xl font-black text-amber-900">{stats.byLot.electricite.rate}%</span>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Avancement global S1-S{currentWeekNumber}</span>
                <span>{stats.byLot.electricite.done} / {stats.byLot.electricite.total} réalisées</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${stats.byLot.electricite.rate}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Interventions planifiées S33 : <strong className="text-slate-900">12</strong></span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +2.4% vs mois dernier
            </span>
          </div>
        </div>

        {/* Lot Fluide */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Lot Fluide / HVAC</h3>
                  <p className="text-xs text-slate-500">Climatisation serveurs, Splits, Caissons, Pompes, Sanitaires</p>
                </div>
              </div>
              <span className="text-2xl font-black text-blue-900">{stats.byLot.fluide.rate}%</span>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                <span>Avancement global S1-S{currentWeekNumber}</span>
                <span>{stats.byLot.fluide.done} / {stats.byLot.fluide.total} réalisées</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${stats.byLot.fluide.rate}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Interventions planifiées S33 : <strong className="text-slate-900">8</strong></span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Conforme
            </span>
          </div>
        </div>

      </div>

      {/* Actionable Table: Urgent & Overdue Interventions */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">
              Interventions Prioritaires, En Retard ou Avec Réserve ({urgentTasks.length})
            </h3>
          </div>
          <span className="text-xs text-rose-700 font-semibold px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-lg">
            Action préconisée
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Équipement ID</th>
                <th className="p-3">Description</th>
                <th className="p-3">Lot</th>
                <th className="p-3">Semaine</th>
                <th className="p-3">Statut actuel</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {urgentTasks.slice(0, 8).map(t => {
                const eq = equipmentMap.get(t.equipmentId);
                const exec = executions[t.id];
                const status = exec?.status || 'retard';

                return (
                  <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-blue-900">{t.equipmentId}</td>
                    <td className="p-3 font-medium text-slate-900">{eq?.description || 'Équipement'}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                        {eq?.lot}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-amber-700">Semaine {t.weekNumber}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        status === 'non_conforme'
                          ? 'bg-purple-100 text-purple-900 border border-purple-300'
                          : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        {status === 'non_conforme' ? 'Anomalie / Réserve' : 'En Retard'}
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => eq && onSelectTask(t, eq, exec)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        Traiter
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
