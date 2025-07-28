'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

// Mock data - in a real app, this would come from a database or API
const mockCommands = [
  {
    id: 1,
    title: 'Create new Git branch',
    command: 'git checkout -b feature/new-feature',
    category: 'Git',
    notes: 'Creates and switches to a new branch based on current branch',
    createdAt: '2024-01-15',
    platform: 'all',
    tags: ['git', 'branch', 'version-control']
  },
  {
    id: 2,
    title: 'Start Docker container',
    command: 'docker run -d -p 3000:3000 --name myapp myimage',
    category: 'Docker',
    notes: 'Runs container in detached mode with port mapping',
    createdAt: '2024-01-14',
    platform: 'all',
    tags: ['docker', 'container', 'deployment']
  },
  {
    id: 3,
    title: 'Install npm packages',
    command: 'npm install --save-dev tailwindcss postcss autoprefixer',
    category: 'Node.js',
    notes: 'Installs Tailwind CSS as development dependencies',
    createdAt: '2024-01-13',
    platform: 'all',
    tags: ['npm', 'css', 'tailwind']
  },
  {
    id: 4,
    title: 'Create React component',
    command: 'npx create-react-app my-app --template typescript',
    category: 'React',
    notes: 'Creates new React app with TypeScript template',
    createdAt: '2024-01-12',
    platform: 'all',
    tags: ['react', 'typescript', 'create-app']
  },
  {
    id: 5,
    title: 'Database backup',
    command: 'pg_dump -U username -h localhost database_name > backup.sql',
    category: 'Database',
    notes: 'Creates PostgreSQL database backup',
    createdAt: '2024-01-11',
    platform: 'linux',
    tags: ['postgresql', 'backup', 'database']
  },
  {
    id: 6,
    title: 'Kill process by port',
    command: 'lsof -ti:3000 | xargs kill -9',
    category: 'Terminal',
    notes: 'Kills any process running on port 3000',
    createdAt: '2024-01-10',
    platform: 'macos',
    tags: ['process', 'port', 'kill']
  },
  {
    id: 7,
    title: 'Find files by name',
    command: 'find . -name "*.js" -type f',
    category: 'Terminal',
    notes: 'Finds all JavaScript files in current directory and subdirectories',
    createdAt: '2024-01-09',
    platform: 'linux',
    tags: ['find', 'search', 'files']
  },
  {
    id: 8,
    title: 'Check disk usage',
    command: 'df -h',
    category: 'System',
    notes: 'Shows disk usage in human-readable format',
    createdAt: '2024-01-08',
    platform: 'linux',
    tags: ['disk', 'system', 'monitoring']
  }
];

const categories = ['All', 'Git', 'Docker', 'Node.js', 'React', 'Database', 'Terminal', 'System', 'Build Tools', 'Testing', 'Other'];

const categoryIcons = {
  'Git': '🔀',
  'Docker': '🐋',
  'Node.js': '⚡',
  'React': '⚛️',
  'Database': '💾',
  'Terminal': '💻',
  'System': '🖥️',
  'Build Tools': '🔨',
  'Testing': '🧪',
  'Other': '🔧'
};

const categoryColors = {
  'Git': 'from-orange-500 to-orange-600',
  'Docker': 'from-blue-500 to-blue-600',
  'Node.js': 'from-green-500 to-green-600',
  'React': 'from-cyan-500 to-cyan-600',
  'Database': 'from-purple-500 to-purple-600',
  'Terminal': 'from-gray-500 to-gray-600',
  'System': 'from-indigo-500 to-indigo-600',
  'Build Tools': 'from-yellow-500 to-yellow-600',
  'Testing': 'from-red-500 to-red-600',
  'Other': 'from-gray-500 to-gray-600'
};

export default function Commands() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredCommands = mockCommands.filter(command => {
    const matchesSearch = command.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.command.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || command.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (command: string, id: number) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy command:', err);
    }
  };

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      name: category,
      count: mockCommands.filter(cmd => cmd.category === category).length
    }));
    return stats.filter(stat => stat.count > 0);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-lg p-4 sm:p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Command Vault
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  {filteredCommands.length} of {mockCommands.length} commands ready to use
                </p>
              </div>
            </div>
            <Link
              href="/add-command"
              className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-semibold text-sm sm:text-base"
            >
              <span className="mr-2 text-lg">➕</span>
              <span className="hidden sm:inline">Add New Command</span>
              <span className="sm:hidden">Add</span>
            </Link>
          </div>
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {getCategoryStats().map((stat) => (
            <div key={stat.name} className="bg-white rounded-xl p-3 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${categoryColors[stat.name as keyof typeof categoryColors]} flex items-center justify-center`}>
                  <span className="text-white text-sm">{categoryIcons[stat.name as keyof typeof categoryIcons]}</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{stat.count}</div>
                  <div className="text-xs text-gray-500 truncate">{stat.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search with Icon */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search commands, titles, notes, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white text-gray-800"
              />
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-56 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50 hover:bg-white appearance-none text-gray-800"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredCommands.map((command) => (
            <div key={command.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:scale-[1.01] relative">
              {/* Command Card Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-r ${categoryColors[command.category as keyof typeof categoryColors]} relative flex-shrink-0`}>
                      <span className="text-white text-lg sm:text-xl">{categoryIcons[command.category as keyof typeof categoryIcons]}</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">⚡</span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                        {command.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                          {command.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {command.createdAt}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {command.platform === 'all' ? 'All Platforms' : command.platform}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Add to favorites">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 transition-colors" title="Share command">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Command Block */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-3 sm:p-5 mb-4 relative group/command border border-gray-700 shadow-2xl">
                  <div className="absolute -top-2 left-4 px-2 sm:px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg border border-gray-500">
                    <span className="text-xs text-gray-200 font-mono font-semibold">⚡ command</span>
                  </div>
                  <div className="relative">
                    <code className="text-green-400 font-mono text-sm sm:text-base block pr-12 sm:pr-16 pt-4 leading-relaxed break-all">
                      {command.command}
                    </code>
                    <div className="absolute top-0 right-0 flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(command.command, command.id)}
                    className={`absolute top-3 sm:top-5 right-2 sm:right-4 p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                      copiedId === command.id
                        ? 'bg-green-600 text-white shadow-lg scale-110'
                        : 'bg-gray-700 text-gray-300 hover:text-white hover:bg-gray-600 hover:scale-110 shadow-lg'
                    }`}
                    title={copiedId === command.id ? "Copied!" : "Copy to clipboard"}
                  >
                    {copiedId === command.id ? (
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>

                  {/* Command Actions */}
                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 border-t border-gray-600">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-xs text-gray-400 font-mono">
                        {command.platform === 'all' ? '🌐 All Platforms' :
                         command.platform === 'linux' ? '🐧 Linux' :
                         command.platform === 'macos' ? '🍎 macOS' :
                         command.platform === 'windows' ? '🪟 Windows' : command.platform}
                      </span>
                      <span className="text-xs text-gray-400">
                        {command.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg hover:bg-gray-600 transition-colors"
                        title="Run command"
                      >
                        ▶️ Run
                      </button>
                      <button
                        className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-lg hover:bg-gray-600 transition-colors"
                        title="Save to favorites"
                      >
                        ⭐ Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {command.notes && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Notes
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 border border-gray-200">
                      {command.notes}
                    </p>
                  </div>
                )}

                {/* Tags */}
                {command.tags && command.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {command.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-100"
                      >
                        #{tag}
                      </span>
                    ))}
                    {command.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs rounded-full border border-gray-200">
                        +{command.tags.length - 2} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
