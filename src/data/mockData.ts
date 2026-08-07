import { 
  WorkOrder, 
  MaintenanceRequest, 
  Conversation, 
  Message, 
  Equipment, 
  InventoryItem, 
  Meter, 
  AutomationRule, 
  WorkOrderTemplate, 
  Procedure, 
  Tag, 
  LocationItem, 
  UserItem, 
  SupplierItem, 
  ClientItem 
} from '../types';

export const INITIAL_EQUIPMENT: Equipment[] = [
  {
    id: 'eq-1',
    code: 'AC-100',
    name: 'compresseur',
    status: 'En service',
    criticality: 'Normal',
    location: 'Atelier Principal - Zone A',
    supplier: 'ATLAS COPCO FRANCE',
    manufacturer: 'ATLAS COPCO',
    model: 'GA-37 VSD',
    serialNumber: 'SN-98723412',
    createdAt: '20/07/2026 15:20:17',
    updatedAt: '20/07/2026 15:20:17',
    description: 'Compresseur rotatif à vis lubrifiée à vitesse variable pour le réseau d air comprimé de l atelier.',
    workOrdersCount: 2
  },
  {
    id: 'eq-2',
    code: 'CNC-200',
    name: 'Fraiseuse CNC 5 Axes',
    status: 'Arrêt planifié',
    criticality: 'Élevée',
    location: 'Bâtiment B - Usinage',
    supplier: 'HAAS AUTOMATION',
    manufacturer: 'HAAS',
    model: 'VF-4SS',
    serialNumber: 'HAAS-881203',
    createdAt: '15/06/2026 09:14:00',
    updatedAt: '28/07/2026 11:30:00',
    description: 'Centre d usinage vertical haute vitesse 5 axes.',
    workOrdersCount: 1
  },
  {
    id: 'eq-3',
    code: 'POMP-05',
    name: 'Pompe de Refroidissement Hydro',
    status: 'En service',
    criticality: 'Normal',
    location: 'Zone Technique - Sous-sol',
    supplier: 'GRUNDFOS',
    manufacturer: 'GRUNDFOS',
    model: 'CRN 32',
    serialNumber: 'GF-5542-X',
    createdAt: '01/05/2026 14:00:00',
    updatedAt: '25/07/2026 16:45:00',
    description: 'Pompe centrifuge verticale multicellulaire pour le circuit fermé.',
    workOrdersCount: 0
  }
];

export const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo-1',
    code: 'OT-1001',
    title: 'Vidange et remplacement filtres compresseur AC-100',
    description: 'Réaliser la vidange annuelle d huile synthétique et remplacer le filtre séparateur d air/huile.',
    status: 'En cours',
    priority: 'Élevée',
    type: 'Préventive',
    equipmentId: 'eq-1',
    equipmentName: 'compresseur (AC-100)',
    location: 'Atelier Principal - Zone A',
    assignee: 'Jean Dupont',
    dueDate: '2026-07-31',
    createdAt: '2026-07-25 08:30',
    updatedAt: '2026-07-29 10:15'
  },
  {
    id: 'wo-2',
    code: 'OT-1002',
    title: 'Contrôle alignement broche Fraiseuse CNC',
    description: 'Vérification géométrique et alignement laser de la broche suite à vibration anormale.',
    status: 'Ouvert',
    priority: 'Urgente',
    type: 'Corrective',
    equipmentId: 'eq-2',
    equipmentName: 'Fraiseuse CNC 5 Axes (CNC-200)',
    location: 'Bâtiment B - Usinage',
    assignee: 'Marc Antoine',
    dueDate: '2026-07-30',
    createdAt: '2026-07-28 14:20',
    updatedAt: '2026-07-28 14:20'
  },
  {
    id: 'wo-3',
    code: 'OT-1003',
    title: 'Inspection annuelle réseau secours incendie',
    description: 'Contrôle pression des vannes et test déclenchement automatique.',
    status: 'Terminé',
    priority: 'Moyenne',
    type: 'Inspection',
    location: 'Site Entier',
    assignee: 'Sophie Martin',
    dueDate: '2026-07-20',
    createdAt: '2026-07-15 09:00',
    updatedAt: '2026-07-20 17:00'
  }
];

