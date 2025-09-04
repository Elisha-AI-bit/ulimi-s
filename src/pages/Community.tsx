import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, Heart, Reply, Plus, User } from 'lucide-react';
import { demoForumPosts, demoUsers } from '../data/demoData';
import { format } from 'date-fns';

const Community: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState(demoForumPosts);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Crops', 'Marketplace', 'Weather', 'Tips', 'Equipment'];

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'Crops'
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      id: `post_${Date.now()}`,
      userId: user!.id,
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      replies: [],
      createdAt: new Date().toISOString()
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'Crops' });
    setShowNewPostForm(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getUserName = (userId: string) => {
    return demoUsers.find(u => u.id === userId)?.name || 'Unknown User';
  };

  const getUserRole = (userId: string) => {
    return demoUsers.find(u => u.id === userId)?.role || 'user';
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect with fellow farmers and share knowledge</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
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

      {/* New Post Form */}
      {showNewPostForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
          <form onSubmit={handleSubmitPost} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                {categories.filter(c => c !== 'All').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="What's your question or topic?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Share your thoughts, questions, or experiences..."
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Post
              </button>
              <button
                type="button"
                onClick={() => setShowNewPostForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Forum Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{getUserName(post.userId)}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="capitalize">{getUserRole(post.userId)}</span>
                    <span>•</span>
                    <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
            <p className="text-gray-700 mb-4">{post.content}</p>
            
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleLikePost(post.id)}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Heart className="h-4 w-4" />
                <span>{post.likes} Likes</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Reply className="h-4 w-4" />
                <span>{post.replies.length} Replies</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <MessageSquare className="h-4 w-4" />
                <span>Reply</span>
              </button>
            </div>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="mt-6 pl-6 border-l-2 border-gray-200 space-y-4">
                {post.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-900">{getUserName(reply.userId)}</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(reply.createdAt), 'MMM dd, yyyy')}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">{reply.content}</p>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-600 transition-colors text-xs mt-2">
                      <Heart className="h-3 w-3" />
                      <span>{reply.likes}</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600">Be the first to start a discussion in this category!</p>
        </div>
      )}
    </div>
  );
};

export default Community;