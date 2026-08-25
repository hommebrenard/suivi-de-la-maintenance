import { ChecklistItem, GammeOperatoire } from '../types';

export type { GammeOperatoire };

export const GAMMES_CATALOG: GammeOperatoire[] = [
  // 1. ASCENSEUR HEBDOMADAIRE (PS-ASC-1H-01)
  {
    codeGamme: 'PS-ASC-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE ASCENSEUR',
    equipmentPrefixId: 'BAM-HCM_AG-ASC-01',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT266', label: 'Essai des appareils, dépannage et désincarcération', checked: true },
      { id: '2', actionCode: '2 - ACT267', label: 'Tenue du dossier d\'entretien de l\'appareil', checked: true },
    ],
  },

  // 2. ASCENSEUR MENSUEL (PS-ASC-1M-01)
  {
    codeGamme: 'PS-ASC-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL ASCENSEUR',
    equipmentPrefixId: 'BAM-HCM_AG-ASC-01',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT268', label: 'Visite périodique, nettoyage et graissage des organes mécaniques, fourniture des produits de lubrification et de nettoyage', checked: true },
      { id: '2', actionCode: '2 - ACT269', label: 'Réparation ou remplacement si nécessaire', checked: true },
      { id: '3', actionCode: '3 - ACT270', label: 'Cabine: boutons d\'envoi, paumelles de porte', checked: true },
      { id: '4', actionCode: '4 - ACT271', label: 'Contact de porte, ferme porte automatique', checked: true },
      { id: '5', actionCode: '5 - ACT272', label: 'Coulisseaux de cabine, dispositif de sécurité', checked: true },
      { id: '6', actionCode: '6 - ACT273', label: 'De seuil et cellule photo-électrique', checked: true },
      { id: '7', actionCode: '7 - ACT274', label: 'Paliers: Ferme porte mécanique, électrique ou pneumatique, serrures électromécaniques', checked: true },
      { id: '8', actionCode: '8 - ACT275', label: 'Contacts de porte et boutons d\'appel, balai, du moteur et fusibles', checked: true },
      { id: '9', actionCode: '9 - ACT276', label: 'Entretien de l\'ameublement de la cabine', checked: true },
    ],
  },

  // 3. CAISSON AIR NEUF ANNUEL (PS-CAN-1A-01)
  {
    codeGamme: 'PS-CAN-1A-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE ANNUEL CAISSON AIR NEUF',
    equipmentPrefixId: 'BAM-HCM_AG-CAN-01',
    frequency: 'A',
    items: [
      { id: '1', actionCode: '1 - ACT146', label: 'Réglage des registres', checked: true },
      { id: '2', actionCode: '2 - ACT147', label: 'Nettoyage et dépoussiérage intérieur des caissons', checked: true },
    ],
  },

  // 4. CAISSON AIR NEUF MENSUEL (PS-CAN-1M-01)
  {
    codeGamme: 'PS-CAN-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL CAISSON AIR NEUF',
    equipmentPrefixId: 'BAM-HCM_AG-CAN-01',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT141', label: 'Vérification de l\'état des manchettes', checked: true },
      { id: '2', actionCode: '2 - ACT142', label: 'Vérification du fonctionnement des leviers des registres', checked: true },
      { id: '3', actionCode: '3 - ACT143', label: 'Contrôle du fonctionnement des servomoteurs et motoréducteurs', checked: true },
      { id: '4', actionCode: '4 - ACT144', label: 'Vérification de l\'état des poches', checked: true },
      { id: '5', actionCode: '5 - ACT148', label: 'Contrôle de la perte de charge (manomètre)', checked: true },
    ],
  },

  // 5. CAISSON AIR NEUF TRIMESTRIEL (PS-CAN-1T-01)
  {
    codeGamme: 'PS-CAN-1T-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE TRIMESTRIEL CAISSON AIR NEUF',
    equipmentPrefixId: 'BAM-HCM_AG-CAN-01',
    frequency: 'T',
    items: [
      { id: '1', actionCode: '1 - ACT145', label: 'Lubrification de la tringlerie et des axes', checked: true },
    ],
  },

  // 6. ECLAIRAGE SECOURS MENSUEL (PS-ECLSEC-1M-01)
  {
    codeGamme: 'PS-ECLSEC-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL ECLAIRAGE SECOURS',
    equipmentPrefixId: 'BAM-HCM_AG-ECLSEC',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT016', label: 'Contrôle du fonctionnement de la veilleuse en présence du secteur', checked: true },
    ],
  },

  // 7. GROUPE ELECTROGENE HEBDOMADAIRE (PS-GPLC-1H-01)
  {
    codeGamme: 'PS-GPLC-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE GROUPE ELECTROGENE',
    equipmentPrefixId: 'BAM-HCM_AG-GPLC-01',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT024', label: '[Contrôle] Niveau d\'huile', checked: true },
      { id: '2', actionCode: '2 - ACT025', label: '[Contrôle] Niveau du liquide de refroidissement', checked: true },
      { id: '3', actionCode: '3 - ACT026', label: '[Contrôle] Température du liquide de refroidissement', checked: true },
      { id: '4', actionCode: '4 - ACT027', label: '[Contrôle] Tension des batteries [ ] V', checked: true },
      { id: '5', actionCode: '5 - ACT028', label: '[Contrôle] Dispositif de charge batterie', checked: true },
      { id: '6', actionCode: '6 - ACT029', label: '[Contrôle] Nettoyage des filtres et recherche de fuites', checked: true },
      { id: '7', actionCode: '7 - ACT030', label: '[Contrôle] Purge et évacuation des condensats', checked: true },
      { id: '8', actionCode: '8 - ACT031', label: '[Contrôle] Appareils d\'automatisme et de sécurité', checked: true },
      { id: '9', actionCode: '9 - ACT032', label: '[Contrôle] Des auxiliaires (pompes, ventilateurs, etc.)', checked: true },
      { id: '10', actionCode: '10 - ACT033', label: 'Essai de fonctionnement à vide: Pression et température d\'huile', checked: true },
      { id: '11', actionCode: '11 - ACT034', label: 'Essai de fonctionnement à vide: Température liquide de refroidissement (entrée/sortie)', checked: true },
      { id: '12', actionCode: '12 - ACT035', label: 'Essai de fonctionnement à vide: Fréquence et tension du courant débité', checked: true },
    ],
  },

  // 8. GROUPE ELECTROGENE MENSUEL (PS-GPLC-1M-01)
  {
    codeGamme: 'PS-GPLC-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL GROUPE ELECTROGENE',
    equipmentPrefixId: 'BAM-HCM_AG-GPLC-01',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT036', label: 'Essai de fonctionnement en charge: Pression et température d\'huile', checked: true },
      { id: '2', actionCode: '2 - ACT037', label: 'Essai de fonctionnement en charge: Température du liquide de refroidissement (entrée/sortie)', checked: true },
      { id: '3', actionCode: '3 - ACT038', label: 'Essai de fonctionnement en charge: Fréquence et tension du courant débité', checked: true },
      { id: '4', actionCode: '4 - ACT039', label: 'Révision moteur alternateur: Visite de maintenance sur citerne de stockage.', checked: true },
    ],
  },

  // 9. MONTE CHARGE HEBDOMADAIRE (PS-MTC-1H-01)
  {
    codeGamme: 'PS-MTC-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE MONTE CHARGE',
    equipmentPrefixId: 'BAM-HCM_AG-MTC-01',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT266', label: 'Essai des appareils, dépannage et désincarcération', checked: true },
      { id: '2', actionCode: '2 - ACT267', label: 'Tenue du dossier d\'entretien de l\'appareil', checked: true },
    ],
  },

  // 10. MONTE CHARGE MENSUEL (PS-MTC-1M-01)
  {
    codeGamme: 'PS-MTC-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL MONTE CHARGE',
    equipmentPrefixId: 'BAM-HCM_AG-MTC-01',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT268', label: 'Visite périodique, nettoyage et graissage des organes mécaniques', checked: true },
      { id: '2', actionCode: '2 - ACT269', label: 'Réparation ou remplacement si nécessaire', checked: true },
      { id: '3', actionCode: '3 - ACT270', label: 'Cabine: boutons d\'envoi, paumelles de porte', checked: true },
      { id: '4', actionCode: '4 - ACT271', label: 'Contact de porte, ferme porte automatique', checked: true },
      { id: '5', actionCode: '5 - ACT272', label: 'Coulisseaux de cabine, dispositif de sécurité', checked: true },
      { id: '6', actionCode: '6 - ACT273', label: 'De seuil et cellule photo-électrique', checked: true },
      { id: '7', actionCode: '7 - ACT274', label: 'Paliers: Ferme porte mécanique, électrique ou pneumatique, serrures électromécaniques', checked: true },
      { id: '8', actionCode: '8 - ACT275', label: 'Contacts de porte et boutons d\'appel, balai, du moteur et fusibles', checked: true },
      { id: '9', actionCode: '9 - ACT276', label: 'Entretien de l\'ameublement de la cabine', checked: true },
    ],
  },

  // 11. ONDULEUR HEBDOMADAIRE (PS-OND-1H-01)
  {
    codeGamme: 'PS-OND-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE ONDULEUR',
    equipmentPrefixId: 'BAM-HCM_AG-OND',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT286', label: 'Inspection visuelle et dépoussiérage', checked: true },
      { id: '2', actionCode: '2 - ACT287', label: 'Contrôle et relevés des grandeurs électriques', checked: true },
      { id: '3', actionCode: '3 - ACT288', label: '[BATTERIES] Contrôler la durée de vie restante [Semaines]', checked: true },
      { id: '4', actionCode: '4 - ACT289', label: '[Général] Relevé de la fréquence d\'entrée [Hz]', checked: true },
      { id: '5', actionCode: '5 - ACT290', label: '[Général] Relevé de la fréquence de sortie [Hz]', checked: true },
      { id: '6', actionCode: '6 - ACT291', label: '[Général] Relevé de la température de fonctionnement [°C]', checked: true },
      { id: '7', actionCode: '7 - ACT292', label: '[Général] Relevé de la tension d\'entrée [V]', checked: true },
      { id: '8', actionCode: '8 - ACT293', label: '[Général] Relevé de la tension de sortie [V]', checked: true },
      { id: '9', actionCode: '9 - ACT294', label: '[Général] Relevé du taux de charge [%]', checked: true },
    ],
  },

  // 12. POMPE MENSUEL (PS-POMP-1M-01)
  {
    codeGamme: 'PS-POMP-1M-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE MENSUEL POMPE',
    equipmentPrefixId: 'BAM-HCM_AG-PMP',
    frequency: 'M',
    items: [
      { id: '1', actionCode: '1 - ACT063', label: 'Contrôle et relevé des intensités absorbées par Ph des moteurs', checked: true },
    ],
  },

  // 13. POSTE TRANSFO HEBDOMADAIRE (PS-PTRSF-1H-01)
  {
    codeGamme: 'PS-PTRSF-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE POSTE DE TRANSFORMATION',
    equipmentPrefixId: 'BAM-HCM_AG-PTRSF-01',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT001', label: 'Poste de transformation: Examen visuel', checked: true },
      { id: '2', actionCode: '2 - ACT002', label: 'Poste de transformation: Contrôle du voltage et de l\'ampérage', checked: true },
      { id: '3', actionCode: '3 - ACT003', label: 'Poste de transformation: Relevé des compteurs (Eng. active Heure Pleine, Pointe, Creuse)', checked: true },
      { id: '4', actionCode: '4 - ACT004', label: 'Poste de transformation: Contrôle et relevé de la puissance maximale', checked: true },
      { id: '5', actionCode: '5 - ACT005', label: 'Poste de transformation: Vérification de l\'état du matériel de sécurité (gants, tabouret, perche)', checked: true },
    ],
  },

  // 14. POSTE TRANSFO TRIMESTRIEL (PS-PTRSF-1T-01)
  {
    codeGamme: 'PS-PTRSF-1T-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE TRIMESTRIEL POSTE DE TRANSFORMATION',
    equipmentPrefixId: 'BAM-HCM_AG-PTRSF-01',
    frequency: 'T',
    items: [
      { id: '1', actionCode: '1 - ACT006', label: 'Nettoyage, dépoussiérage du local', checked: true },
      { id: '2', actionCode: '2 - ACT007', label: 'Vérification tension', checked: true },
    ],
  },

  // 15. SANITAIRE HEBDOMADAIRE (PS-SANT-1H-01)
  {
    codeGamme: 'PS-SANT-1H-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE HEBDOMADAIRE SANITAIRE',
    equipmentPrefixId: 'BAM-HCM_AG-SANT',
    frequency: 'H',
    items: [
      { id: '1', actionCode: '1 - ACT184', label: 'Contrôle fonctionnement des robinets de lavabos', checked: true },
      { id: '2', actionCode: '2 - ACT185', label: 'Contrôle fonctionnement des sèche-mains', checked: true },
      { id: '3', actionCode: '3 - ACT186', label: 'Contrôle fonctionnement des mécanismes de chasse d\'eau', checked: true },
    ],
  },

  // 16. SPLIT SYSTEM SEMESTRIEL (PS-SPT-1S-01)
  {
    codeGamme: 'PS-SPT-1S-01',
    descriptionGamme: 'PREVENTIF SYSTEMATIQUE SEMESTRIEL SPLIT SYSTEM',
    equipmentPrefixId: 'BAM-HCM_AG-SPT',
    frequency: 'S',
    items: [
      { id: '1', actionCode: '1 - ACT101', label: 'Unité intérieure: Examen général', checked: true },
      { id: '2', actionCode: '2 - ACT102', label: 'Examen du fonctionnement général', checked: true },
      { id: '3', actionCode: '3 - ACT103', label: 'Nettoyage ou échange du filtre', checked: true },
      { id: '4', actionCode: '4 - ACT104', label: 'Nettoyage de l\'évaporateur', checked: true },
      { id: '5', actionCode: '5 - ACT105', label: 'Contrôle et resserrage des connexions électriques', checked: true },
      { id: '6', actionCode: '6 - ACT106', label: 'Nettoyage du bac des condensas', checked: true },
      { id: '7', actionCode: '7 - ACT107', label: 'Recherche des fuites fréon', checked: true },
      { id: '8', actionCode: '8 - ACT108', label: 'Contrôle de la régulation', checked: true },
      { id: '9', actionCode: '9 - ACT109', label: 'Unité extérieure: Examen général', checked: true },
      { id: '10', actionCode: '10 - ACT110', label: 'Recherche des fuites fréon', checked: true },
      { id: '11', actionCode: '11 - ACT111', label: 'Resserage des connexions', checked: true },
      { id: '12', actionCode: '12 - ACT112', label: 'Contrôle système "toute saison"', checked: true },
      { id: '13', actionCode: '13 - ACT113', label: 'Graissage des organes en mouvement', checked: true },
      { id: '14', actionCode: '14 - ACT114', label: 'Contrôle et nettoyage de la batterie de condensateur', checked: true },
      { id: '15', actionCode: '15 - ACT115', label: 'Nettoyage siphon et écoulement condensas', checked: true },
      { id: '16', actionCode: '16 - ACT116', label: 'Contrôle calorifugeage tuyauterie', checked: true },
      { id: '17', actionCode: '17 - ACT117', label: 'Peinture châssis', checked: true },
      { id: '18', actionCode: '18 - ACT118', label: 'Relevé des paramètres Tension (L1/L2/L3 V)', checked: true },
      { id: '19', actionCode: '19 - ACT119', label: 'Relevé des paramètres de courant (L1/L2/L3 A)', checked: true },
      { id: '20', actionCode: '20 - ACT120', label: 'Relevé des pressions : HP, BP (Bar)', checked: true },
    ],
  },
];

