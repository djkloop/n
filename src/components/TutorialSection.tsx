"use client";

import { useState } from "react";
import { GlowCard } from "./GlowCard";

function fallbackCopyText(text: string) {
 const textArea = document.createElement("textarea");
 textArea.value = text;
 textArea.setAttribute("readonly", "true");
 textArea.style.position = "fixed";
 textArea.style.top = "-9999px";
 textArea.style.left = "-9999px";
 document.body.appendChild(textArea);
 textArea.focus();
 textArea.select();

 try {
 return document.execCommand("copy");
 } finally {
 document.body.removeChild(textArea);
 }
}

export function TutorialSection() {
  const [activeTab, setActiveTab] = useState("claude-code");
  const [activePlatform, setActivePlatform] = useState("windows");
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const tutorials = [
    { id: "claude-code", name: "Claude Code" },
    { id: "codex", name: "Codex CLI" },
    { id: "gemini", name: "Gemini CLI" },
    { id: "opencode", name: "OpenCode" },
  ];

  const platforms = [
    { id: "windows", name: "Windows" },
    { id: "macos", name: "macOS" },
    { id: "linux", name: "Linux" },
  ];

  const getPlatformPath = (platform: string) => {
    switch (platform) {
      case "windows":
        return "%USERPROFILE%\\.claude\\settings.json";
      case "macos":
        return "~/.claude/settings.json";
      case "linux":
        return "~/.claude/settings.json";
      default:
        return "";
    }
  };

  const getTerminalCommand = (platform: string) => {
    switch (platform) {
      case "windows":
        return "mkdir %USERPROFILE%\\.claude";
      case "macos":
        return "mkdir -p ~/.claude";
      case "linux":
        return "mkdir -p ~/.claude";
      default:
        return "";
    }
  };

  const getCodexTerminalCommand = (platform: string) => {
    switch (platform) {
      case "windows":
        return "mkdir %USERPROFILE%\\.codex";
      case "macos":
        return "mkdir -p ~/.codex";
      case "linux":
        return "mkdir -p ~/.codex";
      default:
        return "";
    }
  };

  const getCodexPath = (platform: string) => {
    switch (platform) {
      case "windows":
        return "%USERPROFILE%\\.codex";
      case "macos":
        return "~/.codex";
      case "linux":
        return "~/.codex";
      default:
        return "";
    }
  };

  const copyToClipboard = async (text: string, step: number) => {
    try {
 if (navigator.clipboard?.writeText) {
 await navigator.clipboard.writeText(text);
 } else if (!fallbackCopyText(text)) {
 throw new Error("fallback copy failed");
 }
      setCopiedStep(step);
      setCopyFeedback("复制成功");
      setTimeout(() => setCopiedStep(null), 2000);
      setTimeout(() => setCopyFeedback(null), 2000);
    } catch {
      setCopyFeedback("复制失败，请手动复制");
      setTimeout(() => setCopyFeedback(null), 2500);
    }
  };

  return (
    <section className="py-28 md:py-40 px-6 md:px-16 lg:px-24 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.25em] font-medium px-3 py-1.5 rounded-full border mb-5" style={{ borderColor: 'var(--border)', color: 'var(--foreground-muted)' }}>
              Tutorial
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              如何配置
            </h2>
            <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: 'var(--foreground-muted)', maxWidth: '36ch' }}>
              选择你的 AI 编程工具，3 步完成配置即可开始使用。
            </p>

            <div className="inline-flex items-center gap-3 text-sm px-4 py-2.5 rounded-full" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.1)', color: 'var(--primary)' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>仅需 3 步完成配置</span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="flex gap-1.5 p-1 rounded-xl mb-6" style={{ backgroundColor: 'var(--background)' }}>
              {tutorials.map((tutorial) => (
                <button
                  key={tutorial.id}
                  onClick={() => setActiveTab(tutorial.id)}
                  className={`relative flex-1 px-5 py-3 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-200 ${
                    activeTab === tutorial.id ? "shadow-sm" : "hover:text-[var(--foreground)]"
                  }`}
                  style={activeTab === tutorial.id
                    ? { backgroundColor: 'var(--background-raised)', color: 'var(--foreground)', boxShadow: 'var(--shadow-soft)' }
                    : { color: 'var(--foreground-muted)' }
                  }
                >
                  {tutorial.name}
                </button>
              ))}
            </div>

            <GlowCard className="overflow-hidden">
              <div className="p-6 md:p-8">
                <div key={activeTab} className="animate-fade-in-up">
                  {activeTab === "claude-code" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.15)', color: 'var(--primary)' }}>1</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">获取 Claude Code 专用 API Token</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>访问控制台创建密钥，选择 Claude Code 相关分组</p>
                          <a href="https://cybertruckai.top/console/token" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-[var(--primary)] hover:translate-x-1" style={{ color: 'var(--foreground)' }}>
                            https://cybertruckai.top/console/token
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 250 / 0.15)', color: 'var(--accent)' }}>2</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建配置目录</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>选择你的系统平台</p>

                          <div className="flex gap-1.5 p-1 rounded-lg mb-4" style={{ backgroundColor: 'var(--background)' }}>
                            {platforms.map((platform) => (
                              <button
                                key={platform.id}
                                onClick={() => setActivePlatform(platform.id)}
                                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 ${
                                  activePlatform === platform.id ? "" : "hover:opacity-80"
                                }`}
                                style={activePlatform === platform.id
                                  ? { backgroundColor: 'var(--background-raised)', color: 'var(--foreground)', boxShadow: 'var(--shadow-soft)' }
                                  : { color: 'var(--foreground-muted)' }
                                }
                              >
                                {platform.name}
                              </button>
                            ))}
                          </div>

                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md mb-4" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(getTerminalCommand(activePlatform), 2)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`> ${getTerminalCommand(activePlatform)}`}
                            </pre>
                          </div>

                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>配置文件位置</p>
                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(getPlatformPath(activePlatform), 2.1)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2.1 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{getPlatformPath(activePlatform)}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 280 / 0.15)', color: 'var(--accent-secondary)' }}>3</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">写入配置</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>将以下内容粘贴到 settings.json</p>
                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(`{\n  "env": {\n    "ANTHROPIC_AUTH_TOKEN": "你的API Key",\n    "ANTHROPIC_BASE_URL": "https://cybertruckai.top/v1"\n  }\n}`, 3)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 3 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://cybertruckai.top/v1"
  }
}`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex items-start gap-3" style={{ borderColor: 'var(--border)' }}>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>保存后重启 Claude Code 即可生效。请将 <code className="px-1.5 py-0.5 rounded text-xs mx-1" style={{ backgroundColor: 'var(--border)' }}>你的API Key</code> 替换为实际密钥。</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "codex" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.15)', color: 'var(--primary)' }}>1</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">获取 Codex 专用 API Token</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>访问控制台创建密钥，选择 Codex 相关分组</p>
                          <a href="https://cybertruckai.top/console/token" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-[var(--primary)] hover:translate-x-1" style={{ color: 'var(--foreground)' }}>
                            https://cybertruckai.top/console/token
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 250 / 0.15)', color: 'var(--accent)' }}>2</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建配置文件夹</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>选择你的系统平台</p>

                          <div className="flex gap-1.5 p-1 rounded-lg mb-4" style={{ backgroundColor: 'var(--background)' }}>
                            {platforms.map((platform) => (
                              <button
                                key={platform.id}
                                onClick={() => setActivePlatform(platform.id)}
                                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 ${
                                  activePlatform === platform.id ? "" : "hover:opacity-80"
                                }`}
                                style={activePlatform === platform.id
                                  ? { backgroundColor: 'var(--background-raised)', color: 'var(--foreground)', boxShadow: 'var(--shadow-soft)' }
                                  : { color: 'var(--foreground-muted)' }
                                }
                              >
                                {platform.name}
                              </button>
                            ))}
                          </div>

                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md mb-4" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(getCodexTerminalCommand(activePlatform), 2)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`> ${getCodexTerminalCommand(activePlatform)}
> cd ${getCodexPath(activePlatform)}`}
                            </pre>
                          </div>

                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>配置文件位置</p>
                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(getCodexPath(activePlatform), 2.1)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2.1 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{getCodexPath(activePlatform)}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 280 / 0.15)', color: 'var(--accent-secondary)' }}>3</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建配置文件</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>在同一目录下创建两个配置文件</p>

                          <div className="mb-4">
                            <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)' }}>config.toml</p>
                            <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                              <div className="absolute top-2 right-2 z-10">
                                <button
                                  onClick={() => copyToClipboard(`approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-4o"
model_reasoning_effort = "xhigh"
plan_mode_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "https://cybertruckai.top/v1"
wire_api = "responses"
requires_openai_auth = true`, 3)}
                                  className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                  style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                                >
                                  {copiedStep === 3 ? "✓ 已复制" : "复制"}
                                </button>
                              </div>
                              <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`approval_policy = "never"
sandbox_mode = "danger-full-access"
model_provider = "cybertruckai"
model = "gpt-4o"
model_reasoning_effort = "xhigh"
plan_mode_reasoning_effort = "xhigh"
model_reasoning_summary = "detailed"
network_access = "enabled"
disable_response_storage = true
windows_wsl_setup_acknowledged = true
model_verbosity = "high"

[model_providers.cybertruckai]
name = "cybertruckai"
base_url = "https://cybertruckai.top/v1"
wire_api = "responses"
requires_openai_auth = true`}
                              </pre>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)' }}>auth.json</p>
                            <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                              <div className="absolute top-2 right-2 z-10">
                                <button
                                  onClick={() => copyToClipboard(`{
  "OPENAI_API_KEY": "粘贴为Codex专用分组密钥key"
}`, 4)}
                                  className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                  style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                                >
                                  {copiedStep === 4 ? "✓ 已复制" : "复制"}
                                </button>
                              </div>
                              <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`{
  "OPENAI_API_KEY": "粘贴为Codex专用分组密钥key"
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex items-start gap-3" style={{ borderColor: 'var(--border)' }}>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>保存后重启 Codex CLI 即可生效。请将 <code className="px-1.5 py-0.5 rounded text-xs mx-1" style={{ backgroundColor: 'var(--border)' }}>粘贴为Codex专用分组密钥key</code> 替换为实际密钥。</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "gemini" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.15)', color: 'var(--primary)' }}>1</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">获取 Gemini CLI 专用 API Token</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>访问控制台创建密钥，选择 Gemini CLI 相关分组</p>
                          <a href="https://cybertruckai.top/console/token" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-[var(--primary)] hover:translate-x-1" style={{ color: 'var(--foreground)' }}>
                            https://cybertruckai.top/console/token
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 250 / 0.15)', color: 'var(--accent)' }}>2</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建 .gemini 文件夹</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>选择你的系统平台</p>

                          <div className="flex gap-1.5 p-1 rounded-lg mb-4" style={{ backgroundColor: 'var(--background)' }}>
                            {platforms.map((platform) => (
                              <button
                                key={platform.id}
                                onClick={() => setActivePlatform(platform.id)}
                                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 ${
                                  activePlatform === platform.id ? "" : "hover:opacity-80"
                                }`}
                                style={activePlatform === platform.id
                                  ? { backgroundColor: 'var(--background-raised)', color: 'var(--foreground)', boxShadow: 'var(--shadow-soft)' }
                                  : { color: 'var(--foreground-muted)' }
                                }
                              >
                                {platform.name}
                              </button>
                            ))}
                          </div>

                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md mb-4" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(activePlatform === "windows" ? "mkdir %USERPROFILE%\\.gemini" : "mkdir -p ~/.gemini", 2)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`> ${activePlatform === "windows" ? "mkdir %USERPROFILE%\\.gemini" : "mkdir -p ~/.gemini"}`}
                            </pre>
                          </div>

                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>配置位置</p>
                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(activePlatform === "windows" ? "%USERPROFILE%\\.gemini" : "~/.gemini", 2.1)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2.1 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{activePlatform === "windows" ? "%USERPROFILE%\\.gemini" : "~/.gemini"}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 280 / 0.15)', color: 'var(--accent-secondary)' }}>3</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建配置文件</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>在 .gemini 文件夹中创建以下两个文件</p>

                          <div className="mb-4">
                            <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)' }}>.env</p>
                            <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                              <div className="absolute top-2 right-2 z-10">
                                <button
                                  onClick={() => copyToClipboard(`GOOGLE_GEMINI_BASE_URL=https://cybertruckai.top/v1
GEMINI_API_KEY=粘贴为Gemini CLI相关分组密钥key
GEMINI_MODEL=gemini-3-pro-preview`, 3)}
                                  className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                  style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                                >
                                  {copiedStep === 3 ? "✓ 已复制" : "复制"}
                                </button>
                              </div>
                              <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`GOOGLE_GEMINI_BASE_URL=https://cybertruckai.top/v1
GEMINI_API_KEY=粘贴为Gemini CLI相关分组密钥key
GEMINI_MODEL=gemini-3-pro-preview`}
                            </pre>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-medium mb-2" style={{ color: 'var(--foreground)' }}>settings.json</p>
                            <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                              <div className="absolute top-2 right-2 z-10">
                                <button
                                  onClick={() => copyToClipboard(`{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}`, 4)}
                                  className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                  style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                                >
                                  {copiedStep === 4 ? "✓ 已复制" : "复制"}
                                </button>
                              </div>
                              <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`{
  "ide": {
    "enabled": true
  },
  "security": {
    "auth": {
      "selectedType": "gemini-api-key"
    }
  }
}`}
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t flex items-start gap-3" style={{ borderColor: 'var(--border)' }}>
                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>配置文件更加安全且便于管理，需要重启 Gemini CLI 才生效。</p>
                      </div>
                    </div>
                  )}

                  {activeTab === "opencode" && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.15)', color: 'var(--primary)' }}>1</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">获取 OpenCode 专用 API Token</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>访问控制台创建密钥，选择 OpenCode 相关分组</p>
                          <a href="https://cybertruckai.top/console/token" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 hover:text-[var(--primary)] hover:translate-x-1" style={{ color: 'var(--foreground)' }}>
                            https://cybertruckai.top/console/token
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 250 / 0.15)', color: 'var(--accent)' }}>2</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">创建配置文件</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>选择你的系统平台</p>

                          <div className="flex gap-1.5 p-1 rounded-lg mb-4" style={{ backgroundColor: 'var(--background)' }}>
                            {platforms.map((platform) => (
                              <button
                                key={platform.id}
                                onClick={() => setActivePlatform(platform.id)}
                                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-all duration-200 ${
                                  activePlatform === platform.id ? "" : "hover:opacity-80"
                                }`}
                                style={activePlatform === platform.id
                                  ? { backgroundColor: 'var(--background-raised)', color: 'var(--foreground)', boxShadow: 'var(--shadow-soft)' }
                                  : { color: 'var(--foreground-muted)' }
                                }
                              >
                                {platform.name}
                              </button>
                            ))}
                          </div>

                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>配置文件位置</p>
                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md mb-4" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(
                                  activePlatform === "windows" 
                                    ? "%APPDATA%\\opencode\\opencode.json"
                                    : activePlatform === "macos"
                                    ? "~/.config/opencode/opencode.json"
                                    : "~/.config/opencode/opencode.json", 2
                                )}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 2 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
                            <pre className="text-xs leading-relaxed p-4 overflow-x-auto font-mono" style={{ color: 'var(--foreground-muted)' }}>
{activePlatform === "windows" 
  ? "%APPDATA%\\opencode\\opencode.json"
  : "~/.config/opencode/opencode.json"}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 group">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'oklch(60% 0.14 280 / 0.15)', color: 'var(--accent-secondary)' }}>3</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold mb-2">写入配置</h3>
                          <p className="text-sm mb-3" style={{ color: 'var(--foreground-muted)' }}>创建 opencode.json 配置文件</p>

                          <div className="relative group/card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md mb-4" style={{ backgroundColor: 'var(--surface-code)', border: '1px solid var(--border)' }}>
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => copyToClipboard(`{
  "provider": {
    "cybertruckai": {
      "options": {
        "baseURL": "https://cybertruckai.top/v1",
        "apiKey": "替换为你的key"
      },
      "models": {
        "gpt-5.4": {
          "name": "GPT-5.4",
          "limit": {
            "context": 1050000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.3": {
          "name": "GPT-5.3",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.3-codex": {
          "name": "GPT-5.3 Codex",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.4-mini": {
          "name": "GPT-5.4 Mini",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        }
      }
    }
  },
  "agent": {
    "build": {
      "options": {
        "store": false
      }
    },
    "plan": {
      "options": {
        "store": false
      }
    }
  },
  "$schema": "https://opencode.ai/config.json"
}`, 3)}
                                className="opacity-0 group-hover/card:opacity-100 transition-all duration-200 px-2 py-1 text-xs rounded hover:scale-105 active:scale-95"
                                style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}
                              >
                                {copiedStep === 3 ? "✓ 已复制" : "复制"}
                              </button>
                            </div>
 <pre className="max-h-96 overflow-auto text-xs leading-relaxed p-4 pr-16 font-mono" style={{ color: 'var(--foreground-muted)' }}>
{`{
"provider": {
"cybertruckai": {
      "options": {
        "baseURL": "https://cybertruckai.top/v1",
        "apiKey": "替换为你的key"
      },
      "models": {
        "gpt-5.4": {
          "name": "GPT-5.4",
          "limit": {
            "context": 1050000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.3": {
          "name": "GPT-5.3",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.3-codex": {
          "name": "GPT-5.3 Codex",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        },
        "gpt-5.4-mini": {
          "name": "GPT-5.4 Mini",
          "limit": {
            "context": 400000,
            "output": 128000
          },
          "options": {
            "store": false
          },
          "variants": {
            "low": {},
            "medium": {},
            "high": {},
            "xhigh": {}
          }
        }
      }
    }
  },
  "agent": {
    "build": {
      "options": {
        "store": false
      }
    },
    "plan": {
      "options": {
        "store": false
      }
    }
  },
  "$schema": "https://opencode.ai/config.json"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                        <h4 className="text-sm font-semibold mb-3">切换思考强度</h4>
                        <p className="text-xs mb-3" style={{ color: 'var(--foreground-muted)' }}>在 OpenCode 中，使用 <kbd className="px-1.5 py-0.5 rounded text-xs font-mono mx-1" style={{ backgroundColor: 'var(--border)' }}>Ctrl + T</kbd> 可以切换模型推理强度</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: "low", label: "低", desc: "思考最浅、速度最快，适合简单任务" },
                            { key: "medium", label: "中", desc: "平衡速度与质量，日常编程推荐" },
                            { key: "high", label: "高", desc: "更深入分析，适合复杂逻辑问题" },
                            { key: "xhigh", label: "极高", desc: "思考最深，适合棘手问题" },
                          ].map((item) => (
                            <div key={item.key} className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                              <kbd className="flex-shrink-0 px-1.5 py-0.5 rounded text-xs font-mono" style={{ backgroundColor: 'var(--border)', color: 'var(--foreground-muted)' }}>{item.key}</kbd>
                              <span className="text-xs" style={{ color: 'var(--foreground-muted)' }}>{item.desc}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'oklch(65% 0.18 145 / 0.08)' }}>
                          <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                            <span className="font-medium" style={{ color: 'var(--primary)' }}>使用建议：</span>
                            先用 Tab 切到 Plan 模式梳理需求，再切回 Build 模式写代码。默认先用 medium，卡住或需要更优解时再切到 high / xhigh。
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </GlowCard>
          </div>
        </div>

        <div
          aria-live="polite"
          className={`fixed left-1/2 bottom-6 z-50 -translate-x-1/2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            copyFeedback
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none translate-y-2 opacity-0"
          }`}
          style={{
            backgroundColor: 'var(--background-raised)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          {copyFeedback}
        </div>
      </div>
    </section>
  );
}
