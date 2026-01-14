import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ["thai", "latin"],
    variable: "--font-prompt",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "CQI-SAR | ระบบประเมินโครงการ CQI ด้วย AI",
        template: "%s | CQI-SAR"
    },
    description: "ระบบประเมิน CQI ด้วยตนเองของหน่วยงาน ทบ.",
    keywords: ["CQI", "Quality Improvement", "AI Evaluation", "KM", "ทบ."],
    authors: [{ name: "พล.ท.ดร.กริช อินทราทิพย์" }],
    icons: {
        icon: [
            { url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>", type: "image/svg+xml" },
        ],
        apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏆</text></svg>",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <body className={`${prompt.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
