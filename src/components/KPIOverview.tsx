import React from 'react';
import { KPIStats } from '../types';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Zap, Droplets, Activity } from 'lucide-react';

interface KPIOverviewProps {
  stats: KPIStats;
}

export const KPIOverview: React.FC<KPIOverviewProps> = ({ stats }) => {
  return (
    <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Main Realization Gauge (Matching the 85% gauge in UI mockup) */}
        <div className="md:col-span-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Circular Gauge */}
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#E2E8F0"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#2563EB"
                  strokeWidth="8"
                  strokeDasharray={200}
                  strokeDashoffset={200 - (200 * stats.executionRate) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-extrabold text-blue-900 leading-none">
                  {stats.executionRate}%
                </span>
                <span className="text-[10px] font-semibold text-blue-600 mt-0.5">Global</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-blue-900 font-bold text-base">
                <Activity className="w-4 h-4 text-blue-600" />
                Taux de Réalisation
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {stats.completedCount} réalisées sur {stats.totalPlanned} planifiées à date
              </p>
              <div className="mt-2 flex items-center gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">
                  {stats.conformityRate}% Conformité
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards: Conforme, En Cours, En Retard, Anomalies */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Conforme */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="text-xs font-semibold">Réalisées</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-emerald-950">{stats.completedCount}</span>
              <span className="text-xs font-medium text-emerald-700">
                {Math.round((stats.completedCount / (stats.totalPlanned || 1)) * 100)}%
              </span>
            </div>
          </div>

          {/* En cours */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-800">
              <span className="text-xs font-semibold">En Cours</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-amber-950">{stats.inProgressCount}</span>
              <span className="text-xs font-medium text-amber-700">Interventions</span>
            </div>
          </div>

          {/* Retard */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-rose-800">
              <span className="text-xs font-semibold">En Retard</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-rose-950">{stats.overdueCount}</span>
              <span className="text-xs font-medium text-rose-700">Action requise</span>
            </div>
          </div>

          {/* Anomalies */}
          <div className="bg-purple-50/60 border border-purple-200/80 rounded-xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between text-purple-800">
              <span className="text-xs font-semibold">Avec Réserve</span>
              <AlertTriangle className="w-4 h-4 text-purple-600" />
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-purple-950">{stats.defectsCount}</span>
              <span className="text-xs font-medium text-purple-700">Anomalies</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
