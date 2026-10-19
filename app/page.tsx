'use client'

import { useState, type FormEvent } from 'react'

type RsaResult = {
  p: number
  q: number
  n: bigint
  phi: bigint
  e: bigint
  d: bigint
  bytes: number[]
  encrypted: bigint[]
  decrypted: string
}

function isPrime(value: number): boolean {
  if (value < 2) return false
  if (value % 2 === 0) return value === 2

  for (let divisor = 3; divisor * divisor <= value; divisor += 2) {
    if (value % divisor === 0) return false
  }

  return true
}

function gcd(a: bigint, b: bigint): bigint {
  while (b !== BigInt(0)) {
    ;[a, b] = [b, a % b]
  }
  return a
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = BigInt(1)
  let factor = base % modulus
  let power = exponent

  while (power > BigInt(0)) {
    if (power % BigInt(2) === BigInt(1)) result = (result * factor) % modulus
    factor = (factor * factor) % modulus
    power /= BigInt(2)
  }

  return result
}

function modInverse(value: bigint, modulus: bigint): bigint {
  let oldR = value
  let r = modulus
  let oldS = BigInt(1)
  let s = BigInt(0)

  while (r !== BigInt(0)) {
    const quotient = oldR / r
    ;[oldR, r] = [r, oldR - quotient * r]
    ;[oldS, s] = [s, oldS - quotient * s]
  }

  return (oldS % modulus + modulus) % modulus
}

function convertToRsa(p: number, q: number, message: string): RsaResult {
  if (!Number.isSafeInteger(p) || !Number.isSafeInteger(q) || p > 1_000_000 || q > 1_000_000) {
    throw new Error('Use números inteiros entre 2 e 1.000.000.')
  }
  if (!isPrime(p) || !isPrime(q)) {
    throw new Error('Os dois valores precisam ser números primos.')
  }
  if (p === q) {
    throw new Error('Escolha dois números primos diferentes.')
  }

  const n = BigInt(p) * BigInt(q)
  if (n <= BigInt(255)) {
    throw new Error('O produto dos primos precisa ser maior que 255 para codificar o texto.')
  }

  const phi = BigInt(p - 1) * BigInt(q - 1)
  let e = BigInt(3)
  while (e < phi && gcd(e, phi) !== BigInt(1)) e += BigInt(2)
  if (e >= phi) {
    throw new Error('Não foi possível criar as chaves com esses números.')
  }
  const d = modInverse(e, phi)
  const bytes = Array.from(new TextEncoder().encode(message))
  const encrypted = bytes.map((byte) => modPow(BigInt(byte), e, n))
  const decryptedBytes = encrypted.map((byte) => Number(modPow(byte, d, n)))
  const decrypted = new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(decryptedBytes))

  return { p, q, n, phi, e, d, bytes, encrypted, decrypted }
}

