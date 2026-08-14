import type { Meta, StoryObj } from "@storybook/react-vite";

type TypeStyle = {
  name: string;
  token: string;
  details: string;
  className: string;
};

const typeStyles: TypeStyle[] = [
  {
    name: "Display",
    token: "text-display",
    details: "48px / 52px · 700",
    className: "font-display text-display",
  },
  {
    name: "Heading",
    token: "text-heading",
    details: "32px / 40px · 700",
    className: "font-display text-heading",
  },
  {
    name: "Title",
    token: "text-title",
    details: "24px / 32px · 600",
    className: "font-display text-title",
  },
  {
    name: "Title Small",
    token: "text-title-sm",
    details: "20px / 28px · 600",
    className: "font-display text-title-sm",
  },
  {
    name: "Body Large",
    token: "text-body-lg",
    details: "18px / 28px · 400",
    className: "font-body text-body-lg",
  },
  {
    name: "Body",
    token: "text-body",
    details: "16px / 24px · 400",
    className: "font-body text-body",
  },
  {
    name: "Body Small",
    token: "text-body-sm",
    details: "14px / 20px · 400",
    className: "font-body text-body-sm",
  },
  {
    name: "Label",
    token: "text-label",
    details: "14px / 20px · 500",
    className: "font-body text-label",
  },
  {
    name: "Caption",
    token: "text-caption",
    details: "12px / 16px · 500",
    className: "font-body text-caption",
  },
];

function TypeRow({ style }: { style: TypeStyle }) {
  return (
    <div className="border-border grid gap-4 border-b py-6 md:grid-cols-[180px_1fr]">
      <div className="space-y-1">
        <p className="text-label text-foreground">{style.name}</p>
        <code className="font-code text-caption text-muted-foreground block">{style.token}</code>
        <p className="text-caption text-muted-foreground">{style.details}</p>
      </div>

      <p className={`${style.className} text-foreground`}>
        Music makes every moment feel different.
      </p>
    </div>
  );
}

function Typography() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 space-y-3">
          <p className="text-label text-accent-foreground">Design System</p>

          <h1 className="font-display text-heading">Typography Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-2xl">
            A semantic type scale for interface text, labels, titles, and display content.
          </p>
        </header>

        <section>
          {typeStyles.map((style) => (
            <TypeRow key={style.token} style={style} />
          ))}
        </section>

        <section className="mt-12 space-y-6">
          <div>
            <h2 className="font-display text-title">Font Families</h2>
            <div className="bg-border mt-2 h-px" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="border-border bg-surface-elevated rounded-xl border p-5">
              <p className="text-caption text-muted-foreground">font-body</p>
              <p className="font-body text-title-sm mt-3">Body Sans</p>
            </div>

            <div className="border-border bg-surface-elevated rounded-xl border p-5">
              <p className="text-caption text-muted-foreground">font-display</p>
              <p className="font-display text-title-sm mt-3">Display Sans</p>
            </div>

            <div className="border-border bg-surface-elevated rounded-xl border p-5">
              <p className="text-caption text-muted-foreground">font-code</p>
              <p className="font-code text-body-sm mt-3">const music = true;</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
