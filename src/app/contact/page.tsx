'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Github, Twitter, Send as SendIcon } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 调用真实的 API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        console.log('表单提交成功:', result)
        setIsSubmitting(false)
        setSubmitted(true)

        // 重置表单
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            name: '',
            email: '',
            company: '',
            subject: '',
            message: '',
          })
        }, 3000)
      } else {
        console.error('表单提交失败:', result)
        alert(result.error || '提交失败，请稍后重试')
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('表单提交错误:', error)
      alert('网络错误，请稍后重试')
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">联系我们</h1>
        <p className="text-gray-600">
          我们随时为你提供帮助，期待你的来信
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 左侧：联系信息 */}
        <div>
          <div className="card mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">联系方式</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1677FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#1677FF]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">邮箱</div>
                  <a href="mailto:support@vibeai.com" className="text-[#1677FF] hover:underline">
                    support@vibeai.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1677FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#1677FF]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">电话</div>
                  <a href="tel:+86-400-123-4567" className="text-[#1677FF] hover:underline">
                    400-123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#1677FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#1677FF]" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 mb-1">地址</div>
                  <div className="text-gray-600">
                    北京市海淀区中关村大街1号
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 社交媒体 */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">关注我们</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://github.com/vibeai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">GitHub</span>
              </a>

              <a
                href="https://twitter.com/vibeai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-900">Twitter</span>
              </a>

              <a
                href="https://discord.gg/vibeai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium text-gray-900">Discord</span>
              </a>
            </div>
          </div>

          {/* 工作时间 */}
          <div className="card mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">工作时间</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">周一至周五</span>
                <span className="text-gray-900">9:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">周六</span>
                <span className="text-gray-900">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">周日</span>
                <span className="text-gray-900">休息</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：表单 */}
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">发送消息</h2>
            <p className="text-sm text-gray-600 mb-6">
              填写下面的表单，我们会尽快回复你
            </p>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SendIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  发送成功！
                </h3>
                <p className="text-sm text-green-700">
                  感谢你的留言，我们会在 1-2 个工作日内回复你
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="请输入你的姓名"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="请输入你的邮箱"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    公司/组织
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="请输入公司或组织名称"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    主题 <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF]"
                  >
                    <option value="">选择主题</option>
                    <option value="general">一般咨询</option>
                    <option value="support">技术支持</option>
                    <option value="sales">商务合作</option>
                    <option value="feedback">产品反馈</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    消息 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="请输入你的消息内容"
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1677FF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#1677FF] text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-[#5566FF] hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      发送中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      发送消息
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  我们重视你的隐私，不会泄露你的信息
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
