export type AgreementStatus = 'not_started' | 'in_progress' | 'stuck' | 'sj_review' | 'completed';

export interface Agreement {
  id: string;
  element: string;
  responsible: string;
  status: AgreementStatus;
  requestDate: string;
  deliveryDate: string;
  description: string;
  sjRequest: string;
  sjStatus: AgreementStatus;
  deliverable?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'assistant' | 'user';
}