import { Equipment, PlannedTask, WeekInfo, ExecutionRecord, FrequencyType, WorkOrderBT, SiteInfo } from '../types';
import { getGammeForEquipment } from './gammesData';

export const DEFAULT_SITES: SiteInfo[] = [
  {
    code: 'BAM-HCM_AG',
    name: 'Agence Al Hoceima',
    zone: 'NORD',
    city: 'Al Hoceima',
    address: 'Place du 3 Mars, Al Hoceima',
    manager: 'M. Omar Tazi (Chef d\'Agence)',
    color: 'emerald',
  },
  {
    code: 'BAM-NDR_AG',
    name: 'Agence Nador',
    zone: 'ORIENTAL',
    city: 'Nador',
    address: 'Boulevard Hassan II, Nador',
    manager: 'M. Mehdi Alaoui (Chef d\'Agence)',
    color: 'blue',
  },
  {
    code: 'BAM-TNG_AG',
    name: 'Agence Tanger',
    zone: 'NORD',
    city: 'Tanger',
    address: 'Boulevard Mohamed V, Tanger',
    manager: 'Mme. Salma Benjelloun (Responsable Maintenance)',
    color: 'indigo',
  },
  {
    code: 'BAM-OJD_AG',
    name: 'Agence Oujda',
    zone: 'ORIENTAL',
    city: 'Oujda',
    address: 'Boulevard Zerktouni, Oujda',
    manager: 'M. Hicham Daoudi (Superviseur Régional)',
    color: 'amber',
  },
  {
    code: 'BAM-TTN_AG',
    name: 'Agence Tétouan',
    zone: 'NORD',
    city: 'Tétouan',
    address: 'Avenue Mohamed V, Tétouan',
    manager: 'M. Yassine Naciri (Chef d\'Agence)',
    color: 'cyan',
  },
  {
    code: 'BAM-RBT_SG',
    name: 'Siège Central Rabat',
    zone: 'CENTRE',
    city: 'Rabat',
    address: 'Avenue Annakhil, Hay Riad, Rabat',
    manager: 'Direction Générale de la Logistique & Maintenance BAM',
    color: 'purple',
  },
];

export function getCurrentISOWeekNumber(date: Date = new Date()): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  // Ensure within 1-52/53 range, fallback to 35 for August 2026
  return (weekNo >= 1 && weekNo <= 53) ? weekNo : 35;
}

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
  { weekNumber: 33, monthName: 'AOÛT', startDate: '10/08' },
  { weekNumber: 34, monthName: 'AOÛT', startDate: '17/08' },
  { weekNumber: 35, monthName: 'AOÛT', startDate: '24/08', isCurrentWeek: true },
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

