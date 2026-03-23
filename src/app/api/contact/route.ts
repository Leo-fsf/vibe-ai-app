import { NextRequest, NextResponse } from 'next/server'

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

    // 模拟保存到数据库
    // 实际项目中，这里应该连接数据库（如 MongoDB、PostgreSQL）
    const submission = {
      id: Date.now(),
      name,
      email,
      company,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    // 模拟数据库保存
    console.log('保存表单提交:', submission)

    // TODO: 发送邮件通知
    // await sendEmailNotification(submission)

    return NextResponse.json({
      success: true,
      message: '提交成功',
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

    // 模拟从数据库获取数据
    // 实际项目中，这里应该查询数据库
    const submissions: any[] = []

    // 如果有状态过滤
    const filteredSubmissions = status
      ? submissions.filter((sub) => sub.status === status)
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
