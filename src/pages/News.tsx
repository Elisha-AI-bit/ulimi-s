import React, { useState } from 'react';
import { Clock, User, Tag } from 'lucide-react';
import { demoNews } from '../data/demoData';
import { format } from 'date-fns';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Government', 'Market', 'Weather', 'Technology', 'Tips'];

  const filteredNews = selectedCategory === 'All' 
    ? demoNews 
    : demoNews.filter(news => news.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Agricultural News</h1>
        <p className="text-gray-600">Stay updated with the latest in Zambian agriculture</p>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* News Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNews.map((article) => (
          <article key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-emerald-600">{article.category}</span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                {article.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Featured News Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Latest Agricultural Updates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-medium mb-2">🌾 Harvest Season Update</h4>
            <p className="text-emerald-100 text-sm">
              This year's maize harvest is expected to exceed targets by 15% across most provinces.
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h4 className="font-medium mb-2">💧 Irrigation Schemes</h4>
            <p className="text-emerald-100 text-sm">
              New irrigation infrastructure projects launched in Eastern and Southern provinces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;