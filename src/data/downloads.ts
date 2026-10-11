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
    imageUrl: 'https://images.nvidia.com/geforce-experience/misc/geforce-logo-2.png',
    downloadLink: 'https://www.nvidia.com/Download/index.aspx',
    description: 'Optimize your gaming experience with the latest NVIDIA drivers.',
    category: 'Desktop Drivers',
  },
  // Example Android App
  {
    id: '2',
    name: 'Spotify Premium MOD APK',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png',
    downloadLink: 'https://example.com/spotify-mod-apk',
    description: 'Listen to music ad-free with Spotify Premium features.',
    category: 'Android Apps',
  },
  // Example PDF
  {
    id: '3',
    name: 'Getting Started with React Guide',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
    downloadLink: 'https://react.dev/learn/start-a-new-react-project',
    description: 'A comprehensive guide to kickstart your React journey.',
    category: 'PDFs',
  },
];
