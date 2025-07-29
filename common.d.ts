export interface Response<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Role {
  id: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export interface RoleRate {
  id: string;
  intermediate_rate: number;
  advanced_rate: number;
  expert_rate: number;
  roles: Role;
  regions: Region;
}

export interface Workload {
  value: string;
  label: string;
  percentage: number;
}

export interface Duration {
  value: string;
  label: string;
  discount: number;
}

export interface ISwatTeamPDF {
  role: string;
  workload: string;
  duration: string;
  baseRate: number;
  discount: number;
  finalRate: number;
  selectedWorkload: Workload | undefined;
  selectedDuration: Duration | undefined;
}

export interface ICustomResourcePDF {
  role: string;
  region: string;
  seniority: string;
  monthlyRate: number | undefined;
  selectedRate: RoleRate | undefined;
}
