import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const NewsArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch articles from backend API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/feature/get-news'); // Replace with your actual backend API endpoint
        const data = await res.json();
        setArticles(data.items); // Adjust based on your response structure
        setLoading(false);
      } catch (err) {
        toast.error(err.message || 'Failed to load articles');
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading articles...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Latest Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <a
            href={article.newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-200"
          >
            <img
              src={article.images.thumbnailProxied}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{article.snippet}</p>
              <div className="text-gray-500 text-xs flex justify-between">
                <span>{article.publisher}</span>
                <span>{new Date(parseInt(article.timestamp)).toLocaleDateString()}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
