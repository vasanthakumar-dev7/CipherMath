import { useState } from "react";
import { Link } from "react-router-dom";
import { eulerTotientWithSteps } from "@/lib/numberTheory";

const TotientPage = () => {
  const [n, setN] = useState("");
  const [result, setResult] = useState<ReturnType<typeof eulerTotientWithSteps> | null>(null);
  const [error, setError] = useState("");

  const compute = () => {
    const num = parseInt(n);
    if (isNaN(num) || num <= 0 || num > 10000) {
      setError("Enter a positive integer (1–10000).");
      setResult(null);
      return;
    }
    setError("");
    setResult(eulerTotientWithSteps(num));
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary font-display transition-all hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_10px_hsl(160_70%_45%/0.2)]">← Home</Link>
          <h1 className="font-display text-xl font-bold text-foreground text-glow">Euler's Totient Function φ(n)</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Theory */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📘 Definition</h2>
            <p className="text-sm text-card-foreground">
              Euler's Totient Function, denoted as φ(n), counts the number of positive integers less than or equal to n that are coprime with n (their gcd with n is 1).
            </p>

            <h2 className="font-display text-lg font-bold text-foreground">📜 Rule</h2>
            <div className="text-sm text-card-foreground space-y-1">
              <p>If n is a prime number: <span className="font-mono text-primary">φ(n) = n − 1</span></p>
              <p>If n is a product of distinct prime numbers:</p>
              <p className="font-mono text-accent">φ(n) = n × (1 − 1/p₁) × (1 − 1/p₂) × ... × (1 − 1/pₖ)</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🧮 Formula</h2>
            <div className="rounded-lg border border-border bg-secondary p-3 font-mono text-sm text-accent">
              <p>If n = p₁ᵃ¹ × p₂ᵃ² × … × pₖᵃᵏ</p>
              <p>Then φ(n) = n × ∏(1 − 1/p)</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🔐 Use in Cryptography</h2>
            <p className="text-sm text-card-foreground">
              Used in the RSA algorithm to compute the private key. It helps determine the value of φ(n) where n = p × q.
            </p>
          </section>

          {/* Calculator */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h2 className="font-display text-lg font-bold text-foreground text-glow">Interactive Calculator</h2>

            <div className="flex gap-3">
              <input type="number" value={n} onChange={(e) => setN(e.target.value)} placeholder="Enter n"
                className="flex-1 rounded-md border border-border bg-input px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                onKeyDown={(e) => e.key === "Enter" && compute()}
              />
              <button onClick={compute}
                className="rounded-md bg-primary px-6 py-2 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
              >
                Compute
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {result && (
              <div className="space-y-4 rounded-lg border border-border bg-secondary p-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">φ({n}) =</span>
                  <span className="font-mono text-2xl font-bold text-primary text-glow">{result.result}</span>
                </div>

                {/* Derivation Steps */}
                <div className="space-y-1">
                  <p className="text-xs font-display font-semibold text-foreground">Step-by-Step Derivation:</p>
                  {result.steps.map((step, i) => (
                    <p key={i} className="font-mono text-xs text-accent">{step}</p>
                  ))}
                </div>

                {/* Coprimes */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Coprime integers:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {result.coprimes.slice(0, 100).map((c) => (
                      <span key={c} className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-accent">{c}</span>
                    ))}
                    {result.coprimes.length > 100 && (
                      <span className="text-xs text-muted-foreground">...and {result.coprimes.length - 100} more</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default TotientPage;
