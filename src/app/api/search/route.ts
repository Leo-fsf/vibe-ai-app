import { NextRequest, NextResponse } from 'next/server'
import { readJsonFile, searchJsonData } from '@/lib/data'

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

    // 搜索智能体
    if (type === 'all' || type === 'agents') {
      const agents = await readJsonFile('agents.json')
      const agentResults = searchJsonData(agents, query).map(agent => ({
        ...agent,
        type: 'agent',
        title: agent.name,
        url: `/agents/${agent.id}`,
      }))
      results.push(...agentResults)
    }

    // 搜索博客
    if (type === 'all' || type === 'blog') {
      const posts = await readJsonFile('blog-posts.json')
      const blogResults = searchJsonData(posts, query).map(post => ({
        ...post,
        type: 'blog',
        title: post.title,
        url: `/blog/${post.id}`,
      }))
      results.push(...blogResults)
    }

    // 搜索帮助文档
    if (type === 'all' || type === 'help') {
      const docs = await readJsonFile('help-docs.json')
      const helpResults = searchJsonData(docs, query).map(doc => ({
        ...doc,
        type: 'help',
        title: doc.title,
        url: `/help/${doc.id}`,
      }))
      results.push(...helpResults)
    }

    // 按相关度排序（简单实现：出现关键词的位置越靠前越相关）
    const lowerQuery = query.toLowerCase()
    results.sort((a, b) => {
      const aScore = 
        (a.title?.toLowerCase().startsWith(lowerQuery) ? 3 : 0) +
        (a.title?.toLowerCase().includes(lowerQuery) ? 2 : 0) +
        (a.description?.toLowerCase().includes(lowerQuery) ? 1 : 0)
      
      const bScore = 
        (b.title?.toLowerCase().startsWith(lowerQuery) ? 3 : 0) +
        (b.title?.toLowerCase().includes(lowerQuery) ? 2 : 0) +
        (b.description?.toLowerCase().includes(lowerQuery) ? 1 : 0)
      
      return bScore - aScore
    })

    return NextResponse.json({
      success: true,
      data: results.slice(0, limit),
      query,
      total: results.length,
      types: {
        agents: results.filter(r => r.type === 'agent').length,
        blog: results.filter(r => r.type === 'blog').length,
        help: results.filter(r => r.type === 'help').length,
      }
    })
  } catch (error) {
    console.error('搜索错误:', error)
    return NextResponse.json(
      { error: '搜索失败，请稍后重试' },
      { status: 500 }
    )
  }
}
