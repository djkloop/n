export function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">CyberTruckAI</span>
            </div>
            <p className="text-[var(--foreground-muted)] leading-relaxed">
              专为开发者设计的 AI API 服务，通过 URL 轻松创建和部署。
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-6">产品</h5>
            <ul className="space-y-4">
              <li><a href="#features" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">功能</a></li>
              <li><a href="#pricing" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">定价</a></li>
              <li><a href="#models" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">模型广场</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-6">资源</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">文档</a></li>
              <li><a href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">API</a></li>
              <li><a href="#tutorial" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">教程</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-6">更多</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">GitHub</a></li>
              <li><a href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">联系</a></li>
              <li><a href="#" className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-300">关于</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border-light)] flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-[var(--foreground-muted)]/50">
            © 2026 CyberTruckAI. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm text-[var(--foreground-muted)]/50">
            <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">隐私政策</a>
            <a href="#" className="hover:text-[var(--foreground)] transition-colors duration-300">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}