import nvidiaImage from "@/assets/downloads/nvidia-drivers.jpg";
import amdImage from "@/assets/downloads/amd-drivers.jpg";
import intelImage from "@/assets/downloads/intel-drivers.jpg";

export interface DownloadItem {
  id: string;
  name: string;
  imageUrl: string;
  downloadLink: string;
  description: string;
  category: 'Desktop Drivers' | 'Android Apps' | 'PDFs' | 'Other';
}

// Uniquement des liens officiels d'éditeurs : aucun APK modifié ni miroir tiers.
export const downloads: DownloadItem[] = [
  {
    id: 'nvidia-drivers',
    name: 'Pilotes NVIDIA GeForce',
    imageUrl: nvidiaImage,
    downloadLink: 'https://www.nvidia.com/fr-fr/drivers/',
    description: 'Pilotes officiels NVIDIA pour cartes graphiques GeForce et RTX.',
    category: 'Desktop Drivers',
  },
  {
    id: 'amd-drivers',
    name: 'Pilotes AMD Radeon',
    imageUrl: amdImage,
    downloadLink: 'https://www.amd.com/fr/support/download/drivers.html',
    description: 'Pilotes officiels AMD Adrenalin pour cartes graphiques et chipsets Radeon / Ryzen.',
    category: 'Desktop Drivers',
  },
  {
    id: 'intel-drivers',
    name: 'Pilotes Intel',
    imageUrl: intelImage,
    downloadLink: 'https://www.intel.fr/content/www/fr/fr/support/detect.html',
    description: "Intel Driver & Support Assistant : détection et mise à jour automatique des pilotes Intel.",
    category: 'Desktop Drivers',
  },
];
