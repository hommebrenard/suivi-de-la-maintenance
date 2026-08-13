import React, { useState, useMemo } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, KPIStats } from './types';
import { WEEKS_2026, EQUIPMENTS_DATA, generatePlannedTasks, generateInitialExecutions } from './data/maintenanceData';
import { Header } from './components/Header';
import { KPIOverview } from './components/KPIOverview';
import { TimelineExecutionView } from './components/TimelineExecutionView';
import { MatrixScheduleView } from './components/MatrixScheduleView';
import { KPIDashboardView } from './components/KPIDashboardView';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ExecutionModal } from './components/ExecutionModal';
import { AddEquipmentModal } from './components/AddEquipmentModal';

export default function App() {
  const currentWeekNumber = 33; // Current Week 33 (Mid-August 2026)

  // Core State
  const [equipments, setEquipments] = useState<Equipment[]>(EQUIPMENTS_DATA);
  const [tasks, setTasks] = useState<PlannedTask[]>(() => generatePlannedTasks());
  const [executions, setExecutions] = useState<Record<string, ExecutionRecord>>(() => 
    generateInitialExecutions(generatePlannedTasks())
  );

  // View Navigation State
  const [currentView, setCurrentView] = useState<'timeline' | 'matrix' | 'kpi' | 'ai'>('timeline');

  // Modal State for Task Execution Validation
  const [activeModalData, setActiveModalData] = useState<{
    task: PlannedTask;
    equipment: Equipment;
    execution?: ExecutionRecord;
  } | null>(null);

  // Modal State for Adding Equipment
  const [isAddEquipmentOpen, setIsAddEquipmentOpen] = useState(false);

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
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify({ equipments, tasks, executions, stats }, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Suivi_Maintenance_BAM_Al_Hoceima_S${currentWeekNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (confirm("Voulez-vous réinitialiser le suivi de maintenance aux données initiales de démonstration ?")) {
      const initialTasks = generatePlannedTasks();
      setEquipments(EQUIPMENTS_DATA);
      setTasks(initialTasks);
      setExecutions(generateInitialExecutions(initialTasks));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAddModal={() => setIsAddEquipmentOpen(true)}
        onExportData={handleExportData}
        onResetData={handleResetData}
        currentWeekNumber={currentWeekNumber}
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

      {/* Task Execution Validation Modal */}
      {activeModalData && (
        <ExecutionModal
          isOpen={Boolean(activeModalData)}
          onClose={() => setActiveModalData(null)}
          task={activeModalData.task}
          equipment={activeModalData.equipment}
          existingExecution={activeModalData.execution}
          onSaveExecution={handleSaveExecution}
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
