import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { Buildings } from '@phosphor-icons/react';

const CustomVendorPortals = () => {
  return (
    <ComingSoon
      title="Custom Vendor Portals"
      description="Auto-apply to custom vendor portals and staffing company websites. Expand your reach beyond LinkedIn and Dice."
      icon={Buildings}
      iconColor="text-purple-600 dark:text-purple-400"
      iconBg="bg-purple-100 dark:bg-purple-500/10"
      estimatedLaunch="Q3 2025"
      features={[
        'Support for 100+ major staffing company portals',
        'Automated account creation and profile setup',
        'Smart form-filling with your profile data',
        'Auto-apply to matching positions across all portals',
        'Unified dashboard for all vendor applications',
        'Custom portal integration requests',
        'Bulk portal account management',
        'Activity tracking across all vendor sites'
      ]}
    />
  );
};

export default CustomVendorPortals;
