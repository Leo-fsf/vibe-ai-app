import { useState } from 'react'
import { Calendar, Clock, User, Tag, Search, Filter, ArrowRight, Heart, Eye } from 'lucide-react'
import { readJsonFile, filterByCategory, searchJsonData, incrementStats } from '@/lib/data'

export const revalidate = 3600 // 1小时缓存

export default async function Blog({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // 获取博客文章数据
  const posts = await readJsonFile('blog-posts.json')
  // 获取分类数据
  const categories = await readJsonFile('categories.json')
  
  // 博客分类
  const tags = [
    { id: 'all', name: '全部' },
    ...categories
      .filter(c => c.type === 'blog')
      .map(c => ({ id: c.name, name: c.displayName }))
  ]

  // 搜索和过滤逻辑
  let filteredPosts = posts
  if (searchParams.tag && searchParams.tag !== 'all') {
    filteredPosts = filterByCategory(filteredPosts, searchParams.tag)
  }
  if (searchParams.q) {
    filteredPosts = searchJsonData(filteredPosts, searchParams.q)
  }

  // 文章点击处理
  async function handlePostClick(postId: string) {
    'use server'
    // 增加浏览量
    await incrementStats('blog-posts.json', postId, 'views')
  }

  // 点赞处理
  async function handleLike(postId: string) {
    'use server'
    // 增加点赞数
    await incrementStats('blog-posts.json', postId, 'likes')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Vibe AI 博客
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              分享AI技术、产品更新和使用技巧，帮助你更好地使用Vibe AI平台
            </p>

            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                name="q"
                placeholder="搜索文章..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 标签过滤 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tags.map((tag) => (
              <button
                key={tag.id}
                name="tag"
                value={tag.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  searchParams.tag === tag.id || (!searchParams.tag && tag.id === 'all')
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 精选文章 */}
        {filteredPosts.find(p => p.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              精选文章
            </h2>
            {filteredPosts.filter(p => p.featured).map((post) => (
              <form action={handlePostClick.bind(null, post.id)} key={post.id}>
                <button
                  type="submit"
                  className="w-full text-left group bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                      <div className="w-full h-48 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 flex items-center justify-center text-5xl">
                        {post.cover || '📝'}
                      </div>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                          精选
                        </span>
                        <div className="flex gap-2">
                          {post.tags?.map((tag: string, idx: number) => (
                            <span key={idx} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Eye className="h-4 w-4" />
                            <span>{post.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          阅读全文 <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </form>
            ))}
          </div>
        )}

        {/* 全部文章 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            全部文章 ({filteredPosts.filter(p => !p.featured).length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.filter(p => !p.featured).map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <form action={handlePostClick.bind(null, post.id)} className="block">
                  <button type="submit" className="w-full text-left">
                    <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-4xl">
                      {post.cover || '📝'}
                    </div>
                    <div className="p-6">
                      <div className="flex gap-2 mb-3">
                        {post.tags?.map((tag: string, idx: number) => (
                          <span key={idx} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </form>
                <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0}</span>
                    </div>
                    <form action={handleLike.bind(null, post.id)}>
                      <button type="submit" className="flex items-center gap-1 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes || 0}</span>
                      </button>
                    </form>
                  </div>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:underline">
                    阅读 <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分页 */}
        <div className="mt-12 flex justify-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              上一页
            </button>
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
              1
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
