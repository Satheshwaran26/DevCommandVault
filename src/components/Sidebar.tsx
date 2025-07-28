'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '🏠' },
  { name: 'Add Command', href: '/add-command', icon: '⚡' },
  { name: 'Add Website', href: '/add-website', icon: '🌐' },
  { name: 'Commands', href: '/commands', icon: '📝' },
  { name: 'Websites', href: '/websites', icon: '🔗' },
];

export default function Sidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-64 bg-white min-h-screen border-r border-gray-200 flex-shrink-0">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 font-medium">Menu</h2>
        </div>
        <nav className="space-y-1.5">
          {navigation.map((item) => {
            const isActive = isMounted && pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-600'
                }`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Pro Badge */}
        <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-800">Free Plan</span>
            <span className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
              Basic
            </span>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Upgrade to Pro for more features and storage!
          </p>
          <button className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
