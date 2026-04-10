import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { Robot } from '@phosphor-icons/react';

const AutoApplyDice = () => {
  return (
    <ComingSoon
      title="Auto Apply on Dice"
      description="Automatically apply to matching jobs on Dice.com based on your skills, preferences, and criteria. Save hours of manual applications."
      icon={Robot}
      iconColor="text-orange-600 dark:text-orange-400"
      iconBg="bg-orange-100 dark:bg-orange-500/10"
      estimatedLaunch="Q2 2025"
      features={[
        'One-click auto-apply to all matching Dice jobs',
        'Smart filtering based on your resume and preferences',
        'Custom cover letter generation for each application',
        'Real-time application status tracking',
        'Daily application limits and scheduling',
        'Automatic follow-up emails',
        'Integration with your Resume Lab versions',
        'Detailed analytics on application success rates'
      ]}
    />
  );
};

export default AutoApplyDice;
