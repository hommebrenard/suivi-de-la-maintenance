import { Equipment, PlannedTask, WeekInfo, ExecutionRecord, FrequencyType } from '../types';

export const WEEKS_2026: WeekInfo[] = [
  { weekNumber: 1, monthName: 'JANVIER', startDate: '29/12' },
  { weekNumber: 2, monthName: 'JANVIER', startDate: '05/01' },
  { weekNumber: 3, monthName: 'JANVIER', startDate: '12/01' },
  { weekNumber: 4, monthName: 'JANVIER', startDate: '19/01' },
  { weekNumber: 5, monthName: 'JANVIER', startDate: '26/01' },
  { weekNumber: 6, monthName: 'FÉVRIER', startDate: '02/02' },
  { weekNumber: 7, monthName: 'FÉVRIER', startDate: '09/02' },
  { weekNumber: 8, monthName: 'FÉVRIER', startDate: '16/02' },
  { weekNumber: 9, monthName: 'FÉVRIER', startDate: '23/02' },
  { weekNumber: 10, monthName: 'MARS', startDate: '02/03' },
  { weekNumber: 11, monthName: 'MARS', startDate: '09/03' },
  { weekNumber: 12, monthName: 'MARS', startDate: '16/03' },
  { weekNumber: 13, monthName: 'MARS', startDate: '23/03' },
  { weekNumber: 14, monthName: 'MARS', startDate: '30/03' },
  { weekNumber: 15, monthName: 'AVRIL', startDate: '06/04' },
  { weekNumber: 16, monthName: 'AVRIL', startDate: '13/04' },
  { weekNumber: 17, monthName: 'AVRIL', startDate: '20/04' },
  { weekNumber: 18, monthName: 'AVRIL', startDate: '27/04' },
  { weekNumber: 19, monthName: 'MAI', startDate: '04/05' },
  { weekNumber: 20, monthName: 'MAI', startDate: '11/05' },
  { weekNumber: 21, monthName: 'MAI', startDate: '18/05' },
  { weekNumber: 22, monthName: 'MAI', startDate: '25/05' },
  { weekNumber: 23, monthName: 'JUIN', startDate: '01/06' },
  { weekNumber: 24, monthName: 'JUIN', startDate: '08/06' },
  { weekNumber: 25, monthName: 'JUIN', startDate: '15/06' },
  { weekNumber: 26, monthName: 'JUIN', startDate: '22/06' },
  { weekNumber: 27, monthName: 'JUIN', startDate: '29/06' },
  { weekNumber: 28, monthName: 'JUILLET', startDate: '06/07' },
  { weekNumber: 29, monthName: 'JUILLET', startDate: '13/07' },
  { weekNumber: 30, monthName: 'JUILLET', startDate: '20/07' },
  { weekNumber: 31, monthName: 'JUILLET', startDate: '27/07' },
  { weekNumber: 32, monthName: 'AOÛT', startDate: '03/08' },
  { weekNumber: 33, monthName: 'AOÛT', startDate: '10/08', isCurrentWeek: true },
  { weekNumber: 34, monthName: 'AOÛT', startDate: '17/08' },
  { weekNumber: 35, monthName: 'AOÛT', startDate: '24/08' },
  { weekNumber: 36, monthName: 'AOÛT', startDate: '31/08' },
  { weekNumber: 37, monthName: 'SEPTEMBRE', startDate: '07/09' },
  { weekNumber: 38, monthName: 'SEPTEMBRE', startDate: '14/09' },
  { weekNumber: 39, monthName: 'SEPTEMBRE', startDate: '21/09' },
  { weekNumber: 40, monthName: 'SEPTEMBRE', startDate: '28/09' },
  { weekNumber: 41, monthName: 'OCTOBRE', startDate: '05/10' },
  { weekNumber: 42, monthName: 'OCTOBRE', startDate: '12/10' },
  { weekNumber: 43, monthName: 'OCTOBRE', startDate: '19/10' },
  { weekNumber: 44, monthName: 'OCTOBRE', startDate: '26/10' },
  { weekNumber: 45, monthName: 'NOVEMBRE', startDate: '02/11' },
  { weekNumber: 46, monthName: 'NOVEMBRE', startDate: '09/11' },
  { weekNumber: 47, monthName: 'NOVEMBRE', startDate: '16/11' },
  { weekNumber: 48, monthName: 'NOVEMBRE', startDate: '23/11' },
  { weekNumber: 49, monthName: 'NOVEMBRE', startDate: '30/11' },
  { weekNumber: 50, monthName: 'DÉCEMBRE', startDate: '07/12' },
  { weekNumber: 51, monthName: 'DÉCEMBRE', startDate: '14/12' },
  { weekNumber: 52, monthName: 'DÉCEMBRE', startDate: '21/12' },
  { weekNumber: 53, monthName: 'DÉCEMBRE', startDate: '28/12' },
];

