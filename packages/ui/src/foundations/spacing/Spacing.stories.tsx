import type { Meta, StoryObj } from "@storybook/react-vite";

type SpacingToken = {
  name: string;
  rem: string;
  pixels: string;
  utility: string;
  className: string;
};

const spacingTokens: SpacingToken[] = [
  {
    name: "1",
    rem: "0.25rem",
    pixels: "4px",
    utility: "w-1",
    className: "w-1",
  },
  {
    name: "2",
    rem: "0.5rem",
    pixels: "8px",
    utility: "w-2",
    className: "w-2",
  },
  {
    name: "3",
    rem: "0.75rem",
    pixels: "12px",
    utility: "w-3",
    className: "w-3",
  },
  {
    name: "4",
    rem: "1rem",
    pixels: "16px",
    utility: "w-4",
    className: "w-4",
  },
  {
    name: "6",
    rem: "1.5rem",
    pixels: "24px",
    utility: "w-6",
    className: "w-6",
  },
  {
    name: "8",
    rem: "2rem",
    pixels: "32px",
    utility: "w-8",
    className: "w-8",
  },
  {
    name: "10",
    rem: "2.5rem",
    pixels: "40px",
    utility: "w-10",
    className: "w-10",
  },
  {
    name: "12",
    rem: "3rem",
    pixels: "48px",
    utility: "w-12",
    className: "w-12",
  },
  {
    name: "16",
    rem: "4rem",
    pixels: "64px",
    utility: "w-16",
    className: "w-16",
  },
  {
    name: "20",
    rem: "5rem",
    pixels: "80px",
    utility: "w-20",
    className: "w-20",
  },
  {
    name: "24",
    rem: "6rem",
    pixels: "96px",
    utility: "w-24",
    className: "w-24",
  },
  {
    name: "32",
    rem: "8rem",
    pixels: "128px",
    utility: "w-32",
    className: "w-32",
  },
];

function SpacingRow({ token }: { token: SpacingToken }) {
  return (
    <div className="border-border grid items-center gap-6 border-b py-5 md:grid-cols-[100px_140px_1fr]">
      <div>
        <p className="text-label text-foreground">{token.name}</p>
        <code className="font-code text-caption text-muted-foreground">{token.utility}</code>
      </div>

      <div className="text-caption text-muted-foreground">
        <p>{token.rem}</p>
        <p>{token.pixels}</p>
      </div>

      <div className="flex h-8 items-center">
        <div className={`bg-primary h-6 rounded-sm ${token.className}`} />
      </div>
    </div>
  );
}

function Spacing() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 space-y-3">
          <p className="text-label text-primary">Design System</p>

          <h1 className="font-display text-heading">Spacing Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-2xl">
            A consistent spacing scale based on a 4px base unit for layout, gaps, padding, sizing,
            and component rhythm.
          </p>
        </header>

        <section className="border-border bg-surface-elevated rounded-xl border px-6">
          <div className="border-border text-caption text-muted-foreground grid gap-6 border-b py-4 md:grid-cols-[100px_140px_1fr]">
            <span>Token</span>
            <span>Value</span>
            <span>Preview</span>
          </div>

          {spacingTokens.map((token) => (
            <SpacingRow key={token.name} token={token} />
          ))}
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Spacing",
  component: Spacing,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Spacing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
