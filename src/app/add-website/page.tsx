'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Link from 'next/link';

interface FormData {
  title: string;
  url: string;
  description: string;
  category: string;
  isBookmarked: boolean;
  tags: string;
  isPublic: boolean;
}

export default function AddWebsite() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    url: '',
    description: '',
    category: '',
    isBookmarked: true,
    tags: '',
    isPublic: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generateWebsiteInfo = async (url: string) => {
    if (!url.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD-DL6LN1SvF6_R_uqXZKxrB1SXA82Z9RU', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze this website URL and provide a JSON response with the following structure:
{
  "title": "A clear, descriptive title for the website",
  "description": "A brief explanation of what this website is about",
  "category": "One of: Documentation, Design, Tools, APIs, Learning, Community, Resources, Other",
  "tags": "comma-separated tags for the website"
}

Website URL: ${url}

Respond only with the JSON object, no additional text.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate website info');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const generatedInfo = JSON.parse(jsonMatch[0]);
        
        setFormData(prev => ({
          ...prev,
          title: generatedInfo.title || prev.title,
          description: generatedInfo.description || prev.description,
          category: generatedInfo.category || prev.category,
          tags: generatedInfo.tags || prev.tags,
        }));
      }
    } catch (error) {
      console.error('Error generating website info:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, url: value }));
    
    // Auto-generate info when URL is pasted or typed
    if (value.trim() && !formData.title && !formData.description) {
      // Debounce the API call
      const timeoutId = setTimeout(() => {
        generateWebsiteInfo(value);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send the data to your backend
      console.log('Website data:', formData);
      
      // Redirect to websites page
      router.push('/websites');
    } catch (error) {
      console.error('Error saving website:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const popularWebsites = [
    { name: 'React Documentation', category: 'Documentation' },
    { name: 'Tailwind CSS', category: 'Design' },
    { name: 'GitHub', category: 'Tools' },
    { name: 'MDN Web Docs', category: 'Documentation' },
    { name: 'Stack Overflow', category: 'Learning' },
    { name: 'Figma', category: 'Design' },
    { name: 'Can I Use', category: 'Tools' },
    { name: 'JSONPlaceholder', category: 'APIs' },
    { name: 'JavaScript Info', category: 'Learning' },
  ];

  const handlePopularWebsiteClick = (website: { name: string; category: string }) => {
    setFormData(prev => ({
      ...prev,
      title: website.name,
      category: website.category,
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Add New Website
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Save your favorite websites for quick access. Organize them with categories, tags, and descriptions.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 border-b border-gray-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center">
              <span className="mr-3 text-2xl">🌐</span>
              Website Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
            {/* URL Input */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL * <span className="text-xs text-gray-500">(AI will auto-generate title and description)</span>
              </label>
              <input
                type="url"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleUrlChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                placeholder="https://reactjs.org/docs"
                required
              />
              {isGenerating && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AI is analyzing the website...
                </div>
              )}
            </div>

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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                placeholder="e.g., React Documentation"
                required
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                placeholder="What is this website about?"
              />
            </div>

            {/* Category and Bookmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Design">Design</option>
                  <option value="Tools">Tools</option>
                  <option value="APIs">APIs</option>
                  <option value="Learning">Learning</option>
                  <option value="Community">Community</option>
                  <option value="Resources">Resources</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="isBookmarked" className="block text-sm font-medium text-gray-700 mb-2">
                  Bookmark Status
                </label>
                <select
                  id="isBookmarked"
                  name="isBookmarked"
                  value={formData.isBookmarked ? 'true' : 'false'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                >
                  <option value="true">Bookmarked</option>
                  <option value="false">Not Bookmarked</option>
                </select>
              </div>
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all text-gray-800"
                placeholder="react, documentation, frontend (comma separated)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate tags with commas
              </p>
            </div>

            {/* Public/Private Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Visibility</h3>
                <p className="text-xs text-gray-500">Make this website public or keep it private</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {formData.isPublic ? 'Public' : 'Private'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">💾</span>
                    Save Website
                  </div>
                )}
              </button>
              <Link
                href="/websites"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Popular Websites Section */}
        <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-green-100">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2 text-xl">⭐</span>
            Popular Website Suggestions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {popularWebsites.map((website) => (
              <button
                key={website.name}
                onClick={() => handlePopularWebsiteClick(website)}
                className="text-left p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-500 text-sm sm:text-base">🌐</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 group-hover:text-green-600 transition-colors truncate">
                      {website.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {website.category}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 