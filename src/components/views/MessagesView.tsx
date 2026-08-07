import React, { useState } from 'react';
import { MessageSquarePlus, Paperclip, Send, Plus, X } from 'lucide-react';
import { Conversation, Message } from '../../types';

interface MessagesViewProps {
  conversations: Conversation[];
  messages: Message[];
  onSendMessage: (conversationId: string, content: string) => void;
  onAddConversation: (name: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  messages,
  onSendMessage,
  onAddConversation
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');
  const [isNewConvModalOpen, setIsNewConvModalOpen] = useState(false);
  const [newConvName, setNewConvName] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const activeMessages = messages.filter(m => m.conversationId === activeConvId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(activeConvId, inputText);
    setInputText('');
  };

  const handleCreateConv = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConvName.trim()) return;
    onAddConversation(newConvName);
    setNewConvName('');
    setIsNewConvModalOpen(false);
  };

  return (
    <div className="flex-1 bg-white flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Conversations d'équipe et messages directs.
          </p>
        </div>

        <button
          onClick={() => setIsNewConvModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-xs transition-colors"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>Nouveau message</span>
        </button>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Conversations List */}
        <div className="w-80 border-r border-gray-200 bg-white flex flex-col shrink-0">
          <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
            {conversations.map(conv => {
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    isActive ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                    {conv.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{conv.name}</h4>
                      <span className="text-[11px] text-gray-400">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Panel matching Screenshot 3 */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-gray-50/30 overflow-hidden">
            {/* Header of thread */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                {activeConv.initials}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">{activeConv.name}</h3>
                <p className="text-xs text-gray-500">Toute votre équipe</p>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 flex flex-col">
              {activeMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-lg ${msg.isSelf ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm shadow-2xs ${
                      msg.isSelf
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex items-center gap-3 shrink-0">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                title="Joindre un fichier"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Écrivez un message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 py-2 px-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm rounded-lg transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Sélectionnez une conversation pour échanger.
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      {isNewConvModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">Nouvelle conversation</h3>
              <button onClick={() => setIsNewConvModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateConv} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Nom du groupe ou destinataire</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Équipe Électrique"
                  value={newConvName}
                  onChange={(e) => setNewConvName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewConvModalOpen(false)}
                  className="px-3 py-1.5 text-sm text-gray-700 bg-gray-100 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