export const INITIAL_REQUESTS: MaintenanceRequest[] = [
  {
    id: 'req-1',
    title: 'Bruit anormal au niveau de la courroie du compresseur',
    description: 'Sifflement métallique continu lors de la mise sous pression.',
    status: 'En attente',
    priority: 'Élevée',
    equipmentName: 'compresseur (AC-100)',
    location: 'Atelier Principal - Zone A',
    requestedBy: 'Lucie Bernard (Opératrice)',
    createdAt: '29/07/2026 08:12'
  },
  {
    id: 'req-2',
    title: 'Fuite d huile sous la table de travail CNC',
    description: 'Goutte à goutte constaté du côté du carter hydraulique gauche.',
    status: 'Approuvée',
    priority: 'Urgente',
    equipmentName: 'Fraiseuse CNC 5 Axes (CNC-200)',
    location: 'Bâtiment B - Usinage',
    requestedBy: 'Paul Moreau (Chef d équipe)',
    createdAt: '28/07/2026 16:40'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    name: 'Toute l\'équipe',
    unreadCount: 0,
    lastMessage: 'bonjour',
    lastMessageTime: '7m',
    initials: 'TL'
  },
  {
    id: 'conv-2',
    name: 'Équipe Maintenance Électrique',
    unreadCount: 2,
    lastMessage: 'L intervention sur l armoire E2 est validée.',
    lastMessageTime: '1h',
    initials: 'ME'
  },
  {
    id: 'conv-3',
    name: 'Support Technique Atlas Copco',
    unreadCount: 0,
    lastMessage: 'La pièce de rechange réf #9910 a été expédiée.',
    lastMessageTime: 'Hier',
    initials: 'AC'
  }
];

export const INITIAL_MESSAGES: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'user-1',
    senderName: 'Toute l\'équipe',
    senderInitials: 'TL',
    content: 'Toute votre équipe',
    timestamp: '29/07/2026 15:20:00',
    isSelf: false
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: 'user-self',
    senderName: 'Moi',
    senderInitials: 'C',
    content: 'bonjour',
    timestamp: '29/07/2026 15:28:29',
    isSelf: true
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'part-1',
    code: 'FILT-AC-01',
    name: 'Filtre à air pour compresseur AC-100',
    category: 'Consommable',
    quantity: 12,
    minQuantity: 5,
    unitPrice: 45.50,
    location: 'Magasin Central - Rayon B2',
    equipment: 'compresseur (AC-100)'
  },
  {
    id: 'part-2',
    code: 'HUILE-SYNTH-20L',
    name: 'Huile Synthétique Haute Performance (20 Litres)',
    category: 'Lubrifiant',
    quantity: 3,
    minQuantity: 4,
    unitPrice: 189.00,
    location: 'Magasin Central - Zone Produits Liquides',
    equipment: 'Tous équipements hydrauliques'
  },
  {
    id: 'part-3',
    code: 'JOIN-HYD-50',
    name: 'Kit Joints d étanchéité Hydraulique NBR',
    category: 'Pièce mécanique',
    quantity: 28,
    minQuantity: 10,
    unitPrice: 12.30,
    location: 'Tiroir A-14',
    equipment: 'Fraiseuse CNC 5 Axes (CNC-200)'
  }
];

export const INITIAL_METERS: Meter[] = [
  {
    id: 'meter-1',
    name: 'Compteur d heures compresseur AC-100',
    equipmentName: 'compresseur (AC-100)',
    currentValue: 4520,
    unit: 'heures',
    lastReadingDate: '28/07/2026'
  },
  {
    id: 'meter-2',
    name: 'Nombre de cycles d usinage CNC',
    equipmentName: 'Fraiseuse CNC 5 Axes (CNC-200)',
    currentValue: 124500,
    unit: 'cycles',
    lastReadingDate: '29/07/2026'
  }
];

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'auto-1',
    name: 'Création automatique OT Vidange à 5000h',
    trigger: 'Lorsque le compteur d heures AC-100 > 5000',
    action: 'Générer un ordre de travail préventif "Vidange Compresseur"',
    active: true,
    isPro: true
  },
  {
    id: 'auto-2',
    name: 'Notification alerte stock bas',
    trigger: 'Lorsque la quantité d une pièce < minQuantity',
    action: 'Envoyer une alerte par e-mail au responsable magasinier',
    active: true,
    isPro: false
  }
];

