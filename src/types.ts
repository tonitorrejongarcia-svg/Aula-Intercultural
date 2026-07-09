/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ActivityStep {
  title: string;
  description: string;
  duration?: number; // duration in minutes for this specific step
}

export type ActivityCategory = 'rompehielos' | 'reflexion' | 'debate' | 'artistico';

export interface Activity {
  id: string;
  title: string;
  objective: string;
  targetGrade: string;
  duration: number; // total duration in minutes
  category: ActivityCategory;
  materials: string[];
  steps: ActivityStep[];
  keyReflectionQuestions: string[];
  isCustom?: boolean; // to differentiate user-created activities
}

export interface GlossaryTerm {
  word: string;
  definition: string;
  etymology?: string;
  pedagogicalTip?: string; // a practical tip for the teacher when using this term
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  role: string;
  activityProposal?: Partial<Activity>;
  message: string;
  date: string;
}
