import type { Meta, StoryObj } from "@storybook/react-vite";

type RadiusToken = {
  name: string;
  value: string;
  utility: string;
  className: string;
};

const primitiveRadiusTokens: RadiusToken[] = [
  {
    name: "XS",
    value: "4px",
    utility: "rounded-xs",
    className: "rounded-xs",
  },
  {
    name: "SM",
    value: "6px",
    utility: "rounded-sm",
    className: "rounded-sm",
  },
  {
    name: "MD",
    value: "8px",
    utility: "rounded-md",
    className: "rounded-md",
  },
  {
    name: "LG",
    value: "12px",
    utility: "rounded-lg",
    className: "rounded-lg",
  },
  {
    name: "XL",
    value: "16px",
    utility: "rounded-xl",
    className: "rounded-xl",
  },
  {
    name: "2XL",
    value: "24px",
    utility: "rounded-2xl",
    className: "rounded-2xl",
  },
  {
    name: "Full",
    value: "9999px",
    utility: "rounded-full",
    className: "rounded-full",
  },
];

const semanticRadiusTokens: RadiusToken[] = [
  {
    name: "Control",
    value: "8px",
    utility: "rounded-control",
    className: "rounded-control",
  },
  {
    name: "Card",
    value: "16px",
    utility: "rounded-card",
    className: "rounded-card",
  },
  {
    name: "Panel",
    value: "24px",
    utility: "rounded-panel",
    className: "rounded-panel",
  },
  {
    name: "Pill",
    value: "9999px",
    utility: "rounded-pill",
    className: "rounded-pill",
  },
];

function RadiusCard({ token }: { token: RadiusToken }) {
  return (
    <div className="space-y-3">
      <div
        className={`border-border bg-primary flex h-28 items-center justify-center border ${token.className}`}
      >
        <span className="text-label text-primary-foreground">{token.name}</span>
      </div>

      <div>
        <p className="text-label text-foreground">{token.name}</p>

        <div className="mt-1 space-y-1">
          <code className="font-code text-caption text-muted-foreground block">
            {token.utility}
          </code>

          <p className="text-caption text-muted-foreground">{token.value}</p>
        </div>
      </div>
    </div>
  );
}

function RadiusGroup({ title, tokens }: { title: string; tokens: RadiusToken[] }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-display text-title">{title}</h2>
        <div className="bg-border mt-2 h-px" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-6">
        {tokens.map((token) => (
          <RadiusCard key={token.utility} token={token} />
        ))}
      </div>
    </section>
  );
}

function Radius() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-3">
          <p className="text-label text-primary">Design System</p>

          <h1 className="font-display text-heading">Radius Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-2xl">
            A consistent border-radius scale with semantic aliases for controls, cards, panels, and
            pill-shaped elements.
          </p>
        </header>

        <RadiusGroup title="Primitive Scale" tokens={primitiveRadiusTokens} />

        <RadiusGroup title="Semantic Radius" tokens={semanticRadiusTokens} />
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Radius",
  component: Radius,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Radius>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
