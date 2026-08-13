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
  Clock
} from 'lucide-react';

interface HeaderProps {
  currentView: 'timeline' | 'matrix' | 'kpi' | 'ai';
  setCurrentView: (view: 'timeline' | 'matrix' | 'kpi' | 'ai') => void;
  onOpenAddModal: () => void;
  onExportData: () => void;
  onResetData: () => void;
  currentWeekNumber: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  onOpenAddModal,
  onExportData,
  onResetData,
  currentWeekNumber,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Agence Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  BANK AL-MAGHRIB
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  HAROON PM SERVICES
                </span>
              </div>
              <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2 mt-0.5">
                Planning Maintenance Préventive 2026
                <span className="text-slate-400 font-normal text-sm">— Agence Al Hoceima</span>
              </h1>
            </div>
          </div>

          {/* Current Date & Active Week Indicator */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800/90 border border-slate-700/80 rounded-lg px-3 py-1.5 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
              <div className="text-xs">
                <p className="text-slate-400 font-medium">Semaine en Cours</p>
                <p className="font-bold text-amber-300">Semaine {currentWeekNumber} (Août 2026)</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                title="Ajouter un équipement au planning"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Équipement</span>
              </button>

              <button
                onClick={onExportData}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
                title="Exporter le rapport d'exécution"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exporter</span>
              </button>

              <button
                onClick={onResetData}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors cursor-pointer"
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
