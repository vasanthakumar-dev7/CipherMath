import { useState } from "react";
import { verifyEuler } from "@/lib/numberTheory";

const EulerTheoremTab = () => {
  const [a, setA] = useState("");
  const [n, setN] = useState("");
  const [result, setResult] = useState<ReturnType<typeof verifyEuler> | null>(null);
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
    setResult(verifyEuler(aNum, nNum));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-foreground">Euler's Theorem</h3>
        <p className="text-sm text-muted-foreground">
          If gcd(a, n) = 1, then a<sup>φ(n)</sup> ≡ 1 (mod n).
        </p>
      </div>

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
        <div className="space-y-3 rounded-lg border border-border bg-secondary p-4">
          <div className="flex items-center gap-2">
            <span className={`inline-block h-3 w-3 rounded-full ${result.valid ? "bg-primary animate-pulse-glow" : "bg-destructive"}`} />
            <span className="font-display text-sm font-semibold text-foreground">
              {result.valid ? "Theorem Verified" : "Verification Failed"}
            </span>
          </div>
          <div className="space-y-1 font-mono text-sm">
            <p className="text-muted-foreground">gcd(a, n) = 1: <span className={result.isCoprime ? "text-primary" : "text-destructive"}>{result.isCoprime ? "Yes" : "No"}</span></p>
            <p className="text-muted-foreground">φ({n}) = <span className="text-accent">{result.totient}</span></p>
            <p className="text-muted-foreground">a<sup>φ(n)</sup> mod n = <span className="text-accent">{result.result}</span></p>
          </div>
          <p className="text-sm text-foreground">{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default EulerTheoremTab;
