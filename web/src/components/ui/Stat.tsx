'use client';

import { StatLabel, StatValue, StatWrap } from './Stat.styles';

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <StatWrap>
      <StatValue>{value}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatWrap>
  );
}
