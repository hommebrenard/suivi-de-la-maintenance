import React, { useState } from 'react';
import { Equipment, LotType } from '../types';
import { X, Plus, Building, Wrench } from 'lucide-react';

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEquipment: (newEq: Equipment) => void;
}

export const AddEquipmentModal: React.FC<AddEquipmentModalProps> = ({
  isOpen,
  onClose,
  onAddEquipment,
}) => {
  if (!isOpen) return null;

  const [id, setId] = useState('BAM-HCM_AG-NEW-01');
  const [description, setDescription] = useState('');
  const [lot, setLot] = useState<LotType>('ÉLECTRICITÉ');
  const [family, setFamily] = useState('TABLEAU ELECTRIQUE');
  const [location, setLocation] = useState('RDC Local Technique');
  const [criticality, setCriticality] = useState<'Haute' | 'Moyenne' | 'Basse'>('Moyenne');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description) return;

    const newEq: Equipment = {
      id,
      zone: 'NORD',
      site: 'AL HOCEIMA AGENCE',
      codeSite: 'BAM-HCM_AG',
      description: description.toUpperCase(),
      lot,
      family,
      quantity: 1,
      location,
      criticality,
    };

    onAddEquipment(newEq);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 px-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-400" />
              Ajouter un Nouvel Équipement au Planning
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Bank Al-Maghrib Agence Al Hoceima</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Code Équipement (ID-MAT) :
            </label>
            <input
              type="text"
              value={id}
              onChange={e => setId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Description de l'Équipement :
            </label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="ex: CHAUDIÈRE GAZ PUISSANCE 150KW"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Lot d'Équipement :
              </label>
              <select
                value={lot}
                onChange={e => setLot(e.target.value as LotType)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="ÉLECTRICITÉ">Électricité</option>
                <option value="FLUIDE">Fluide / HVAC</option>
                <option value="SÉCURITÉ">Sécurité</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Famille :
              </label>
              <input
                type="text"
                value={family}
                onChange={e => setFamily(e.target.value)}
                placeholder="ex: CLIMATISATION"
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Emplacement / Local :
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 mb-1">
                Criticité :
              </label>
              <select
                value={criticality}
                onChange={e => setCriticality(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
              >
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              Ajouter au Planning
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
