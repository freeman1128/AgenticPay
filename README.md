# Weather Service - Agent B

🤖 Agent B - 天气服务提供方 (使用 x402 支付协议)

## 功能

- 提供 **付费天气查询服务**
- 使用 **x402 支付协议**
- 价格: **$0.01/次**
- 网络: **Base Sepolia 测试网** (eip155:84532)

## 架构

```
┌────────────────────────────────────┐
│  Agent B - 天气服务提供方            │
│                                    │
│  ┌────────────────────────────┐    │
│  │  Express + x402 middleware  │    │
│  │  价格: $0.01/次             │    │
│  └────────────────────────────┘    │
│                │                    │
│                ▼                    │
│  ┌────────────────────────────┐    │
│  │  Wallet B (收款方)          │    │
│  │  15150553110@163.com       │    │
│  └────────────────────────────┘    │
└────────────────────────────────────┘
```

## 安装

```bash
npm install
```

## 配置

需要设置环境变量 `PAY_TO` 为 Wallet B 的地址（收款地址）：

```bash
export PAY_TO=0x...你的WalletB地址
```

或者在启动时指定：

```bash
PAY_TO=0x... node index.js
```

## 运行

```bash
npm start
# 或
PAY_TO=0x... node index.js
```

服务将在 `http://localhost:3000` 启动。

## API 端点

### 1. 天气查询 (需付费)

```bash
GET /api/weather?city=<城市名>
```

**返回示例**:
```json
{
  "success": true,
  "data": {
    "city": "Beijing",
    "temperature": 22,
    "condition": "晴朗",
    "humidity": 45,
    "windSpeed": 12,
    "forecast": "未来三天保持晴朗天气"
  },
  "metadata": {
    "service": "Weather Service (Agent B)",
    "network": "eip155:84532",
    "price": "$0.01",
    "paid_to": "0x...",
    "timestamp": "2024-..."
  }
}
```

### 2. 健康检查

```bash
GET /health
```

### 3. 服务信息

```bash
GET /
```

## 使用 Agent A 付费调用

确保 Agent A (Wallet A) 已登录：

```bash
npx awal auth login chenxiaoxing1128@gmail.com
```

调用服务并支付：

```bash
npx awal x402 pay "http://localhost:3000/api/weather?city=Beijing" --chain base-sepolia
```

## 测试流程

### 1. 启动服务

```bash
cd weather-service
PAY_TO=0x... node index.js
```

### 2. 检查服务状态

```bash
curl http://localhost:3000/api/weather?city=Beijing
# 应返回 402 Payment Required
```

### 3. 创建 Wallet B (首次运行)

```bash
npx awal auth login 15150553110@163.com
# 获取 OTP 验证码并验证
npx awal auth verify <flowId> <otp>
# 获取钱包地址
npx awal address
```

### 4. 获取测试网 USDC

访问 Circle 测试网水龙头: https://faucet.circle.com/
- 选择网络: **Base Sepolia**
- 输入 Wallet A 和 Wallet B 的地址
- 每个地址可领取 **20 USDC** (测试币)

### 5. 使用 Wallet A 付费调用

```bash
# 确保登录的是 Wallet A
npx awal auth login chenxiaoxing1128@gmail.com

# 调用服务并支付
npx awal x402 pay "http://localhost:3000/api/weather?city=Beijing" --chain base-sepolia
```

### 6. 验证交易

- 检查 Wallet B 是否收到 $0.01
- 检查 Wallet A 余额是否减少
- 查看服务端日志，分析 x402 协议交互过程

## 日志说明

服务会打印详细的日志信息：

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2024-...] 收到请求
方法: GET
路径: /api/weather
查询参数: { city: 'Beijing' }
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 支付验证成功
   交易详情:
   - 交易哈希: 0x...
   - 支付金额: $0.01
   - 支付者: 0x...
   - 网络: eip155:84532

🌤️  处理天气查询请求
   城市: beijing

✅ 返回天气数据:
   城市: Beijing
   温度: 22°C
   天气: 晴朗
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 支持的城市

当前支持以下城市的模拟天气数据：
- Beijing (北京)
- Shanghai (上海)
- Shenzhen (深圳)

其他城市会返回随机生成的天气数据。

## 技术栈

- **Express.js** - Web 框架
- **@x402/express** - x402 支付中间件
- **@x402/core** - x402 核心协议
- **@x402/evm** - EVM 链支持
- **@x402/extensions** - 扩展功能
- **Base Sepolia** - 测试网络

## 相关链接

- [x402 Protocol](https://github.com/x402-payment/x402)
- [Base Sepolia Faucet](https://faucet.circle.com/)
- [Coinbase Agentic Wallet](https://github.com/coinbase/awal)