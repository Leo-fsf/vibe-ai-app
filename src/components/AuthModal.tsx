'use client'

import { useState } from 'react'
import { X, User, Mail, Lock } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: 'login' | 'register'
}

export default function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>(defaultTab)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' })

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('登录成功！')
        setTimeout(() => {
          onClose()
          // TODO: 保存 token 到 localStorage
          // localStorage.setItem('token', result.data.token)
          // localStorage.setItem('user', JSON.stringify(result.data.user))
        }, 1500)
      } else {
        setError(result.error || '登录失败')
      }
    } catch (error) {
      setError('网络错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccess('注册成功！')
        setTimeout(() => {
          onClose()
          // TODO: 保存 token 到 localStorage
        }, 1500)
      } else {
        setError(result.error || '注册失败')
      }
    } catch (error) {
      setError('网络错误，请稍后重试')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        {/* 标题栏 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {tab === 'login' ? '登录' : '注册'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* 选项卡 */}
        <div className="flex border-b">
          <button
            onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'login'
                ? 'text-[#1677FF] border-b-2 border-[#1677FF]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            登录
          </button>
          <button
            onClick={() => { setTab('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === 'register'
                ? 'text-[#1677FF] border-b-2 border-[#1677FF]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            注册
          </button>
        </div>

        {/* 内容 */}
        <div className="p-6">
          {/* 错误提示 */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* 成功提示 */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* 登录表单 */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  邮箱
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="请输入邮箱"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="请输入密码"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#1677FF] text-white py-2.5 rounded-lg font-medium transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5566FF]'
                }`}
              >
                {isLoading ? '登录中...' : '登录'}
              </button>
            </form>
          )}

          {/* 注册表单 */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  姓名
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="请输入姓名"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  邮箱
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="请输入邮箱"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="请输入密码（至少6位）"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-[#1677FF] text-white py-2.5 rounded-lg font-medium transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#5566FF]'
                }`}
              >
                {isLoading ? '注册中...' : '注册'}
              </button>
            </form>
          )}

          {/* 提示 */}
          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
            {tab === 'login' ? (
              <div>
                还没有账号？
                <button
                  onClick={() => setTab('register')}
                  className="text-[#1677FF] hover:underline ml-1"
                >
                  立即注册
                </button>
              </div>
            ) : (
              <div>
                已有账号？
                <button
                  onClick={() => setTab('login')}
                  className="text-[#1677FF] hover:underline ml-1"
                >
                  立即登录
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
