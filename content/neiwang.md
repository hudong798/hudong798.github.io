---
title: "内网穿透演示"
author: "Holdon"
slug: "neiwangyanshi-2025"
date: 2025-03-10
---

这里是优化后的 Markdown 版本，格式更加清晰、专业，并增强了可读性：  

---
# **Mac 本地 HTML 博客通过内网穿透实现公网访问**
## **1. 启动本地 Web 服务器**
### **方法 1：使用 Python 内置服务器**
1. 打开终端，进入 HTML 文件所在目录：
   ```bash
   cd /Users/apple/Desktop/
   ```
2. 启动 Python HTTP 服务器（默认端口 `8000`）：
   ```bash
   python3 -m http.server 8000
   ```
   *若端口被占用，可更换端口号，例如 `8080`：*
   ```bash
   python3 -m http.server 8080
   ```

### **方法 2：使用 PHP 内置服务器**
1. 进入 HTML 目录：
   ```bash
   cd /Users/apple/Desktop/
   ```
2. 启动 PHP 服务器（默认端口 `8000`）：
   ```bash
   php -S localhost:8000
   ```

---

## **2. 选择内网穿透工具**
### **方案 1：使用 Ngrok（推荐）**
1. **安装 Ngrok**
   ```bash
   brew install ngrok/ngrok/ngrok
   ```
2. **注册并获取 Token**
   - 访问 [Ngrok 官网](https://ngrok.com/) 注册账号
   - 在 [Dashboard](https://dashboard.ngrok.com/get-started/your-authtoken) 复制 **Authtoken**
3. **配置 Token**
   ```bash
   ngrok config add-authtoken <你的TOKEN>
   ```
4. **启动内网穿透**
   ```bash
   ngrok http 8000
   ```
   *终端将返回公网访问地址，如：*  
   ```
   Forwarding  https://xxxx.ngrok.io -> http://localhost:8000
   ```

---

### **方案 2：使用 Localtunnel（无需注册）**
1. **安装 Node.js 和 npm**
   ```bash
   brew install node
   ```
2. **安装 Localtunnel**
   ```bash
   npm install -g localtunnel
   ```
3. **启动穿透**
   ```bash
   lt --port 8000
   ```
   *终端返回公网访问地址，如：*  
   ```
   Your URL is: https://happy-lion-123.loca.lt
   ```

---

## **3. 访问博客**
1. **浏览器访问** 终端显示的公网 URL，例如：
   - `https://xxxx.ngrok.io`
   - `https://xxx.loca.lt`
2. **确保 HTML 页面正确加载**，并检查 CSS、JavaScript 等资源是否可用。

---

## **4. 高级方案（FRP 内网穿透）**
*适用于拥有 VPS 服务器的用户*

### **4.1 在 VPS 安装 FRP**
```bash
wget https://github.com/fatedier/frp/releases/download/v0.51.3/frp_0.51.3_linux_amd64.tar.gz
tar -zxvf frp_*.tar.gz
cd frp_*/ && nano frps.ini
```
**`frps.ini` 配置：**
```ini
[common]
bind_port = 7000
```

### **4.2 启动 FRP 服务器**
```bash
./frps -c frps.ini
```

### **4.3 在 Mac 配置 FRP 客户端**
1. 下载适用于 **Mac** 的 FRP  
2. **编辑 `frpc.ini`**：
   ```ini
   [common]
   server_addr = 你的VPS_IP
   server_port = 7000

   [web]
   type = tcp
   local_port = 8000
   remote_port = 80
   ```
3. **启动 FRP 客户端**
   ```bash
   ./frpc -c frpc.ini
   ```
4. **公网访问地址**
   - `http://VPS_IP:80`

---

## **5. 使用 Cloudflare Tunnel 进行穿透**
1. **安装 Cloudflare Tunnel**
   ```bash
   brew install cloudflared
   ```
2. **登录 Cloudflare**
   ```bash
   cloudflared tunnel login
   ```
   *成功后，Cloudflare 会生成证书文件：*
   ```
   /Users/apple/.cloudflared/cert.pem
   ```
3. **创建隧道**
   ```bash
   cloudflared tunnel create memo-tunnel
   ```
   *终端返回隧道 ID，例如：*
   ```
   Created tunnel memo-tunnel with id 334431e9-f6b0-4aa9-a50c-87f504ef103f
   ```
4. **配置 `config.yml`**
   ```bash
   nano ~/.cloudflared/config.yml
   ```
   配置示例：
   ```yaml
   tunnel: memo-tunnel
   credentials-file: /Users/apple/.cloudflared/334431e9-f6b0-4aa9-a50c-87f504ef103f.json

   ingress:
     - hostname: blog.example.com
       service: http://localhost:8000
     - service: http_status:404
   ```
5. **运行隧道**
   ```bash
   cloudflared tunnel run memo-tunnel
   ```

---

## **6. 注意事项**
✅ **文件命名**：建议将 HTML 文件命名为 `index.html`，以便直接访问  
✅ **防火墙设置**：确保 Mac 允许入站连接（系统偏好设置 → 安全与隐私 → 防火墙）  
✅ **稳定性**：免费工具（如 Ngrok）可能限速或限制会话时长，长期使用建议付费方案  
✅ **安全性**：建议使用 HTTPS 或 Cloudflare 保护公网访问  

---

以上步骤完成后，你的 **本地 HTML 博客** 即可通过公网访问 🎉！通过公网访问！