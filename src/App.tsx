import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, KPIStats, GammeOperatoire, PlanningDatasetInfo, SiteInfo } from './types';
import { 
  WEEKS_2026, 
  EQUIPMENTS_DATA, 
  DEFAULT_SITES, 
  generateEquipmentsForSite, 
  MULTI_SITE_PRESET_EQUIPMENTS, 
  generatePlannedTasks, 
  generateInitialExecutions, 
  getCurrentISOWeekNumber 
} from './data/maintenanceData';
import { GAMMES_CATALOG } from './data/gammesData';
import { Header } from './components/Header';
import { KPIOverview } from './components/KPIOverview';
import { TimelineExecutionView } from './components/TimelineExecutionView';
import { MatrixScheduleView } from './components/MatrixScheduleView';
import { KPIDashboardView } from './components/KPIDashboardView';
import { WorkOrdersBTView } from './components/WorkOrdersBTView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ExecutionModal } from './components/ExecutionModal';
import { AddEquipmentModal } from './components/AddEquipmentModal';
import { LoadPlanningModal } from './components/LoadPlanningModal';

export default function App() {
  // Real ISO week detection (S35 for August 25, 2026: 24/08 au 30/08/2026)
  const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(() => getCurrentISOWeekNumber());

  // Sites State
  const [sites, setSites] = useState<SiteInfo[]>(DEFAULT_SITES);
  const [selectedSiteCode, setSelectedSiteCode] = useState<string>('BAM-HCM_AG'); // 'ALL' or specific site code

  // Core State (Starts with BAM-HCM or multi-sites)
  const [equipments, setEquipments] = useState<Equipment[]>(EQUIPMENTS_DATA);
  const [tasks, setTasks] = useState<PlannedTask[]>(() => generatePlannedTasks(EQUIPMENTS_DATA));
  const [executions, setExecutions] = useState<Record<string, ExecutionRecord>>(() => 
    generateInitialExecutions(generatePlannedTasks(EQUIPMENTS_DATA), getCurrentISOWeekNumber())
  );
  const [gammesList, setGammesList] = useState<GammeOperatoire[]>(GAMMES_CATALOG);

  // Dataset Information State
  const [datasetInfo, setDatasetInfo] = useState<PlanningDatasetInfo>({
    name: 'Planning BAM Al Hoceima 2026 (Officiel)',
    source: 'preset',
    loadedAt: 'Automatique (Exercice 2026)',
    equipmentsCount: EQUIPMENTS_DATA.length,
    tasksCount: 852,
    gammesCount: GAMMES_CATALOG.length,
    description: 'Planning annuel 52 semaines pour les 28 équipements de l\'Agence BAM Al Hoceima avec 16 gammes opératoires',
  });

  // View Navigation State
  const [currentView, setCurrentView] = useState<'timeline' | 'matrix' | 'bt' | 'kpi' | 'ai'>('timeline');

  // Modal State for Task Execution Validation
  const [activeModalData, setActiveModalData] = useState<{
    task: PlannedTask;
    equipment: Equipment;
    execution?: ExecutionRecord;
  } | null>(null);

  // Modal State for Adding Equipment
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);

  // Modal State for Loading Planning & Gammes
  const [isLoadPlanningOpen, setIsLoadPlanningOpen] = useState(false);
  const [loadModalInitialTab, setLoadModalInitialTab] = useState<'presets' | 'import' | 'gammes' | 'sites' | 'diagnostic'>('presets');

  // Filter equipments & tasks according to selected site
  const filteredEquipments = useMemo(() => {
    if (selectedSiteCode === 'ALL') {
      return equipments;
    }
    const filtered = equipments.filter(e => e.codeSite === selectedSiteCode);
    // If the currently loaded dataset does not yet have this site's equipments, generate them automatically!
    if (filtered.length === 0) {
      const site = sites.find(s => s.code === selectedSiteCode);
      if (site) {
        return generateEquipmentsForSite(site);
      }
    }
    return filtered;
  }, [equipments, selectedSiteCode, sites]);

  const filteredTasks = useMemo(() => {
    const eqIds = new Set(filteredEquipments.map(e => e.id));
    const matchingTasks = tasks.filter(t => eqIds.has(t.equipmentId));
    if (matchingTasks.length === 0 && filteredEquipments.length > 0) {
      return generatePlannedTasks(filteredEquipments);
    }
    return matchingTasks;
  }, [tasks, filteredEquipments]);

  // Compute Global KPI Statistics based on active filtered view
  const stats: KPIStats = useMemo(() => {
    // Tasks up to active week (week <= currentWeekNumber)
    const activeTasks = filteredTasks.filter(t => t.weekNumber <= currentWeekNumber);
    const totalPlanned = activeTasks.length || 1;

    let completedCount = 0;
    let conformeCount = 0;
    let inProgressCount = 0;
    let overdueCount = 0;
    let defectsCount = 0;

    let elecPlanned = 0;
    let elecDone = 0;
    let fluidePlanned = 0;
    let fluideDone = 0;

    const eqMap = new Map<string, Equipment>(filteredEquipments.map(e => [e.id, e]));

    activeTasks.forEach(t => {
      const eq = eqMap.get(t.equipmentId);
      const isElec = eq?.lot === 'ÉLECTRICITÉ';
      if (isElec) elecPlanned++;
      else fluidePlanned++;

      const exec = executions[t.id];
      const status = exec?.status || (t.weekNumber < currentWeekNumber ? 'retard' : 'planifie');

      if (status === 'conforme') {
        completedCount++;
        conformeCount++;
        if (isElec) elecDone++;
        else fluideDone++;
      } else if (status === 'non_conforme') {
        completedCount++;
        defectsCount++;
        if (isElec) elecDone++;
        else fluideDone++;
      } else if (status === 'en_cours') {
        inProgressCount++;
      } else if (status === 'retard') {
        overdueCount++;
      }
    });

    const executionRate = Math.round((completedCount / totalPlanned) * 100);
    const conformityRate = completedCount > 0 ? Math.round((conformeCount / completedCount) * 100) : 100;

    return {
      executionRate,
      conformityRate,
      totalPlanned,
      completedCount,
      inProgressCount,
      overdueCount,
      defectsCount,
      byLot: {
        electricite: {
          total: elecPlanned,
          done: elecDone,
          rate: elecPlanned > 0 ? Math.round((elecDone / elecPlanned) * 100) : 0,
        },
        fluide: {
          total: fluidePlanned,
          done: fluideDone,
          rate: fluidePlanned > 0 ? Math.round((fluideDone / fluidePlanned) * 100) : 0,
        },
      },
    };
  }, [filteredTasks, executions, filteredEquipments, currentWeekNumber]);

  // Handlers
  const handleSelectTask = (task: PlannedTask, equipment: Equipment, execution?: ExecutionRecord) => {
    setActiveModalData({ task, equipment, execution });
  };

  const handleSaveExecution = (record: ExecutionRecord) => {
    setExecutions(prev => ({
      ...prev,
      [record.taskId]: record,
    }));
  };

  const handleAddEquipment = (newEq: Equipment) => {
    setEquipments(prev => [...prev, newEq]);
    // Generate new tasks for new equipment
    const newTasks = generatePlannedTasks([newEq]);
    setTasks(prev => [...prev, ...newTasks]);
    setDatasetInfo(prev => ({
      ...prev,
      equipmentsCount: prev.equipmentsCount + 1,
      tasksCount: prev.tasksCount + newTasks.length,
    }));
  };

  // Switch Active Site
  const handleSelectSite = (siteCode: string) => {
    setSelectedSiteCode(siteCode);
    
    // If selecting a site that isn't yet fully in state, ensure its equipments exist
    if (siteCode !== 'ALL') {
      const site = sites.find(s => s.code === siteCode);
      const existsInEquipments = equipments.some(e => e.codeSite === siteCode);
      if (!existsInEquipments && site) {
        const siteEquipments = generateEquipmentsForSite(site);
        const siteTasks = generatePlannedTasks(siteEquipments);
        setEquipments(prev => [...prev, ...siteEquipments]);
        setTasks(prev => [...prev, ...siteTasks]);
        setExecutions(prev => ({
          ...prev,
          ...generateInitialExecutions(siteTasks, currentWeekNumber),
        }));
      }
    }
  };

  // Add a new Site dynamically
  const handleAddSite = (newSite: SiteInfo, autoGenerateEquipments: boolean) => {
    setSites(prev => {
      const filtered = prev.filter(s => s.code !== newSite.code);
      return [...filtered, newSite];
    });

    if (autoGenerateEquipments) {
      const siteEquipments = generateEquipmentsForSite(newSite);
      const siteTasks = generatePlannedTasks(siteEquipments);
      const siteExecutions = generateInitialExecutions(siteTasks, currentWeekNumber);

      setEquipments(prev => [...prev.filter(e => e.codeSite !== newSite.code), ...siteEquipments]);
      setTasks(prev => [...prev.filter(t => !siteEquipments.some(e => e.id === t.equipmentId)), ...siteTasks]);
      setExecutions(prev => ({ ...prev, ...siteExecutions }));
    }

    setSelectedSiteCode(newSite.code);
    setDatasetInfo(prev => ({
      ...prev,
      name: `Planning ${newSite.name} 2026`,
      loadedAt: new Date().toLocaleTimeString(),
      description: `Site ${newSite.name} (${newSite.code}) configuré et actif`,
    }));
  };

  // Load Exclusive Planning for a single site
  const handleLoadSitePlanning = (siteCode: string) => {
    const site = sites.find(s => s.code === siteCode) || DEFAULT_SITES[0];
    const siteEquipments = generateEquipmentsForSite(site);
    const siteTasks = generatePlannedTasks(siteEquipments);
    const siteExecutions = generateInitialExecutions(siteTasks, currentWeekNumber);

    setEquipments(siteEquipments);
    setTasks(siteTasks);
    setExecutions(siteExecutions);
    setSelectedSiteCode(site.code);

    setDatasetInfo({
      name: `Planning BAM ${site.name} 2026`,
      source: 'preset',
      loadedAt: new Date().toLocaleTimeString(),
      equipmentsCount: siteEquipments.length,
      tasksCount: siteTasks.length,
      gammesCount: gammesList.length,
      description: `Planning annuel exclusif pour ${site.name} (${site.zone}) - ${siteEquipments.length} équipements`,
    });
  };

  // Load All Sites Network (Consolidated)
  const handleLoadAllSitesNetwork = () => {
    const allEquipments = MULTI_SITE_PRESET_EQUIPMENTS;
    const allTasks = generatePlannedTasks(allEquipments);
    const allExecutions = generateInitialExecutions(allTasks, currentWeekNumber);

    setEquipments(allEquipments);
    setTasks(allTasks);
    setExecutions(allExecutions);
    setSelectedSiteCode('ALL');

    setDatasetInfo({
      name: 'Réseau Multi-Sites BAM (Consolidé 6 Agences)',
      source: 'preset',
      loadedAt: new Date().toLocaleTimeString(),
      equipmentsCount: allEquipments.length,
      tasksCount: allTasks.length,
      gammesCount: gammesList.length,
      description: 'Vision consolidée des 6 agences régionales BAM (Al Hoceima, Nador, Tanger, Oujda, Tétouan, Rabat)',
    });
  };

  // Load Preset Datasets
  const handleLoadPreset = (presetType: 'official_2026' | 'all_sites_network' | 'avril_test' | 'gammes_only') => {
    if (presetType === 'all_sites_network') {
      handleLoadAllSitesNetwork();
    } else if (presetType === 'official_2026') {
      const initialTasks = generatePlannedTasks(EQUIPMENTS_DATA);
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
      setSelectedSiteCode('BAM-HCM_AG');
      setDatasetInfo({
        name: 'Planning BAM Al Hoceima 2026 (Complet)',
        source: 'preset',
        loadedAt: new Date().toLocaleTimeString(),
        equipmentsCount: EQUIPMENTS_DATA.length,
        tasksCount: initialTasks.length,
        gammesCount: GAMMES_CATALOG.length,
        description: 'Jeu complet 2026 avec 28 équipements, 52 semaines et 16 gammes opératoires',
      });
    } else if (presetType === 'avril_test') {
      const initialTasks = generatePlannedTasks(EQUIPMENTS_DATA);
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
      setSelectedSiteCode('BAM-HCM_AG');
      setCurrentView('bt'); // Automatically switch to Bons de Travail view for test
      setDatasetInfo({
        name: 'Focus Test Mois d\'Avril (S15 à S18)',
        source: 'preset',
        loadedAt: new Date().toLocaleTimeString(),
        equipmentsCount: EQUIPMENTS_DATA.length,
        tasksCount: initialTasks.filter(t => t.weekNumber >= 15 && t.weekNumber <= 18).length,
        gammesCount: GAMMES_CATALOG.length,
        description: 'Test spécial ciblant le mois d\'Avril pour l\'Agence BAM Al Hoceima avec génération BTs',
      });
    } else if (presetType === 'gammes_only') {
      setGammesList(GAMMES_CATALOG);
      setDatasetInfo(prev => ({
        ...prev,
        gammesCount: GAMMES_CATALOG.length,
        loadedAt: new Date().toLocaleTimeString(),
      }));
    }
  };

  // Import custom planning from file
  const handleImportPlanning = (newEquipments: Equipment[], newTasks: PlannedTask[], newGammes?: GammeOperatoire[]) => {
    // Detect sites from imported equipments
    const detectedSitesMap = new Map<string, SiteInfo>();
    newEquipments.forEach(eq => {
      if (eq.codeSite && !detectedSitesMap.has(eq.codeSite)) {
        detectedSitesMap.set(eq.codeSite, {
          code: eq.codeSite,
          name: eq.site || `Agence ${eq.codeSite}`,
          zone: (eq.zone as any) || 'NORD',
          city: eq.site?.replace(' AGENCE', '').trim() || 'Maroc',
          manager: 'Responsable Technique BAM',
        });
      }
    });

    if (detectedSitesMap.size > 0) {
      setSites(prev => {
        const merged = [...prev];
        detectedSitesMap.forEach((newSite, code) => {
          if (!merged.some(s => s.code === code)) {
            merged.push(newSite);
          }
        });
        return merged;
      });
    }

    setEquipments(newEquipments);
    setTasks(newTasks);
    setExecutions(generateInitialExecutions(newTasks, currentWeekNumber));
    if (newGammes && newGammes.length > 0) {
      setGammesList(newGammes);
    }
    setSelectedSiteCode(detectedSitesMap.size > 1 ? 'ALL' : (Array.from(detectedSitesMap.keys())[0] || 'BAM-HCM_AG'));
    setDatasetInfo({
      name: 'Planning Importé (Fichier Personnalisé)',
      source: 'file_import',
      loadedAt: new Date().toLocaleTimeString(),
      equipmentsCount: newEquipments.length,
      tasksCount: newTasks.length,
      gammesCount: newGammes ? newGammes.length : gammesList.length,
      description: `Données importées avec succès (${newEquipments.length} équipements sur ${detectedSitesMap.size || 1} site(s))`,
    });
  };

  // Update gammes catalogue
  const handleUpdateGammes = (newGammes: GammeOperatoire[]) => {
    setGammesList(newGammes);
    setDatasetInfo(prev => ({
      ...prev,
      gammesCount: newGammes.length,
      loadedAt: new Date().toLocaleTimeString(),
    }));
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ equipments, tasks, executions, gammesList, sites, stats, datasetInfo }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Planning_Maintenance_BAM_MultiSites_S${currentWeekNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (confirm("Voulez-vous réinitialiser le suivi de maintenance aux données initiales de démonstration ?")) {
      const initialTasks = generatePlannedTasks(EQUIPMENTS_DATA);
      setSites(DEFAULT_SITES);
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
      setSelectedSiteCode('BAM-HCM_AG');
      setDatasetInfo({
        name: 'Planning BAM Al Hoceima 2026 (Officiel)',
        source: 'preset',
        loadedAt: new Date().toLocaleTimeString(),
        equipmentsCount: EQUIPMENTS_DATA.length,
        tasksCount: initialTasks.length,
        gammesCount: GAMMES_CATALOG.length,
        description: 'Planning officiel 2026 réinitialisé',
      });
    }
  };

  const activeSiteInfo = sites.find(s => s.code === selectedSiteCode);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Header Bar with Multi-Site Switcher */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAddModal={() => setIsAddEquipmentOpen(true)}
        onOpenLoadModal={(tab = 'presets') => {
          setLoadModalInitialTab(tab);
          setIsLoadPlanningOpen(true);
        }}
        onExportData={handleExportData}
        onResetData={handleResetData}
        currentWeekNumber={currentWeekNumber}
        onWeekChange={setCurrentWeekNumber}
        datasetInfo={datasetInfo}
        sites={sites}
        selectedSiteCode={selectedSiteCode}
        onSelectSite={handleSelectSite}
      />

      {/* Global Realization KPI Summary */}
      <KPIOverview stats={stats} />

      {/* Main Content Area with Site-Filtered Datasets */}
      <main className="flex-1 pb-12">
        {currentView === 'timeline' && (
          <TimelineExecutionView
            equipments={filteredEquipments}
            tasks={filteredTasks}
            executions={executions}
            weeks={WEEKS_2026}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'matrix' && (
          <MatrixScheduleView
            equipments={filteredEquipments}
            tasks={filteredTasks}
            executions={executions}
            weeks={WEEKS_2026}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'bt' && (
          <WorkOrdersBTView
            equipments={filteredEquipments}
            tasks={filteredTasks}
            executions={executions}
            weeks={WEEKS_2026}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
            onSaveExecution={handleSaveExecution}
            gammesList={gammesList}
          />
        )}

        {currentView === 'kpi' && (
          <KPIDashboardView
            stats={stats}
            equipments={filteredEquipments}
            tasks={filteredTasks}
            executions={executions}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'ai' && (
          <AIAssistantDrawer
            stats={stats}
            equipments={filteredEquipments}
            currentWeekNumber={currentWeekNumber}
          />
        )}
      </main>

      {/* Load & Manage Planning / Multi-Sites / Gammes Modal */}
      <LoadPlanningModal
        isOpen={isLoadPlanningOpen}
        onClose={() => setIsLoadPlanningOpen(false)}
        datasetInfo={datasetInfo}
        gammesList={gammesList}
        sites={sites}
        selectedSiteCode={selectedSiteCode}
        onSelectSite={handleSelectSite}
        onAddSite={handleAddSite}
        onLoadSitePlanning={handleLoadSitePlanning}
        onLoadAllSitesNetwork={handleLoadAllSitesNetwork}
        onLoadPreset={handleLoadPreset}
        onImportPlanning={handleImportPlanning}
        onUpdateGammes={handleUpdateGammes}
        onResetToDefault={handleResetData}
        currentWeekNumber={currentWeekNumber}
        initialTab={loadModalInitialTab}
      />

      {/* Task Execution Validation Modal */}
      {activeModalData && (
        <ExecutionModal
          isOpen={Boolean(activeModalData)}
          onClose={() => setActiveModalData(null)}
          task={activeModalData.task}
          equipment={activeModalData.equipment}
          existingExecution={activeModalData.execution}
          onSaveExecution={handleSaveExecution}
          gammesList={gammesList}
        />
      )}

      {/* Add New Equipment Modal */}
      <AddEquipmentModal
        isOpen={isAddEquipmentOpen}
        onClose={() => setIsAddEquipmentOpen(false)}
        onAddEquipment={handleAddEquipment}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-4 px-6 text-center">
        <p>
          Bank Al-Maghrib • {selectedSiteCode === 'ALL' ? 'Réseau National Multi-Sites (6 Agences)' : activeSiteInfo?.name || 'Agence Al Hoceima'} — Système de Suivi d'Exécution du Planning de Maintenance Préventive 2026
        </p>
      </footer>

    </div>
  );
}

