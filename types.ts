import { LucideIcon } from "lucide-react";

export interface EquipmentType {
  id: string;
  name: string;
  subtitle: string;
  volume: string;
  payload: string;
  height: string;
  features: string[];
  idealFor: string[];
  icon: LucideIcon;
}

export interface Lane {
  id: string;
  from: string;
  to: string;
  fromFlag: string;
  toFlag: string;
  frequency: string;
}

export interface Stat {
  value: string;
  label: string;
  subLabel?: string;
}
export interface Vacancy {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  location: string;
  schedule: string;
  icon: any;
  requirements: string[];
}