export const EQUIPMENTS_DATA: Equipment[] = [
  // LOT ELECTRICITE
  {
    id: 'BAM-HCM_AG-PTRSF-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'TRANSFORMATEUR PUISSANCE: 100KVA',
    lot: 'ÉLECTRICITÉ',
    family: 'TRANFORMATEUR MOYENNE TENSION',
    quantity: 1,
    location: 'Local Transformateur MT',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-GPLC-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'GROUPE ELECTROGENE PUISSANCE: 65KVA',
    lot: 'ÉLECTRICITÉ',
    family: 'GROUPE ELECTROGENE',
    quantity: 1,
    location: 'Sous-Sol Local GE',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-OND-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ONDULEUR N1 PUISSANCE: 10KVA',
    lot: 'ÉLECTRICITÉ',
    family: 'ONDULEUR',
    quantity: 1,
    location: 'Local Onduleur RDC',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-OND-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ONDULEUR N2 PUISSANCE: 15KVA',
    lot: 'ÉLECTRICITÉ',
    family: 'ONDULEUR',
    quantity: 1,
    location: 'Local Onduleur RDC',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-OND-03',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ONDULEUR N3 PUISSANCE: 15KVA',
    lot: 'ÉLECTRICITÉ',
    family: 'ONDULEUR',
    quantity: 1,
    location: 'Local Onduleur RDC',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-ECLIN-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE INTERIEUR SOUS SOL',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE NORMAL',
    quantity: 1,
    location: 'Sous-Sol',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-ECLIN-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE INTERIEUR RDC',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE NORMAL',
    quantity: 1,
    location: 'RDC',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-ECLIN-03',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE INTERIEUR 1ER ETAGE',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE NORMAL',
    quantity: 1,
    location: '1er Étage',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-ECLEX-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE EXTERIEUR',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE NORMAL',
    quantity: 1,
    location: 'Façades & Parking',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-ECLSEC-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE SECOURS SOUS SOL',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE SECOURS',
    quantity: 1,
    location: 'Sous-Sol',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-ECLSEC-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE SECOURS RDC',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE SECOURS',
    quantity: 1,
    location: 'RDC',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-ECLSEC-03',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ECLAIRAGE SECOURS 1ER ETAGE',
    lot: 'ÉLECTRICITÉ',
    family: 'ECLAIRAGE SECOURS',
    quantity: 1,
    location: '1er Étage',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-TGBT-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'TABLEAU GENERAL BASSE TENSION (TGBT)',
    lot: 'ÉLECTRICITÉ',
    family: 'TABLEAU ELECTRIQUE',
    quantity: 1,
    location: 'Local TGBT',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-TD-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'TABLEAU DISTRIBUTION N1 LOCAL ONDULEUR 1.4',
    lot: 'ÉLECTRICITÉ',
    family: 'TABLEAU ELECTRIQUE',
    quantity: 1,
    location: 'Local Onduleur',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-TD-05',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'TABLEAU DISTRIBUTION N5 HALL GARAGE CONVOYEUR',
    lot: 'ÉLECTRICITÉ',
    family: 'TABLEAU ELECTRIQUE',
    quantity: 1,
    location: 'Garage Convoyeur',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-TD-10',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'TABLEAU DISTRIBUTION N10 SERVEUR 1',
    lot: 'ÉLECTRICITÉ',
    family: 'TABLEAU ELECTRIQUE',
    quantity: 1,
    location: 'Salle Serveurs',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-ASC-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ASCENSEUR N1',
    lot: 'ÉLECTRICITÉ',
    family: 'ASCENSEUR',
    quantity: 1,
    location: 'Cage Ascenseur Centrale',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-MTC-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'MONTE CHARGE N1',
    lot: 'ÉLECTRICITÉ',
    family: 'MONTE CHARGE',
    quantity: 1,
    location: 'Zone Caveau / Stockage',
    criticality: 'Moyenne',
  },

  // LOT FLUIDE
  {
    id: 'BAM-HCM_AG-ARCM-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ARMOIRE DE CLIMATISATION N1',
    lot: 'FLUIDE',
    family: 'ARMOIRE DE CLIMATISATION',
    quantity: 1,
    location: 'Salle Serveurs / Informatique',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-SPT-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'SPLIT SYSTEM N1 RDC BUREAU SMS',
    lot: 'FLUIDE',
    family: 'SPLIT SYSTEM',
    quantity: 1,
    location: 'Bureau SMS RDC',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-SPT-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'SPLIT SYSTEM N2 RDC LOCAL ONDULEUR',
    lot: 'FLUIDE',
    family: 'SPLIT SYSTEM',
    quantity: 1,
    location: 'Local Onduleur',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-SPT-04',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'SPLIT SYSTEM N4 RDC LOCAL SERVEUR',
    lot: 'FLUIDE',
    family: 'SPLIT SYSTEM',
    quantity: 1,
    location: 'Local Serveur',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-SPT-07',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'SPLIT SYSTEM N7 RDC HALL CLIENTELE',
    lot: 'FLUIDE',
    family: 'SPLIT SYSTEM',
    quantity: 1,
    location: 'Hall Clientèle',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-SPT-14',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'SPLIT SYSTEM N14 RDC DIRECTION',
    lot: 'FLUIDE',
    family: 'SPLIT SYSTEM',
    quantity: 1,
    location: 'Bureau Direction',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-CAN-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'CAISSON AIR NEUF N01',
    lot: 'FLUIDE',
    family: 'CAISSON AIR NEUF',
    quantity: 1,
    location: 'Toiture / Terrasse',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-RESEP-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'RESEAUX EAUX PLUVIALES',
    lot: 'FLUIDE',
    family: 'RESEAUX EAUX PLUVIALES',
    quantity: 1,
    location: 'Sous-Sol / Regards',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-RESAS-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'RESEAUX ASSAINISSEMENT',
    lot: 'FLUIDE',
    family: 'RESEAUX ASSAINISSEMENT',
    quantity: 1,
    location: 'Réseau Général',
    criticality: 'Moyenne',
  },
  {
    id: 'BAM-HCM_AG-SANT-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ENSEMBLE EQUIPEMENTS SANITAIRE RDC',
    lot: 'FLUIDE',
    family: 'EQUIPEMENTS SANITAIRES',
    quantity: 1,
    location: 'Sanitaires RDC',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-SANT-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'ENSEMBLE EQUIPEMENTS SANITAIRE 1ER ETAGE',
    lot: 'FLUIDE',
    family: 'EQUIPEMENTS SANITAIRES',
    quantity: 1,
    location: 'Sanitaires 1er Étage',
    criticality: 'Basse',
  },
  {
    id: 'BAM-HCM_AG-PMP-01',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'POMPE DE RELEVAGE N1',
    lot: 'FLUIDE',
    family: 'EQUIPEMENTS POMPAGE',
    quantity: 1,
    location: 'Fosse de Relevage Sous-Sol',
    criticality: 'Haute',
  },
  {
    id: 'BAM-HCM_AG-PMP-02',
    zone: 'NORD',
    site: 'AL HOCEIMA AGENCE',
    codeSite: 'BAM-HCM_AG',
    description: 'POMPE DE RELEVAGE N2',
    lot: 'FLUIDE',
    family: 'EQUIPEMENTS POMPAGE',
    quantity: 1,
    location: 'Fosse de Relevage Sous-Sol',
    criticality: 'Haute',
  },
];