/**
 * Helper to fetch exact Gamme Checklist for an equipment and frequency/task
 */
export function getGammeForEquipment(
  equipmentId: string, 
  frequency: string,
  customCatalog?: GammeOperatoire[]
): ChecklistItem[] {
  const catalog = customCatalog && customCatalog.length > 0 ? customCatalog : GAMMES_CATALOG;
  const match = catalog.find(g => {
    const matchEquipment = equipmentId.startsWith(g.equipmentPrefixId) || g.equipmentPrefixId.startsWith(equipmentId);
    return matchEquipment && g.frequency === frequency;
  });

  if (match) {
    return match.items.map(item => ({ ...item }));
  }

  // Fallback for general equipment types
  const fallbackMatch = catalog.find(g => equipmentId.includes(g.equipmentPrefixId.replace('BAM-HCM_AG-', '')));
  if (fallbackMatch) {
    return fallbackMatch.items.map(item => ({ ...item }));
  }

  // Default standard checklist
  return [
    { id: '1', actionCode: '1 - ACT001', label: 'Inspection visuelle et nettoyage de la structure', checked: true },
    { id: '2', actionCode: '2 - ACT002', label: 'Serrage des connexions électriques et contrôle des fixations', checked: true },
    { id: '3', actionCode: '3 - ACT003', label: 'Contrôle des grandeurs de fonctionnement (tension, intensité, pression)', checked: true },
    { id: '4', actionCode: '4 - ACT004', label: 'Test de sécurité et bon fonctionnement global', checked: true },
  ];
}
