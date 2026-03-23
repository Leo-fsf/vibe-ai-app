/**
 * 邮件发送服务
 * 
 * 注意：这是一个模拟的邮件服务
 * 实际项目中，你需要集成真实的邮件服务提供商，如：
 * - Resend (resend.com)
 * - SendGrid (sendgrid.com)
 * - Nodemailer
 * - AWS SES
 */

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // 模拟邮件发送
    console.log('📧 发送邮件:', {
      to: data.to,
      subject: data.subject,
      htmlLength: data.html.length,
    })

    // TODO: 集成真实的邮件服务
    // 示例：使用 Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'Vibe AI <noreply@vibeai.com>',
    //   to: data.to,
    //   subject: data.subject,
    //   html: data.html,
    // })

    // 模拟延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    return true
  } catch (error) {
    console.error('邮件发送失败:', error)
    return false
  }
}

/**
 * 发送联系表单确认邮件
 */
export async function sendContactFormEmail(data: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>联系我们 - 确认邮件</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: #1677FF;
          color: white;
          padding: 30px;
          text-align: center;
        }
        .content {
          padding: 30px;
          background: white;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          color: #666;
        }
        .field-value {
          color: #333;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>感谢您的留言！</h1>
        </div>
        <div class="content">
          <p>您好，${data.name}！</p>
          <p>我们已收到您的留言，感谢您联系 Vibe AI。</p>
          
          <h3 style="margin-top: 30px;">留言详情：</h3>
          
          <div class="field">
            <div class="field-label">姓名：</div>
            <div class="field-value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">邮箱：</div>
            <div class="field-value">${data.email}</div>
          </div>
          
          ${data.company ? `
          <div class="field">
            <div class="field-label">公司/组织：</div>
            <div class="field-value">${data.company}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">主题：</div>
            <div class="field-value">${data.subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">消息：</div>
            <div class="field-value">${data.message}</div>
          </div>
          
          <p style="margin-top: 30px;">
            我们会在 1-2 个工作日内回复您。如有紧急事项，请直接拨打我们的客服电话：400-123-4567
          </p>
          
          <p style="margin-top: 20px;">
            再次感谢！<br>
            Vibe AI 团队
          </p>
        </div>
        <div class="footer">
          <p>© 2024 Vibe AI. All rights reserved.</p>
          <p>
            <a href="https://vibeai.com" style="color: #1677FF;">访问网站</a> | 
            <a href="mailto:support@vibeai.com" style="color: #1677FF;">联系我们</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `

  return sendEmail({
    to: data.email,
    subject: `Vibe AI - 收到您的留言：${data.subject}`,
    html,
  })
}

/**
 * 发送管理员通知邮件
 */
export async function sendAdminNotification(data: {
  name: string
  email: string
  company?: string
  subject: string
  message: string
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>新的联系表单提交</title>
    </head>
    <body style="font-family: sans-serif;">
      <h2 style="color: #1677FF;">📬 新的联系表单提交</h2>
      
      <table style="border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold;">姓名：</td>
          <td style="padding: 8px;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">邮箱：</td>
          <td style="padding: 8px;">${data.email}</td>
        </tr>
        ${data.company ? `
        <tr>
          <td style="padding: 8px; font-weight: bold;">公司：</td>
          <td style="padding: 8px;">${data.company}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px; font-weight: bold;">主题：</td>
          <td style="padding: 8px;">${data.subject}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold;">消息：</td>
          <td style="padding: 8px;">${data.message}</td>
        </tr>
      </table>
      
      <p style="margin-top: 20px;">
        <a href="https://admin.vibeai.com/contacts" style="background: #1677FF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          查看详情
        </a>
      </p>
    </body>
    </html>
  `

  return sendEmail({
    to: 'support@vibeai.com', // 管理员邮箱
    subject: `新留言：${data.name} - ${data.subject}`,
    html,
  })
}
