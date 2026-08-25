import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, KPIStats, GammeOperatoire, PlanningDatasetInfo } from './types';
import { WEEKS_2026, EQUIPMENTS_DATA, generatePlannedTasks, generateInitialExecutions, getCurrentISOWeekNumber } from './data/maintenanceData';
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

  // Core State
  const [equipments, setEquipments] = useState<Equipment[]>(EQUIPMENTS_DATA);
  const [tasks, setTasks] = useState<PlannedTask[]>(() => generatePlannedTasks());
  const [executions, setExecutions] = useState<Record<string, ExecutionRecord>>(() => 
    generateInitialExecutions(generatePlannedTasks(), getCurrentISOWeekNumber())
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

  // Compute Global KPI Statistics
  const stats: KPIStats = useMemo(() => {
    // Tasks up to active week (week <= 33)
    const activeTasks = tasks.filter(t => t.weekNumber <= currentWeekNumber);
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

    const eqMap = new Map<string, Equipment>(equipments.map(e => [e.id, e]));

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
  }, [tasks, executions, equipments, currentWeekNumber]);

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
    const newTasks = generatePlannedTasks().filter(t => t.equipmentId === newEq.id);
    setTasks(prev => [...prev, ...newTasks]);
    setDatasetInfo(prev => ({
      ...prev,
      equipmentsCount: prev.equipmentsCount + 1,
      tasksCount: prev.tasksCount + newTasks.length,
    }));
  };

  // Load Preset Datasets
  const handleLoadPreset = (presetType: 'official_2026' | 'avril_test' | 'gammes_only') => {
    if (presetType === 'official_2026') {
      const initialTasks = generatePlannedTasks();
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
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
      const initialTasks = generatePlannedTasks();
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
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
    setEquipments(newEquipments);
    setTasks(newTasks);
    setExecutions(generateInitialExecutions(newTasks, currentWeekNumber));
    if (newGammes && newGammes.length > 0) {
      setGammesList(newGammes);
    }
    setDatasetInfo({
      name: 'Planning Importé (Fichier Personnalisé)',
      source: 'file_import',
      loadedAt: new Date().toLocaleTimeString(),
      equipmentsCount: newEquipments.length,
      tasksCount: newTasks.length,
      gammesCount: newGammes ? newGammes.length : gammesList.length,
      description: 'Données importées avec succès via fichier externe',
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
      JSON.stringify({ equipments, tasks, executions, gammesList, stats, datasetInfo }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Planning_Maintenance_BAM_Al_Hoceima_S${currentWeekNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (confirm("Voulez-vous réinitialiser le suivi de maintenance aux données initiales de démonstration ?")) {
      const initialTasks = generatePlannedTasks();
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks, currentWeekNumber));
      setGammesList(GAMMES_CATALOG);
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

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAddModal={() => setIsAddEquipmentOpen(true)}
        onOpenLoadModal={() => setIsLoadPlanningOpen(true)}
        onExportData={handleExportData}
        onResetData={handleResetData}
        currentWeekNumber={currentWeekNumber}
        onWeekChange={setCurrentWeekNumber}
        datasetInfo={datasetInfo}
      />

      {/* Global Realization KPI Summary */}
      <KPIOverview stats={stats} />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {currentView === 'timeline' && (
          <TimelineExecutionView
            equipments={equipments}
            tasks={tasks}
            executions={executions}
            weeks={WEEKS_2026}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'matrix' && (
          <MatrixScheduleView
            equipments={equipments}
            tasks={tasks}
            executions={executions}
            weeks={WEEKS_2026}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'bt' && (
          <WorkOrdersBTView
            equipments={equipments}
            tasks={tasks}
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
            equipments={equipments}
            tasks={tasks}
            executions={executions}
            currentWeekNumber={currentWeekNumber}
            onSelectTask={handleSelectTask}
          />
        )}

        {currentView === 'ai' && (
          <AIAssistantDrawer
            stats={stats}
            equipments={equipments}
            currentWeekNumber={currentWeekNumber}
          />
        )}
      </main>

      {/* Load & Manage Planning / Gammes Modal */}
      <LoadPlanningModal
        isOpen={isLoadPlanningOpen}
        onClose={() => setIsLoadPlanningOpen(false)}
        datasetInfo={datasetInfo}
        gammesList={gammesList}
        onLoadPreset={handleLoadPreset}
        onImportPlanning={handleImportPlanning}
        onUpdateGammes={handleUpdateGammes}
        onResetToDefault={handleResetData}
        currentWeekNumber={currentWeekNumber}
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
          Bank Al-Maghrib • Agence Al Hoceima — Système de Suivi d'Exécution du Planning de Maintenance Préventive 2026
        </p>
      </footer>

    </div>
  );
}
