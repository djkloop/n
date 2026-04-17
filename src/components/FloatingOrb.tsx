export function FloatingOrb({ className }: { className: string }) {
  return (
    <div className={`absolute rounded-full blur-3xl opacity-30 animate-pulse-glow ${className}`} />
  );
}