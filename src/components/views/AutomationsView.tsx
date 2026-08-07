import React, { useState } from 'react';
import { Zap, Lock, Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import { AutomationRule } from '../../types';

interface AutomationsViewProps {
  automations: AutomationRule[];
  onToggleRule: (id: string) => void;
  onAddRule: (rule: Omit<AutomationRule, 'id'>) => void;
}

export const AutomationsView: React.FC<AutomationsViewProps> = ({
  automations,
  onToggleRule,
  onAddRule
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [trigger, setTrigger] = useState('');
  const [action, setAction] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddRule({
      name,
      trigger,
      action,
      active: true,
      isPro: true
    });

    setName('');
    setTrigger('');
    setAction('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header matching Screenshot 5 */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Automatisations</h1>
            <p className="text-sm text-gray-500 mt-1">
              Règles qui déclenchent des actions dans vos flux de travail.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg text-sm shadow-xs transition-colors self-start md:self-auto"
          >
            <Lock className="w-4 h-4 text-gray-400" />
            <span>Nouvelle automatisation</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
              Offre Business
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {automations.length === 0 ? (
          /* Empty state matching Screenshot 5 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucune automatisation pour le moment</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Automatisez les actions courantes comme les affectations et les changements de statut à l'aide de règles.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium text-sm rounded-lg shadow-xs transition-colors"
            >
              <Lock className="w-4 h-4 text-gray-400" />
              <span>Nouvelle automatisation</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-700 rounded-md">
                Offre Business
              </span>
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {automations.map(rule => (
              <div key={rule.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-base">{rule.name}</h3>
                    {rule.isPro && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                        Offre Business
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-700">Déclencheur:</span> {rule.trigger}
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold text-gray-700">Action:</span> {rule.action}
                  </div>
                </div>

                <button
                  onClick={() => onToggleRule(rule.id)}
                  className="text-2xl text-blue-600 hover:opacity-80 transition-opacity"
                >
                  {rule.active ? (
                    <ToggleRight className="w-8 h-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-300" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Créer une règle d'automatisation</h3>
            
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nom de la règle</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Notification urgence OT"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Déclencheur (Si...)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Quand un OT est créé avec priorité Urgente"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Action (Alors...)</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Envoyer un message direct au manager"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Créer la règle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
