'use client'

import { useState } from 'react'
import { Calendar, Clock, User, Tag, Search, Filter, ArrowRight } from 'lucide-react'

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const tags = [
    { id: 'all', name: '全部' },
    { id: 'tutorial', name: '教程' },
    { id: 'update', name: '更新日志' },
    { id: 'news', name: '新闻' },
    { id: 'tips', name: '技巧' },
  ]

  const posts = [
    {
      id: 1,
      title: 'Vibe AI 2.0 发布 - 全新架构，更强性能',
      excerpt: '我们很高兴宣布 Vibe AI 2.0 正式发布！这次更新带来了全新的架构设计，性能提升 300%，新增了 50+ 个新功能...',
      author: 'Cloud',
      date: '2024-03-20',
      readTime: '8 分钟',
      tags: ['update', 'news'],
      cover: '🚀',
      featured: true,
    },
    {
      id: 2,
      title: '如何使用 Vibe AI 快速构建 Next.js 应用',
      excerpt: '本文将详细介绍如何使用 Vibe AI 的代码生成功能，在 5 分钟内构建一个完整的 Next.js 应用...',
      author: 'Cloud',
      date: '2024-03-18',
      readTime: '12 分钟',
      tags: ['tutorial'],
      cover: '⚡',
    },
    {
      id: 3,
      title: '智能体系统的深度解析 - 如何创建你的第一个 AI 智能体',
      excerpt: '智能体是 Vibe AI 的核心功能之一。本文将深入探讨智能体系统的工作原理，并手把手教你创建第一个智能体...',
      author: 'Team',
      date: '2024-03-15',
      readTime: '15 分钟',
      tags: ['tutorial', 'tips'],
      cover: '🤖',
    },
    {
      id: 4,
      title: '可视化构建器使用指南 - 拖拽式组件开发',
      excerpt: 'Vibe AI 的可视化构建器让前端开发变得前所未有的简单。本文将详细介绍如何使用拖拽式组件...',
      author: 'Cloud',
      date: '2024-03-12',
      readTime: '10 分钟',
      tags: ['tutorial'],
      cover: '🎨',
    },
    {
      id: 5,
      title: 'Vibe AI 性能优化实践 - 从加载到渲染的全方位优化',
      excerpt: '性能是用户体验的关键。本文分享我们在 Vibe AI 开发中使用的性能优化策略和最佳实践...',
      author: 'Team',
      date: '2024-03-10',
      readTime: '18 分钟',
      tags: ['tips'],
      cover: '⚙️',
    },
    {
      id: 6,
      title: '企业版功能介绍 - 团队协作和权限管理',
      excerpt: 'Vibe AI 企业版为团队协作提供了强大的支持。本文将介绍企业版的核心功能和使用方法...',
      author: 'Team',
      date: '2024-03-08',
      readTime: '14 分钟',
      tags: ['news', 'update'],
      cover: '👥',
    },
  ]

  const featuredPost = posts.find(p => p.featured)
  const regularPosts = posts.filter(p => !p.featured)

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">博客</h1>
        <p className="text-gray-600">
          了解最新动态、教程和最佳实践
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
          />
        </div>
        <div className="flex gap-2">
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTag === tag.id
                  ? 'bg-[#1677FF] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      {/* 精选文章 */}
      {featuredPost && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1677FF] to-[#a78bff] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                精选
              </span>
              <span className="text-sm opacity-90">
                {featuredPost.date}
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-3">
              {featuredPost.title}
            </h2>
            <p className="text-white/90 mb-6 max-w-3xl">
              {featuredPost.excerpt}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{featuredPost.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{featuredPost.readTime}</span>
              </div>
              <button className="bg-white text-[#1677FF] px-6 py-2 rounded-lg font-medium hover:bg-white hover:scale-105 transition-all flex items-center gap-2">
                阅读全文
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 文章列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="card cursor-pointer hover:shadow-lg transition-all"
          >
            {/* 封面 */}
            <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-6xl mb-4">
              {post.cover}
            </div>

            {/* 内容 */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* 元信息 */}
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {tags.find(t => t.id === tag)?.name || tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 加载更多 */}
      <div className="mt-8 text-center">
        <button className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          加载更多文章
        </button>
      </div>
    </div>
  )
}
