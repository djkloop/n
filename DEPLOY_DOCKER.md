# Docker 部署

## 构建并启动

```bash
docker compose up -d --build
```

## 访问

```text
http://<你的服务器IP>:8667
```

## 停止

```bash
docker compose down
```

## 只用 docker 命令

```bash
docker build -t cybertruckai-pages .
docker run -d --name cybertruckai-pages -p 8667:8667 cybertruckai-pages
```
