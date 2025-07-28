import Link from 'next/link';
import Layout from '@/components/Layout';

const dashboardCards = [
  {
    title: 'Saved Commands',
    description: 'View and manage your saved developer commands',
    icon: '⚡',
    href: '/commands',
    count: '12', // This would be dynamic in a real app
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Saved Websites',
    description: 'Access your collection of useful developer websites',
    icon: '🌐',
    href: '/websites',
    count: '8', // This would be dynamic in a real app
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Add New',
    description: 'Add new commands or websites to your vault',
    icon: '➕',
    href: '/add-command',
    count: '',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to DevCommandVault
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal vault for storing and organizing developer commands and useful websites.
            Keep your most-used tools at your fingertips.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group block transform transition-all duration-200 hover:scale-105"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${card.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {card.icon}
                  </div>
                  {card.count && (
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">{card.count}</div>
                      <div className="text-sm text-gray-500">items</div>
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {card.description}
                </p>
                
                <div className="mt-6 flex items-center text-blue-600 font-medium">
                  <span>Explore</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Total Commands</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">8</div>
              <div className="text-gray-600">Saved Websites</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
