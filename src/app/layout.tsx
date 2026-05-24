import { Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://kodingmulu.vercel.app";
const siteName = "KodingMulu by Nazril Afandi";
const siteDescription =
  "Jasa pembuatan website profesional untuk UMKM dan perusahaan di Indonesia. " +
  "Landing page, toko online, profil perusahaan — cepat, SEO-friendly, dan memikat pelanggan. " +
  "Hubungi Nazril Afandi untuk konsultasi gratis.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Jasa Website Profesional Indonesia`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "jasa pembuatan website",
    "jasa website profesional",
    "jasa website UMKM",
    "jasa website murah Indonesia",
    "jasa landing page",
    "jasa toko online",
    "web developer Indonesia",
    "Nazril Afandi",
    "KodingMulu",
    "jasa website Next.js",
    "jasa website React",
    "pembuatan website bisnis",
  ],
  authors: [{ name: "Nazril Afandi", url: siteUrl }],
  creator: "Nazril Afandi",
  publisher: "KodingMulu",
  category: "Web Development Services",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName,
    title: `${siteName} — Jasa Website Profesional Indonesia`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "KodingMulu — Jasa Pembuatan Website Profesional",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Jasa Website Profesional`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    // google: "GANTI_DENGAN_KODE_VERIFIKASI_GOOGLE_SEARCH_CONSOLE",
    // yandex: "GANTI_DENGAN_KODE_VERIFIKASI_YANDEX",
  },
};

// ── Structured Data (JSON-LD) ─────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "KodingMulu",
      description: siteDescription,
      url: siteUrl,
      founder: {
        "@type": "Person",
        name: "Nazril Afandi",
      },
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      serviceType: [
        "Jasa Pembuatan Website",
        "Landing Page",
        "Toko Online",
        "Web Development",
      ],
      priceRange: "$$",
      // address: {               // ← aktifkan jika punya alamat fisik
      //   "@type": "PostalAddress",
      //   addressLocality: "Jakarta",
      //   addressCountry: "ID",
      // },
      telephone: "+6282373641020", // ← isi nomor WA Anda
      sameAs: [
        "https://www.instagram.com/nzrlafndii",
        "https://www.instagram.com/kodingmulu",
        // "https://www.linkedin.com/in/nazrilafandi",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "id-ID",
    },
  ],
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {/* Favicons — letakkan file berikut di /public/ */}
        {/* favicon.ico sudah ada. Tambahkan juga: apple-touch-icon.png (180×180), favicon-32x32.png, favicon-16x16.png */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}