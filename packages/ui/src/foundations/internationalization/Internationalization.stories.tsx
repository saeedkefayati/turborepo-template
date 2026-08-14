import type { Meta, StoryObj } from "@storybook/react-vite";

type Direction = "ltr" | "rtl";

type LanguageSample = {
  direction: Direction;
  label: string;
  locale: string;
  text: string;
};

const languageSamples: LanguageSample[] = [
  {
    label: "Latin",
    locale: "en-US",
    direction: "ltr",
    text: "Music makes every moment feel different.",
  },
  {
    label: "Persian",
    locale: "fa-IR",
    direction: "rtl",
    text: "موسیقی می‌تواند حال و هوای هر لحظه را تغییر دهد.",
  },
  {
    label: "Arabic",
    locale: "ar-SA",
    direction: "rtl",
    text: "يمكن للموسيقى أن تغيّر إحساس كل لحظة.",
  },
  {
    label: "Hebrew",
    locale: "he-IL",
    direction: "rtl",
    text: "מוזיקה יכולה לשנות את התחושה של כל רגע.",
  },
  {
    label: "Devanagari",
    locale: "hi-IN",
    direction: "ltr",
    text: "संगीत हर पल के एहसास को बदल सकता है।",
  },
  {
    label: "Simplified Chinese",
    locale: "zh-Hans-CN",
    direction: "ltr",
    text: "音乐可以改变每一个时刻的感受。",
  },
  {
    label: "Traditional Chinese",
    locale: "zh-Hant-TW",
    direction: "ltr",
    text: "音樂可以改變每一個時刻的感受。",
  },
  {
    label: "Japanese",
    locale: "ja-JP",
    direction: "ltr",
    text: "音楽はあらゆる瞬間の感じ方を変えることができます。",
  },
  {
    label: "Korean",
    locale: "ko-KR",
    direction: "ltr",
    text: "음악은 모든 순간의 느낌을 바꿀 수 있습니다.",
  },
  {
    label: "Thai",
    locale: "th-TH",
    direction: "ltr",
    text: "ดนตรีสามารถเปลี่ยนความรู้สึกของทุกช่วงเวลาได้",
  },
  {
    label: "Cyrillic",
    locale: "ru-RU",
    direction: "ltr",
    text: "Музыка может изменить ощущение каждого момента.",
  },
];

function Internationalization() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-3">
          <p className="text-label text-accent-foreground">Design System</p>

          <h1 className="font-display text-heading">Internationalization Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-3xl">
            Representative writing-system samples for validating typography, bidirectional layout,
            text expansion, and language-independent component behavior.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="font-display text-title">Writing Systems</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {languageSamples.map((sample) => (
              <article
                key={sample.locale}
                lang={sample.locale}
                dir={sample.direction}
                className="border-border bg-surface-elevated rounded-card border p-5"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-label">{sample.label}</p>

                  <code dir="ltr" className="font-code text-caption text-muted-foreground">
                    {sample.locale} · {sample.direction}
                  </code>
                </div>

                <p className="font-body text-body">{sample.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Bidirectional Content</h2>

          <div
            lang="fa-IR"
            dir="rtl"
            className="border-border bg-surface-elevated rounded-card border p-5"
          >
            <p className="font-body text-body">
              نسخه <bdi>React 19</bdi> در پروژه استفاده می‌شود و آدرس مستندات{" "}
              <bdi>https://example.com/docs</bdi> نیز باید بدون به‌هم‌ریختگی نمایش داده شود.
            </p>

            <code
              dir="ltr"
              className="bg-surface-muted font-code text-body-sm rounded-control mt-4 block overflow-x-auto p-3 text-start"
            >
              pnpm --filter @repo/ui test
            </code>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Automatic Direction</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="border-border bg-surface-elevated rounded-card border p-5">
              <p className="text-caption text-muted-foreground mb-3">User-generated RTL content</p>

              <p dir="auto" className="font-body text-body">
                این متن توسط کاربر وارد شده است.
              </p>
            </div>

            <div className="border-border bg-surface-elevated rounded-card border p-5">
              <p className="text-caption text-muted-foreground mb-3">User-generated LTR content</p>

              <p dir="auto" className="font-body text-body">
                This content was entered by a user.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="font-display text-title">Text Expansion</h2>

          <div className="border-border bg-surface-elevated rounded-card border p-5">
            <p className="font-body text-body max-w-3xl">
              Components must remain usable when translated content becomes considerably longer than
              the original copy. Labels, descriptions, validation messages, and actions should wrap
              naturally instead of depending on fixed text widths.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Internationalization",
  component: Internationalization,

  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Internationalization>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
