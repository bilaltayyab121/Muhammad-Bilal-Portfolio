export default function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-stage" />

      <div className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-brand-600/25 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[120px] animate-blob [animation-delay:-4s]" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[120px] animate-blob [animation-delay:-8s]" />

      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
