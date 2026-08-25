import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle2,
  MapPin,
  ChevronDown,
  Globe2,
  Check
} from 'lucide-react';
import { PlanningDatasetInfo, SiteInfo } from '../types';

interface HeaderProps {
  currentView: 'timeline' | 'matrix' | 'bt' | 'kpi' | 'ai';
  setCurrentView: (view: 'timeline' | 'matrix' | 'bt' | 'kpi' | 'ai') => void;
  onOpenAddModal: () => void;
  onOpenLoadModal: (defaultTab?: 'presets' | 'import' | 'gammes' | 'sites' | 'diagnostic') => void;
  onExportData: () => void;
  onResetData: () => void;
  currentWeekNumber: number;
  onWeekChange?: (week: number) => void;
  datasetInfo: PlanningDatasetInfo;
  sites: SiteInfo[];
  selectedSiteCode: string;
  onSelectSite: (siteCode: string) => void;
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
  sites,
  selectedSiteCode,
  onSelectSite,
}) => {
  const [isSiteDropdownOpen, setIsSiteDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSiteDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeSite = sites.find(s => s.code === selectedSiteCode);

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
                  {selectedSiteCode === 'ALL' ? 'RÉSEAU GLOBAL 2026' : (activeSite?.city.toUpperCase() || 'HCM 2026')}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-black text-slate-100 flex items-center gap-2 mt-0.5">
                Planning Maintenance Préventive & Gammes 2026
                <span className="text-slate-400 font-normal text-xs sm:text-sm hidden sm:inline">
                  — {selectedSiteCode === 'ALL' ? 'Multi-Sites Réseau BAM' : activeSite?.name || 'Agence Al Hoceima'}
                </span>
              </h1>
            </div>
          </div>

          {/* Multi-Site Switcher & Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Site Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsSiteDropdownOpen(prev => !prev)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  selectedSiteCode === 'ALL'
                    ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-200 hover:bg-indigo-900/80'
                    : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 hover:bg-emerald-900/80'
                }`}
                title="Changer de site ou afficher tout le réseau BAM"
              >
                {selectedSiteCode === 'ALL' ? (
                  <Globe2 className="w-4 h-4 text-indigo-400 animate-pulse" />
                ) : (
                  <MapPin className="w-4 h-4 text-emerald-400" />
                )}
                
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold leading-none">Site Actif</p>
                  <p className="text-xs font-extrabold text-white leading-tight flex items-center gap-1">
                    {selectedSiteCode === 'ALL' ? '🏢 Tous les Sites Réseau' : activeSite?.name}
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({selectedSiteCode === 'ALL' ? `${sites.length} sites` : activeSite?.zone})
                    </span>
                  </p>
                </div>
                
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ml-1 ${isSiteDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isSiteDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-800 bg-slate-950/50">
                    <p className="text-[11px] font-bold text-slate-300">Jongler entre les Sites BAM</p>
                    <p className="text-[10px] text-slate-400">Filtrer l'ensemble des vues ou afficher le consolidé</p>
                  </div>

                  <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                    {/* All Sites Option */}
                    <button
                      onClick={() => {
                        onSelectSite('ALL');
                        setIsSiteDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        selectedSiteCode === 'ALL'
                          ? 'bg-indigo-600/30 text-indigo-200 font-bold border border-indigo-500/40'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Globe2 className="w-4 h-4 text-indigo-400" />
                        <div>
                          <div className="font-bold">🏢 Tous les Sites Réseau BAM</div>
                          <div className="text-[10px] text-slate-400">Vue globale consolidée ({sites.length} agences)</div>
                        </div>
                      </div>
                      {selectedSiteCode === 'ALL' && <Check className="w-4 h-4 text-indigo-400" />}
                    </button>

                    <div className="h-px bg-slate-800 my-1" />

                    {/* Individual Sites */}
                    {sites.map((site) => (
                      <button
                        key={site.code}
                        onClick={() => {
                          onSelectSite(site.code);
                          setIsSiteDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                          selectedSiteCode === site.code
                            ? 'bg-emerald-600/30 text-emerald-200 font-bold border border-emerald-500/40'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          <div>
                            <div className="font-bold text-slate-100">{site.name}</div>
                            <div className="text-[10px] text-slate-400">
                              Zone {site.zone} • {site.city}
                            </div>
                          </div>
                        </div>
                        {selectedSiteCode === site.code && <Check className="w-4 h-4 text-emerald-400" />}
                      </button>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-800 bg-slate-950/40">
                    <button
                      onClick={() => {
                        setIsSiteDropdownOpen(false);
                        onOpenLoadModal('sites');
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Gérer & Ajouter des Sites
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Prominent Button: Charger Plannings & Gammes */}
            <button
              onClick={() => onOpenLoadModal('presets')}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shadow-amber-500/20 ring-1 ring-amber-300/60 cursor-pointer animate-pulse-slow"
              title="Charger ou importer le planning préventif, sites et gammes"
            >
              <Layers className="w-4 h-4 text-slate-950" />
              <span>Charger Plannings</span>
              <span className="bg-slate-950/20 text-slate-950 px-1.5 py-0.2 rounded text-[10px] font-mono">
                {datasetInfo.equipmentsCount} Éq.
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
              {selectedSiteCode === 'ALL' ? 'Multi-Sites' : activeSite?.city || 'HCM'}
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
