import { Box, Container, Headphones, Truck, Wrench } from "lucide-react";
import { EquipmentType, Lane, Stat, Vacancy } from "./types";

export const EQUIPMENT_DATA: EquipmentType[] = [
  {
    id: 'standard',
    name: 'STANDARD',
    subtitle: 'Curtain-Sided Trailer',
    volume: '90 m³',
    payload: '24 t',
    height: '2.7 m',
    features: ['13.6m Length', 'Side/Roof Loading', 'XL Certificate'],
    idealFor: ['Palletized cargo', 'Industrial goods', 'General freight'],
    icon: Box
  },
  {
    id: 'mega',
    name: 'MEGA',
    subtitle: 'Low-Deck Trailer',
    volume: '100 m³',
    payload: '24 t',
    height: '3.0 m',
    features: ['13.6m Length', 'Lifting Roof', 'Automotive Spec'],
    idealFor: ['Automotive parts', 'Volume cargo', 'Tall machinery'],
    icon: Container
  },
  {
    id: 'bulk',
    name: 'BULK',
    subtitle: 'Moving Floor Trailer',
    volume: '92 m³',
    payload: '24 t',
    height: 'Variable',
    features: ['Hydraulic Floor', 'Walking Floor', 'Rear/Top Load'],
    idealFor: ['Biomass & wood', 'Loose bulk', 'Recyclables'],
    icon: Truck
  }
];

export const LANES_DATA: Lane[] = [
  { id: '1', from: 'Czech Republic', to: 'Germany', fromFlag: '🇨🇿', toFlag: '🇩🇪', frequency: 'Daily' },
  { id: '2', from: 'Czech Republic', to: 'Austria', fromFlag: '🇨🇿', toFlag: '🇦🇹', frequency: 'Daily' },
  { id: '3', from: 'Austria', to: 'Hungary', fromFlag: '🇦🇹', toFlag: '🇭🇺', frequency: '3x Weekly' },
  { id: '4', from: 'Germany', to: 'Czech Republic', fromFlag: '🇩🇪', toFlag: '🇨🇿', frequency: 'Daily' },
];

export const STATS_DATA: Stat[] = [
  { value: '55+', label: 'Fleet Units', subLabel: 'Owned Assets' },
  { value: '10', label: 'Walking Floors', subLabel: 'Specialized' },
  { value: '1M+', label: 'Shipments', subLabel: 'Delivered Safely' },
  { value: '99%', label: 'On-Time', subLabel: 'Delivery Rate' },
  { value: '24/7', label: 'Dispatch', subLabel: 'Support' },
];
export const VACANCIES_DATA: Vacancy[] = [
  {
    id: 'driver',
    title: 'Driver C+E',
    subtitle: 'International Transport',
    image: '/trixor/images/Driver1.png',
    location: 'Czech Republic / EU',
    schedule: 'Full-time',
    icon: Truck,
    requirements: [
      'Valid CE driving license',
      'Minimum 2 years experience',


    ],
  },
  {
    id: 'mechanic',
    title: 'Mechanic',
    subtitle: 'Truck Service',
    image: '/trixor/images/Mechanik2.png',
    location: 'Mladá Boleslav, CZ',
    schedule: 'Full-time',
    icon: Wrench,
    requirements: [
      'Experience with heavy vehicles',
      'Diagnostic equipment knowledge',
      'Welding skills preferred',
      'Driving license B (C preferred)'
    ],
  },
  {
    id: 'dispatcher',
    title: 'Dispatcher',
    subtitle: 'Transport Coordination',
    image: '/trixor/images/Dispatcher1.png',
    location: 'Prague, CZ',
    schedule: 'Full-time',
    icon: Headphones,
    requirements: [
      'Fluent English + German or Russian',
      'Experience in logistics',
      'Strong communication skills',
      'Flexible schedule availability',
      'Nationality Chinese + German or Russian',
      'Experience in logistics',
      'Strong communication skills',
      'Flexible schedule availability'
    ],
  },
];