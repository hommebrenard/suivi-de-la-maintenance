import React, { useState } from 'react';
import { BarChart3, Calendar, Download, Filter, Plus, PieChart as PieIcon, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { WorkOrder, Equipment } from '../../types';

interface ReportsViewProps {
  workOrders: WorkOrder[];
  equipmentList: Equipment[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ workOrders, equipmentList }) => {
  const [activeTab, setActiveTab] = useState<'work-orders' | 'equipment' | 'details' | 'activity' | 'export'>('work-orders');
  const [period, setPeriod] = useState('30');

  // Chart data calculations
  const priorityData = [
    { name: 'Urgente', value: workOrders.filter(w => w.priority === 'Urgente').length, color: '#EF4444' },
    { name: 'Élevée', value: workOrders.filter(w => w.priority === 'Élevée').length, color: '#F59E0B' },
    { name: 'Moyenne', value: workOrders.filter(w => w.priority === 'Moyenne').length, color: '#3B82F6' },
    { name: 'Faible', value: workOrders.filter(w => w.priority === 'Faible').length, color: '#10B981' },
  ];

  const statusData = [
    { name: 'Ouvert', count: workOrders.filter(w => w.status === 'Ouvert').length },
    { name: 'En cours', count: workOrders.filter(w => w.status === 'En cours').length },
    { name: 'En attente', count: workOrders.filter(w => w.status === 'En attente').length },
    { name: 'Terminé', count: workOrders.filter(w => w.status === 'Terminé').length },
  ];

  return (
    <div className="flex-1 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Rapports</h1>
            <p className="text-sm text-gray-500 mt-1">
              Vue d'ensemble opérationnelle de vos processus de maintenance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-semibold"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="365">12 derniers mois</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="mt-6 flex items-center gap-6 border-b border-gray-200 -mb-5">
          {[
            { id: 'work-orders', label: 'Ordres de travail' },
            { id: 'equipment', label: 'État des équipements' },
            { id: 'details', label: 'Détails du rapport' },
            { id: 'activity', label: 'Activité récente' },
            { id: 'export', label: 'Exporter' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="px-6 py-3 border-b border-gray-100 bg-gray-50/50 flex flex-wrap items-center gap-2">
        {['Assigné à', 'Emplacement', 'Priorité', 'Type', 'Statut'].map(filter => (
          <select
            key={filter}
            className="px-3 py-1.5 text-xs font-medium bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none"
          >
            <option value="">{filter}</option>
          </select>
        ))}
        <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg">
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter un filtre</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 bg-gray-50/30">
        {workOrders.length === 0 ? (
          /* Empty state matching Screenshot 4 */
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center bg-white my-6 max-w-4xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4 text-blue-500">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Aucun ordre de travail sur cette période</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
              Choisissez une période plus large, ou créez des ordres de travail pour voir les tendances et les répartitions ici.
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Metric KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-xs font-semibold text-gray-500 uppercase">Total Ordres de travail</span>
                <div className="text-3xl font-bold text-gray-900 mt-2">{workOrders.length}</div>
                <div className="text-xs text-green-600 font-medium mt-1">↑ +12% ce mois-ci</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-xs font-semibold text-gray-500 uppercase">Taux de résolution</span>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round((workOrders.filter(w => w.status === 'Terminé').length / (workOrders.length || 1)) * 100)}%
                </div>
                <div className="text-xs text-gray-500 font-medium mt-1">Sur la période</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-xs font-semibold text-gray-500 uppercase">Temps moyen de réparation (MTTR)</span>
                <div className="text-3xl font-bold text-gray-900 mt-2">2.4h</div>
                <div className="text-xs text-green-600 font-medium mt-1">↓ -15min vs mois dernier</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-2xs">
                <span className="text-xs font-semibold text-gray-500 uppercase">Équipements actifs</span>
                <div className="text-3xl font-bold text-gray-900 mt-2">
                  {equipmentList.filter(e => e.status === 'En service').length}/{equipmentList.length}
                </div>
                <div className="text-xs text-amber-600 font-medium mt-1">1 en arrêt planifié</div>
              </div>
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Répartition par statut</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData}>
                      <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Répartition par priorité</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {priorityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
