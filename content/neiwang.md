---
title: "内网穿透演示"
author: "Holdon"
slug: "neiwangyanshi-2025"
date: 2025-03-10
---

以下是在 Mac 上将本地 HTML 博客通过内网穿透实现公网访问的详细步骤：

---

### 一、启动本地 Web 服务器
#### 方法 1：使用 Python 内置服务器
1. 打开终端，进入 HTML 文件所在目录：
  ```bash
   cd /Users/apple/Desktop/
   ```
2. 启动 Python HTTP 服务器（默认端口 8000）：
   ```bash
   python3 -m http.server 8000
   ```
   *如果提示端口被占用，可更换端口号（如 `8080`）*

#### 方法 2：使用 PHP 内置服务器
1. 进入 HTML 例如在（/Users/apple/Desktop/）目录下面，文件所在目录：
  ```bash
   cd /Users/apple/Desktop/
   ```
2. 启动 PHP 服务器（默认端口 8000）：
   ```bash
   php -S localhost:8000
   ```

---

### 二、选择内网穿透工具（任选其一）
#### 方案 1：使用 ngrok（推荐）
1. **安装 ngrok**
   ```bash
   brew install ngrok/ngrok/ngrok
   ```
2. **注册并获取 Token**
   - 访问 [ngrok官网](https://ngrok.com/) 注册账号
   - 在 Dashboard 获取你的 [Authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
3. **配置 Token**
   ```bash
   ngrok config add-authtoken <你的TOKEN>
   ```
4. **启动穿透服务**
   ```bash
   ngrok http 8000
   ```
   - 终端会显示公网地址（如 `https://xxxx.ngrok.io`）

#### 方案 2：使用 Localtunnel（无需注册）
1. **安装 Node.js 和 npm**
   ```bash
   brew install node
   ```
2. **安装 Localtunnel**
   ```bash
   npm install -g localtunnel
   ```
3. **启动服务**
   ```bash
   lt --port 8000
   ```
   - 终端会返回类似 `https://happy-lion-123.loca.lt` 的公网地址

---

### 三、访问你的博客
1. 通过终端显示的公网 URL（如 `https://xxxx.ngrok.io` 或 `https://xxx.loca.lt`）在浏览器中访问
2. 确保能看到你的 HTML 博客内容

---

### 四、高级选项（自建 FRP 服务）
*适合有 VPS 服务器的用户*
1. **在 VPS 安装 FRP 服务端**
   ```bash
   wget https://github.com/fatedier/frp/releases/download/v0.51.3/frp_0.51.3_linux_amd64.tar.gz
   tar -zxvf frp_*.tar.gz
   cd frp_*/ && nano frps.ini
   ```
   配置文件内容：
   ```ini
   [common]
   bind_port = 7000
   ```
2. **启动 FRP 服务端**
   ```bash
   ./frps -c frps.ini
   ```
3. **在 Mac 配置 FRP 客户端**
   - 下载对应 Mac 版本的 FRP
   - 编辑 `frpc.ini`：
     ```ini
     [common]
     server_addr = 你的VPS_IP
     server_port = 7000

     [web]
     type = tcp
     local_port = 8000
     remote_port = 80
     ```
4. **启动客户端**
   ```bash
   ./frpc -c frpc.ini
   ```
5. 通过 `http://VPS_IP:80` 访问


>  使用 cf 创建隧道，连接到memo

(base) apple@AppledeMacBook-Air ~ % cloudflared tunnel login

A browser window should have opened at the following URL:

https://dash.cloudflare.com/argotunnel?aud=&callback=https%3A%2F%2Flogin.cloudflareaccess.org%2Fh5H3DoFXkncGpMtMw1VwlE0yvaUdaylAwgYAwjJkcCM%3D
  
If the browser failed to open, please visit the URL above directly in your browser.

2025-03-20T02:25:26Z INF You have successfully logged in.

If you wish to copy your credentials to a server, they have been saved to:

/Users/apple/.cloudflared/cert.pem

  

#### (base) apple@AppledeMacBook-Air ~ % cloudflared tunnel create memo-tunnel

Tunnel credentials written to /Users/apple/.cloudflared/334431e9-f6b0-4aa9-a50c-87f504ef103f.json. cloudflared chose this file based on where your origin certificate was found. Keep this file secret. To revoke these credentials, delete the tunnel.

  

Created tunnel memo-tunnel with id 334431e9-f6b0-4aa9-a50c-87f504ef103f

#### (base) apple@AppledeMacBook-Air ~ % nano ~/.cloudflared/config.yml

#### (base) apple@AppledeMacBook-Air ~ % 

#### (base) apple@AppledeMacBook-Air ~ % nano ~/.cloudflared/config.yml

#### (base) apple@AppledeMacBook-Air ~ % cloudflared tunnel run memo-tunnel
---

### 注意事项
1. **文件命名**：建议将 HTML 文件命名为 `index.html` 以便直接访问
2. **防火墙**：确保 Mac 防火墙允许入站连接（系统偏好设置 → 安全与隐私 → 防火墙）
3. **稳定性**：免费工具（如 ngrok）可能限速或限制会话时长，长期使用建议付费方案
4. **安全性**：仅暴露必要端口，测试后及时关闭服务

完成以上步骤后，你的本地 HTML 博客即可通过公网访问！