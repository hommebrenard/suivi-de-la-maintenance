import React from 'react';
import { 
  Calendar, 
  BarChart3, 
  Grid, 
  Bot, 
  Plus, 
  Download, 
  RotateCcw, 
  Building2, 
  ShieldCheck,
  Clock,
  FileCheck2,
  Layers,
  UploadCloud,
  CheckCircle2
} from 'lucide-react';
import { PlanningDatasetInfo } from '../types';

interface HeaderProps {
  currentView: 'timeline' | 'matrix' | 'bt' | 'kpi' | 'ai';
  setCurrentView: (view: 'timeline' | 'matrix' | 'bt' | 'kpi' | 'ai') => void;
  onOpenAddModal: () => void;
  onOpenLoadModal: () => void;
  onExportData: () => void;
  onResetData: () => void;
  currentWeekNumber: number;
  onWeekChange?: (week: number) => void;
  datasetInfo: PlanningDatasetInfo;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenAddModal,
  onOpenLoadModal,
  onExportData,
  onResetData,
  currentWeekNumber,
  onWeekChange,
  datasetInfo,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          
          {/* Logo & Agence Info */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl shadow-lg shadow-blue-500/20 ring-1 ring-white/10 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  BANK AL-MAGHRIB
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  HAROON PM SERVICES
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  HCM 2026
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2 mt-0.5">
                Planning Maintenance Préventive & Gammes 2026
                <span className="text-slate-400 font-normal text-xs sm:text-sm hidden sm:inline">— Agence Al Hoceima</span>
              </h1>
            </div>
          </div>

          {/* Current Date, Dataset Status & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Prominent Button: Charger Plannings & Gammes */}
            <button
              onClick={onOpenLoadModal}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shadow-amber-500/20 ring-1 ring-amber-300/60 cursor-pointer animate-pulse-slow"
              title="Charger ou importer le planning préventif et les gammes opératoires"
            >
              <Layers className="w-4 h-4 text-slate-950" />
              <span>Charger Plannings & Gammes</span>
              <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.2 rounded text-[10px] font-mono">
                {datasetInfo.equipmentsCount} Éq. • {datasetInfo.gammesCount} Gammes
              </span>
            </button>

            {/* Current Week Indicator */}
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-xs">
                <div className="flex items-center gap-1.5">
                  <p className="text-slate-400 text-[10px] font-medium leading-none">Semaine active</p>
                  {currentWeekNumber === 35 && (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.2 rounded font-bold">
                      Aujourd'hui
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p className="font-extrabold text-amber-300 leading-tight">
                    S{currentWeekNumber}
                  </p>
                  <span className="text-slate-300 text-[11px]">
                    {currentWeekNumber === 35 ? '(24/08 – 30/08)' : `(Semaine ${currentWeekNumber})`}
                  </span>
                </div>
              </div>
            </div>

            {/* Other Actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
                title="Ajouter un équipement au planning"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Équipement</span>
              </button>

              <button
                onClick={onExportData}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors cursor-pointer"
                title="Exporter le planning et l'historique au format JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Exporter</span>
              </button>

              <button
                onClick={onResetData}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs rounded-xl border border-slate-700 transition-colors cursor-pointer"
                title="Réinitialiser les données de démo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800 overflow-x-auto">
          <button
            onClick={() => setCurrentView('timeline')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'timeline'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Suivi d'Éxécution Timeline
          </button>

          <button
            onClick={() => setCurrentView('matrix')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'matrix'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Grid className="w-4 h-4" />
            Matrice Annuelle (52 Semaines)
          </button>

          <button
            onClick={() => setCurrentView('bt')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'bt'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-amber-800" />
            📜 Bons de Travail (BT)
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-amber-500/30 text-amber-200 text-[10px] font-mono font-bold">
              Test Avril
            </span>
          </button>

          <button
            onClick={() => setCurrentView('kpi')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'kpi'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Tableau de Bord & KPIs
          </button>

          <button
            onClick={() => setCurrentView('ai')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              currentView === 'ai'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-300" />
            Assistant IA Maintenance
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-purple-500/30 text-purple-200 text-[10px]">
              Gemini
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
