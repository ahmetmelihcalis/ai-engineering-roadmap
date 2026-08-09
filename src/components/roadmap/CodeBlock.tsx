"use client";

import { Check, Copy } from "lucide-react";
import { ComponentPropsWithoutRef, useRef, useState } from "react";

export function CodeBlock({
  copyLabel,
  copiedLabel,
  ...props
}: ComponentPropsWithoutRef<"pre"> & { copyLabel: string; copiedLabel: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    const text = ref.current?.innerText ?? "";
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-shell">
      <button aria-label={copied ? copiedLabel : copyLabel} className="code-copy" onClick={copyCode} type="button">
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? copiedLabel : copyLabel}
      </button>
      <pre ref={ref} {...props} />
    </div>
  );
}
