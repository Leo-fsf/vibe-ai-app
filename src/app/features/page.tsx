'use client'

import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Play, Code, Zap, Users, Globe, Shield, LayoutDashboard, Bot } from 'lucide-react'

export default function Features() {
  const [activeFeature, setActiveFeature] = useState('generate')

  const features = [
    {
      id: 'generate',
      name: 'AI 代码生成',
      icon: Code,
      description: '用自然语言生成完整的代码项目',
      details: [
        '支持 5 种类型：应用、游戏、网站、组件、API',
        '支持 4 种框架：Next.js、React、Vue、Vanilla JS',
        '自动生成 package.json、组件、样式、数据库模型',
        '完整的项目结构和最佳实践',
      ],
      useCases: [
        '快速构建原型',
        '学习项目结构',
        '客户项目交付',
        '技术栈迁移',
      ]
    },
    {
      id: 'visual',
      name: '可视化构建',
      icon: LayoutDashboard,
      description: '拖拽式组件，实时预览',
      details: [
        '50+ 丰富组件库',
        '8 个预置模板',
        '实时预览效果',
        '多主题支持',
      ],
      useCases: [
        '快速搭建页面',
        '设计原型验证',
        'UI 组件开发',
        '响应式布局',
      ]
    },
    {
      id: 'agent',
      name: 'AI 智能体',
      icon: Bot,
      description: '智能任务规划和执行',
      details: [
        '自动任务分解',
        '智能执行流程',
        '经验记忆学习',
        '思维过程可视化',
      ],
      useCases: [
        '自动化工作流',
        '任务管理',
        '学习助手',
        '效率提升',
      ]
    },
    {
      id: 'deploy',
      name: '一键部署',
      icon: Globe,
      description: '自动部署到 GitHub',
      details: [
        '自动创建仓库',
        '上传所有文件',
        '配置 CI/CD',
        '启用 GitHub Pages',
      ],
      useCases: [
        '快速上线',
        '团队协作',
        '版本控制',
        '持续集成',
      ]
    },
    {
      id: 'collab',
      name: '团队协作',
      icon: Users,
      description: '多人协作开发',
      details: [
        '实时协作编辑',
        '权限管理',
        '评论功能',
        '版本历史',
      ],
      useCases: [
        '团队项目',
        '代码审查',
        '知识共享',
        '文档协作',
      ]
    },
    {
      id: 'security',
      name: '安全可靠',
      icon: Shield,
      description: '企业级安全保障',
      details: [
        '数据加密',
        '权限控制',
        '安全审计',
        '隐私保护',
      ],
      useCases: [
        '企业项目',
        '敏感数据处理',
        '合规要求',
        '风险管理',
      ]
    },
  ]

  const currentFeature = features.find(f => f.id === activeFeature) || features[0]
  const Icon = currentFeature.icon

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">功能详解</h1>
        </div>
        <p className="text-gray-600 ml-9">
          探索 Vibe AI 的强大功能，让开发更高效
        </p>
      </div>

      <div className="flex gap-6">
        {/* 左侧功能列表 */}
        <div className="w-64 flex-shrink-0">
          <div className="space-y-2">
            {features.map((feature) => {
              const FeatureIcon = feature.icon
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeFeature === feature.id
                      ? 'bg-[#1677FF] text-white'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <FeatureIcon className={`w-5 h-5 ${
                    activeFeature === feature.id ? 'text-white' : 'text-gray-500'
                  }`} />
                  <div className="text-left">
                    <div className={`font-medium ${
                      activeFeature === feature.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {feature.name}
                    </div>
                    <div className={`text-xs ${
                      activeFeature === feature.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {feature.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 右侧功能详情 */}
        <div className="flex-1">
          <div className="card">
            {/* 功能头部 */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1677FF] rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {currentFeature.name}
                  </h2>
                  <p className="text-gray-600">
                    {currentFeature.description}
                  </p>
                </div>
              </div>
              <button className="flex items-center gap-2 bg-[#1677FF] text-white px-6 py-2.5 rounded-lg hover:bg-[#5566FF] transition-colors">
                <Play className="w-4 h-4" />
                立即试用
              </button>
            </div>

            {/* 功能特性 */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#1677FF]" />
                核心特性
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {currentFeature.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1677FF] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 使用场景 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                使用场景
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {currentFeature.useCases.map((useCase, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-[#1677FF]/5 to-[#1677FF]/10 rounded-lg text-center"
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {useCase}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="bg-gradient-to-r from-[#1677FF]/5 to-[#1677FF]/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  想了解更多？
                </h3>
                <p className="text-gray-600 mb-4">
                  查看详细文档或联系我们的团队获取更多帮助
                </p>
                <div className="flex gap-3">
                  <button className="bg-[#1677FF] text-white px-6 py-2 rounded-lg hover:bg-[#5566FF] transition-colors">
                    查看文档
                  </button>
                  <button className="bg-white text-gray-700 px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    联系我们
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
