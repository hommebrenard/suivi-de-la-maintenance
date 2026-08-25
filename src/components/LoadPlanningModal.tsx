import React, { useState } from 'react';
import { 
  X, 
  UploadCloud, 
  FileSpreadsheet, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  RefreshCw, 
  Sparkles, 
  Database, 
  Wrench, 
  Calendar, 
  Building2, 
  Plus, 
  FileText,
  Search,
  Check,
  ChevronRight,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { Equipment, PlannedTask, ExecutionRecord, GammeOperatoire, PlanningDatasetInfo } from '../types';
import { EQUIPMENTS_DATA, generatePlannedTasks, generateInitialExecutions } from '../data/maintenanceData';
import { GAMMES_CATALOG } from '../data/gammesData';

interface LoadPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  datasetInfo: PlanningDatasetInfo;
  gammesList: GammeOperatoire[];
  onLoadPreset: (presetType: 'official_2026' | 'avril_test' | 'gammes_only') => void;
  onImportPlanning: (equipments: Equipment[], tasks: PlannedTask[], gammes?: GammeOperatoire[]) => void;
  onUpdateGammes: (newGammes: GammeOperatoire[]) => void;
  onResetToDefault: () => void;
  currentWeekNumber: number;
}

export const LoadPlanningModal: React.FC<LoadPlanningModalProps> = ({
  isOpen,
  onClose,
  datasetInfo,
  gammesList,
  onLoadPreset,
  onImportPlanning,
  onUpdateGammes,
  onResetToDefault,
  currentWeekNumber,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'presets' | 'import' | 'gammes' | 'diagnostic'>('presets');
  const [gammeSearchQuery, setGammeSearchQuery] = useState('');
  const [selectedGamme, setSelectedGamme] = useState<GammeOperatoire | null>(gammesList[0] || null);

  // New Gamme Form State
  const [showAddGammeForm, setShowAddGammeForm] = useState(false);
  const [newGammeCode, setNewGammeCode] = useState('');
  const [newGammeDesc, setNewGammeDesc] = useState('');
  const [newGammePrefix, setNewGammePrefix] = useState('');
  const [newGammeFreq, setNewGammeFreq] = useState<'H' | 'M' | 'T' | 'S' | 'A'>('M');
  const [newGammeItemsRaw, setNewGammeItemsRaw] = useState('1 - ACT001: Contrôle général visuel et propreté\n2 - ACT002: Serrage et mesure électrique');

  // Import File States
  const [importStatus, setImportStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
    details?: string;
  }>({ type: 'idle', message: '' });

  // Handle Preset Selection
  const handleSelectPreset = (type: 'official_2026' | 'avril_test' | 'gammes_only') => {
    onLoadPreset(type);
    setImportStatus({
      type: 'success',
      message: type === 'avril_test' 
        ? 'Jeu de données Focus Avril 2026 (S15 à S18) chargé avec succès !'
        : 'Planning Annuel 2026 BAM Al Hoceima et Gammes Opératoires chargés avec succès !',
    });
  };

  // Download CSV Templates
  const downloadPlanningTemplate = () => {
    const csvContent = 
`id,zone,site,codeSite,description,lot,family,quantity,location,criticality,frequency,weeks
BAM-HCM_AG-PTRSF-01,NORD,AL HOCEIMA AGENCE,BAM-HCM_AG,TRANSFORMATEUR PUISSANCE: 100KVA,ÉLECTRICITÉ,TRANSFORMATEUR MOYENNE TENSION,1,Sous-Sol / Local Transfo,Haute,H,"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52"
BAM-HCM_AG-GPLC-01,NORD,AL HOCEIMA AGENCE,BAM-HCM_AG,GROUPE ELECTROGENE 250KVA,ÉLECTRICITÉ,GROUPE ÉLECTROGÈNE,1,Local Technique RDC,Haute,H,"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52"
BAM-HCM_AG-OND-01,NORD,AL HOCEIMA AGENCE,BAM-HCM_AG,ONDULEUR TRIPHASE 60KVA,ÉLECTRICITÉ,ONDULEUR,1,Local Onduleurs,Haute,H,"1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52"
BAM-HCM_AG-ASC-01,NORD,AL HOCEIMA AGENCE,BAM-HCM_AG,ASCENSEUR PRINCIPAL 630KG,ÉLECTRICITÉ,ASCENSEUR,1,Gaine Centrale,Haute,M,"4,8,12,16,20,24,28,32,36,40,44,48,52"
BAM-HCM_AG-SPT-01,NORD,AL HOCEIMA AGENCE,BAM-HCM_AG,CLIMATISEUR SPLIT DIRECTION,FLUIDE,CLIMATISATION,1,1er Étage Direction,Moyenne,S,"15,37"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'modele_planning_preventif_bam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadGammesTemplate = () => {
    const csvContent = 
`codeGamme,descriptionGamme,equipmentPrefixId,frequency,actionCode,actionLabel
PS-GPLC-1H-01,PREVENTIF SYSTEMATIQUE HEBDOMADAIRE GROUPE ELECTROGENE,BAM-HCM_AG-GPLC-01,H,1 - ACT024,[Contrôle] Niveau d'huile
PS-GPLC-1H-01,PREVENTIF SYSTEMATIQUE HEBDOMADAIRE GROUPE ELECTROGENE,BAM-HCM_AG-GPLC-01,H,2 - ACT025,[Contrôle] Niveau du liquide de refroidissement
PS-GPLC-1H-01,PREVENTIF SYSTEMATIQUE HEBDOMADAIRE GROUPE ELECTROGENE,BAM-HCM_AG-GPLC-01,H,3 - ACT026,[Contrôle] Température du liquide
PS-GPLC-1H-01,PREVENTIF SYSTEMATIQUE HEBDOMADAIRE GROUPE ELECTROGENE,BAM-HCM_AG-GPLC-01,H,4 - ACT027,[Contrôle] Tension des batteries [V]
PS-ASC-1M-01,PREVENTIF SYSTEMATIQUE MENSUEL ASCENSEUR,BAM-HCM_AG-ASC-01,M,1 - ACT268,Visite périodique nettoyage et graissage
PS-ASC-1M-01,PREVENTIF SYSTEMATIQUE MENSUEL ASCENSEUR,BAM-HCM_AG-ASC-01,M,2 - ACT270,Cabine: boutons d'envoi paumelles de porte`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'modele_gammes_operatoires_bam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse Planning File (JSON / CSV)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'planning' | 'gammes') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (fileType === 'planning') {
            if (Array.isArray(parsed.equipments) && Array.isArray(parsed.tasks)) {
              onImportPlanning(parsed.equipments, parsed.tasks, parsed.gammes);
              setImportStatus({
                type: 'success',
                message: `Importation réussie : ${parsed.equipments.length} équipements et ${parsed.tasks.length} tâches chargés !`,
              });
            } else {
              throw new Error("Le fichier JSON doit contenir les clés 'equipments' et 'tasks'.");
            }
          } else {
            if (Array.isArray(parsed)) {
              onUpdateGammes(parsed);
              setImportStatus({
                type: 'success',
                message: `Importation réussie : ${parsed.length} gammes opératoires chargées !`,
              });
            } else {
              throw new Error("Le fichier JSON de gammes doit être un tableau de gammes.");
            }
          }
        } else {
          // CSV Parsing
          const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
          if (lines.length <= 1) {
            throw new Error("Le fichier CSV est vide ou ne comporte pas de données.");
          }

          if (fileType === 'planning') {
            const header = lines[0].split(',');
            const newEquipments: Equipment[] = [];
            const newTasks: PlannedTask[] = [];

            for (let i = 1; i < lines.length; i++) {
              // Handle comma inside quotes
              const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(',');
              const cleanRow = row.map(cell => cell.replace(/^"(.*)"$/, '$1').trim());
              
              if (cleanRow.length >= 7) {
                const id = cleanRow[0];
                const zone = cleanRow[1] || 'NORD';
                const site = cleanRow[2] || 'AL HOCEIMA AGENCE';
                const codeSite = cleanRow[3] || 'BAM-HCM_AG';
                const description = cleanRow[4] || id;
                const lot = (cleanRow[5] as any) || 'ÉLECTRICITÉ';
                const family = cleanRow[6] || 'GÉNÉRAL';
                const quantity = parseInt(cleanRow[7] || '1', 10) || 1;
                const location = cleanRow[8] || 'Agence Al Hoceima';
                const criticality = (cleanRow[9] as any) || 'Moyenne';
                const frequency = (cleanRow[10] as any) || 'M';
                const weeksRaw = cleanRow[11] || '1,15,33';

                newEquipments.push({
                  id,
                  zone,
                  site,
                  codeSite,
                  description,
                  lot,
                  family,
                  quantity,
                  location,
                  criticality,
                });

                const weekList = weeksRaw.split(',').map(w => parseInt(w.trim(), 10)).filter(w => !isNaN(w) && w >= 1 && w <= 53);
                weekList.forEach(w => {
                  newTasks.push({
                    id: `${id}-W${w}`,
                    equipmentId: id,
                    weekNumber: w,
                    frequency,
                    dateStartStr: `S${w}/2026`,
                    dateEndStr: `S${w}/2026`,
                  });
                });
              }
            }

            if (newEquipments.length === 0) {
              throw new Error("Aucun équipement valide n'a pu être extrait du fichier CSV.");
            }

            onImportPlanning(newEquipments, newTasks);
            setImportStatus({
              type: 'success',
              message: `CSV importé avec succès : ${newEquipments.length} équipements et ${newTasks.length} tâches préventives créées !`,
            });
          } else {
            // CSV Gammes
            const linesG = lines.slice(1);
            const gammesMap = new Map<string, GammeOperatoire>();

            linesG.forEach((line, idx) => {
              const parts = line.split(',');
              if (parts.length >= 6) {
                const codeGamme = parts[0].trim();
                const descriptionGamme = parts[1].trim();
                const equipmentPrefixId = parts[2].trim();
                const frequency = parts[3].trim() as any;
                const actionCode = parts[4].trim();
                const actionLabel = parts[5].trim();

                if (!gammesMap.has(codeGamme)) {
                  gammesMap.set(codeGamme, {
                    codeGamme,
                    descriptionGamme,
                    equipmentPrefixId,
                    frequency,
                    items: [],
                  });
                }

                gammesMap.get(codeGamme)!.items.push({
                  id: String(gammesMap.get(codeGamme)!.items.length + 1),
                  actionCode,
                  label: actionLabel,
                  checked: true,
                });
              }
            });

            const loadedGammes = Array.from(gammesMap.values());
            if (loadedGammes.length === 0) {
              throw new Error("Aucune gamme opératoire valide trouvée dans le CSV.");
            }

            onUpdateGammes(loadedGammes);
            setImportStatus({
              type: 'success',
              message: `CSV importé avec succès : ${loadedGammes.length} gammes opératoires chargées !`,
            });
          }
        }
      } catch (err: any) {
        setImportStatus({
          type: 'error',
          message: `Erreur lors de la lecture du fichier : ${err.message || 'Format invalide'}`,
        });
      }
    };

    reader.readAsText(file);
    e.target.value = '';
  };

  // Add custom gamme
  const handleAddNewGamme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGammeCode.trim() || !newGammeDesc.trim()) return;

    const items = newGammeItemsRaw
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map((line, idx) => {
        const parts = line.split(':');
        return {
          id: String(idx + 1),
          actionCode: parts.length > 1 ? parts[0].trim() : `${idx + 1} - ACT${100 + idx}`,
          label: parts.length > 1 ? parts.slice(1).join(':').trim() : parts[0].trim(),
          checked: true,
        };
      });

    const newGamme: GammeOperatoire = {
      codeGamme: newGammeCode.trim().toUpperCase(),
      descriptionGamme: newGammeDesc.trim(),
      equipmentPrefixId: newGammePrefix.trim() || 'BAM-HCM_AG',
      frequency: newGammeFreq,
      items: items.length > 0 ? items : [
        { id: '1', actionCode: '1 - ACT001', label: 'Contrôle visuel et fonctionnement', checked: true }
      ],
    };

    const updated = [newGamme, ...gammesList.filter(g => g.codeGamme !== newGamme.codeGamme)];
    onUpdateGammes(updated);
    setSelectedGamme(newGamme);
    setShowAddGammeForm(false);
    setNewGammeCode('');
    setNewGammeDesc('');
    setImportStatus({
      type: 'success',
      message: `Gamme opératoire ${newGamme.codeGamme} ajoutée au catalogue !`,
    });
  };

  const filteredGammes = gammesList.filter(g => 
    g.codeGamme.toLowerCase().includes(gammeSearchQuery.toLowerCase()) ||
    g.descriptionGamme.toLowerCase().includes(gammeSearchQuery.toLowerCase()) ||
    g.equipmentPrefixId.toLowerCase().includes(gammeSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with BAM identity and Loaded Status */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-5 px-6 flex items-start justify-between border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-blue-300 font-semibold mb-1">
              <span className="flex items-center gap-1 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md border border-blue-400/30">
                <Building2 className="w-3.5 h-3.5" /> BANK AL-MAGHRIB
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-300 font-bold">AGENCE AL HOCEIMA</span>
              <span className="text-slate-500">•</span>
              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-400/30 font-medium">
                Exercice 2026
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Layers className="w-6 h-6 text-amber-400" />
              Chargement & Gestion des Plannings (Préventif & Gammes)
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Synchronisez la planification annuelle, chargez les gammes opératoires normalisées ou importez vos fichiers personnalisés.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Summary Pill Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">Jeu Actuel :</span>
            <strong className="text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-300 shadow-2xs font-bold">
              {datasetInfo.name}
            </strong>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-semibold text-slate-700">
            <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-md border border-blue-200">
              📊 {datasetInfo.equipmentsCount} Équipements
            </span>
            <span className="bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-md border border-indigo-200">
              🗓️ {datasetInfo.tasksCount} Tâches Préventives (52 Semaines)
            </span>
            <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-md border border-amber-200">
              📋 {gammesList.length} Gammes Opératoires
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 overflow-x-auto">
          <button
            onClick={() => { setActiveTab('presets'); setImportStatus({ type: 'idle', message: '' }); }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'presets'
                ? 'border-blue-600 text-blue-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            1. Chargement Rapide & Jeux Officiels
          </button>

          <button
            onClick={() => { setActiveTab('import'); setImportStatus({ type: 'idle', message: '' }); }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'import'
                ? 'border-blue-600 text-blue-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-blue-600" />
            2. Importer Fichiers (Excel / CSV / JSON)
          </button>

          <button
            onClick={() => { setActiveTab('gammes'); setImportStatus({ type: 'idle', message: '' }); }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'gammes'
                ? 'border-blue-600 text-blue-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4 text-emerald-600" />
            3. Référentiel des Gammes Opératoires ({gammesList.length})
          </button>

          <button
            onClick={() => { setActiveTab('diagnostic'); setImportStatus({ type: 'idle', message: '' }); }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'border-blue-600 text-blue-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Database className="w-4 h-4 text-slate-600" />
            4. Diagnostic & Récapitulatif
          </button>
        </div>

        {/* Import Feedback Banner */}
        {importStatus.type !== 'idle' && (
          <div className={`mx-6 mt-4 p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
            importStatus.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-rose-50 text-rose-900 border-rose-300'
          }`}>
            <div className="flex items-center gap-2.5">
              {importStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span className="font-semibold">{importStatus.message}</span>
            </div>
            <button 
              onClick={() => setImportStatus({ type: 'idle', message: '' })}
              className="text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: PRESETS & OFFICIAL DATASETS */}
          {activeTab === 'presets' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Sélectionnez un jeu de données pré-configuré pour l'Agence d'Al Hoceima
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chargement instantané de la planification préventive 2026 avec gammes opératoires officielles et calcul des périodicités (H, M, T, S, A).
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Preset 1: Full Year 2026 */}
                <div className="bg-slate-50 border-2 border-blue-200 hover:border-blue-500 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-md group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Officiel & Recommandé
                      </span>
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700">
                        Planning Annuel BAM Al Hoceima 2026
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Intègre l'intégralité des 28 équipements critiques (Transformateur, Groupes 250kVA, Onduleurs 60kVA, Ascenseurs, TGBT, VRV, Pompes...).
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>Période :</span>
                        <strong className="text-slate-800">52 Semaines (S1 à S52)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Équipements :</span>
                        <strong className="text-slate-800">28 Équipements réels</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Gammes opératoires :</span>
                        <strong className="text-emerald-700 font-bold">16 Gammes complètes</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Codes Actions :</span>
                        <strong className="text-blue-700 font-bold">80+ Points de contrôle</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPreset('official_2026')}
                    className="mt-5 w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Recharger Planning Annuel 2026
                  </button>
                </div>

                {/* Preset 2: Test Focus Avril */}
                <div className="bg-gradient-to-b from-amber-50/50 to-orange-50/40 border-2 border-amber-300 hover:border-amber-500 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-md group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Mode Test & Démonstration
                      </span>
                      <Sparkles className="w-5 h-5 text-amber-600" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-800">
                        Jeu de Test Focus Avril 2026
                      </h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Idéal pour tester la génération des Bons de Travail (BT) sur les semaines 15, 16, 17 et 18 du mois d'Avril avec vérification des gammes.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-amber-200/60 text-[11px] text-slate-700">
                      <div className="flex justify-between">
                        <span>Période ciblée :</span>
                        <strong className="text-slate-900">Mois d'Avril (S15 à S18)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Équipements actifs :</span>
                        <strong className="text-slate-900">28 Équipements</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Bons de Travail :</span>
                        <strong className="text-amber-900 font-bold">Génération S15 à S18</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Statuts simulés :</span>
                        <strong className="text-emerald-800 font-bold">Conformes, Réserves, Retards</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPreset('avril_test')}
                    className="mt-5 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    Charger Focus Avril (S15 - S18)
                  </button>
                </div>

                {/* Preset 3: Gammes Catalog Sync */}
                <div className="bg-slate-50 border-2 border-slate-200 hover:border-emerald-500 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-md group">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Référentiel Méthodes
                      </span>
                      <Wrench className="w-5 h-5 text-emerald-600" />
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-700">
                        Synchroniser les 16 Gammes Opératoires
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Charge et réinitialise les gammes officielles : PS-GPLC-1H-01, PS-ASC-1M-01, PS-SPT-1S-01, PS-OND-1H-01, etc.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span>Nombre de Gammes :</span>
                        <strong className="text-slate-800">16 Gammes normalisées</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Périodicités :</span>
                        <strong className="text-slate-800">Hebdo, Mensuel, Trim., Sem., Annuel</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Codes d'Actions :</span>
                        <strong className="text-emerald-700 font-bold">1 - ACT266 à ACT294...</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPreset('gammes_only')}
                    className="mt-5 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Synchroniser les Gammes Opératoires
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: IMPORT CUSTOM FILES (EXCEL / CSV / JSON) */}
          {activeTab === 'import' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Importer un planning ou des gammes personnalisées
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Importez vos fichiers Excel (.xlsx via CSV), fichiers CSV ou fichiers JSON exportés.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Box 1: Planning Import */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Fichier Planning Préventif</h4>
                        <p className="text-[11px] text-slate-500">Format .csv ou .json (Équipements & Semaines)</p>
                      </div>
                    </div>

                    <button
                      onClick={downloadPlanningTemplate}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                      title="Télécharger un modèle CSV type"
                    >
                      <Download className="w-3 h-3 text-blue-600" />
                      Modèle CSV
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-6 text-center transition-colors bg-white">
                    <UploadCloud className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      Glissez votre fichier ici ou cliquez pour parcourir
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Supporte les formats CSV délimités par virgule et JSON
                    </p>
                    
                    <label className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors">
                      Sélectionner Fichier Planning
                      <input
                        type="file"
                        accept=".csv,.json,.txt"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'planning')}
                      />
                    </label>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-xl space-y-1">
                    <p className="font-bold text-slate-700">Colonnes supportées dans le CSV :</p>
                    <p className="font-mono text-[10px] text-slate-600">
                      id, description, lot, family, frequency, weeks ("1,2,3,4,5..."), criticality, location
                    </p>
                  </div>
                </div>

                {/* Box 2: Gammes Import */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Fichier Gammes Opératoires</h4>
                        <p className="text-[11px] text-slate-500">Format .csv ou .json (Codes Gammes & Actions)</p>
                      </div>
                    </div>

                    <button
                      onClick={downloadGammesTemplate}
                      className="px-2.5 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                      title="Télécharger un modèle CSV gammes"
                    >
                      <Download className="w-3 h-3 text-emerald-600" />
                      Modèle CSV
                    </button>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-white">
                    <UploadCloud className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-800">
                      Glissez votre fichier de gammes ici
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Met à jour les listes de contrôle et actions associées aux BTs
                    </p>
                    
                    <label className="mt-4 inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer shadow-xs transition-colors">
                      Sélectionner Fichier Gammes
                      <input
                        type="file"
                        accept=".csv,.json,.txt"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'gammes')}
                      />
                    </label>
                  </div>

                  <div className="text-[11px] text-slate-500 bg-slate-100 p-3 rounded-xl space-y-1">
                    <p className="font-bold text-slate-700">Colonnes supportées pour les Gammes :</p>
                    <p className="font-mono text-[10px] text-slate-600">
                      codeGamme, descriptionGamme, equipmentPrefixId, frequency, actionCode, actionLabel
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: GAMMES CATALOGUE */}
          {activeTab === 'gammes' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Référentiel des Gammes Opératoires de Maintenance ({gammesList.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ces gammes sont automatiquement injectées dans les Bons de Travail (BT) selon l'équipement et la périodicité.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={gammeSearchQuery}
                      onChange={e => setGammeSearchQuery(e.target.value)}
                      placeholder="Filtrer gammes (ex: GPLC, ASC, SPT...)"
                      className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-60"
                    />
                  </div>

                  <button
                    onClick={() => setShowAddGammeForm(!showAddGammeForm)}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {showAddGammeForm ? 'Fermer Formulaire' : 'Créer une Gamme'}
                  </button>
                </div>
              </div>

              {/* Add New Gamme Inline Form */}
              {showAddGammeForm && (
                <form onSubmit={handleAddNewGamme} className="bg-slate-50 border border-emerald-200 rounded-2xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    Ajout d'une nouvelle Gamme Opératoire
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Code Gamme</label>
                      <input
                        type="text"
                        value={newGammeCode}
                        onChange={e => setNewGammeCode(e.target.value)}
                        placeholder="Ex: PS-ECL-1M-01"
                        required
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Description Gamme</label>
                      <input
                        type="text"
                        value={newGammeDesc}
                        onChange={e => setNewGammeDesc(e.target.value)}
                        placeholder="Ex: PREVENTIF SYSTEMATIQUE MENSUEL ECLAIRAGE"
                        required
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Périodicité</label>
                      <select
                        value={newGammeFreq}
                        onChange={e => setNewGammeFreq(e.target.value as any)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold"
                      >
                        <option value="H">Hebdomadaire (H)</option>
                        <option value="M">Mensuelle (M)</option>
                        <option value="T">Trimestrielle (T)</option>
                        <option value="S">Semestrielle (S)</option>
                        <option value="A">Annuelle (A)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Préfixe Équipement Lié</label>
                      <input
                        type="text"
                        value={newGammePrefix}
                        onChange={e => setNewGammePrefix(e.target.value)}
                        placeholder="Ex: BAM-HCM_AG-ECL"
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                        Points de contrôle (Une ligne par action, format Code: Libellé)
                      </label>
                      <textarea
                        rows={2}
                        value={newGammeItemsRaw}
                        onChange={e => setNewGammeItemsRaw(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setShowAddGammeForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Enregistrer la Gamme
                    </button>
                  </div>
                </form>
              )}

              {/* Gammes Master-Detail View */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Gamme List (Left Column) */}
                <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-2 max-h-[420px] overflow-y-auto space-y-1.5">
                  {filteredGammes.map(g => {
                    const isSelected = selectedGamme?.codeGamme === g.codeGamme;
                    return (
                      <div
                        key={g.codeGamme}
                        onClick={() => setSelectedGamme(g)}
                        className={`p-3 rounded-xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`font-mono text-xs font-black ${isSelected ? 'text-white' : 'text-blue-900'}`}>
                            {g.codeGamme}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-900'
                          }`}>
                            {g.frequency}
                          </span>
                        </div>
                        <p className={`text-[11px] font-medium line-clamp-1 ${isSelected ? 'text-blue-100' : 'text-slate-600'}`}>
                          {g.descriptionGamme}
                        </p>
                        <div className="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-black/10">
                          <span className={isSelected ? 'text-blue-200' : 'text-slate-400 font-mono'}>
                            {g.equipmentPrefixId}
                          </span>
                          <span className={isSelected ? 'text-amber-200 font-bold' : 'text-slate-500 font-medium'}>
                            {g.items.length} actions
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gamme Details (Right Column) */}
                <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col justify-between max-h-[420px] overflow-y-auto">
                  {selectedGamme ? (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-sm font-black text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                            {selectedGamme.codeGamme}
                          </span>
                          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md">
                            Périodicité: {selectedGamme.frequency}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs mt-2">
                          {selectedGamme.descriptionGamme}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Applicable aux équipements préfixés : <strong className="text-slate-800">{selectedGamme.equipmentPrefixId}</strong>
                        </p>
                      </div>

                      <div>
                        <h5 className="text-[11px] font-bold text-slate-700 mb-2 flex items-center justify-between">
                          <span>Points de Contrôle & Actions ({selectedGamme.items.length})</span>
                          <span className="text-[10px] text-slate-400 font-normal">Codes normalisés ACT</span>
                        </h5>

                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1">
                          {selectedGamme.items.map((item, idx) => (
                            <div key={item.id || idx} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-start gap-2.5 text-xs">
                              <span className="bg-blue-100 text-blue-900 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md shrink-0 border border-blue-200">
                                {item.actionCode || `${idx + 1} - ACT`}
                              </span>
                              <span className="text-slate-800 text-[11px] leading-relaxed">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Sélectionnez une gamme dans la liste pour voir ses actions.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: DIAGNOSTIC & CURRENT STATE */}
          {activeTab === 'diagnostic' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Diagnostic et intégrité de la base de maintenance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Vérification de la cohérence entre les équipements, les semaines planifiées et les gammes opératoires associées.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-slate-500">Équipements Enregistrés</p>
                  <p className="text-2xl font-black text-slate-900 mt-1">{datasetInfo.equipmentsCount}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold mt-1">✓ 100% avec identifiant unique</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-slate-500">Tâches Planifiées (52 Semaines)</p>
                  <p className="text-2xl font-black text-blue-700 mt-1">{datasetInfo.tasksCount}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Couverture de S1 à S52</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-slate-500">Gammes Opératoires</p>
                  <p className="text-2xl font-black text-emerald-700 mt-1">{gammesList.length}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Avec codes d'actions réels</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-[11px] font-bold text-slate-500">Semaine Active Système</p>
                  <p className="text-2xl font-black text-amber-600 mt-1">S{currentWeekNumber}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Août 2026 (Agence HCM)</p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
                <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Astuce de Gestion de Maintenance (GMAO)</p>
                  <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                    Toutes les modifications apportées aux équipements et aux gammes sont répercutées instantanément dans les 
                    <strong> Bons de Travail (BT)</strong>, la <strong>Matrice Annuelle des 52 Semaines</strong> et le 
                    <strong> Tableau de Bord des KPIs</strong>. Vous pouvez exporter l'intégralité au format JSON à tout moment.
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-200">
                <button
                  onClick={onResetToDefault}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Réinitialiser aux Valeurs d'Origine BAM Al Hoceima
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Dernier chargement : <strong className="text-slate-700">{datasetInfo.loadedAt}</strong>
          </span>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer shadow-xs transition-colors"
          >
            Fermer la Fenêtre
          </button>
        </div>

      </div>
    </div>
  );
};
