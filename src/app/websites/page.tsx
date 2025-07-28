'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

// Mock data - in a real app, this would come from a database or API
const mockWebsites = [
  {
    id: 1,
    name: 'React Documentation',
    url: 'https://reactjs.org/docs',
    category: 'Documentation',
    description: 'Official React documentation with guides and API reference',
    createdAt: '2024-01-15',
    isBookmark: true,
    tags: ['react', 'documentation', 'frontend']
  },
  {
    id: 2,
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    category: 'Design',
    description: 'Utility-first CSS framework for rapid UI development',
    createdAt: '2024-01-14',
    isBookmark: true,
    tags: ['css', 'design', 'framework']
  },
  {
    id: 3,
    name: 'GitHub',
    url: 'https://github.com',
    category: 'Tools',
    description: 'Version control and collaboration platform for developers',
    createdAt: '2024-01-13',
    isBookmark: true,
    tags: ['git', 'version-control', 'collaboration']
  },
  {
    id: 4,
    name: 'JSONPlaceholder',
    url: 'https://jsonplaceholder.typicode.com',
    category: 'APIs',
    description: 'Free fake API for testing and prototyping',
    createdAt: '2024-01-12',
    isBookmark: false,
    tags: ['api', 'testing', 'prototyping']
  },
  {
    id: 5,
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    category: 'Documentation',
    description: 'Comprehensive web development documentation',
    createdAt: '2024-01-11',
    isBookmark: true,
    tags: ['documentation', 'web', 'reference']
  },
  {
    id: 6,
    name: 'JavaScript Info',
    url: 'https://javascript.info',
    category: 'Learning',
    description: 'Modern JavaScript tutorial from basics to advanced',
    createdAt: '2024-01-10',
    isBookmark: false,
    tags: ['javascript', 'learning', 'tutorial']
  },
  {
    id: 7,
    name: 'Can I Use',
    url: 'https://caniuse.com',
    category: 'Tools',
    description: 'Browser compatibility tables for web technologies',
    createdAt: '2024-01-09',
    isBookmark: true,
    tags: ['browser', 'compatibility', 'tools']
  },
  {
    id: 8,
    name: 'Figma',
    url: 'https://figma.com',
    category: 'Design',
    description: 'Collaborative interface design tool',
    createdAt: '2024-01-08',
    isBookmark: false,
    tags: ['design', 'ui', 'collaboration']
  },
  {
    id: 9,
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    category: 'Learning',
    description: 'Q&A platform for developers',
    createdAt: '2024-01-07',
    isBookmark: true,
    tags: ['qa', 'learning', 'community']
  },
  {
    id: 10,
    name: 'CSS Tricks',
    url: 'https://css-tricks.com',
    category: 'Design',
    description: 'CSS tips, tricks, and techniques',
    createdAt: '2024-01-06',
    isBookmark: false,
    tags: ['css', 'design', 'tips']
  }
];

const categories = ['All', 'Documentation', 'Tools', 'Learning', 'Design', 'APIs', 'Libraries', 'Tutorials', 'Inspiration', 'Resources', 'Cheatsheets'];

const categoryIcons = {
  'Documentation': '📚',
  'Tools': '🔧',
  'Learning': '🎓',
  'Design': '🎨',
  'APIs': '🔌',
  'Libraries': '📦',
  'Tutorials': '📖',
  'Inspiration': '💡',
  'Resources': '📋',
  'Cheatsheets': '📝'
};

const categoryColors = {
  'Documentation': 'from-blue-500 to-blue-600',
  'Tools': 'from-green-500 to-green-600',
  'Learning': 'from-purple-500 to-purple-600',
  'Design': 'from-pink-500 to-pink-600',
  'APIs': 'from-orange-500 to-orange-600',
  'Libraries': 'from-indigo-500 to-indigo-600',
  'Tutorials': 'from-teal-500 to-teal-600',
  'Inspiration': 'from-yellow-500 to-yellow-600',
  'Resources': 'from-red-500 to-red-600',
  'Cheatsheets': 'from-gray-500 to-gray-600'
};

