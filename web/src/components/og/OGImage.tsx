import type { ReactNode } from 'react';

export const OG_SIZE = { width: 1200, height: 630 };

export const ogColors = {
  bg: '#0B0F19',
  primary: '#6366F1',
  primaryLight: '#818CF8',
  accent: '#34D399',
  text: '#F1F5F9',
  muted: '#94A3B8',
};

export function OGFrame({
  badge,
  title,
  subtitle,
  footerLeft,
  footerRight,
}: {
  badge: string;
  title: ReactNode;
  subtitle?: string;
  footerLeft?: string;
  footerRight?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: ogColors.bg,
        color: ogColors.text,
        padding: '64px 72px',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: 9999,
          backgroundColor: 'rgba(99, 102, 241, 0.18)',
          top: -170,
          right: -130,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 440,
          height: 440,
          borderRadius: 9999,
          backgroundColor: 'rgba(52, 211, 153, 0.08)',
          bottom: -150,
          left: -110,
        }}
      />
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: ogColors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            Y
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: ogColors.muted,
            }}
          >
            TYYY
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 40,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: ogColors.primaryLight,
              marginBottom: 20,
            }}
          >
            {badge}
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              maxWidth: 960,
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                marginTop: 22,
                fontSize: 30,
                color: ogColors.muted,
                lineHeight: 1.4,
                maxWidth: 900,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid rgba(148, 163, 184, 0.25)',
          paddingTop: 26,
          position: 'relative',
        }}
      >
        <div style={{ fontSize: 22, color: ogColors.muted }}>{footerLeft}</div>
        <div
          style={{ fontSize: 22, color: ogColors.primaryLight, fontWeight: 600 }}
        >
          {footerRight}
        </div>
      </div>
    </div>
  );
}