### 安装依赖

在 src 目录下新建 components 文件夹, `git clone` 本仓库到该文件夹下，然后在全局目录，执行

```bash
npm i nodemailer--save && npm i @types/nodemailer --save-dev
```

### 启用组件

在 src/configuration.ts 中引入组件。

```ts
import * as mailer from './components/mailer';

@Configuration({
  imports: [
    // ...other components
    mailer,
  ],
})
export class MainConfiguration {}
```

### 调用服务

一般情况配合`@midwayjs/captcha`组件使用


```bash
$ npm i @midwayjs/captcha@3 --save
```

记得引入验证码组件

```ts
import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { CaptchaService } from '@midwayjs/captcha';
import { MailerService } from '../../components/mailer';

@Controller('/email')
export class EmailController {
  @Inject()
  mailerService: MailerService;

  @Inject()
  captchaService: CaptchaService;

  @Post('/send')
  @Validate()
  async send(@Body() body) {
    const { id, text: code } = await this.captchaService.text({
      type: 'number',
    });
    const data = {
      to: body.email,
      subject: '验证码',
      text: '',
      html: `<code
                  style="font-size: 24px;
                          color:#fff;
                          font-weight: bold;
                          background:#09f;
            ">${code}</code>
            <div>5分钟内有效,请不要告诉他人哦!</div>
            `,
    };
    const message = await this.mailerService.send(data);
    return {
      codeKey: id,
      ...message,
    };
  }
}
```

### 可用配置 `config.default.ts/config.prod.ts`

```ts
import { MidwayConfig } from '@midwayjs/core';
export default {
  mailer: {
    service: '', //163、qq等
    prefix: '', //邮件前缀 例如：【xxx平台】
    auth: {
      user: '', //邮箱 xxx@qq.com
      pass: '', //邮箱密码或授权码 建议使用授权码
    },
  },
} as MidwayConfig;
```
