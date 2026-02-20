import { useNavigate } from "react-router-dom";
import DecryptedText from "@/components/DecryptedText";

const navButtons = [
  { path: "/totient", label: "Euler's Totient Function", icon: "φ", desc: "Compute φ(n) with step-by-step derivation" },
  { path: "/fermat", label: "Fermat's Little Theorem", icon: "Fp", desc: "Verify a^(p−1) ≡ 1 (mod p)" },
  { path: "/euler", label: "Euler's Theorem", icon: "Eθ", desc: "Verify a^φ(n) ≡ 1 (mod n)" },
  { path: "/crt", label: "Chinese Remainder Theorem", icon: "中", desc: "Solve simultaneous congruences" },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden bg-background scanline flex flex-col relative">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex-shrink-0">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full glow-primary" style={{ background: 'radial-gradient(circle at 40% 35%, #1e3a5f, #0a1628)' }}>
              <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: '50%' }}>
                <circle cx="24" cy="24" r="24" fill="url(#bgGrad)" />
                <circle cx="24" cy="24" r="22" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
                <path d="M24 8 L34 12 L34 22 Q34 30 24 36 Q14 30 14 22 L14 12 Z" fill="url(#shieldGrad)" stroke="#60a5fa" strokeWidth="0.8" />
                <rect x="20" y="22" width="8" height="7" rx="1.5" fill="#1e40af" stroke="#93c5fd" strokeWidth="0.5" />
                <path d="M21.5 22 L21.5 19.5 Q21.5 17 24 17 Q26.5 17 26.5 19.5 L26.5 22" fill="none" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="24" cy="25.5" r="1.2" fill="#60a5fa" />
                <defs>
                  <radialGradient id="bgGrad" cx="40%" cy="35%">
                    <stop offset="0%" stopColor="#1e3a5f" />
                    <stop offset="100%" stopColor="#060d1a" />
                  </radialGradient>
                  <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground text-glow">
                CipherMath
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome banner */}
      <div className="px-6 py-5 flex-shrink-0 flex flex-col items-center justify-center gap-1">
        <h2 className="font-display text-3xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
          <DecryptedText
            text="Welcome to CipherMath"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={80}
            className="text-foreground text-glow"
            encryptedClassName="text-primary/60"
          />
        </h2>
        <p className="text-sm">
          <DecryptedText
            text="A place to simulate mathematical theorems"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={65}
            className="text-muted-foreground"
            encryptedClassName="text-primary/30"
          />
        </p>
      </div>

      {/* Main content — fixed height, no scroll */}
      <main className="flex-1 overflow-hidden px-6 py-4">
        <div className="mx-auto max-w-4xl h-full flex flex-col gap-4">

          {/* What is Cryptography */}
          <section className="rounded-xl border border-border bg-card px-6 py-4 space-y-2 flex-shrink-0">
            <h2 className="font-display text-lg font-bold text-foreground text-glow">What is Cryptography?</h2>
            <p className="text-sm text-card-foreground leading-relaxed">
              Cryptography is the science of securing information using mathematics.
              It protects data by converting readable information into a secret form that unauthorized people cannot understand.
            </p>
            <p className="text-xs text-muted-foreground italic">
              In simple words: It is like locking your message inside a safe before sending it.
            </p>
            <p className="text-sm text-card-foreground leading-relaxed">
              Modern systems like online banking, messaging apps, and digital signatures use cryptography to keep data secure.
            </p>
          </section>

          {/* Encryption & Decryption */}
          <div className="grid gap-4 md:grid-cols-2 flex-shrink-0">
            <section className="rounded-xl border border-border bg-card px-6 py-4 space-y-2">
              <h2 className="font-display text-base font-bold text-foreground">🔒 How Encryption Works</h2>
              <p className="text-sm text-card-foreground leading-relaxed">
                Encryption is the process of converting normal text (<span className="text-primary font-semibold">plaintext</span>) into
                unreadable text (<span className="text-accent font-semibold">ciphertext</span>).
              </p>
              <div className="rounded-lg border border-border bg-secondary p-3 font-mono text-sm space-y-1">
                <p className="text-muted-foreground">Plaintext: <span className="text-primary">HELLO</span></p>
                <p className="text-muted-foreground">Encrypted: <span className="text-accent">XJ92K</span></p>
              </div>
              <p className="text-xs text-muted-foreground italic">
                Think of it like: You write a message and lock it with a special key.
              </p>
            </section>

            <section className="rounded-xl border border-border bg-card px-6 py-4 space-y-2">
              <h2 className="font-display text-base font-bold text-foreground">🔓 How Decryption Works</h2>
              <p className="text-sm text-card-foreground leading-relaxed">
                Decryption is the reverse process. It converts the ciphertext back into readable text using a key.
              </p>
              <p className="text-sm text-card-foreground leading-relaxed">
                Only someone with the <span className="text-primary font-semibold">correct key</span> can unlock the message.
              </p>
              <p className="text-xs text-muted-foreground italic">
                Real-world example: It's like sending a locked box. Only the person with the correct key can open it.
              </p>
            </section>
          </div>

          {/* Why Cryptography */}
          <section className="rounded-xl border border-border bg-card px-6 py-4 space-y-3 flex-shrink-0">
            <h2 className="font-display text-lg font-bold text-foreground text-glow">Why Cryptography is Needed</h2>
            <p className="text-sm text-card-foreground leading-relaxed">
              In today's digital world, data travels across the internet constantly.
              Without protection, anyone could read, modify, or steal that data. Cryptography ensures:
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { title: "Confidentiality", desc: "Only authorized people can read data" },
                { title: "Integrity", desc: "Data is not altered during transmission" },
                { title: "Authentication", desc: "Identity of sender is verified" },
                { title: "Digital Signatures", desc: "Proof that a message is genuine" },
              ].map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-secondary px-3 py-2 space-y-0.5">
                  <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-foreground">
              Without cryptography: online banking would not be safe, passwords could be stolen easily, and secure communication would not exist.
            </p>
          </section>

        </div>
      </main>

      {/* Floating right-side nav icons */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {navButtons.map((btn) => (
          <div key={btn.path} className="group relative flex items-center justify-end">
            {/* Plain text label — slides in from right on hover, no background card */}
            <span className="
              absolute right-[52px] whitespace-nowrap
              text-xs font-semibold text-foreground
              opacity-0 pointer-events-none
              translate-x-1
              group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200
            ">
              {btn.label}
            </span>

            {/* Round icon button — no hover style change */}
            <button
              onClick={() => navigate(btn.path)}
              className="
                flex h-10 w-10 items-center justify-center
                rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground
                transition-none
                shadow-md
                border border-primary/40
                cursor-pointer
              "
            >
              {btn.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
