/**
 * Type definition for Child/Student records
 * Used throughout the application for student-related operations
 */

export interface Child {
  id: string;
  full_name: string;
  birth_date?: string;
  gender?: string;
  guardian_name?: string;
  guardian_phone?: string;
  address?: string;
  email?: string;
  health_notes?: string;
  enrollment_date?: string;
  status?: string;
  monthly_fee?: number;
  created_at?: string;
  updated_at?: string;
  educator_name?: string | null;
}