export default function Websites() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWebsites = mockWebsites.filter(website => {
    const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || website.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openWebsite = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(category => ({
      name: category,
      count: mockWebsites.filter(site => site.category === category).length
    }));
    return stats.filter(stat => stat.count > 0);
  };

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return '/default-favicon.png';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-lg p-6 border border-green-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🌐</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Website Vault
                </h1>
                <p className="text-gray-600 text-base mt-1">
                  {filteredWebsites.length} of {mockWebsites.length} websites saved
                </p>
              </div>
            </div>
            <Link
              href="/add-website"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-semibold"
            >
              <span className="mr-2 text-lg">➕</span>
              Add New Website
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
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
                placeholder="Search websites, names, descriptions, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white text-gray-800"
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
                className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all bg-gray-50 hover:bg-white appearance-none text-gray-800"
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

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-green-600 shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-green-600 shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Websites Grid/List */}
        <div className={viewMode === 'grid' ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
          {filteredWebsites.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center">
                  <div className="text-5xl transform -rotate-12">🔍</div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <div className="text-lg">🌐</div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No websites found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm || selectedCategory !== 'All' 
                  ? 'Try adjusting your search terms or selecting a different category to find what you\'re looking for.'
                  : 'Your website vault is empty. Start building your collection of useful developer websites!'
                }
              </p>
              <div className="space-y-3">
                <Link
                  href="/add-website"
                  className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-semibold"
                >
                  <span className="text-lg mr-2">➕</span>
                  Add Your First Website
                </Link>
                {searchTerm || selectedCategory !== 'All' ? (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="mt-4 text-green-600 hover:text-green-700 transition-colors flex items-center justify-center w-full font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Reset filters
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Need inspiration? Check out our popular website suggestions or browse categories above.
                  </p>
                )}
              </div>
            </div>
          ) : (
            filteredWebsites.map((website) => (
              <div key={website.id} className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:scale-[1.01] ${
                viewMode === 'list' ? 'flex items-center p-4' : ''
              }`}>
                {viewMode === 'grid' ? (
                  <div className="p-4">
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img 
                            src={getFaviconUrl(website.url)} 
                            alt={`${website.name} favicon`}
                            className="w-6 h-6"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/default-favicon.png';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors mb-1">
                            {website.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate max-w-[180px]">
                            {website.url}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {website.isBookmark && (
                          <span className="text-yellow-500 text-lg">⭐</span>
                        )}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          categoryColors[website.category as keyof typeof categoryColors].includes('blue') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('green') ? 'bg-green-50 text-green-700 border border-green-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('purple') ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('pink') ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('orange') ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('indigo') ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('teal') ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('yellow') ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('red') ? 'bg-red-50 text-red-700 border border-red-100' :
                          'bg-gray-50 text-gray-700 border border-gray-100'
                        }`}>
                          {website.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-xs leading-relaxed mb-3">
                      {website.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {website.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                      {website.tags.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{website.tags.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        {website.createdAt}
                      </span>
                      
                      <button
                        onClick={() => openWebsite(website.url)}
                        className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200 text-xs font-semibold"
                      >
                        <span>Visit</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center w-full">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mr-4">
                      <img 
                        src={getFaviconUrl(website.url)} 
                        alt={`${website.name} favicon`}
                        className="w-8 h-8"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/default-favicon.png';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                          {website.name}
                        </h3>
                        {website.isBookmark && (
                          <span className="text-yellow-500 text-base">⭐</span>
                        )}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          categoryColors[website.category as keyof typeof categoryColors].includes('blue') ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('green') ? 'bg-green-50 text-green-700 border border-green-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('purple') ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('pink') ? 'bg-pink-50 text-pink-700 border border-pink-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('orange') ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('indigo') ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('teal') ? 'bg-teal-50 text-teal-700 border border-teal-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('yellow') ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' :
                          categoryColors[website.category as keyof typeof categoryColors].includes('red') ? 'bg-red-50 text-red-700 border border-red-100' :
                          'bg-gray-50 text-gray-700 border border-gray-100'
                        }`}>
                          {website.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-1">{website.url}</p>
                      <p className="text-gray-600 text-xs">{website.description}</p>
                    </div>
                    <div className="flex items-center space-x-3 ml-4">
                      <span className="text-xs text-gray-500">
                        {website.createdAt}
                      </span>
                      <button
                        onClick={() => openWebsite(website.url)}
                        className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105 duration-200 text-xs font-semibold"
                      >
                        <span>Visit</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
