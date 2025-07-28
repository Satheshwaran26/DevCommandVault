'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function AddWebsite() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: '',
    tags: '',
    isBookmark: false,
    isPublic: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send the data to your API
      console.log('Website data:', formData);
      
      // Redirect to websites page
      router.push('/websites');
    } catch (error) {
      console.error('Error saving website:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Documentation',
    'Tools & Utilities',
    'Learning & Tutorials',
    'Design Resources',
    'Development Tools',
    'API Reference',
    'Cheat Sheets',
    'Online IDE',
    'Hosting & Deployment',
    'Database Tools',
    'Testing Tools',
    'Security Tools',
    'Performance Tools',
    'Other'
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🌐</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Website</h1>
              <p className="text-gray-600">Save a useful website to your vault</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Website Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="e.g., MDN Web Docs"
              />
            </div>

            {/* URL */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL *
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="https://developer.mozilla.org"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="What is this website useful for?"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="documentation, web, html, css (comma separated)"
              />
              <p className="text-xs text-gray-500 mt-1">Add tags to help organize and search your websites</p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isBookmark"
                  name="isBookmark"
                  checked={formData.isBookmark}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="isBookmark" className="text-sm text-gray-700">
                  Add to browser bookmarks
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this website public (visible to other users)
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>Save Website</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-100">
          <h3 className="text-lg font-semibold text-green-900 mb-3">💡 Tips for Better Websites</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• Use descriptive titles that clearly indicate what the website offers</li>
            <li>• Always include the full URL with https://</li>
            <li>• Add helpful descriptions explaining why this website is useful</li>
            <li>• Use tags to make your websites easily searchable</li>
            <li>• Consider categorizing websites to keep them organized</li>
            <li>• Enable bookmarking for websites you visit frequently</li>
          </ul>
        </div>

        {/* Popular Websites Suggestions */}
        <div className="mt-8 bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🔥 Popular Developer Websites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• MDN Web Docs</li>
                <li>• React Documentation</li>
                <li>• Vue.js Guide</li>
                <li>• Node.js Docs</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
              <h4 className="font-medium text-gray-900 mb-2">Tools & Utilities</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• GitHub</li>
                <li>• Stack Overflow</li>
                <li>• CodePen</li>
                <li>• JSFiddle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 