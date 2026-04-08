import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 mb-2">
            {title}
          </p>
          <p className="text-3xl font-semibold font-outfit text-zinc-900 dark:text-zinc-50">
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-2 ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 flex items-center justify-center">
            <Icon size={24} className="text-blue-600 dark:text-blue-400" weight="duotone" />
          </div>
        )}
      </div>
    </motion.div>
  );
};