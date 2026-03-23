'use client'

import { useState } from 'react'
import { Search, ChevronRight, Book, Code, HelpCircle, MessageCircle, ExternalLink, FileText } from 'lucide-react'

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('getting-started')

  const categories = [
    { id: 'getting-started', name: '快速开始', icon: Book },
    { id: 'tutorial', name: '教程', icon: Code },
    { id: 'faq', name: '常见问题', icon: HelpCircle },
    { id: 'api', name: 'API 文档', icon: FileText },
    { id: 'community', name: '社区支持', icon: MessageCircle },
  ]

  const sections = [
    {
      id: 'getting-started',
      title: '快速开始',
      description: '5 分钟上手 Vibe AI',
      items: [
        {
          id: 1,
          title: '如何注册账号',
          description: '学习如何注册 Vibe AI 账号并完成认证',
          readTime: '3 分钟',
          popular: true,
        },
        {
          id: 2,
          title: '创建第一个智能体',
          description: '手把手教你创建你的第一个 AI 智能体',
          readTime: '5 分钟',
          popular: true,
        },
        {
          id: 3,
          title: '使用代码生成功能',
          description: '用自然语言生成完整的代码项目',
          readTime: '8 分钟',
        },
        {
          id: 4,
          title: '一键部署到 GitHub',
          description: '将你的项目部署到 GitHub Pages',
          readTime: '6 分钟',
        },
      ],
    },
    {
      id: 'tutorial',
      title: '教程',
      description: '深入学习各种功能',
      items: [
        {
          id: 5,
          title: '智能体系统详解',
          description: '了解智能体的工作原理和最佳实践',
          readTime: '15 分钟',
          popular: true,
        },
        {
          id: 6,
          title: '可视化构建器指南',
          description: '掌握拖拽式组件开发',
          readTime: '12 分钟',
        },
        {
          id: 7,
          title: '团队协作功能使用',
          description: '如何与团队成员协作开发',
          readTime: '10 分钟',
        },
        {
          id: 8,
          title: '高级配置和自定义',
          description: '自定义你的工作流程和设置',
          readTime: '20 分钟',
        },
      ],
    },
    {
      id: 'faq',
      title: '常见问题',
      description: '快速找到答案',
      items: [
        {
          id: 9,
          title: 'Vibe AI 是免费的吗？',
          description: '了解 Vibe AI 的定价和免费额度',
          readTime: '2 分钟',
          popular: true,
        },
        {
          id: 10,
          title: '如何升级到企业版？',
          description: '企业版功能介绍和升级流程',
          readTime: '3 分钟',
        },
        {
          id: 11,
          title: '数据安全如何保障？',
          description: '我们的安全和隐私保护措施',
          readTime: '4 分钟',
        },
        {
          id: 12,
          title: '支持哪些编程语言和框架？',
          description: '查看完整的技术栈支持列表',
          readTime: '5 分钟',
        },
      ],
    },
    {
      id: 'api',
      title: 'API 文档',
      description: '开发者参考资料',
      items: [
        {
          id: 13,
          title: 'API 概览',
          description: 'API 基础介绍和使用方法',
          readTime: '8 分钟',
        },
        {
          id: 14,
          title: '智能体 API',
          description: '智能体相关的 API 接口文档',
          readTime: '15 分钟',
        },
        {
          id: 15,
          title: '代码生成 API',
          description: '代码生成功能的 API 调用',
          readTime: '12 分钟',
        },
        {
          id: 16,
          title: '部署 API',
          description: '部署相关的 API 接口',
          readTime: '10 分钟',
        },
      ],
    },
    {
      id: 'community',
      title: '社区支持',
      description: '获取帮助和交流',
      items: [
        {
          id: 17,
          title: '加入 Discord 社区',
          description: '与其他用户交流经验和获取帮助',
          readTime: '2 分钟',
          popular: true,
        },
        {
          id: 18,
          title: '提交问题和反馈',
          description: '如何提交 Bug 和功能建议',
          readTime: '3 分钟',
        },
        {
          id: 19,
          title: '参与开源贡献',
          description: '如何为 Vibe AI 项目贡献代码',
          readTime: '10 分钟',
        },
        {
          id: 20,
          title: '联系支持团队',
          description: '获取官方技术支持',
          readTime: '2 分钟',
        },
      ],
    },
  ]

  const activeSection = sections.find(s => s.id === activeCategory) || sections[0]
  const CategoryIcon = categories.find(c => c.id === activeCategory)?.icon || Book

  const filteredItems = activeSection.items.filter(item =>
    searchQuery === '' ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">帮助文档</h1>
        <p className="text-gray-600">
          快速找到答案，学习如何使用 Vibe AI
        </p>
      </div>

      {/* 搜索框 */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索文档..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* 左侧分类 */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-2">
            {categories.map(category => {
              const Icon = category.icon
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? 'bg-[#1677FF] text-white' : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium">{category.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右侧内容 */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <CategoryIcon className="w-6 h-6 text-[#1677FF]" />
              <h2 className="text-xl font-semibold text-gray-900">
                {activeSection.title}
              </h2>
            </div>
            <p className="text-gray-600">
              {activeSection.description}
            </p>
          </div>

          {/* 文档列表 */}
          <div className="space-y-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="card cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      {item.popular && (
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded text-xs font-medium">
                          热门
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.readTime} 阅读</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>

          {/* 联系支持 */}
          <div className="mt-8 bg-gradient-to-r from-[#1677FF]/5 to-[#1677FF]/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              没有找到答案？
            </h3>
            <p className="text-gray-600 mb-4">
              如果你在文档中没有找到答案，可以联系我们的支持团队
            </p>
            <button className="bg-[#1677FF] text-white px-6 py-2 rounded-lg hover:bg-[#5566FF] transition-colors">
              联系支持
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
