/** Decorative, deterministic stars keep the server and client markup identical. */
export default function GalaxyBackground() {
  return <div className="galaxy-background" aria-hidden="true">
    <div className="galaxy-clouds" />
    <div className="galaxy-dust" />
    <div className="galaxy-spiral"><div className="galaxy-spiral-arms" /><div className="galaxy-core" /></div>
    <div className="galaxy-planet" />
    <div className="galaxy-stars">{Array.from({ length: 90 }, (_, i) => <i key={i} style={{
      left: `${((i * 137.508) % 100).toFixed(3)}%`,
      top: `${((i * 73.217 + 11) % 100).toFixed(3)}%`,
      width: i % 11 === 0 ? 3 : 1.5,
      height: i % 11 === 0 ? 3 : 1.5,
      opacity: .2 + (i % 5) * .14,
    }} />)}</div>
    <div className="galaxy-meteor" />
    <div className="galaxy-vignette" />
  </div>;
}
