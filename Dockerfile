# 使用 Node.js 20-alpine 作為基礎映像
FROM node:20-alpine

# 設定工作目錄
WORKDIR /app

# 安裝 npm
RUN npm install 

# 複製 package.json 與 pnpm-lock.yaml 至容器（利用快取優化安裝依賴）
COPY package.json ./

# 安裝所有依賴（包含開發依賴）
RUN npm install

# 複製專案所有檔案到容器內
COPY . .

# 暴露開發用的端口（根據專案設定調整）
EXPOSE 5173

# 啟動開發伺服器（支援熱重載等功能）
CMD ["npm", "run", "dev"]
