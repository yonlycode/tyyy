import { ImageResponse } from 'next/og';
import { OGFrame, OG_SIZE } from '@/components/og/OGImage';

export const alt = 'Yoann Fort - Architecte IA & Lead LLMOps';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <OGFrame
      badge="ARCHITECTE IA & LEAD LLMOPS"
      title="Architecte IA & Lead LLMOps"
      subtitle="Architectures IA souveraines, LLMOps, quantisation et modèles locaux pour éliminer la dépendance cloud."
      footerLeft="yoannfort.dev"
      footerRight="Portfolio & blog"
    />,
    { ...size }
  );
}
export const dynamic = "force-static";
