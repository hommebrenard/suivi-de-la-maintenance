import React, { useState } from 'react';
import { KPIStats, Equipment } from '../types';
import { Bot, Send, Sparkles, AlertCircle, CheckCircle, FileText, Loader2, MessageSquare } from 'lucide-react';

interface AIAssistantDrawerProps {
  stats: KPIStats;
  equipments: Equipment[];
  currentWeekNumber: number;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  stats,
  equipments,
  currentWeekNumber,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Bonjour ! Je suis l'Assistant IA de Maintenance Préventive de l'Agence Bank Al-Maghrib Al Hoceima (modèle Gemini 3.6 Flash).\n\nLe taux d'exécution actuel est de **${stats.executionRate}%** en Semaine ${currentWeekNumber}.\nComment puis-je vous aider aujourd'hui ?`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async (promptText?: string) => {
    const textToSend = promptText || inputQuery;
    if (!textToSend.trim() || loading) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    if (!promptText) setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planningStats: stats,
          equipmentSummary: equipments.slice(0, 10).map(e => ({
            id: e.id,
            desc: e.description,
            lot: e.lot,
            family: e.family,
            criticality: e.criticality,
          })),
          query: textToSend,
        }),
      });

      const data = await response.json();
      if (data.result) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.result }]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'ai', text: 'Une erreur est survenue lors du traitement par l\'IA.' },
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: 'Impossible de contacter l\'assistant Gemini. Vérifiez votre connexion.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "💡 Synthèse globale de l'état d'exécution S33",
    "⚠️ Équipements critiques et risques de retard",
    "📋 Préconisations de contrôle pour Transformateur MT 100kVA",
    "🛡️ Plan d'action pour le lot Climatisation / Fluides",
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/30 ring-1 ring-purple-400/40 flex items-center justify-center text-purple-200">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Assistant IA de Maintenance Préventive
              <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-200 font-normal">
                Gemini 3.6 Flash
              </span>
            </h2>
            <p className="text-xs text-purple-200 mt-0.5">
              Analyse automatisée du planning 2026, recommandations techniques et génération de gammes de maintenance.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-purple-500" /> Suggestions :
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(qp)}
            disabled={loading}
            className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-medium rounded-xl transition-colors cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Chat Conversation Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-xs min-h-[400px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[80%] whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium rounded-br-none shadow-xs'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-purple-700 font-semibold p-3 bg-purple-50 rounded-2xl w-fit">
            <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
            L'Assistant Gemini analyse les données du planning...
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          value={inputQuery}
          onChange={e => setInputQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSendPrompt()}
          placeholder="Posez une question technique sur le planning de maintenance..."
          className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-2xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
        />
        <button
          onClick={() => handleSendPrompt()}
          disabled={loading || !inputQuery.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
