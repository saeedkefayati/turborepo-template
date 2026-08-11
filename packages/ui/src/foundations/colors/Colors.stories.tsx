import type { Meta, StoryObj } from "@storybook/react-vite";

type ColorToken = {
  name: string;
  variable: string;
  utility: string;
  className: string;
};

const surfaceColors: ColorToken[] = [
  {
    name: "Background",
    variable: "--ds-background",
    utility: "bg-background",
    className: "bg-background",
  },
  {
    name: "Surface",
    variable: "--ds-surface",
    utility: "bg-surface",
    className: "bg-surface",
  },
  {
    name: "Surface Muted",
    variable: "--ds-surface-muted",
    utility: "bg-surface-muted",
    className: "bg-surface-muted",
  },
  {
    name: "Surface Elevated",
    variable: "--ds-surface-elevated",
    utility: "bg-surface-elevated",
    className: "bg-surface-elevated",
  },
];

const contentColors: ColorToken[] = [
  {
    name: "Foreground",
    variable: "--ds-foreground",
    utility: "bg-foreground",
    className: "bg-foreground",
  },
  {
    name: "Muted Foreground",
    variable: "--ds-muted-foreground",
    utility: "bg-muted-foreground",
    className: "bg-muted-foreground",
  },
  {
    name: "Border",
    variable: "--ds-border",
    utility: "bg-border",
    className: "bg-border",
  },
];

const actionColors: ColorToken[] = [
  {
    name: "Primary",
    variable: "--ds-primary",
    utility: "bg-primary",
    className: "bg-primary",
  },
  {
    name: "Primary Hover",
    variable: "--ds-primary-hover",
    utility: "bg-primary-hover",
    className: "bg-primary-hover",
  },
  {
    name: "Primary Foreground",
    variable: "--ds-primary-foreground",
    utility: "bg-primary-foreground",
    className: "bg-primary-foreground",
  },
  {
    name: "Danger",
    variable: "--ds-danger",
    utility: "bg-danger",
    className: "bg-danger",
  },
  {
    name: "Danger Foreground",
    variable: "--ds-danger-foreground",
    utility: "bg-danger-foreground",
    className: "bg-danger-foreground",
  },
];

function ColorSwatch({ token }: { token: ColorToken }) {
  return (
    <div className="border-border bg-surface-elevated overflow-hidden rounded-xl border">
      <div className={`h-24 ${token.className}`} />

      <div className="space-y-2 p-4">
        <p className="text-foreground font-medium">{token.name}</p>

        <div className="text-muted-foreground space-y-1 text-xs">
          <code className="block">{token.variable}</code>
          <code className="block">{token.utility}</code>
        </div>
      </div>
    </div>
  );
}

function ColorGroup({ title, tokens }: { title: string; tokens: ColorToken[] }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-foreground text-lg font-semibold">{title}</h2>
        <div className="bg-border mt-2 h-px" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {tokens.map((token) => (
          <ColorSwatch key={token.variable} token={token} />
        ))}
      </div>
    </section>
  );
}

function Colors() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Color Foundations</h1>

          <p className="text-muted-foreground max-w-2xl text-sm">
            Semantic color tokens used across the design system. Switch between light and dark
            themes from the Storybook toolbar to verify both themes.
          </p>
        </header>

        <ColorGroup title="Surfaces" tokens={surfaceColors} />
        <ColorGroup title="Content & Structure" tokens={contentColors} />
        <ColorGroup title="Actions & Feedback" tokens={actionColors} />
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Colors>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
