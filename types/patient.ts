/**
 * Patient Data Structure
 * Represents active patients in the system
 */

export type PatientStatus = 'new' | 'active' | 'inactive' | 'former';

export type CareplanStatus = 'not-started' | 'active' | 'completed' | 'paused';

export interface Patient {
  // IDs across systems
  id: string;                    // Our internal ID
  chiroHdPatientId: string;      // ChiroHD patient ID (required once patient)
  ghlContactId?: string;         // Go High Level contact ID

  // Personal info
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  birthDate?: string;            // ISO date string

  // Patient status
  status: PatientStatus;
  careplanStatus: CareplanStatus;

  // Visit tracking
  visitCount: number;
  firstVisitDate?: string;       // ISO date string
  lastVisitDate?: string;        // ISO date string

  // Clinical info
  primaryCondition?: string;
  conditions?: string[];         // Multiple conditions
  isPregnant?: boolean;

  // Practice metrics
  opa?: number;                  // Office visit average for this patient

  // Timestamps
  createdAt: string;             // When record created
  updatedAt: string;             // Last update
  inactiveSince?: string;        // When became inactive

  // Source tracking
  originalLeadSource?: string;
  referredBy?: string;

  // Tags for campaigns
  tags?: string[];               // GHL tags for targeting
}

/**
 * Calculate if patient is inactive (based on last visit)
 */
export function isPatientInactive(
  patient: Patient,
  inactiveDays: number = 30
): boolean {
  if (!patient.lastVisitDate) return true;

  const lastVisit = new Date(patient.lastVisitDate);
  const daysSinceVisit = Math.floor(
    (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
  );

  return daysSinceVisit >= inactiveDays;
}

/**
 * Convert Lead to Patient (when first visit completed)
 */
export function leadToPatient(
  lead: any,
  chiroHdPatientId: string,
  firstVisitDate: string
): Patient {
  return {
    id: lead.id,
    chiroHdPatientId,
    ghlContactId: lead.ghlContactId,

    firstName: lead.firstName || '',
    lastName: lead.lastName || '',
    email: lead.email,
    phone: lead.phone,
    birthDate: lead.birthDate,

    status: 'new',
    careplanStatus: 'not-started',

    visitCount: 1,
    firstVisitDate,
    lastVisitDate: firstVisitDate,

    primaryCondition: lead.condition || lead.specificCondition,
    conditions: lead.condition ? [lead.condition] : [],
    isPregnant: lead.isPregnant,

    createdAt: lead.createdAt,
    updatedAt: new Date().toISOString(),

    originalLeadSource: lead.source,

    tags: lead.tags || [],
  };
}