// Auto-generate standard technical park for any Bank Al-Maghrib Site
export function generateEquipmentsForSite(site: SiteInfo): Equipment[] {
  const code = site.code;
  const siteName = site.name.toUpperCase();
  const zone = site.zone;

  return [
    // ÉLECTRICITÉ
    {
      id: `${code}-PTRSF-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'TRANSFORMATEUR PUISSANCE: 160KVA MT/BT',
      lot: 'ÉLECTRICITÉ',
      family: 'TRANFORMATEUR MOYENNE TENSION',
      quantity: 1,
      location: 'Local Transformateur MT',
      criticality: 'Haute',
    },
    {
      id: `${code}-GPLC-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'GROUPE ELECTROGENE PUISSANCE: 100KVA',
      lot: 'ÉLECTRICITÉ',
      family: 'GROUPE ELECTROGENE',
      quantity: 1,
      location: 'Sous-Sol Local GE',
      criticality: 'Haute',
    },
    {
      id: `${code}-OND-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'ONDULEUR N1 SALLE SERVEURS: 20KVA',
      lot: 'ÉLECTRICITÉ',
      family: 'ONDULEUR',
      quantity: 1,
      location: 'Local Onduleur RDC',
      criticality: 'Haute',
    },
    {
      id: `${code}-OND-02`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'ONDULEUR N2 RESEAU BUREAUTIQUE: 15KVA',
      lot: 'ÉLECTRICITÉ',
      family: 'ONDULEUR',
      quantity: 1,
      location: 'Local Onduleur RDC',
      criticality: 'Haute',
    },
    {
      id: `${code}-TGBT-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'TABLEAU GENERAL BASSE TENSION (TGBT)',
      lot: 'ÉLECTRICITÉ',
      family: 'TABLEAU ELECTRIQUE',
      quantity: 1,
      location: 'Local TGBT',
      criticality: 'Haute',
    },
    {
      id: `${code}-TD-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'TABLEAU DISTRIBUTION GENERALE RDC',
      lot: 'ÉLECTRICITÉ',
      family: 'TABLEAU ELECTRIQUE',
      quantity: 1,
      location: 'Couloir RDC',
      criticality: 'Moyenne',
    },
    {
      id: `${code}-TD-02`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'TABLEAU DISTRIBUTION 1ER ETAGE',
      lot: 'ÉLECTRICITÉ',
      family: 'TABLEAU ELECTRIQUE',
      quantity: 1,
      location: '1er Étage',
      criticality: 'Moyenne',
    },
    {
      id: `${code}-ECLIN-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'ECLAIRAGE INTERIEUR & HALL GUICHETS',
      lot: 'ÉLECTRICITÉ',
      family: 'ECLAIRAGE NORMAL',
      quantity: 1,
      location: 'Hall Guichets & Bureaux',
      criticality: 'Basse',
    },
    {
      id: `${code}-ECLSEC-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'BLOCS DE SECOURS BAES RDC & SOUS-SOL',
      lot: 'ÉLECTRICITÉ',
      family: 'ECLAIRAGE SECOURS',
      quantity: 1,
      location: 'Circulations & Issues',
      criticality: 'Moyenne',
    },
    {
      id: `${code}-ASC-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'ASCENSEUR PRINCIPAL 630KG',
      lot: 'ÉLECTRICITÉ',
      family: 'ASCENSEUR',
      quantity: 1,
      location: 'Gain d\'Ascenseur RDC/Etages',
      criticality: 'Haute',
    },
    // FLUIDES
    {
      id: `${code}-ARMC-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'ARMOIRE CLIMATISATION SALLE SERVEUR INFORMATIQUE',
      lot: 'FLUIDE',
      family: 'ARMOIRE DE CLIMATISATION',
      quantity: 1,
      location: 'Salle Serveur',
      criticality: 'Haute',
    },
    {
      id: `${code}-CAN-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'CAISSON D EXTRACTION ET SOUFFLAGE AIR NEUF',
      lot: 'FLUIDE',
      family: 'CAISSON AIR NEUF',
      quantity: 1,
      location: 'Terrasse Technique',
      criticality: 'Moyenne',
    },
    {
      id: `${code}-SPT-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'SPLIT SYSTEM CLIMATISATION BUREAU DIRECTION',
      lot: 'FLUIDE',
      family: 'SPLIT SYSTEM',
      quantity: 1,
      location: 'Bureau Direction',
      criticality: 'Moyenne',
    },
    {
      id: `${code}-SPT-02`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'SPLIT SYSTEM CLIMATISATION SALLE REUNION',
      lot: 'FLUIDE',
      family: 'SPLIT SYSTEM',
      quantity: 1,
      location: 'Salle Réunion',
      criticality: 'Basse',
    },
    {
      id: `${code}-SAN-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'EQUIPEMENTS SANITAIRES & ROBINETTERIE',
      lot: 'FLUIDE',
      family: 'EQUIPEMENTS SANITAIRES',
      quantity: 1,
      location: 'Blocs Sanitaires RDC & 1er',
      criticality: 'Basse',
    },
    {
      id: `${code}-PMP-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'GROUPE DE SURPRESSION EAU POTABLE',
      lot: 'FLUIDE',
      family: 'EQUIPEMENTS POMPAGE',
      quantity: 1,
      location: 'Local Bâche à Eau',
      criticality: 'Haute',
    },
    {
      id: `${code}-PMP-02`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'POMPE DE RELEVAGE EAUX USEES SOUS-SOL',
      lot: 'FLUIDE',
      family: 'EQUIPEMENTS POMPAGE',
      quantity: 1,
      location: 'Fosse Relevage Sous-Sol',
      criticality: 'Haute',
    },
    {
      id: `${code}-REP-01`,
      zone,
      site: siteName,
      codeSite: code,
      description: 'RESEAUX D EVACUATION EAUX PLUVIALES & TOITURE',
      lot: 'FLUIDE',
      family: 'RESEAUX EAUX PLUVIALES',
      quantity: 1,
      location: 'Terrasse & Regard Extérieur',
      criticality: 'Moyenne',
    },
  ];
}

// Full Multi-Site Preset Database
export const MULTI_SITE_PRESET_EQUIPMENTS: Equipment[] = [
  ...EQUIPMENTS_DATA, // Al Hoceima (28 equipments)
  ...generateEquipmentsForSite(DEFAULT_SITES[1]), // Nador
  ...generateEquipmentsForSite(DEFAULT_SITES[2]), // Tanger
  ...generateEquipmentsForSite(DEFAULT_SITES[3]), // Oujda
  ...generateEquipmentsForSite(DEFAULT_SITES[4]), // Tétouan
  ...generateEquipmentsForSite(DEFAULT_SITES[5]), // Rabat
];

// Helper generator for tasks across 52 weeks based on exact PDF schedule rules
export function generatePlannedTasks(equipmentsList: Equipment[] = EQUIPMENTS_DATA): PlannedTask[] {
  const tasks: PlannedTask[] = [];

  equipmentsList.forEach((eq) => {
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
        if ([5 + (equipmentsList.indexOf(eq) % 15), 32 + (equipmentsList.indexOf(eq) % 15)].includes(w)) {
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

// Generate realistic initial execution status records (Current week = 35 - 24/08 au 30/08/2026)
export function generateInitialExecutions(tasks: PlannedTask[], currentWeek: number = 35): Record<string, ExecutionRecord> {
  const executions: Record<string, ExecutionRecord> = {};

  tasks.forEach((t) => {
    const gammeItems = getGammeForEquipment(t.equipmentId, t.frequency);
    const sitePrefix = t.equipmentId.split('-')[1] || 'HCM';
    const cleanEqId = t.equipmentId.replace(/^BAM-[A-Z]+_[A-Z]+-/, '');
    const btCode = `BT-${sitePrefix}-2026-S${String(t.weekNumber).padStart(2, '0')}-${cleanEqId}`;

    if (t.weekNumber < currentWeek) {
      // Past weeks (S1 to S34): mostly completed / compliant
      const seed = (t.weekNumber * 17 + t.equipmentId.length * 13) % 100;
      if (seed < 82) {
        // Conforme
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'conforme',
          executionDate: `2026-0${Math.min(9, Math.ceil(t.weekNumber / 4))}-${10 + (seed % 15)}`,
          technicianName: seed % 2 === 0 ? 'Karim Bennani (Haroon PM)' : 'Youssef El Amrani',
          technicianRole: 'Technicien Senior Maintenance',
          durationMinutes: 45,
          checklist: gammeItems.map(item => ({ ...item, checked: true })),
          observations: 'RAS - Intervention réalisée conformément à la gamme opératoire.',
          updatedAt: new Date().toISOString(),
        };
      } else if (seed < 91) {
        // Non conforme / Réalisé avec réserve
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'non_conforme',
          executionDate: `2026-0${Math.min(9, Math.ceil(t.weekNumber / 4))}-${12 + (seed % 10)}`,
          technicianName: 'Karim Bennani (Haroon PM)',
          technicianRole: 'Technicien Senior Maintenance',
          durationMinutes: 60,
          checklist: gammeItems.map((item, idx) => ({ ...item, checked: idx !== 1 })),
          observations: 'Anomalie mineure détectée sur le point 2 de la gamme. Pièce ou contrôle complémentaire requis.',
          correctiveAction: 'Inscrire dans le registre d entretien et commander consommable.',
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Retard / Non réalisé
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'retard',
          checklist: gammeItems.map(item => ({ ...item, checked: false })),
          observations: 'Intervention reportée en raison d indisponibilité temporaire de l accès.',
          updatedAt: new Date().toISOString(),
        };
      }
    } else if (t.weekNumber === currentWeek) {
      // Current week (Week 35 - 24/08 au 30/08/2026)
      const seed = (t.equipmentId.length * 7) % 10;
      if (seed < 4) {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'conforme',
          executionDate: '2026-08-25',
          technicianName: 'Omar Tazi',
          technicianRole: 'Inspecteur Réseau BAM',
          checklist: gammeItems.map(item => ({ ...item, checked: true })),
          observations: 'Maintenance préventive S35 effectuée avec succès.',
          updatedAt: new Date().toISOString(),
        };
      } else if (seed < 7) {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'en_cours',
          executionDate: '2026-08-25',
          technicianName: 'Karim Bennani (Haroon PM)',
          technicianRole: 'Technicien Référent',
          checklist: gammeItems.map((item, idx) => ({ ...item, checked: idx === 0 })),
          observations: 'Intervention S35 en cours de réalisation sur site ce jour.',
          updatedAt: new Date().toISOString(),
        };
      } else {
        executions[t.id] = {
          taskId: t.id,
          equipmentId: t.equipmentId,
          weekNumber: t.weekNumber,
          btNumber: btCode,
          status: 'planifie',
          checklist: gammeItems.map(item => ({ ...item, checked: false })),
          updatedAt: new Date().toISOString(),
        };
      }
    } else {
      // Future weeks: Planifié
      executions[t.id] = {
        taskId: t.id,
        equipmentId: t.equipmentId,
        weekNumber: t.weekNumber,
        btNumber: btCode,
        status: 'planifie',
        checklist: gammeItems.map(item => ({ ...item, checked: false })),
        updatedAt: new Date().toISOString(),
      };
    }
  });

  return executions;
}
