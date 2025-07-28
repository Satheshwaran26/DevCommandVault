'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const [recentCommands] = useState([
    { id: 1, title: 'Install React Router', command: 'npm install react-router-dom', category: 'Package Management', createdAt: '2 hours ago' },
    { id: 2, title: 'Git Status Check', command: 'git status', category: 'Git', createdAt: '1 day ago' },
    { id: 3, title: 'Docker Build', command: 'docker build -t myapp .', category: 'Docker', createdAt: '2 days ago' },
  ]);

  const [recentWebsites] = useState([
    { id: 1, name: 'React Documentation', url: 'https://reactjs.org/docs', category: 'Documentation', createdAt: '1 hour ago' },
    { id: 2, name: 'Tailwind CSS', url: 'https://tailwindcss.com', category: 'Design', createdAt: '3 hours ago' },
    { id: 3, name: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Documentation', createdAt: '1 day ago' },
  ]);

  const stats = [
    { name: 'Total Commands', value: '24', change: '+12%', changeType: 'positive', icon: '⚡' },
    { name: 'Saved Websites', value: '18', change: '+8%', changeType: 'positive', icon: '🌐' },
    { name: 'Categories', value: '8', change: '+2', changeType: 'neutral', icon: '📁' },
    { name: 'This Week', value: '6', change: '+3', changeType: 'positive', icon: '📈' },
  ];

  const quickActions = [
    { name: 'Add Command', href: '/add-command', icon: '⚡', color: 'blue' },
    { name: 'Add Website', href: '/add-website', icon: '🌐', color: 'green' },
    { name: 'View Commands', href: '/commands', icon: '📝', color: 'purple' },
    { name: 'View Websites', href: '/websites', icon: '🔗', color: 'orange' },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your developer toolkit.</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Last updated: Just now</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="group flex flex-col items-center p-4 rounded-lg border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
              >
                <div className={`w-12 h-12 bg-gradient-to-r from-${action.color}-50 to-${action.color}-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Commands */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Commands</h2>
              <Link href="/commands" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentCommands.map((command) => (
                <div key={command.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm">⚡</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{command.title}</h3>
                    <p className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded mt-1 truncate">
                      {command.command}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded-full">
                        {command.category}
                      </span>
                      <span className="text-xs text-gray-500">{command.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Websites */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Websites</h2>
              <Link href="/websites" className="text-sm text-green-600 hover:text-green-700 font-medium">
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentWebsites.map((website) => (
                <div key={website.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm">🌐</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{website.name}</h3>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {website.url}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 rounded-full">
                        {website.category}
                      </span>
                      <span className="text-xs text-gray-500">{website.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro Tip</h3>
              <p className="text-gray-700 mb-3">
                Use the AI-powered auto-generation feature when adding commands and websites. 
                Just paste your command or URL, and let our AI fill in the details for you!
              </p>
              <div className="flex space-x-3">
                <Link
                  href="/add-command"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  Try Add Command
                </Link>
                <Link
                  href="/add-website"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Try Add Website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
