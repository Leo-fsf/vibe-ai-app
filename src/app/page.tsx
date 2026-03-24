import Link from 'next/link'
import { 
  Zap, ChevronRight, Clock, Users, Star, ArrowRight, 
  Sparkles, LayoutDashboard, Database, Globe,
  BookOpen, Headphones, Bot, Plus, Search, MessageSquare, Settings, HelpCircle,
  User, Menu, X
} from 'lucide-react'
import { readJsonFile, filterByCategory, incrementStats } from '@/lib/data'

export const revalidate = 3600 // 1小时缓存

export default async function Home() {
  // 获取智能体数据
  const agents = await readJsonFile('agents.json')
  // 获取分类数据
  const categories = await readJsonFile('categories.json')
  
  // 按分类过滤
  const agentCategories = [
    { id: 'all', name: '全部', count: agents.length },
    ...categories
      .filter(c => c.type === 'agent')
      .map(c => ({ id: c.name, name: c.displayName, count: c.count }))
  ]

  // 格式化数字显示
  function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  // 智能体卡片点击处理
  async function handleAgentClick(agentId: string) {
    'use server'
    // 增加浏览量
    await incrementStats('agents.json', agentId, 'views')
    // 增加使用量
    await incrementStats('agents.json', agentId, 'used')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Hero 区域 */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              探索<span className="text-blue-600 dark:text-blue-400"> AI 智能体</span>的无限可能
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              海量高质量AI智能体，覆盖生活、工作、学习全场景，一键使用，提升效率
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/features"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                了解功能 <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 分类标签 */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {agentCategories.map((category) => (
              <button
                key={category.id}
                className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700"
              >
                {category.name} <span className="text-xs opacity-70">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 智能体列表 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <form action={handleAgentClick.bind(null, agent.id)} key={agent.id}>
              <button
                type="submit"
                className="w-full text-left group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center text-2xl">
                    {agent.icon}
                  </div>
                  {agent.hot && (
                    <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium border border-red-200 dark:border-red-700">
                      热门
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {formatNumber(agent.used)}
                    </span>
                    <span className="mx-2">·</span>
                    <span className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {formatNumber(agent.likes)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <span className="mr-2">@{agent.author}</span>
                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </button>
            </form>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            加载更多智能体
          </button>
        </div>
      </div>

      {/* 功能亮点 */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              为什么选择 Vibe Pro
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              专业级AI应用平台，为你提供全方位的智能解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-500" />,
                title: "极速响应",
                description: "毫秒级响应速度，无需等待，即刻获得AI回复"
              },
              {
                icon: <Bot className="h-8 w-8 text-blue-500" />,
                title: "海量智能体",
                description: "1000+ 精选AI智能体，覆盖所有使用场景"
              },
              {
                icon: <Sparkles className="h-8 w-8 text-purple-500" />,
                title: "持续更新",
                description: "每周更新最新智能体，保持功能领先"
              },
              {
                icon: <LayoutDashboard className="h-8 w-8 text-green-500" />,
                title: "可视化管理",
                description: "直观的管理界面，轻松管理你的智能体"
              },
              {
                icon: <Globe className="h-8 w-8 text-indigo-500" />,
                title: "多端支持",
                description: "支持PC、平板、手机多端访问，随时随地使用"
              },
              {
                icon: <Database className="h-8 w-8 text-red-500" />,
                title: "数据安全",
                description: "企业级数据加密，保护你的隐私安全"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA 区域 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            准备好体验AI的力量了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            立即注册，开启你的智能工作之旅，前1000名用户赠送终身免费VIP
          </p>
          <Link 
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            免费注册 <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
