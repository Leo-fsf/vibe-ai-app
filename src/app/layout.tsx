'use client'

import { 
  Home, Zap, Search, Plus, MessageSquare, 
  Settings, HelpCircle, Menu, X,
  Bot, Sparkles, Code, LayoutDashboard, Database, Globe,
  BookOpen, Headphones, Mic,
  ChevronRight, Star, Clock, User
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import AuthModal from '@/components/AuthModal'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('marketplace')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)

  // 左侧导航项
  const navItems = [
    { id: 'marketplace', label: '智能体广场', icon: LayoutDashboard, href: '/' },
    { id: 'features', label: '功能详解', icon: Zap, href: '/features' },
    { id: 'plugin', label: '插件广场', icon: Database, href: '/plugin' },
    { id: 'blog', label: '博客', icon: BookOpen, href: '/blog' },
    { id: 'about', label: '关于我们', icon: Globe, href: '/about' },
    { id: 'help', label: '帮助文档', icon: HelpCircle, href: '/help' },
    { id: 'contact', label: '联系我们', icon: MessageSquare, href: '/contact' },
  ]

  // 顶部操作区
  const headerActions = [
    { icon: Search, label: '搜索', onClick: () => console.log('搜索') },
    { icon: MessageSquare, label: '客服', onClick: () => console.log('客服') },
    { icon: Plus, label: '创建', onClick: () => console.log('创建') },
    { icon: Settings, label: '设置', onClick: () => console.log('设置') },
  ]

  // 底部功能图标
  const footerActions = [
    { icon: Headphones, label: '文档', onClick: () => console.log('文档') },
    { icon: Headphones, label: '耳机', onClick: () => console.log('耳机') },
    { icon: Mic, label: '语音', onClick: () => console.log('语音') },
  ]

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden">
      {/* 左侧固定导航栏 */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
        {/* Logo 区域 */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-[#1677FF] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[#1a1a1a]">Vibe AI</span>
          </div>
          <button className="w-full bg-[#1677FF] text-white rounded-lg py-2.5 text-sm font-medium hover:bg-[#5566FF] transition-all">
            创建智能体
          </button>
        </div>

        {/* 导航菜单 */}
        <div className="flex-1 overflow-y-auto py-2 px-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive ? 'bg-[#1677FF] text-white' : 'hover:bg-[#F7F8FA]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-gray-600'
                  }`} />
                  <span className={isActive ? 'text-white' : 'text-gray-700'}>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* 底部功能图标 */}
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-2">
            {footerActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <action.icon className="w-5 h-5 text-gray-500" />
                <span className="text-xs text-gray-600">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 登录按钮 */}
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => setAuthModalOpen(true)}
            className="w-full bg-white border border-gray-300 rounded-lg py-2 text-gray-700 hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm"
          >
            立即登录
          </button>
        </div>
      </div>

      {/* 右侧主内容区 */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* 顶部栏 */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              智能体广场
            </span>
            <span className="text-xs text-gray-400">
              • 发现、创建、分享 AI 智能体
            </span>
          </div>
          
          {/* 右侧功能 */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </button>
            <button className="p-2 bg-[#1677FF] text-white rounded-full hover:bg-[#5566FF] transition-colors">
              <Plus className="w-5 h-5 text-white" />
              <span className="text-sm">创建</span>
            </button>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>

      {/* 悬浮交互按钮（右侧） */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-vibe-500 hover:scale-110 transition-all hover:shadow-2xl">
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-vibe-500 hover:scale-110 transition-all hover:shadow-2xl">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>
        <button className="w-12 h-12 bg-gradient-to-r from-[#1677FF] to-[#5566FF] rounded-full shadow-lg flex items-center justify-center hover:shadow-2xl hover:scale-110 transition-all">
          <Sparkles className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* 登录/注册模态框 */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab="login"
      />
    </div>
  )
}
