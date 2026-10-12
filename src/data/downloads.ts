import sifuImage from "@/assets/downloads/sifu-140x140.webp";

export interface DownloadItem {
  id: string;
  name: string;
  imageUrl: string;
  downloadLink: string;
  description: string;
  category: 'Desktop Drivers' | 'Android Apps' | 'PDFs' | 'Other';
}

export const downloads: DownloadItem[] = [
  // Example Desktop Driver
  {
    id: '1',
    name: 'NVIDIA GeForce Game Ready Driver',
    imageUrl: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=NVIDIA+GeForce+logo+modern+dark+background&image_size=landscape_16_9',
    downloadLink: 'https://www.nvidia.com/Download/index.aspx',
    description: 'Optimize your gaming experience with the latest NVIDIA drivers.',
    category: 'Desktop Drivers',
  },
  // Example Android App
  {
    id: '2',
    name: 'Spotify Premium MOD APK',
    imageUrl: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=Spotify+logo+app+icon+music+streaming&image_size=square',
    downloadLink: 'https://example.com/spotify-mod-apk',
    description: 'Listen to music ad-free with Spotify Premium features.',
    category: 'Android Apps',
  },
  // SIFU Mobile
  {
    id: 'sifu-mobile',
    name: 'SIFU Mobile',
    imageUrl: sifuImage,
    downloadLink: 'https://apkvision.org/games/action/sifu-134807/download/v1.0.254260-apk/',
    description: 'Devenez un maître du Kung Fu dans ce jeu d\'action intense, maintenant sur mobile.',
    category: 'Android Apps',
  },
  // Example PDF
  {
    id: '3',
    name: 'Getting Started with React Guide',
    imageUrl: 'https://core-normal.traeapi.us/api/ide/v1/text_to_image?prompt=React+JS+logo+coding+programming+guide&image_size=landscape_16_9',
    downloadLink: 'https://react.dev/learn/start-a-new-react-project',
    description: 'A comprehensive guide to kickstart your React journey.',
    category: 'PDFs',
  },
];
