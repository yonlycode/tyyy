'use client';

import { KadyMrrStatHost } from './kady-host';

/* ── Wrapper kady-mrr-stat ───────────────────────────────────────────
   Stat Emotion (valeur gradient + label majuscule) → <kady-mrr-stat>, la
   carte KPI officielle de kady-ui (compose kady-card + kady-badge ; props
   value, currency, change, changeType, label, period, subtitle).
   Les stats du portfolio (10×, 100 %, ∞, 0) ne sont pas des KPI monétaires :
   currency, change et period sont passés vides — le badge d'évolution et la
   période se masquent d'eux-mêmes (repli d'attribut vide, API officielle), il
   reste label en en-tête + valeur en display. Signature conservée :
   { value: string, label: string }. */

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <KadyMrrStatHost
      value={value}
      label={label}
      currency=""
      change=""
      period=""
    />
  );
}
