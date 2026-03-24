import { NextRequest, NextResponse } from 'next/server'
import { appendJsonFile, readJsonFile } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, subject, message } = body

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '缺少必填字段' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
        { status: 400 }
      )
    }

    // 构造提交数据
    const submission = {
      id: Date.now().toString(),
      name,
      email,
      company: company || '',
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    // 真实保存到JSON文件
    const saveSuccess = await appendJsonFile('contact-forms.json', submission)
    
    if (!saveSuccess) {
      return NextResponse.json(
        { error: '保存失败，请稍后重试' },
        { status: 500 }
      )
    }

    // 记录日志
    console.log('联系表单提交成功:', submission)

    // TODO: 发送邮件通知
    // await sendEmailNotification(submission)

    return NextResponse.json({
      success: true,
      message: '提交成功！我们会尽快与你联系',
      data: submission,
    })
  } catch (error) {
    console.error('表单提交错误:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后重试' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // 获取查询参数
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')

    // 从JSON文件读取数据
    const submissions = await readJsonFile('contact-forms.json')

    // 如果有状态过滤
    const filteredSubmissions = status
      ? submissions.filter((sub: any) => sub.status === status)
      : submissions

    return NextResponse.json({
      success: true,
      data: filteredSubmissions.slice(0, limit),
      total: filteredSubmissions.length,
    })
  } catch (error) {
    console.error('获取表单列表错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
