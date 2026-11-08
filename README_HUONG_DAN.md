# Antigravity Premium Web Toolkit — Hướng dẫn nhanh

Tệp này là BỘ TĂNG CƯỜNG, không phải ứng dụng website hoàn chỉnh. Kết hợp với repo Website Cloner hoặc website hiện có.

## 1. Tạo website (Mac / Windows Terminal)

Cài Node.js 24 trở lên (cho template Website Cloner). Mở Terminal:

```bash
git clone https://github.com/JCodesMore/ai-website-cloner-template.git my-premium-web
cd my-premium-web
npm install
```

Mở thư mục `my-premium-web` trong Antigravity.

## 2. Chép bộ tăng cường vào dự án

Giải nén gói. **Chỉ copy** 3 thư mục từ `.agents/`: `rules/`, `skills/reference-to-premium-website/` và `agents/` vào `.agents/` của dự án. Không ghi đè `.agents/skills/clone-website/` hay AGENTS.md đã có trong template.

`premium-web-director` chỉ có tác dụng tại các bề mặt Antigravity hỗ trợ custom agents (đặc biệt App/CLI). Skill+rule dùng được độc lập khi IDE không hiển thị agent riêng.

## 3. Cài skill ngoại vi (ưu tiên)

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai antigravity
npx skills add vercel-labs/agent-skills
```

Trong trình chọn `skills`, ưu tiên `web-design-guidelines`, `react-best-practices`, và nếu có thể thì đích Antigravity. Một số phiên bản CLI dùng tên khác hoặc danh sách khác; kiểm tra bằng `npx skills --help` trước khi tự động hóa.

## 4. MCP

Antigravity: Agent panel > `...` > MCP Servers > Manage MCP Servers > View raw config.

Nếu muốn Playwright MCP, **gộp** nội dung `.agents/mcp_playwright.example.json` vào `mcpServers` hiện có trong `mcp_config.json` (hoặc cài từ MCP Store). Không thay thế file config đang chứa server khác.

Antigravity đã có browser tích hợp. Có thể không cần Chrome DevTools MCP riêng nếu Browser Subagent hoạt động tốt.

Nếu muốn kho component 21st.dev, tạo khóa tại https://21st.dev/mcp rồi **gộp** `.agents/mcp_21st.example.json`. Thay REPLACE_WITH_YOUR_21ST_API_KEY, không commit khóa lên GitHub. Ưu tiên kho lưu bí mật an toàn của MCP client nếu có.

## 5. Chạy

Dán nội dung `ANTIGRAVITY_MASTER_PROMPT.md` vào Antigravity và thay URL. Với template Website Cloner, skill `.agents/skills/clone-website/` đã có và có thể được gọi cùng skill tăng cường mới.

Kiểm tra các skill xuất hiện trong Antigravity; tùy bề mặt sản phẩm có thể dùng slash command `/reference-to-premium-website`.

Chạy `npm run dev` và kiểm tra terminal để biết địa chỉ local; thường là http://localhost:3000.

## 6. An toàn và kỳ vọng

- Không bảo đảm giống 100% bản gốc khi web chặn truy cập, có nội dung động, API riêng hay tài nguyên chưa được cấp phép.
- Không sử dụng ảnh, nhãn hiệu, nội dung độc quyền của bên thứ ba cho website riêng khi không có quyền.
- Không cấu hình tự duyệt mọi thao tác nguy hiểm. Nên cho phép hoạt động đọc/kiểm thử và yêu cầu duyệt trước khi xóa dữ liệu, đổi cấu hình máy, đẩy production.
- Dùng Git branch/worktree để tránh Codex và Antigravity ghi đè nhau.
