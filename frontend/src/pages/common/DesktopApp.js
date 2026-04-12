import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { Desktop } from '@phosphor-icons/react';

const DesktopApp = () => {
  return (
    <ComingSoon
      title="Desktop Application"
      description="Native desktop app for Windows, macOS, and Linux. Get faster performance, offline access, and system-level integrations."
      icon={Desktop}
      iconColor="text-blue-600 dark:text-blue-400"
      iconBg="bg-blue-100 dark:bg-blue-500/10"
      estimatedLaunch="Q4 2025"
      features={[
        'Native Windows, macOS, and Linux support',
        'Offline mode for viewing jobs and resumes',
        'System tray notifications for new matches',
        'Faster performance than web version',
        'Local data caching and sync',
        'Keyboard shortcuts for power users',
        'Screen recording for application tracking',
        'Auto-updates and background sync'
      ]}
    />
  );
};

export default DesktopApp;
