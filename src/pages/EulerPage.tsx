import { useState } from "react";
import { Link } from "react-router-dom";
import { verifyEulerWithSteps } from "@/lib/numberTheory";

const EulerPage = () => {
  const [a, setA] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState<ReturnType<typeof verifyEulerWithSteps> | null>(null);
  const [error, setError] = useState("");

  const verify = () => {
    const aNum = parseInt(a);
    const nNum = parseInt(n);
    if (isNaN(aNum) || isNaN(nNum) || aNum <= 0 || nNum <= 1) {
      setError("Enter valid positive integers (a > 0, n > 1).");
      setResult(null);
      return;
    }
    if (nNum > 10000) {
      setError("n must be ≤ 10000 for performance.");
      setResult(null);
      return;
    }
    setError("");
    setResult(verifyEulerWithSteps(aNum, nNum));
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary font-display transition-all hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_10px_hsl(160_70%_45%/0.2)]">← Home</Link>
          <h1 className="font-display text-xl font-bold text-foreground text-glow">Euler's Theorem</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Theory */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📘 Definition</h2>
            <p className="text-sm text-card-foreground">
              If a and n are coprime (gcd(a, n) = 1), then:
            </p>
            <p className="font-mono text-accent text-sm">a^φ(n) ≡ 1 (mod n)</p>

            <h2 className="font-display text-lg font-bold text-foreground">📜 Rule</h2>
            <div className="text-sm text-card-foreground space-y-1">
              <p>• a and n must be coprime</p>
              <p>• φ(n) must be calculated first</p>
              <p>This theorem is a generalization of Fermat's Little Theorem.</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🧮 Formula</h2>
            <div className="rounded-lg border border-border bg-secondary p-3 font-mono text-sm text-accent">
              <p>a^φ(n) mod n = 1</p>
              <p>Where φ(n) is Euler's Totient Function.</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🔐 Use in Cryptography</h2>
            <p className="text-sm text-card-foreground">
              This theorem is the mathematical foundation of RSA encryption and decryption.
            </p>
          </section>

          {/* Calculator */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h2 className="font-display text-lg font-bold text-foreground text-glow">Interactive Calculator</h2>

            <div className="flex gap-3">
              <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="Base a"
                className="flex-1 rounded-md border border-border bg-input px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input type="number" value={n} onChange={(e) => setN(e.target.value)} placeholder="Modulus n"
                className="flex-1 rounded-md border border-border bg-input px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && verify()}
              />
              <button onClick={verify}
                className="rounded-md bg-primary px-6 py-2 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
              >
                Verify
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {result && (
              <div className="space-y-4 rounded-lg border border-border bg-secondary p-4">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-3 w-3 rounded-full ${result.valid ? "bg-primary animate-pulse-glow" : "bg-destructive"}`} />
                  <span className="font-display text-sm font-semibold text-foreground">
                    {result.valid ? "Theorem Verified ✓" : "Verification Failed ✗"}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-sm">
                  <p className="text-muted-foreground">gcd(a, n) = 1: <span className={result.isCoprime ? "text-primary" : "text-destructive"}>{result.isCoprime ? "Yes" : "No"}</span></p>
                  <p className="text-muted-foreground">φ({n}) = <span className="text-accent">{result.totient}</span></p>
                  <p className="text-muted-foreground">a<sup>φ(n)</sup> mod n = <span className="text-accent">{result.result}</span></p>
                </div>

                {/* Derivation Steps */}
                <div className="space-y-1">
                  <p className="text-xs font-display font-semibold text-foreground">Step-by-Step Derivation:</p>
                  {result.steps.map((step, i) => (
                    <p key={i} className="font-mono text-xs text-accent">{step}</p>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default EulerPage;
