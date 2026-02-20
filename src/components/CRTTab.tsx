import { useState } from "react";
import { solveCRT } from "@/lib/numberTheory";

const CRTTab = () => {
  const [congruences, setCongruences] = useState([
    { remainder: "", modulus: "" },
    { remainder: "", modulus: "" },
  ]);
  const [result, setResult] = useState<ReturnType<typeof solveCRT> | null>(null);
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
    setResult(solveCRT(remainders, moduli));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-foreground">Chinese Remainder Theorem</h3>
        <p className="text-sm text-muted-foreground">
          Solve a system of simultaneous congruences: x ≡ rᵢ (mod mᵢ)
        </p>
      </div>

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
        <div className="space-y-3 rounded-lg border border-border bg-secondary p-4">
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
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Steps:</p>
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
    </div>
  );
};

export default CRTTab;
