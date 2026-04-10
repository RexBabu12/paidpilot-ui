import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { Rocket, Sparkle, Lightning, Clock } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const ComingSoon = ({ 
  title, 
  description, 
  features = [],
  icon: Icon = Rocket,
  iconColor = 'text-blue-600 dark:text-blue-400',
  iconBg = 'bg-blue-100 dark:bg-blue-500/10',
  estimatedLaunch = 'Q2 2025'
}) => {
  const { user } = useAuth();

  return (
    <DashboardLayout userType={user?.type || 'candidate'}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-24 h-24 mx-auto rounded-2xl ${iconBg} flex items-center justify-center mb-6`}
          >
            <Icon size={48} weight="duotone" className={iconColor} />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl font-outfit font-bold text-zinc-900 dark:text-zinc-50 mb-4"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-semibold mb-12 shadow-lg"
          >
            <Sparkle size={20} weight="fill" />
            <span>Coming Soon</span>
            <Lightning size={20} weight="fill" />
          </motion.div>

          {/* Features List */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 mb-8"
            >
              <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-6 flex items-center justify-center gap-2">
                <Sparkle size={20} className="text-purple-600 dark:text-purple-400" weight="fill" />
                Planned Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 mt-2 flex-shrink-0" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Estimated Launch */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
          >
            <Clock size={16} />
            <span>Estimated Launch: <span className="font-semibold">{estimatedLaunch}</span></span>
          </motion.div>

          {/* Notify Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Notify Me When Available
          </motion.button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ComingSoon;
