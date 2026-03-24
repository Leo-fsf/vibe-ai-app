import { useState } from 'react'
import { Search, ChevronRight, Book, Code, HelpCircle, MessageCircle, ExternalLink, FileText, Star } from 'lucide-react'
import { readJsonFile, filterByCategory, searchJsonData } from '@/lib/data'

export const revalidate = 3600 // 1小时缓存

export default async function Help({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  // 获取帮助文档数据
  const helpDocs = await readJsonFile('help-docs.json')
  // 获取分类数据
  const categories = [
    { id: 'getting-started', name: '快速开始', icon: Book },
    { id: 'tutorial', name: '教程', icon: Code },
    { id: 'faq', name: '常见问题', icon: HelpCircle },
    { id: 'api', name: 'API 文档', icon: FileText },
    { id: 'community', name: '社区支持', icon: MessageCircle },
  ]

  // 获取搜索参数
  const searchQuery = searchParams.q || ''
  const activeCategory = searchParams.category || 'getting-started'

  // 过滤文档
  let filteredDocs = helpDocs
  if (activeCategory && activeCategory !== 'all') {
    filteredDocs = filterByCategory(filteredDocs, activeCategory)
  }
  if (searchQuery) {
    filteredDocs = searchJsonData(filteredDocs, searchQuery)
  }

  // 按分类分组
  const docsByCategory: { [key: string]: typeof helpDocs } = categories.reduce((acc, category) => {
    acc[category.id] = helpDocs.filter(doc => doc.category === category.id).sort((a, b) => a.order - b.order)
    return acc
  }, {} as { [key: string]: typeof helpDocs })

  // 获取热门文档
  const popularDocs = helpDocs.filter(doc => doc.popular).slice(0, 4)

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              帮助中心
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              查找教程、常见问题解答和API文档，帮助你快速上手Vibe AI平台
            </p>

            {/* 搜索框 */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                name="q"
                placeholder="搜索帮助文档..."
                defaultValue={searchQuery}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* 热门文档 */}
      {popularDocs.length > 0 && !searchQuery && (
        <div className="bg-white dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              热门文档
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularDocs.map((doc) => (
                <a
                  key={doc.id}
                  href="#"
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {doc.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      热门
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">阅读时间</span>
                      {doc.readTime}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧分类导航 */}
          <div className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                文档分类
              </h3>
              <nav className="space-y-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      name="category"
                      value={category.id}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {category.name}
                      <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                        {docsByCategory[category.id]?.length || 0}
                      </span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* 右侧文档列表 */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {categories.find(c => c.id === activeCategory)?.name || '搜索结果'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {searchQuery ? `找到 ${filteredDocs.length} 个匹配结果` : `共 ${filteredDocs.length} 篇文档`}
              </p>
            </div>

            <div className="space-y-3">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <a
                    key={doc.id}
                    href="#"
                    className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {doc.title}
                          </h3>
                          {doc.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-xs">
                              热门
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>阅读时间 {doc.readTime}</span>
                          <span>更新于 {new Date(doc.updatedAt).toLocaleDateString('zh-CN')}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-1 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    没有找到相关文档
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    请尝试使用其他关键词搜索，或查看全部文档
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 底部联系区域 */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            还有其他问题？
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            如果在文档中没有找到你需要的答案，可以联系我们的支持团队
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all"
            >
              联系支持团队
            </a>
            <a
              href="https://discord.gg/vibeai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all"
            >
              加入 Discord 社区 <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
