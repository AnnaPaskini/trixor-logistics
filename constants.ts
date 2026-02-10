import { Box, Container, Headphones, Truck, Wrench } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { EquipmentType } from "./types";
import equipmentRaw from "./data/equipment.json";
import vacanciesRaw from "./data/vacancies.json";

const iconMap: Record<string, LucideIcon> = {
  Box,
  Container,
  Truck,
  Wrench,
  Headphones,
};

export const EQUIPMENT_DATA: EquipmentType[] = equipmentRaw.map((item) => ({
  ...item,
  icon: iconMap[item.icon] || Box,
}));

export interface VacancyData {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  location: string;
  schedule: string;
  salary: string;
  icon: LucideIcon;
  requirements: string[];
}

export const VACANCIES_DATA: VacancyData[] = vacanciesRaw.map((item) => ({
  ...item,
  icon: iconMap[item.icon] || Box,
}));