// Helper generator for tasks across 52 weeks based on exact PDF schedule rules
export function generatePlannedTasks(): PlannedTask[] {
  const tasks: PlannedTask[] = [];

  EQUIPMENTS_DATA.forEach((eq) => {
    for (let w = 1; w <= 52; w++) {
      let freq: FrequencyType | null = null;

      // Rules extracted from Al Hoceima Preventive Schedule:
      if (eq.family === 'TRANFORMATEUR MOYENNE TENSION') {
        if (w === 36) freq = 'A'; // Annuel
        else if ([1, 14, 27, 52].includes(w)) freq = 'T'; // Trimestriel
        else freq = 'H'; // Hebdomadaire
      } else if (eq.family === 'GROUPE ELECTROGENE') {
        if (w === 36) freq = 'A';
        else if ([5, 9, 13, 18, 22, 26, 31, 35, 44, 48].includes(w)) freq = 'M';
        else freq = 'H';
      } else if (eq.family === 'ONDULEUR') {
        if (w === 10) freq = 'A';
        else if (w === 36) freq = 'S';
        else freq = 'H';
      } else if (eq.family === 'ECLAIRAGE NORMAL') {
        if ([18, 44].includes(w)) freq = 'S';
      } else if (eq.family === 'ECLAIRAGE SECOURS') {
        if ([18, 44].includes(w)) freq = 'S';
        else if (w % 4 === 1) freq = 'M';
      } else if (eq.family === 'TABLEAU ELECTRIQUE') {
        if ([18, 22, 31, 44].includes(w)) freq = 'T';
      } else if (eq.family === 'ASCENSEUR' || eq.family === 'MONTE CHARGE') {
        if (w === 18) freq = 'A';
        else if (w === 36) freq = 'S';
        else if (w % 4 === 2) freq = 'M';
        else freq = 'H';
      } else if (eq.family === 'ARMOIRE DE CLIMATISATION') {
        if ([5, 22, 40].includes(w)) freq = 'S';
      } else if (eq.family === 'SPLIT SYSTEM') {
        if ([5 + (EQUIPMENTS_DATA.indexOf(eq) % 15), 32 + (EQUIPMENTS_DATA.indexOf(eq) % 15)].includes(w)) {
          freq = 'S';
        }
      } else if (eq.family === 'CAISSON AIR NEUF') {
        if (w === 22) freq = 'A';
        else if ([18, 44].includes(w)) freq = 'S';
        else if ([5, 13, 27, 35].includes(w)) freq = 'T';
        else if (w % 2 === 0) freq = 'M';
      } else if (eq.family === 'RESEAUX EAUX PLUVIALES' || eq.family === 'RESEAUX ASSAINISSEMENT') {
        if (w === 36) freq = 'A';
      } else if (eq.family === 'EQUIPEMENTS SANITAIRES') {
        freq = 'H';
      } else if (eq.family === 'EQUIPEMENTS POMPAGE') {
        if (w === 22) freq = 'A';
        else if ([9, 35].includes(w)) freq = 'T';
        else if (w % 4 === 0) freq = 'M';
      }

      if (freq) {
        const weekInfo = WEEKS_2026.find((wi) => wi.weekNumber === w);
        tasks.push({
          id: `task-${eq.id}-w${w}`,
          equipmentId: eq.id,
          weekNumber: w,
          frequency: freq,
          dateStartStr: weekInfo ? `${weekInfo.startDate}/2026` : `S${w}`,
          dateEndStr: weekInfo ? `${weekInfo.startDate}/2026` : `S${w}`,
        });
      }
    }
  });

  return tasks;
}

