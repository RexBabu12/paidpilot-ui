import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import {
  MagnifyingGlass, Eye, X, UsersThree, Briefcase, CurrencyDollar, ChartLineUp, ArrowUp
} from '@phosphor-icons/react';
import { mockAdminCustomers } from '../../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const planColors = {
  'Enterprise': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
  'Professional': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
  'Starter': 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
};

const statusColors = {
  'Active': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Trial': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Churned': 'bg-red-500/10 text-red-600 dark:text-red-400'
};

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const totalUsers = mockAdminCustomers.reduce((s, c) => s + c.users, 0);
  const totalCandidates = mockAdminCustomers.reduce((s, c) => s + c.candidates, 0);
  const totalRevenue = mockAdminCustomers.reduce((s, c) => s + c.monthlySpend, 0);
  const totalPlacements = mockAdminCustomers.reduce((s, c) => s + c.placements, 0);

  const filteredCustomers = mockAdminCustomers.filter(c =>
    !searchTerm || c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout userType="admin">
      <div className="max-w-[1600px] mx-auto" data-testid="admin-customers-page">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6">
          <h1 className="text-4xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50 mb-1">Customers</h1>
          <p className="text-zinc-600 dark:text-zinc-400">{mockAdminCustomers.length} registered organizations</p>
        </motion.div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Total Users', value: totalUsers, icon: UsersThree, color: 'bg-blue-600' },
            { title: 'Total Candidates', value: totalCandidates, icon: Briefcase, color: 'bg-emerald-600' },
            { title: 'MRR', value: `$${totalRevenue.toLocaleString()}`, icon: CurrencyDollar, color: 'bg-purple-600' },
            { title: 'Total Placements', value: totalPlacements, icon: ChartLineUp, color: 'bg-amber-600' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={20} weight="duotone" className="text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 max-w-md">
          <div className="relative">
            <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type="text" placeholder="Search customers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600" data-testid="customer-search" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="customers-table">
              <thead className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Company</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Plan</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Status</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Users</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Candidates</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Submissions</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Placements</th>
                  <th className="text-right px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">MRR</th>
                  <th className="text-center px-5 py-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors" data-testid={`customer-row-${customer.id}`}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{customer.company}</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Joined {customer.joinedDate} | Active {customer.lastActive}</p>
                    </td>
                    <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 text-xs font-medium rounded ${planColors[customer.plan] || ''}`}>{customer.plan}</span></td>
                    <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 text-xs font-medium rounded ${statusColors[customer.status] || ''}`}>{customer.status}</span></td>
                    <td className="px-5 py-4 text-center text-sm font-medium text-zinc-900 dark:text-zinc-50">{customer.users}</td>
                    <td className="px-5 py-4 text-center text-sm text-zinc-700 dark:text-zinc-300">{customer.candidates}</td>
                    <td className="px-5 py-4 text-center text-sm text-zinc-700 dark:text-zinc-300">{customer.submissions}</td>
                    <td className="px-5 py-4 text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">{customer.placements}</td>
                    <td className="px-5 py-4 text-right text-sm font-semibold text-zinc-900 dark:text-zinc-50">${customer.monthlySpend.toLocaleString()}</td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => setSelectedCustomer(customer)} className="p-1.5 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded" data-testid={`view-customer-${customer.id}`}><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Detail Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto" data-testid="customer-detail-modal">
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-outfit font-semibold text-zinc-900 dark:text-zinc-50">{selectedCustomer.company}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${planColors[selectedCustomer.plan]}`}>{selectedCustomer.plan}</span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${statusColors[selectedCustomer.status]}`}>{selectedCustomer.status}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedCustomer(null)} className="p-1 text-zinc-400 hover:text-zinc-600" data-testid="close-customer-modal"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-5">
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedCustomer.users}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Users</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-50">{selectedCustomer.candidates}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Candidates</p>
                  </div>
                  <div className="p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{selectedCustomer.placements}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Placements</p>
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-2">Usage Overview</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[11px] text-zinc-500">Total Submissions</p><p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{selectedCustomer.submissions}</p></div>
                    <div><p className="text-[11px] text-zinc-500">Monthly Spend</p><p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">${selectedCustomer.monthlySpend.toLocaleString()}</p></div>
                    <div><p className="text-[11px] text-zinc-500">Joined</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCustomer.joinedDate}</p></div>
                    <div><p className="text-[11px] text-zinc-500">Last Active</p><p className="text-sm text-zinc-900 dark:text-zinc-50">{selectedCustomer.lastActive}</p></div>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase font-bold text-zinc-500 dark:text-zinc-400 mb-3">Team Members</p>
                  <div className="space-y-2">
                    {selectedCustomer.contacts.map((contact, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 px-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{contact.name}</p>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{contact.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{contact.role}</span>
                          <p className="text-[10px] text-zinc-400">Last login: {contact.lastLogin}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminCustomers;
