export function MetricsSection() {
  const metrics = [
    { label: "API 调用次数", value: "1,234", change: "+12%", up: true },
    { label: "平均响应时间", value: "45ms", change: "-8%", up: false },
    { label: "活跃端点", value: "8", change: "+2", up: true },
    { label: "成功率", value: "99.9%", change: "+0.1%", up: true },
  ];

  return (
    <section className="relative py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 font-display">
            使用量统计
          </h2>
          <p className="text-xl text-[var(--foreground-muted)] max-w-xl mx-auto">
            实时监控你的 API 使用情况，数据一目了然
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <div key={index} className="clay-card p-8 text-center cursor-pointer">
              <p className="text-[var(--foreground-muted)] text-sm mb-3">{metric.label}</p>
              <p className="text-4xl font-bold mb-3 font-display">{metric.value}</p>
              <span
                className={`text-sm font-medium ${
                  metric.up ? 'text-[var(--primary)]' : 'text-[var(--error)]'
                }`}
              >
                {metric.change}
              </span>
            </div>
          ))}
        </div>

        <div className="clay-card p-10 cursor-pointer">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold">最近 7 天调用趋势</h4>
            <span className="text-[var(--foreground-muted)] text-sm">更新于 2 分钟前</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {[40, 65, 45, 80, 55, 70, 90].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{
                  height: `${height}%`,
                  background: `linear-gradient(to top, var(--primary), var(--accent))`,
                  opacity: 0.6 + (index * 0.05),
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-[var(--foreground-muted)]">
            <span>周一</span>
            <span>周二</span>
            <span>周三</span>
            <span>周四</span>
            <span>周五</span>
            <span>周六</span>
            <span>周日</span>
          </div>
        </div>
      </div>
    </section>
  );
}