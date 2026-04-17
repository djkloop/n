"use client";

export function CLISection() {
  return (
    <section id="cli" className="relative py-48 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            主流工具支持
          </h2>
          <p className="text-xl text-[var(--foreground-muted)] max-w-xl">
            无缝集成你最爱的 AI 编程助手，即插即用
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="group relative p-12 rounded-3xl bg-[var(--background-raised)] border border-[var(--border-light)] hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full transform translate-x-32 -translate-y-32 group-hover:translate-x-24 group-hover:-translate-y-24 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center mb-8">
                <span className="text-4xl font-bold text-[var(--accent)]">C</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Claude Code</h3>
              <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">Anthropic 官方 CLI 工具，终端 AI 助手，直接在命令行中完成编程任务</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  支持文件编辑、命令执行
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  多步骤任务推进
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  复杂重构与跨文件修改
                </li>
              </ul>
              <button className="w-full py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--background)] transition-colors text-sm font-medium group/btn active:scale-95">
                <span className="flex items-center justify-center gap-2">
                  查看安装步骤
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="group relative p-12 rounded-3xl bg-[var(--background-raised)] border border-[var(--border-light)] hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full transform translate-x-32 -translate-y-32 group-hover:translate-x-24 group-hover:-translate-y-24 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center mb-8">
                <span className="text-4xl font-bold text-[var(--accent)]">C</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Codex</h3>
              <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">OpenAI 代码助手工作流，适配代码生成、重构、审查等高频开发任务</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  长上下文工程级问题拆解
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  个人开发与团队协作
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  高频开发任务优化
                </li>
              </ul>
              <button className="w-full py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--background)] transition-colors text-sm font-medium group/btn active:scale-95">
                <span className="flex items-center justify-center gap-2">
                  查看安装步骤
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className="group relative p-12 rounded-3xl bg-[var(--background-raised)] border border-[var(--border-light)] hover:border-[var(--accent)]/30 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/5 blur-3xl rounded-full transform translate-x-32 -translate-y-32 group-hover:translate-x-24 group-hover:-translate-y-24 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-[var(--accent)]/10 flex items-center justify-center mb-8">
                <span className="text-4xl font-bold text-[var(--accent)]">G</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Gemini CLI</h3>
              <p className="text-[var(--foreground-muted)] mb-8 leading-relaxed">Google 命令行 AI 开发工具，支持联网检索和复杂任务链处理</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  联网检索能力
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  主流终端工作流兼容
                </li>
                <li className="flex items-center gap-3 text-[var(--foreground-muted)]">
                  <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  文档整理与脚本开发
                </li>
              </ul>
              <button className="w-full py-4 rounded-2xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:bg-[var(--background)] transition-colors text-sm font-medium group/btn active:scale-95">
                <span className="flex items-center justify-center gap-2">
                  查看安装步骤
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}