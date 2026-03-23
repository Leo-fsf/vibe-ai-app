'use client'

import Link from 'next/link'
import { 
  Zap, ChevronRight, Clock, Users, Star, ArrowRight, 
  Sparkles, LayoutDashboard, Database, Globe,
  BookOpen, Headphones, Bot, Plus, Search, MessageSquare, Settings, HelpCircle,
  User, Menu, X
} from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [activeTag, setActiveTag] = useState('all')
  const [isHoveredCard, setIsHoveredCard] = useState<string | null>(null)
  const [hoveredUser, setHoveredUser] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // 分类标签
  const categories = [
    { id: 'all', name: '全部', count: 128 },
    { id: 'life', name: '便利生活', count: 42 },
    { id: 'writing', name: '文本创作', count: 38 },
    { id: 'education', name: '教育学习', count: 25 },
    { id: 'dev', name: '开发工具', count: 31 },
    { id: 'design', name: '设计素材', count: 18 },
    { id: 'business', name: '商务办公', count: 22 },
    { id: 'entertainment', name: '娱乐', count: 15 },
    { id: 'ai', name: 'AI 工具', count: 35 },
  ]

  // 智能体数据
  const agents = [
    {
      id: '1',
      name: '字节跳-写作助理',
      icon: '📝',
      description: '你的英文写作助手，提升内容创作效率，支持拼写检查、语法纠正、语气调整',
      author: '字节跳动',
      stats: { views: '234K', used: '12K', likes: '8.5K' },
      hot: true,
      tag: 'writing',
      color: '#00D9FF',
      bg: '#E8F8FF'
    },
    {
      id: '2',
      name: 'Notion AI',
      icon: '📝',
      description: 'AI 智能笔记，自动整理信息，智能提取要点，让知识管理变得简单',
      author: 'Notion',
      stats: { views: '189K', used: '8K', likes: '6.2K' },
      hot: true,
      tag: 'life',
      color: '#FF6B6B',
      bg: '#FFE8E8'
    },
    {
      id: '3',
      name: 'Figma AI',
      icon: '🎨',
      description: 'AI 设计助手，智能生成设计元素，自动优化布局，让设计更高效',
      author: 'Figma',
      stats: { views: '156K', used: '9K', likes: '5.8K' },
      hot: true,
      tag: 'design',
      color: '#F24E1E',
      bg: '#FEF3E8'
    },
    {
      id: '4',
      name: 'Coze AI',
      icon: '🤖',
      description: 'AI 工作流平台，一键创建、编排、部署 AI 智能体',
      author: 'Coze',
      stats: { views: '201K', used: '15K', likes: '12K' },
      hot: true,
      tag: 'ai',
      color: '#4F46E5',
      bg: '#EFF3FD'
    },
    {
      id: '5',
      name: 'Claude',
      icon: '🧠',
      description: 'AI 编程助手，自动写代码、调试、解释代码',
      author: 'Anthropic',
      stats: { views: '178K', used: '11K', likes: '7.3K' },
      hot: true,
      tag: 'dev',
      color: '#9D9EDD',
      bg: '#F5EFFE'
    },
    {
      id: '6',
      name: 'Jasper',
      icon: '📊',
      description: '高效 AI 文档处理，让文档管理变得简单',
      author: 'Jasper',
      stats: { views: '145K', used: '7K', likes: '5.1K' },
      hot: false,
      tag: 'ai',
      color: '#D946EF',
      bg: '#F2F9FA'
    },
  ]

  const featuredAgent = agents[activeIndex] || agents[0]
  const recentAgents = agents.slice(1, 5)

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 分类标签区 */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-gray-200">
        {categories.map(tag => (
          <button
            key={tag.id}
            onClick={() => setActiveTag(tag.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTag === tag.id
                ? 'bg-[#1677FF] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tag.name}
            <span className="text-xs opacity-70 ml-2">{tag.count}</span>
          </button>
        ))}
      </div>

      {/* Banner 推广区 */}
      <div className="mb-8">
        {/* 主 Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-r from-[#1677FF] via-[#a78bff] to-[#1677FF] p-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-white text-2xl font-bold">✨ 英文写作批改</div>
            <div className="text-white/90 text-sm">
              让 AI 帮你优化英文内容的拼写、语法和语气，让写作更专业
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-[#1677FF] px-6 py-2.5 rounded-lg font-medium hover:bg-white hover:shadow-lg transition-all">
              立即体验
            </button>
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* 教程卡片 */}
        <div className="flex items-end gap-4">
          <div className="bg-white rounded-xl p-4 w-64 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#1677FF] to-[#a78bff] rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600">官方教程</div>
                <div className="text-xs text-gray-400">查看官方教程了解如何使用</div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <div className="text-xs text-gray-500">5 分钟快速入门</div>
              <div className="text-xs text-gray-400">·</div>
              <Clock className="w-3 h-3 text-gray-400" />
              <div className="text-xs text-gray-500">进阶技巧</div>
            </div>
          </div>
        </div>
      </div>

      {/* 智能体网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const isHot = agent.hot
          
          return (
            <div
              key={agent.id}
              className={`card ${isHot ? 'ring-2 ring-[#1677FF]' : ''}`}
              onMouseEnter={() => setIsHoveredCard(agent.id)}
              onMouseLeave={() => setIsHoveredCard(null)}
            >
              {/* 卡片头部 */}
              <div className="flex items-start gap-3 mb-3">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl`}
                  style={{ backgroundColor: agent.bg }}
                >
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-base">
                    {agent.name}
                    {isHot && (
                      <span className="ml-2 inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs px-2 py-0.5 rounded-full">
                        热门
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span>{agent.author}</span>
                    <span className="mx-1">•</span>
                    <span>{agent.stats.used} 次使用</span>
                  </div>
                </div>
              </div>

              {/* 卡片主体 */}
              <div className="p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              {/* 卡片底部 */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{agent.stats.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-xs text-gray-500">{agent.stats.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    {agent.stats.views.includes('w') || agent.stats.views.includes('K') ? '' : ''}
                  </span>
                </div>
                <button 
                  className="text-xs flex items-center gap-1 text-[#1677FF] hover:underline"
                >
                  立即对话
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 更多推荐 */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          更多推荐
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#D946EF] to-[#F2F9FA] flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Jasper</div>
                <div className="text-xs text-gray-500">
                  高效 AI 文档处理
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              让 AI 文档处理变得简单高效，自动整理要点，提取关键信息
            </p>
            <a 
              href="#" 
              className="text-sm text-[#1677FF] hover:underline mt-3 inline-flex items-center gap-1"
            >
              了解更多 <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#F24E1E] to-[#FEF3E8] flex items-center justify-center">
                <span className="text-lg">🎨</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">Figma AI</div>
                <div className="text-xs text-gray-500">
                  AI 辅助设计
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              智能生成设计元素，自动优化布局，让设计更高效
            </p>
            <a 
              href="#" 
              className="text-sm text-[#1677FF] hover:underline mt-3 inline-flex items-center gap-1"
            >
              了解更多 <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* CTA 区域 */}
      <div className="mt-8 bg-gradient-to-r from-[#1677FF] to-[#a78bff] rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="w-8 h-8 text-white" />
          <h2 className="text-2xl font-semibold text-white">
            发现更多智能体
          </h2>
        </div>
        <p className="text-white/80 text-sm">
          探索、创建、分享 AI 智能体，让工作更高效
        </p>
        <button className="inline-flex items-center gap-2 bg-white text-[#1677FF] font-semibold px-6 py-3 rounded-lg hover:bg-white hover:scale-105 transition-all mt-4">
          创建智能体
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
