export type FrequencyType = 'H' | 'M' | 'T' | 'S' | 'A';

export type LotType = 'ÉLECTRICITÉ' | 'FLUIDE' | 'SÉCURITÉ' | 'AUTRE';

export type ExecutionStatus = 
  | 'planifie'     // Scheduled / A venir (Blue/Gray)
  | 'en_cours'     // In progress (Yellow)
  | 'conforme'     // Completed & Compliant (Green)
  | 'non_conforme' // Completed with Defect (Orange/Purple)
  | 'retard'       // Overdue (Red)
  | 'reporte';     // Rescheduled (Gray/Slate)

export interface Equipment {
  id: string;             // ID-MAT e.g. BAM-HCM_AG-PTRSF-01
  zone: string;           // NORD
  site: string;           // AL HOCEIMA AGENCE
  codeSite: string;       // BAM-HCM_AG
  description: string;    // TRANSFORMATEUR PUISSANCE: 100KVA
  lot: LotType;           // ELECTRICITE
  family: string;         // TRANFORMATEUR MOYENNE TENSION
  quantity: number;       // 1
  location?: string;      // e.g. Sous-Sol, Local Technique
  criticality?: 'Haute' | 'Moyenne' | 'Basse';
}

export interface PlannedTask {
  id: string;             // Unique ID task
  equipmentId: string;
  weekNumber: number;     // 1 to 52
  frequency: FrequencyType;
  dateStartStr: string;   // e.g. "05/01/2026"
  dateEndStr: string;     // e.g. "11/01/2026"
}

export interface ChecklistItem {
  id: string;
  label: string;
  actionCode?: string;      // e.g. "1 - ACT266", "PS-ASC-1H-01"
  category?: string;
  mandatory?: boolean;
  checked: boolean;
  comment?: string;
  valueMeasured?: string;
  expectedRange?: string;
}

export interface WorkOrderBT {
  id: string;                // e.g. BT-2026-04-001
  btNumber: string;          // Official BT reference e.g. BT-BAM-HCM-2026-0415
  equipmentId: string;
  equipmentDesc: string;
  taskCode: string;          // e.g. PS-GPLC-1H-01
  frequency: FrequencyType;
  weekNumber: number;
  monthName: string;
  status: 'GÉNÉRÉ' | 'EN_COURS' | 'EXÉCUTÉ' | 'NON_CONFORME' | 'REPORTÉ';
  creationDate: string;
  scheduledDate: string;
  technicianName: string;
  technicianRole: string;
  checklist: ChecklistItem[];
  measuredVoltage?: string;
  measuredCurrent?: string;
  measuredPressure?: string;
  measuredTemp?: string;
  measuredFrequency?: string;
  measuredLoadFactor?: string;
  observations?: string;
  correctiveAction?: string;
}

export interface ExecutionRecord {
  taskId: string;
  equipmentId: string;
  weekNumber: number;
  btNumber?: string;         // Linked BT reference
  status: ExecutionStatus;
  executionDate?: string;    // YYYY-MM-DD
  technicianName?: string;
  technicianRole?: string;
  durationMinutes?: number;
  checklist: ChecklistItem[];
  observations?: string;
  correctiveAction?: string;
  photoUrl?: string;
  measuredVoltage?: string;
  measuredCurrent?: string;
  measuredTemp?: string;
  updatedAt: string;
}

export interface WeekInfo {
  weekNumber: number;
  monthName: string;
  startDate: string;  // DD/MM
  isCurrentWeek?: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  lot: string;
  family: string;
  frequency: string;
  status: string;
  weekNumber?: number | 'all';
}

export interface GammeOperatoire {
  codeGamme: string;
  descriptionGamme: string;
  equipmentPrefixId: string; // e.g. "BAM-HCM_AG-ASC-01" or match by equipment family
  frequency: FrequencyType;
  items: ChecklistItem[];
}

export interface PlanningDatasetInfo {
  name: string;
  source: 'preset' | 'file_import' | 'manual';
  loadedAt: string;
  equipmentsCount: number;
  tasksCount: number;
  gammesCount: number;
  description: string;
}

export interface KPIStats {
  executionRate: number;      // e.g. 85%
  conformityRate: number;     // e.g. 92%
  totalPlanned: number;
  completedCount: number;
  inProgressCount: number;
  overdueCount: number;
  defectsCount: number;
  byLot: {
    electricite: { total: number; done: number; rate: number };
    fluide: { total: number; done: number; rate: number };
  };
}
