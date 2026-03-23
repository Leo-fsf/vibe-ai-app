import { NextRequest, NextResponse } from 'next/server'

// 模拟数据 - 实际项目中这些数据应该来自数据库
const mockData = {
  agents: [
    { id: '1', name: '字节跳-写作助理', description: '你的英文写作助手，提升内容创作效率', category: 'writing' },
    { id: '2', name: 'Notion AI', description: 'AI 智能笔记，自动整理信息', category: 'life' },
    { id: '3', name: 'Figma AI', description: 'AI 设计助手，智能生成设计元素', category: 'design' },
    { id: '4', name: 'Coze AI', description: 'AI 工作流平台，一键创建、编排、部署 AI 智能体', category: 'ai' },
    { id: '5', name: 'Claude', description: 'AI 编程助手，自动写代码、调试、解释代码', category: 'dev' },
    { id: '6', name: 'Jasper', description: '高效 AI 文档处理，让文档管理变得简单', category: 'ai' },
  ],
  blog: [
    { id: '1', title: 'Vibe AI 2.0 发布', excerpt: '我们很高兴宣布 Vibe AI 2.0 正式发布！', category: 'update' },
    { id: '2', title: '如何使用 Vibe AI 快速构建 Next.js 应用', excerpt: '本文将详细介绍如何使用 Vibe AI 的代码生成功能', category: 'tutorial' },
    { id: '3', title: '智能体系统的深度解析', excerpt: '本文将深入探讨智能体系统的工作原理', category: 'tutorial' },
  ],
  help: [
    { id: '1', title: '如何注册账号', description: '学习如何注册 Vibe AI 账号并完成认证', category: 'getting-started' },
    { id: '2', title: '创建第一个智能体', description: '手把手教你创建你的第一个 AI 智能体', category: 'getting-started' },
    { id: '3', title: '智能体系统详解', description: '了解智能体的工作原理和最佳实践', category: 'tutorial' },
  ],
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const type = searchParams.get('type') || 'all'
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.length < 2) {
      return NextResponse.json({
        success: true,
        data: [],
        query,
        total: 0,
      })
    }

    const results: any[] = []
    const lowerQuery = query.toLowerCase()

    // 搜索智能体
    if (type === 'all' || type === 'agents') {
      const agentResults = mockData.agents.filter(agent =>
        agent.name.toLowerCase().includes(lowerQuery) ||
        agent.description.toLowerCase().includes(lowerQuery)
      ).map(agent => ({
        ...agent,
        type: 'agent',
        url: `/agents/${agent.id}`,
      }))
      results.push(...agentResults)
    }

    // 搜索博客
    if (type === 'all' || type === 'blog') {
      const blogResults = mockData.blog.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery)
      ).map(post => ({
        ...post,
        type: 'blog',
        url: `/blog/${post.id}`,
      }))
      results.push(...blogResults)
    }

    // 搜索帮助文档
    if (type === 'all' || type === 'help') {
      const helpResults = mockData.help.filter(doc =>
        doc.title.toLowerCase().includes(lowerQuery) ||
        doc.description.toLowerCase().includes(lowerQuery)
      ).map(doc => ({
        ...doc,
        type: 'help',
        url: `/help/${doc.id}`,
      }))
      results.push(...helpResults)
    }

    return NextResponse.json({
      success: true,
      data: results.slice(0, limit),
      query,
      total: results.length,
    })
  } catch (error) {
    console.error('搜索错误:', error)
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    )
  }
}
