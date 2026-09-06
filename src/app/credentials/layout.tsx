import type { Metadata } from "next";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Credentials & Certifications",
  description:
    "Verified professional certifications and technical credentials in Full Stack Development, IoT Platforms, Python, Machine Learning, and Cloud Computing earned by Aravind Govindhasamy.",
  alternates: {
    canonical: "/credentials",
  },
  openGraph: {
    title: `Credentials & Certifications | ${DATA.name}`,
    description:
      "Verified professional certifications and technical credentials in Full Stack Development, IoT Platforms, Python, Machine Learning, and Cloud Computing earned by Aravind Govindhasamy.",
    url: `${DATA.url}/credentials`,
    siteName: DATA.name,
    type: "website",
    images: [
      {
        url: `${DATA.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `Credentials & Certifications — ${DATA.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Credentials & Certifications | ${DATA.name}`,
    description:
      "Verified professional certifications and technical credentials in Full Stack Development, IoT Platforms, Python, Machine Learning, and Cloud Computing earned by Aravind Govindhasamy.",
    images: [`${DATA.url}/opengraph-image`],
  },
};

export default function CredentialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