export const INITIAL_TEMPLATES: WorkOrderTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Maintenance trimestrielle centrale d air',
    description: 'Modèle standard comprenant contrôle de pression, purge des condensats et nettoyage des échangeurs.',
    estimatedHours: 2.5,
    priority: 'Moyenne',
    tasksCount: 6
  },
  {
    id: 'tmpl-2',
    title: 'Inspection visuelle et graissage roulements CNC',
    description: 'Contrôle complet des axes, vérification des niveaux d huile et lubrification à la graisse spécifique.',
    estimatedHours: 1.5,
    priority: 'Faible',
    tasksCount: 4
  }
];

export const INITIAL_PROCEDURES: Procedure[] = [
  {
    id: 'proc-1',
    title: 'Check-list sécurité avant démarrage compresseur',
    description: 'Points de contrôle obligatoires : vannes d isolement, niveau d huile, arrêt d urgence.',
    stepsCount: 8,
    createdAt: '10/06/2026'
  },
  {
    id: 'proc-2',
    title: 'Procédure Consignation Électrique (LOTO)',
    description: 'Séquence stricte de verrouillage des sources d énergie électrique avant intervention.',
    stepsCount: 12,
    createdAt: '01/04/2026'
  }
];

export const INITIAL_TAGS: Tag[] = [
  { id: 'tag-1', name: 'Sécurité', color: '#EF4444', usedCount: 5 },
  { id: 'tag-2', name: 'Électrique', color: '#F59E0B', usedCount: 12 },
  { id: 'tag-3', name: 'Hydraulique', color: '#3B82F6', usedCount: 8 },
  { id: 'tag-4', name: 'Urgent', color: '#DC2626', usedCount: 3 },
  { id: 'tag-5', name: 'Réglementaire', color: '#10B981', usedCount: 7 }
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  { id: 'loc-1', name: 'Site Principal Paris', type: 'Site', equipmentCount: 15 },
  { id: 'loc-2', name: 'Atelier Principal - Zone A', parentLocation: 'Site Principal Paris', type: 'Atelier', equipmentCount: 4 },
  { id: 'loc-3', name: 'Bâtiment B - Usinage', parentLocation: 'Site Principal Paris', type: 'Bâtiment', equipmentCount: 6 },
  { id: 'loc-4', name: 'Magasin Central Stockage', parentLocation: 'Site Principal Paris', type: 'Zone', equipmentCount: 2 }
];

export const INITIAL_USERS: UserItem[] = [
  {
    id: 'usr-1',
    fullName: 'ckom',
    email: 'ckom@entreprise.com',
    role: 'Administrateur',
    teams: ['Maintenance Générale', 'Direction'],
    lastVisit: '29/07/2026 15:28',
    avatarInitials: 'C'
  },
  {
    id: 'usr-2',
    fullName: 'Jean Dupont',
    email: 'j.dupont@entreprise.com',
    role: 'Technicien',
    teams: ['Équipe Mécanique'],
    lastVisit: '29/07/2026 14:10',
    avatarInitials: 'JD'
  },
  {
    id: 'usr-3',
    fullName: 'Sophie Martin',
    email: 's.martin@entreprise.com',
    role: 'Manager',
    teams: ['Responsable Maintenance'],
    lastVisit: '28/07/2026 17:30',
    avatarInitials: 'SM'
  }
];

export const INITIAL_SUPPLIERS: SupplierItem[] = [
  {
    id: 'sup-1',
    name: 'ATLAS COPCO FRANCE',
    contactName: 'Service Client & Pièces',
    email: 'contact.france@atlascopco.com',
    phone: '+33 1 49 20 00 00',
    category: 'Compresseurs & Air Comprimé'
  },
  {
    id: 'sup-2',
    name: 'HAAS AUTOMATION EUROPE',
    contactName: 'Support Technique CNC',
    email: 'support@haascnc.eu',
    phone: '+32 2 720 45 10',
    category: 'Machines-Outils Usinage'
  }
];

export const INITIAL_CLIENTS: ClientItem[] = [
  {
    id: 'cli-1',
    name: 'Industries Pharma S.A.',
    contactName: 'M. Renard (Responsable Usine)',
    email: 'renard@pharmasa.fr',
    phone: '+33 4 72 10 20 30',
    sitesCount: 3
  }
];
