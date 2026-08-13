import React, { useState, useEffect } from 'react';
import { Equipment, PlannedTask, ExecutionRecord, ExecutionStatus, ChecklistItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  AlertOctagon, 
  Printer, 
  Save, 
  User, 
  FileCheck2, 
  Camera, 
  CheckSquare, 
  Square,
  Wrench,
  Building,
  MapPin,
  Calendar
} from 'lucide-react';

interface ExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: PlannedTask | null;
  equipment: Equipment | null;
  existingExecution?: ExecutionRecord;
  onSaveExecution: (record: ExecutionRecord) => void;
}

export const ExecutionModal: React.FC<ExecutionModalProps> = ({
  isOpen,
  onClose,
  task,
  equipment,
  existingExecution,
  onSaveExecution,
}) => {
  if (!isOpen || !task || !equipment) return null;

  // Form State
  const [status, setStatus] = useState<ExecutionStatus>(
    existingExecution?.status || 'conforme'
  );
  const [technicianName, setTechnicianName] = useState(
    existingExecution?.technicianName || 'Karim Bennani (Haroon PM)'
  );
  const [executionDate, setExecutionDate] = useState(
    existingExecution?.executionDate || new Date().toISOString().split('T')[0]
  );
  const [durationMinutes, setDurationMinutes] = useState(
    existingExecution?.durationMinutes || 45
  );
  const [observations, setObservations] = useState(
    existingExecution?.observations || ''
  );
  const [correctiveAction, setCorrectiveAction] = useState(
    existingExecution?.correctiveAction || ''
  );
  const [measuredVoltage, setMeasuredVoltage] = useState(
    existingExecution?.measuredVoltage || '400 V'
  );
  const [measuredCurrent, setMeasuredCurrent] = useState(
    existingExecution?.measuredCurrent || '12.5 A'
  );

  // Default checklist based on equipment family
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    if (existingExecution?.checklist && existingExecution.checklist.length > 0) {
      return existingExecution.checklist;
    }
    
    // Default dynamic checklist items
    return [
      { id: '1', label: 'Inspection visuelle générale et nettoyage de la structure/filtres', checked: true },
      { id: '2', label: 'Vérification des fixations mécaniques et serrage des connexions', checked: true },
      { id: '3', label: 'Mesures électriques / hydrauliques de fonctionnement', checked: true, valueMeasured: 'Conforme' },
      { id: '4', label: 'Test d auto-diagnostic et contrôle des sécurités', checked: true },
      { id: '5', label: 'Contrôle d absence de bruits, vibrations ou fuites anormales', checked: true },
    ];
  });

  const toggleCheckitem = (id: string) => {
    setChecklist(items =>
      items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const record: ExecutionRecord = {
      taskId: task.id,
      equipmentId: equipment.id,
      weekNumber: task.weekNumber,
      status,
      executionDate,
      technicianName,
      technicianRole: 'Technicien Supérieur Maintenance',
      durationMinutes: Number(durationMinutes),
      checklist,
      observations,
      correctiveAction,
      measuredVoltage,
      measuredCurrent,
      updatedAt: new Date().toISOString(),
    };

    onSaveExecution(record);
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
              <Building className="w-3.5 h-3.5" />
              BANK AL-MAGHRIB • AGENCE AL HOCEIMA
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-bold">SEMAINE {task.weekNumber}</span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-400" />
              {equipment.description}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Code ID: <span className="text-slate-200 font-bold">{equipment.id}</span> | Lot: <span className="text-slate-200">{equipment.lot}</span> | Fréquence: <span className="text-amber-300 font-bold">{task.frequency}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Status Selector Radio Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-2">
              Statut d'Exécution de la Maintenance :
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* Conforme */}
              <button
                type="button"
                onClick={() => setStatus('conforme')}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === 'conforme'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Réalisé (Conforme)
              </button>

              {/* En cours */}
              <button
                type="button"
                onClick={() => setStatus('en_cours')}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === 'en_cours'
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Clock className="w-4 h-4" />
                En Cours
              </button>

              {/* Avec Réserve */}
              <button
                type="button"
                onClick={() => setStatus('non_conforme')}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === 'non_conforme'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300'
                    : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                Avec Réserve
              </button>

              {/* En Retard */}
              <button
                type="button"
                onClick={() => setStatus('retard')}
                className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  status === 'retard'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                    : 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100'
                }`}
              >
                <AlertOctagon className="w-4 h-4" />
                Non Réalisé (Retard)
              </button>

            </div>
          </div>

          {/* Intervention Details Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Technicien Intervenant :
              </label>
              <div className="relative">
                <User className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={technicianName}
                  onChange={e => setTechnicianName(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Date de Réalisation :
              </label>
              <div className="relative">
                <Calendar className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={executionDate}
                  onChange={e => setExecutionDate(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Durée d'intervention (min) :
              </label>
              <input
                type="number"
                value={durationMinutes}
                onChange={e => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                Gamme / Checklist d'Inspection Préventive :
              </label>
              <span className="text-[11px] text-slate-500">
                {checklist.filter(c => c.checked).length} / {checklist.length} cochés
              </span>
            </div>

            <div className="space-y-2 bg-slate-50/70 border border-slate-200 rounded-2xl p-3">
              {checklist.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckitem(item.id)}
                  className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-200 hover:border-blue-300 cursor-pointer transition-colors"
                >
                  <button type="button" className="mt-0.5 text-blue-600">
                    {item.checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  <span className={`text-xs ${item.checked ? 'text-slate-900 font-medium' : 'text-slate-500 line-through'}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Measurements Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Mesure Tension / Pression :
              </label>
              <input
                type="text"
                value={measuredVoltage}
                onChange={e => setMeasuredVoltage(e.target.value)}
                placeholder="ex: 400V, 3.5 bar"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Mesure Courant / Température :
              </label>
              <input
                type="text"
                value={measuredCurrent}
                onChange={e => setMeasuredCurrent(e.target.value)}
                placeholder="ex: 12.5A, 22°C"
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Observations & Corrective Actions */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Observations & Remarques Techniques :
              </label>
              <textarea
                value={observations}
                onChange={e => setObservations(e.target.value)}
                rows={2}
                placeholder="Renseignez ici toute observation lors du contrôle préventif..."
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {status === 'non_conforme' && (
              <div>
                <label className="block text-[11px] font-semibold text-purple-900 mb-1">
                  Action Corrective / Réparation Requise :
                </label>
                <textarea
                  value={correctiveAction}
                  onChange={e => setCorrectiveAction(e.target.value)}
                  rows={2}
                  placeholder="Actions correctives ou pièces à remplacer..."
                  className="w-full px-3 py-2 border border-purple-300 bg-purple-50/50 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Buttons Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Imprimer Bon d'Intervention
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                Valider l'Intervention
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
