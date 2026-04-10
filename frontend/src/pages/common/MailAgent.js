import React from 'react';
import ComingSoon from '../../components/ComingSoon';
import { EnvelopeOpen } from '@phosphor-icons/react';

const MailAgent = () => {
  return (
    <ComingSoon
      title="Mail Agent"
      description="AI-powered email assistant that monitors your Gmail 24/7, automatically responds to recruiter emails, and manages your job search correspondence."
      icon={EnvelopeOpen}
      iconColor="text-emerald-600 dark:text-emerald-400"
      iconBg="bg-emerald-100 dark:bg-emerald-500/10"
      estimatedLaunch="Q3 2025"
      features={[
        'Gmail integration with real-time monitoring',
        'AI-powered auto-replies to recruiter emails',
        'Smart email categorization (job leads vs spam)',
        'Automatic follow-up scheduling',
        'Email sentiment analysis',
        'Priority inbox for high-value opportunities',
        'Template library for common responses',
        'Email analytics and response rate tracking'
      ]}
    />
  );
};

export default MailAgent;
