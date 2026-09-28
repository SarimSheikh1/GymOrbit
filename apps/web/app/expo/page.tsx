import QRCode from "qrcode";

const expoUrl = "exp://192.168.1.33:8081";

export default async function ExpoConnectPage() {
  const qr = await QRCode.toDataURL(expoUrl, { width: 420, margin: 2, color: { dark: "#101828", light: "#ffffff" } });
  return <main className="hero" style={{ display: "grid", placeItems: "center" }}><section className="card" style={{ maxWidth: 520, textAlign: "center", color: "var(--ink)" }}><div className="eyebrow">Expo Go connection</div><h1 style={{ margin: "12px 0" }}>Scan to open GymOrbit</h1><p className="muted">Open Expo Go on your phone, tap <strong>Scan QR code</strong>, then scan this code. Your phone and PC must use the same Wi‑Fi.</p><img src={qr} alt="Expo Go QR code for GymOrbit" width="320" height="320" style={{ maxWidth: "100%", margin: "18px auto", borderRadius: 18 }} /><code style={{ display: "block", padding: 12, borderRadius: 10, background: "var(--bg)", overflowWrap: "anywhere" }}>{expoUrl}</code></section></main>;
}
