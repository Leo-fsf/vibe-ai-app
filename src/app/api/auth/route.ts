import { NextRequest, NextResponse } from 'next/server'

/**
 * 用户登录 API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // 验证必填字段
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码不能为空' },
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

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度不能少于6位' },
        { status: 400 }
      )
    }

    // TODO: 实际项目中，这里应该：
    // 1. 查询数据库验证用户
    // 2. 比对密码哈希（使用 bcrypt）
    // 3. 生成 JWT token
    // 4. 返回用户信息和 token

    // 模拟登录成功
    console.log('用户登录:', { email })

    // 模拟用户数据
    const user = {
      id: '123',
      email,
      name: email.split('@')[0],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      createdAt: new Date().toISOString(),
    }

    // 模拟 token
    const token = 'mock-token-' + Date.now()

    return NextResponse.json({
      success: true,
      message: '登录成功',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.error('登录错误:', error)
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}

/**
 * 用户注册 API
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // 验证必填字段
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '姓名、邮箱和密码不能为空' },
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

    // 验证密码长度
    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码长度不能少于6位' },
        { status: 400 }
      )
    }

    // TODO: 实际项目中，这里应该：
    // 1. 检查邮箱是否已存在
    // 2. 对密码进行哈希处理（使用 bcrypt）
    // 3. 创建用户记录到数据库
    // 4. 生成 JWT token
    // 5. 发送欢迎邮件

    // 模拟注册成功
    console.log('用户注册:', { name, email })

    // 模拟用户数据
    const user = {
      id: '123',
      name,
      email,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + email,
      createdAt: new Date().toISOString(),
    }

    // 模拟 token
    const token = 'mock-token-' + Date.now()

    return NextResponse.json({
      success: true,
      message: '注册成功',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    console.error('注册错误:', error)
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}