export default function Page() {
  const [p, setP] = useState('61')
  const [q, setQ] = useState('53')
  const [message, setMessage] = useState('OLA')
  const [result, setResult] = useState<RsaResult | null>(null)
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setResult(null)
    setStep(0)

    try {
      setResult(convertToRsa(Number(p), Number(q), message))
      setStep(1)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Não foi possível converter os valores.')
    }
  }

  function resetResult() {
    setResult(null)
    setStep(0)
    setError('')
  }

  return (
    <main className="rsa-page">
      <section className="rsa-shell">
        <header className="rsa-header">
          <span className="rsa-mark" aria-hidden="true">p · q</span>
          <span className="rsa-label">CRIPTOGRAFIA · DEMONSTRAÇÃO</span>
        </header>

        <div className="rsa-intro">
          <p className="rsa-eyebrow">MATEMÁTICA EM AÇÃO</p>
          <h1>Dos primos à<br /><span>mensagem secreta.</span></h1>
          <p className="rsa-description">
            Veja como dois números primos ajudam a criar as chaves do método RSA.
            Escolha os primos, escreva uma mensagem e faça a conversão.
          </p>
        </div>

        <form className="rsa-card" onSubmit={handleSubmit}>
          <div className="rsa-fields">
            <label>
              <span>Número primo p</span>
              <input
                inputMode="numeric"
                type="number"
                min="2"
                max="1000000"
                value={p}
                onChange={(event) => {
                  setP(event.target.value)
                  resetResult()
                }}
                required
              />
            </label>
            <label>
              <span>Número primo q</span>
              <input
                inputMode="numeric"
                type="number"
                min="2"
                max="1000000"
                value={q}
                onChange={(event) => {
                  setQ(event.target.value)
                  resetResult()
                }}
                required
              />
            </label>
          </div>

          <label className="rsa-message">
            <span>Sua mensagem</span>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                resetResult()
              }}
              placeholder="Escreva uma mensagem..."
              rows={3}
            />
          </label>

          <button type="submit">Gerar e criptografar <span aria-hidden="true">→</span></button>

          {error && <p className="rsa-error" role="alert">{error}</p>}

        </form>

        {result && (
          <section className="rsa-results" aria-live="polite" aria-label="Etapas da conversão RSA">
            <div className="rsa-steps-heading">
              <div>
                <p className="rsa-eyebrow">PASSO A PASSO</p>
                <h2>Como a mensagem vira segredo</h2>
              </div>
              <span className="rsa-step-count">Etapa {step} de 6</span>
            </div>
            <div className="rsa-progress" aria-hidden="true">
              <span style={{ width: `${(step / 6) * 100}%` }} />
            </div>

            <ol className="rsa-step-list">
              {step >= 1 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">1</span>
                  <div>
                    <h3>Começamos com dois primos</h3>
                    <p>
                      {result.p} e {result.q} só são divisíveis por 1 e por eles mesmos.
                      Mantemos esses dois números em segredo.
                    </p>
                    <output className="rsa-formula">p = {result.p} &nbsp;·&nbsp; q = {result.q}</output>
                  </div>
                </li>
              )}
              {step >= 2 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">2</span>
                  <div>
                    <h3>Criamos o número compartilhado n</h3>
                    <p>Multiplicamos os primos. O resultado faz parte das duas chaves.</p>
                    <output className="rsa-formula">n = p × q = {result.p} × {result.q} = {result.n.toString()}</output>
                  </div>
                </li>
              )}
              {step >= 3 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">3</span>
                  <div>
                    <h3>Calculamos φ(n), usada para criar as chaves</h3>
                    <p>Para estes dois primos, multiplicamos um a menos que cada primo.</p>
                    <output className="rsa-formula">
                      φ(n) = (p − 1) × (q − 1) = {result.p - 1} × {result.q - 1} = {result.phi.toString()}
                    </output>
                  </div>
                </li>
              )}
              {step >= 4 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">4</span>
                  <div>
                    <h3>Formamos o par de chaves</h3>
                    <p>
                      e é escolhido para não ter divisores comuns com φ(n). d é calculado
                      para que e × d deixe resto 1 ao dividir por φ(n).
                    </p>
                    <div className="rsa-keyline">
                      <div>
                        <span>Chave pública — pode ser compartilhada</span>
                        <strong>(e, n) = ({result.e.toString()}, {result.n.toString()})</strong>
                      </div>
                      <div>
                        <span>Chave privada — deve ser mantida em segredo</span>
                        <strong>(d, n) = ({result.d.toString()}, {result.n.toString()})</strong>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              {step >= 5 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">5</span>
                  <div>
                    <h3>Criptografamos a mensagem</h3>
                    <p>
                      O texto é transformado em bytes UTF-8. Cada byte m é convertido
                      usando a chave pública: c = mᵉ mod n.
                    </p>
                    <div className="rsa-output">
                      <span>Bytes originais</span>
                      <output>{result.bytes.join(' ') || '—'}</output>
                    </div>
                    <div className="rsa-output">
                      <span>Texto criptografado (valores c)</span>
                      <output>{result.encrypted.map((value) => value.toString()).join(' ') || '—'}</output>
                    </div>
                  </div>
                </li>
              )}
              {step >= 6 && (
                <li className="rsa-step">
                  <span className="rsa-step-number">6</span>
                  <div>
                    <h3>Descriptografamos com a chave privada</h3>
                    <p>Aplicamos m = cᵈ mod n a cada valor para recuperar os bytes e o texto.</p>
                    <div className="rsa-output rsa-decrypted">
                      <span>Mensagem recuperada</span>
                      <output>{result.decrypted || '—'}</output>
                    </div>
                  </div>
                </li>
              )}
            </ol>

            <div className="rsa-step-controls">
              {step < 6 ? (
                <button type="button" onClick={() => setStep((current) => current + 1)}>
                  Próxima etapa <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button type="button" onClick={() => setStep(1)}>
                  Recomeçar apresentação <span aria-hidden="true">↺</span>
                </button>
              )}
            </div>
          </section>
        )}

        <footer className="rsa-footnote">
          <span className="rsa-footnote-icon" aria-hidden="true">i</span>
          <p>
            Para fins didáticos. Esta versão simplificada não deve ser usada para proteger
            informações reais; sistemas reais usam chaves maiores e técnicas adicionais.
          </p>
        </footer>
      </section>
    </main>
  )
}
