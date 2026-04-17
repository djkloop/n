"use client";

import { FloatingOrb } from "@/components/FloatingOrb";

export function EndpointCatalogSection() {
  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/create",
      description: "通过 URL 创建新的 API 端点",
      code: `curl -X POST https://api.cybertruck.ai/v1/create \\
  -H "Authorization: Bearer $API_KEY" \\
  -d '{"url": "https://your-service.com/api"}'`,
      color: "var(--primary)",
    },
    {
      method: "GET",
      path: "/api/v1/endpoints",
      description: "列出所有已创建的 API 端点",
      code: `curl https://api.cybertruck.ai/v1/endpoints \\
  -H "Authorization: Bearer $API_KEY"`,
      color: "var(--accent)",
    },
    {
      method: "DELETE",
      path: "/api/v1/endpoints/:id",
      description: "删除指定的 API 端点",
      code: `curl -X DELETE \\
  https://api.cybertruck.ai/v1/endpoints/123 \\
  -H "Authorization: Bearer $API_KEY"`,
      color: "var(--error)",
    },
  ];

  return (
    <section className="relative py-32 px-8">
      <FloatingOrb className="w-[400px] h-[400px] bg-[var(--accent)]/10 -top-40 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 font-display">
            API 端点一览
          </h2>
          <p className="text-xl text-[var(--foreground-muted)] max-w-xl mx-auto">
            简单清晰的 RESTful API，轻松集成到你的工作流
          </p>
        </div>

        <div className="space-y-6">
          {endpoints.map((endpoint, index) => (
            <div
              key={index}
              className="clay-card p-8 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <span
                  className="px-4 py-1.5 rounded-lg text-sm font-bold uppercase w-fit"
                  style={{ backgroundColor: `${endpoint.color}20`, color: endpoint.color }}
                >
                  {endpoint.method}
                </span>
                <code className="font-mono text-lg">{endpoint.path}</code>
              </div>
              <p className="text-[var(--foreground-muted)] mb-6">{endpoint.description}</p>
              <pre className="p-6 rounded-xl bg-[var(--background)] border border-[var(--border)] overflow-x-auto text-sm font-mono text-[var(--foreground-muted)]">
                {endpoint.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}