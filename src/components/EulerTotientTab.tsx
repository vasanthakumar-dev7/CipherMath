import { useState } from "react";
import { eulerTotient } from "@/lib/numberTheory";

const EulerTotientTab = () => {
  const [n, setN] = useState("");
  const [result, setResult] = useState<{ result: number; coprimes: number[] } | null>(null);
  const [error, setError] = useState("");

  const compute = () => {
    const num = parseInt(n);
    if (isNaN(num) || num <= 0 || num > 10000) {
      setError("Enter a positive integer (1–10000).");
      setResult(null);
      return;
    }
    setError("");
    setResult(eulerTotient(num));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-foreground">Euler's Totient Function φ(n)</h3>
        <p className="text-sm text-muted-foreground">
          Counts the number of integers from 1 to n that are coprime with n.
        </p>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          value={n}
          onChange={(e) => setN(e.target.value)}
          placeholder="Enter n"
          className="flex-1 rounded-md border border-border bg-input px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          onKeyDown={(e) => e.key === "Enter" && compute()}
        />
        <button
          onClick={compute}
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
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Coprime integers:</p>
            <div className="flex flex-wrap gap-1.5">
              {result.coprimes.slice(0, 100).map((c) => (
                <span key={c} className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-accent">
                  {c}
                </span>
              ))}
              {result.coprimes.length > 100 && (
                <span className="text-xs text-muted-foreground">...and {result.coprimes.length - 100} more</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EulerTotientTab;
