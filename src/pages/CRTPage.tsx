import { useState } from "react";
import { Link } from "react-router-dom";
import { solveCRTWithSteps } from "@/lib/numberTheory";

const CRTPage = () => {
  const [congruences, setCongruences] = useState([
    { remainder: "", modulus: "" },
    { remainder: "", modulus: "" },
  ]);
  const [result, setResult] = useState<ReturnType<typeof solveCRTWithSteps> | null>(null);
  const [error, setError] = useState("");

  const addCongruence = () => {
    if (congruences.length < 6) {
      setCongruences([...congruences, { remainder: "", modulus: "" }]);
    }
  };

  const removeCongruence = (i: number) => {
    if (congruences.length > 2) {
      setCongruences(congruences.filter((_, idx) => idx !== i));
    }
  };

  const updateCongruence = (i: number, field: "remainder" | "modulus", value: string) => {
    const updated = [...congruences];
    updated[i][field] = value;
    setCongruences(updated);
  };

  const solve = () => {
    const remainders: number[] = [];
    const moduli: number[] = [];
    for (const c of congruences) {
      const r = parseInt(c.remainder);
      const m = parseInt(c.modulus);
      if (isNaN(r) || isNaN(m) || m <= 0) {
        setError("All values must be valid integers with positive moduli.");
        setResult(null);
        return;
      }
      if (m > 10000) {
        setError("Moduli must be ≤ 10000.");
        setResult(null);
        return;
      }
      remainders.push(r);
      moduli.push(m);
    }
    setError("");
    setResult(solveCRTWithSteps(remainders, moduli));
  };

  return (
    <div className="min-h-screen bg-background scanline">
      <header className="border-b border-border px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center gap-4">
          <Link to="/" className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary font-display transition-all hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_10px_hsl(160_70%_45%/0.2)]">← Home</Link>
          <h1 className="font-display text-xl font-bold text-foreground text-glow">Chinese Remainder Theorem</h1>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Theory */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">📘 Definition</h2>
            <p className="text-sm text-card-foreground">
              The Chinese Remainder Theorem provides a method to solve a system of simultaneous linear congruences when the moduli are pairwise coprime.
            </p>

            <h2 className="font-display text-lg font-bold text-foreground">📜 Rule</h2>
            <div className="text-sm text-card-foreground space-y-1">
              <p>If: x ≡ a₁ (mod m₁) and x ≡ a₂ (mod m₂)</p>
              <p>and m₁ and m₂ are coprime,</p>
              <p>Then there exists a unique solution modulo (m₁ × m₂).</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🧮 Formula</h2>
            <div className="rounded-lg border border-border bg-secondary p-3 font-mono text-sm text-accent space-y-1">
              <p>M = m₁ × m₂ × … × mₖ</p>
              <p>x ≡ Σ(aᵢ × Mᵢ × yᵢ) (mod M)</p>
              <p>Where Mᵢ = M/mᵢ, yᵢ = Mᵢ⁻¹ mod mᵢ</p>
            </div>

            <h2 className="font-display text-lg font-bold text-foreground">🔐 Use in Cryptography</h2>
            <p className="text-sm text-card-foreground">
              CRT is used in RSA to speed up decryption. It makes large exponentiation computations faster.
            </p>
          </section>

          {/* Calculator */}
          <section className="rounded-xl border border-border bg-card p-6 space-y-6">
            <h2 className="font-display text-lg font-bold text-foreground text-glow">Interactive Calculator</h2>

            <div className="space-y-3">
              {congruences.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground font-mono">x ≡</span>
                  <input type="number" value={c.remainder} onChange={(e) => updateCongruence(i, "remainder", e.target.value)}
                    placeholder="r" className="w-24 rounded-md border border-border bg-input px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground font-mono">(mod</span>
                  <input type="number" value={c.modulus} onChange={(e) => updateCongruence(i, "modulus", e.target.value)}
                    placeholder="m" className="w-24 rounded-md border border-border bg-input px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground font-mono">)</span>
                  {congruences.length > 2 && (
                    <button onClick={() => removeCongruence(i)} className="text-xs text-destructive hover:underline">Remove</button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={addCongruence} disabled={congruences.length >= 6}
                className="rounded-md border border-border bg-muted px-4 py-2 text-sm text-muted-foreground transition-all hover:text-foreground disabled:opacity-40"
              >
                + Add Congruence
              </button>
              <button onClick={solve}
                className="rounded-md bg-primary px-6 py-2 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
              >
                Solve
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {result && (
              <div className="space-y-4 rounded-lg border border-border bg-secondary p-4">
                {result.valid ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="inline-block h-3 w-3 rounded-full bg-primary animate-pulse-glow" />
                      <span className="font-display text-sm font-semibold text-foreground">Solution Found</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">x ≡</span>
                      <span className="font-mono text-2xl font-bold text-primary text-glow">{result.solution}</span>
                      <span className="text-sm text-muted-foreground">(mod {result.product})</span>
                    </div>

                    {/* Derivation Steps */}
                    <div className="space-y-1">
                      <p className="text-xs font-display font-semibold text-foreground">Step-by-Step Derivation:</p>
                      {result.steps.map((step, i) => (
                        <p key={i} className="font-mono text-xs text-accent">{step}</p>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-destructive" />
                    <span className="text-sm text-destructive">{result.error}</span>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default CRTPage;
