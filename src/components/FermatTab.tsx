import { useState } from "react";
import { verifyFermat } from "@/lib/numberTheory";

const FermatTab = () => {
  const [a, setA] = useState("");
  const [p, setP] = useState("");
  const [result, setResult] = useState<ReturnType<typeof verifyFermat> | null>(null);
  const [error, setError] = useState("");

  const verify = () => {
    const aNum = parseInt(a);
    const pNum = parseInt(p);
    if (isNaN(aNum) || isNaN(pNum) || aNum <= 0 || pNum <= 1) {
      setError("Enter valid positive integers (a > 0, p > 1).");
      setResult(null);
      return;
    }
    if (aNum > 100000 || pNum > 100000) {
      setError("Values must be ≤ 100000.");
      setResult(null);
      return;
    }
    setError("");
    setResult(verifyFermat(aNum, pNum));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="font-display text-xl font-semibold text-foreground">Fermat's Little Theorem</h3>
        <p className="text-sm text-muted-foreground">
          If p is prime and gcd(a, p) = 1, then a<sup>p−1</sup> ≡ 1 (mod p).
        </p>
      </div>

      <div className="flex gap-3">
        <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="Base a"
          className="flex-1 rounded-md border border-border bg-input px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input type="number" value={p} onChange={(e) => setP(e.target.value)} placeholder="Prime p"
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
            <p className="text-muted-foreground">p is prime: <span className={result.isPrimeP ? "text-primary" : "text-destructive"}>{result.isPrimeP ? "Yes" : "No"}</span></p>
            <p className="text-muted-foreground">gcd(a, p) = 1: <span className={result.isCoprime ? "text-primary" : "text-destructive"}>{result.isCoprime ? "Yes" : "No"}</span></p>
            <p className="text-muted-foreground">a<sup>p−1</sup> mod p = <span className="text-accent">{result.result}</span></p>
          </div>
          <p className="text-sm text-foreground">{result.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default FermatTab;