// Generate realistic initial execution status records (Current week = 33)
export function generateInitialExecutions(tasks: PlannedTask[]): Record<string, ExecutionRecord> {
  const executions: Record<string, ExecutionRecord> = {};
  const currentWeek = 33;

  tasks.forEach((t) => {
    if (t.weekNumber < currentWeek) {
      // Past weeks: mostly completed / compliant, some with minor defects or occasional delay
      const seed = (t.weekNumber * 17 + t.equipmentId.length * 13) % 100;
      if (seed < 82) {
        // Conforme
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'conforme',
          executionDate: `2026-0${Math.min(9, Math.ceil(t.weekNumber / 4))}-${10 + (seed % 15)}`,
          technicianName: seed % 2 === 0 ? 'Karim Bennani (Haroon PM)' : 'Youssef El Amrani',
          technicianRole: 'Technicien Senior Maintenance',
          durationMinutes: 45,
          checklist: [
            { id: '1', label: 'Inspection visuelle et nettoyage externe', checked: true },
            { id: '2', label: 'Vérification des connexions électriques', checked: true },
            { id: '3', label: 'Contrôle des paramètres de fonctionnement', checked: true, valueMeasured: 'Normal' },
            { id: '4', label: 'Essai de fonctionnement à vide et en charge', checked: true },
          ],
          observations: 'RAS - Équipement en parfait état de fonctionnement.',
          updatedAt: new Date().toISOString(),
        };
      } else if (seed < 91) {
        // Non conforme / Réalisé avec réserve
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'non_conforme',
          executionDate: `2026-0${Math.min(9, Math.ceil(t.weekNumber / 4))}-${12 + (seed % 10)}`,
          technicianName: 'Karim Bennani (Haroon PM)',
          technicianRole: 'Technicien Senior Maintenance',
          durationMinutes: 60,
          checklist: [
            { id: '1', label: 'Inspection visuelle', checked: true },
            { id: '2', label: 'Nettoyage filtres / ailettes', checked: true },
            { id: '3', label: 'Niveau de fluide / Huile', checked: false, comment: 'Niveau bas détecté' },
          ],
          observations: 'Anomalie détectée : légère baisse de pression / filtre encrassé. Pièce de rechange commandée.',
          correctiveAction: 'Remplacement de filtre programmé pour la semaine prochaine.',
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Retard / Non réalisé
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'retard',
          checklist: [],
          observations: 'Intervention reportée en raison d indisponibilité de l accès au local technique lors du passage.',
          updatedAt: new Date().toISOString(),
        };
      }
    } else if (t.weekNumber === currentWeek) {
      // Current week (Week 33): mixture of In Progress, Completed, or Pending
      const seed = (t.equipmentId.length * 7) % 10;
      if (seed < 4) {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'conforme',
          executionDate: '2026-08-11',
          technicianName: 'Omar Tazi',
          technicianRole: 'Inspecteur Réseau BAM',
          checklist: [
            { id: '1', label: 'Contrôle des isolements et mises à la terre', checked: true },
            { id: '2', label: 'Mesure de tension de sortie', checked: true, valueMeasured: '398 V' },
          ],
          observations: 'Maintenance préventive S33 effectuée avec succès.',
          updatedAt: new Date().toISOString(),
        };
      } else if (seed < 7) {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'en_cours',
          executionDate: '2026-08-12',
          technicianName: 'Karim Bennani (Haroon PM)',
          technicianRole: 'Technicien Référent',
          checklist: [
            { id: '1', label: 'Vérification visuelle', checked: true },
            { id: '2', label: 'Contrôle des filtres', checked: false },
          ],
          observations: 'Intervention en cours de finalisation sur site.',
          updatedAt: new Date().toISOString(),
        };
      } else {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          status: 'planifie',
          checklist: [],
          updatedAt: new Date().toISOString(),
        };
      }
    } else {
      // Future weeks: Planifié
      executions[t.id] = {
        taskId: t.id,
        equipmentId: t.equipmentId,
        weekNumber: t.weekNumber,
        status: 'planifie',
        checklist: [],
        updatedAt: new Date().toISOString(),
      };
    }
  });

  return executions;
}
