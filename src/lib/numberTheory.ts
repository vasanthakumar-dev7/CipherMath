// Greatest Common Divisor
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Extended GCD: returns [gcd, x, y] such that a*x + b*y = gcd(a,b)
export function extendedGcd(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

// Euler's Totient Function
export function eulerTotient(n: number): { result: number; coprimes: number[] } {
  if (n <= 0) return { result: 0, coprimes: [] };
  if (n === 1) return { result: 1, coprimes: [1] };
  const coprimes: number[] = [];
  for (let i = 1; i < n; i++) {
    if (gcd(i, n) === 1) coprimes.push(i);
  }
  return { result: coprimes.length, coprimes };
}

// Modular exponentiation: base^exp mod mod
export function modPow(base: number, exp: number, mod: number): number {
  if (mod === 1) return 0;
  let result = 1;
  base = ((base % mod) + mod) % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

// Check if a number is prime
export function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// Verify Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) for prime p, gcd(a,p)=1
export function verifyFermat(a: number, p: number): {
  valid: boolean;
  result: number;
  isPrimeP: boolean;
  isCoprime: boolean;
  explanation: string;
} {
  const isPrimeP = isPrime(p);
  const isCoprime = gcd(a, p) === 1;
  const result = modPow(a, p - 1, p);
  const valid = isPrimeP && isCoprime && result === 1;

  let explanation = "";
  if (!isPrimeP) explanation = `${p} is not prime. Fermat's Little Theorem requires a prime modulus.`;
  else if (!isCoprime) explanation = `gcd(${a}, ${p}) ≠ 1. The base must be coprime to the modulus.`;
  else explanation = `${a}^${p - 1} mod ${p} = ${result}. ${result === 1 ? "✓ Theorem verified!" : "✗ Unexpected result."}`;

  return { valid, result, isPrimeP, isCoprime, explanation };
}

// Verify Euler's Theorem: a^φ(n) ≡ 1 (mod n) for gcd(a,n)=1
export function verifyEuler(a: number, n: number): {
  valid: boolean;
  totient: number;
  result: number;
  isCoprime: boolean;
  explanation: string;
} {
  const isCoprime = gcd(a, n) === 1;
  const { result: totient } = eulerTotient(n);
  const result = modPow(a, totient, n);
  const valid = isCoprime && result === 1;

  let explanation = "";
  if (!isCoprime) explanation = `gcd(${a}, ${n}) ≠ 1. Euler's Theorem requires coprime integers.`;
  else explanation = `φ(${n}) = ${totient}, ${a}^${totient} mod ${n} = ${result}. ${result === 1 ? "✓ Theorem verified!" : "✗ Unexpected result."}`;

  return { valid, totient, result, isCoprime, explanation };
}

// Chinese Remainder Theorem solver
export function solveCRT(
  remainders: number[],
  moduli: number[]
): { solution: number; product: number; valid: boolean; steps: string[]; error?: string } {
  const steps: string[] = [];

  // Check pairwise coprimality
  for (let i = 0; i < moduli.length; i++) {
    for (let j = i + 1; j < moduli.length; j++) {
      if (gcd(moduli[i], moduli[j]) !== 1) {
        return {
          solution: -1,
          product: 0,
          valid: false,
          steps: [],
          error: `Moduli ${moduli[i]} and ${moduli[j]} are not coprime.`,
        };
      }
    }
  }

  const N = moduli.reduce((a, b) => a * b, 1);
  steps.push(`N = ${moduli.join(" × ")} = ${N}`);

  let x = 0;
  for (let i = 0; i < moduli.length; i++) {
    const Ni = N / moduli[i];
    const [, yi] = extendedGcd(Ni, moduli[i]);
    const yiMod = ((yi % moduli[i]) + moduli[i]) % moduli[i];
    const term = remainders[i] * Ni * yiMod;
    steps.push(`N${i + 1} = ${Ni}, y${i + 1} = ${yiMod}, term = ${remainders[i]} × ${Ni} × ${yiMod} = ${term}`);
    x += term;
  }

  const solution = ((x % N) + N) % N;
  steps.push(`x = ${x} mod ${N} = ${solution}`);
  return { solution, product: N, valid: true, steps };
}

// Prime factorization with steps
export function primeFactorize(n: number): { factors: { prime: number; power: number }[]; steps: string[] } {
  const steps: string[] = [];
  const factors: { prime: number; power: number }[] = [];
  let remaining = n;
  steps.push(`Factorizing ${n}:`);
  for (let p = 2; p * p <= remaining; p++) {
    if (remaining % p === 0) {
      let power = 0;
      while (remaining % p === 0) {
        remaining /= p;
        power++;
      }
      factors.push({ prime: p, power });
      steps.push(`${n} is divisible by ${p} → ${p}^${power}`);
    }
  }
  if (remaining > 1) {
    factors.push({ prime: remaining, power: 1 });
    steps.push(`Remaining factor: ${remaining}`);
  }
  const factorStr = factors.map(f => f.power > 1 ? `${f.prime}^${f.power}` : `${f.prime}`).join(" × ");
  steps.push(`${n} = ${factorStr}`);
  return { factors, steps };
}

// GCD with Euclidean algorithm steps
export function gcdWithSteps(a: number, b: number): { result: number; steps: string[] } {
  a = Math.abs(a);
  b = Math.abs(b);
  const steps: string[] = [];
  steps.push(`Computing gcd(${a}, ${b}) using Euclidean Algorithm:`);
  let origA = a, origB = b;
  while (b !== 0) {
    const q = Math.floor(a / b);
    const r = a % b;
    steps.push(`${a} = ${q} × ${b} + ${r}`);
    a = b;
    b = r;
  }
  steps.push(`gcd(${origA}, ${origB}) = ${a}`);
  return { result: a, steps };
}

// Modular exponentiation with steps
export function modPowWithSteps(base: number, exp: number, mod: number): { result: number; steps: string[] } {
  const steps: string[] = [];
  steps.push(`Computing ${base}^${exp} mod ${mod} using square-and-multiply:`);
  if (mod === 1) { steps.push(`mod is 1, result = 0`); return { result: 0, steps }; }
  let result = 1;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  let step = 1;
  while (e > 0) {
    if (e % 2 === 1) {
      const prev = result;
      result = (result * b) % mod;
      steps.push(`Step ${step}: exp is odd → result = ${prev} × ${b} mod ${mod} = ${result}`);
    }
    e = Math.floor(e / 2);
    if (e > 0) {
      const prevB = b;
      b = (b * b) % mod;
      steps.push(`Step ${step}: square base → ${prevB}² mod ${mod} = ${b}`);
    }
    step++;
  }
  steps.push(`Final result: ${base}^${exp} mod ${mod} = ${result}`);
  return { result, steps };
}

// Euler's Totient with derivation steps
export function eulerTotientWithSteps(n: number): { result: number; coprimes: number[]; steps: string[] } {
  const steps: string[] = [];
  if (n <= 0) return { result: 0, coprimes: [], steps: ["n must be positive"] };
  if (n === 1) return { result: 1, coprimes: [1], steps: ["φ(1) = 1"] };

  const { factors, steps: factorSteps } = primeFactorize(n);
  steps.push(...factorSteps);

  if (isPrime(n)) {
    steps.push(`${n} is prime, so φ(${n}) = ${n} − 1 = ${n - 1}`);
  } else {
    steps.push(`Applying formula: φ(n) = n × ∏(1 − 1/p)`);
    let formula = `φ(${n}) = ${n}`;
    let value = n;
    for (const f of factors) {
      formula += ` × (1 − 1/${f.prime})`;
      value *= (f.prime - 1);
      value /= f.prime;
    }
    steps.push(formula);
    steps.push(`φ(${n}) = ${value}`);
  }

  const coprimes: number[] = [];
  for (let i = 1; i < n; i++) {
    if (gcd(i, n) === 1) coprimes.push(i);
  }
  return { result: coprimes.length, coprimes, steps };
}

// Fermat verification with full derivation
export function verifyFermatWithSteps(a: number, p: number) {
  const steps: string[] = [];
  
  // Step 1: primality
  steps.push(`Step 1: Check if p = ${p} is prime`);
  const primeResult = isPrime(p);
  if (primeResult) {
    steps.push(`${p} is prime ✓`);
  } else {
    const { factors } = primeFactorize(p);
    steps.push(`${p} is NOT prime (factors: ${factors.map(f => f.prime).join(", ")}) ✗`);
  }

  // Step 2: gcd
  const gcdResult = gcdWithSteps(a, p);
  steps.push(`Step 2: Compute gcd(${a}, ${p})`);
  steps.push(...gcdResult.steps);
  const isCoprime = gcdResult.result === 1;

  // Step 3: modular exponentiation
  steps.push(`Step 3: Compute ${a}^${p - 1} mod ${p}`);
  const modResult = modPowWithSteps(a, p - 1, p);
  steps.push(...modResult.steps);

  // Step 4: verify
  const valid = primeResult && isCoprime && modResult.result === 1;
  steps.push(`Step 4: Result = ${modResult.result}. ${valid ? "✓ Fermat's Little Theorem verified!" : "✗ Conditions not met."}`);

  return { valid, result: modResult.result, isPrimeP: primeResult, isCoprime, steps };
}

// Euler theorem verification with full derivation
export function verifyEulerWithSteps(a: number, n: number) {
  const steps: string[] = [];

  // Step 1: gcd
  steps.push(`Step 1: Compute gcd(${a}, ${n})`);
  const gcdResult = gcdWithSteps(a, n);
  steps.push(...gcdResult.steps);
  const isCoprime = gcdResult.result === 1;

  // Step 2: totient
  steps.push(`Step 2: Compute φ(${n})`);
  const totientResult = eulerTotientWithSteps(n);
  steps.push(...totientResult.steps);

  // Step 3: modular exponentiation
  steps.push(`Step 3: Compute ${a}^${totientResult.result} mod ${n}`);
  const modResult = modPowWithSteps(a, totientResult.result, n);
  steps.push(...modResult.steps);

  // Step 4: verify
  const valid = isCoprime && modResult.result === 1;
  steps.push(`Step 4: Result = ${modResult.result}. ${valid ? "✓ Euler's Theorem verified!" : "✗ Conditions not met."}`);

  return { valid, totient: totientResult.result, result: modResult.result, isCoprime, steps };
}

// Enhanced CRT with detailed steps
export function solveCRTWithSteps(
  remainders: number[],
  moduli: number[]
): { solution: number; product: number; valid: boolean; steps: string[]; error?: string } {
  const steps: string[] = [];

  // Step 1: verify pairwise coprimality
  steps.push("Step 1: Verify pairwise coprimality");
  for (let i = 0; i < moduli.length; i++) {
    for (let j = i + 1; j < moduli.length; j++) {
      const g = gcd(moduli[i], moduli[j]);
      steps.push(`gcd(${moduli[i]}, ${moduli[j]}) = ${g} ${g === 1 ? "✓" : "✗"}`);
      if (g !== 1) {
        return { solution: -1, product: 0, valid: false, steps, error: `Moduli ${moduli[i]} and ${moduli[j]} are not coprime.` };
      }
    }
  }

  const N = moduli.reduce((a, b) => a * b, 1);
  steps.push(`Step 2: Compute M = ${moduli.join(" × ")} = ${N}`);

  let x = 0;
  steps.push("Step 3: Compute partial solutions");
  for (let i = 0; i < moduli.length; i++) {
    const Ni = N / moduli[i];
    const [, yi] = extendedGcd(Ni, moduli[i]);
    const yiMod = ((yi % moduli[i]) + moduli[i]) % moduli[i];
    steps.push(`  M${i + 1} = ${N}/${moduli[i]} = ${Ni}`);
    steps.push(`  y${i + 1} = ${Ni}⁻¹ mod ${moduli[i]} = ${yiMod} (via Extended GCD)`);
    const term = remainders[i] * Ni * yiMod;
    steps.push(`  term${i + 1} = ${remainders[i]} × ${Ni} × ${yiMod} = ${term}`);
    x += term;
  }

  const solution = ((x % N) + N) % N;
  steps.push(`Step 4: x = (${x}) mod ${N} = ${solution}`);

  // Verification
  steps.push("Step 5: Verification");
  for (let i = 0; i < moduli.length; i++) {
    steps.push(`  ${solution} mod ${moduli[i]} = ${solution % moduli[i]} ${solution % moduli[i] === ((remainders[i] % moduli[i]) + moduli[i]) % moduli[i] ? "✓" : "✗"}`);
  }

  return { solution, product: N, valid: true, steps };
}

// Simple RSA demo (kept for utility)
export function rsaDemo(p: number, q: number) {
  const n = p * q;
  const { result: phi } = eulerTotient(n);
  let e = 0;
  for (const candidate of [65537, 257, 17, 7, 5, 3]) {
    if (candidate < phi && gcd(candidate, phi) === 1) { e = candidate; break; }
  }
  if (e === 0) { for (let i = 2; i < phi; i++) { if (gcd(i, phi) === 1) { e = i; break; } } }
  const [, x] = extendedGcd(e, phi);
  const d = ((x % phi) + phi) % phi;
  return { p, q, n, phi, e, d };
}

export function rsaEncrypt(message: number, e: number, n: number): number {
  return modPow(message, e, n);
}

export function rsaDecrypt(cipher: number, d: number, n: number): number {
  return modPow(cipher, d, n);
}
