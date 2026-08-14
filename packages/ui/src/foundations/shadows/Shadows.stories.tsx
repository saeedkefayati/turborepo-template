import type { Meta, StoryObj } from "@storybook/react-vite";

type ShadowToken = {
  name: string;
  utility: string;
  description: string;
  className: string;
};

const primitiveShadows: ShadowToken[] = [
  { name: "XS", utility: "shadow-xs", description: "Subtle separation", className: "shadow-xs" },
  { name: "SM", utility: "shadow-sm", description: "Low elevation", className: "shadow-sm" },
  { name: "MD", utility: "shadow-md", description: "Medium elevation", className: "shadow-md" },
  { name: "LG", utility: "shadow-lg", description: "High elevation", className: "shadow-lg" },
  { name: "XL", utility: "shadow-xl", description: "Floating content", className: "shadow-xl" },
  { name: "2XL", utility: "shadow-2xl", description: "Maximum elevation", className: "shadow-2xl" },
];

const semanticShadows: ShadowToken[] = [
  {
    name: "Card",
    utility: "shadow-card",
    description: "Cards and contained surfaces",
    className: "shadow-card",
  },
  {
    name: "Dropdown",
    utility: "shadow-dropdown",
    description: "Menus and dropdowns",
    className: "shadow-dropdown",
  },
  {
    name: "Popover",
    utility: "shadow-popover",
    description: "Floating contextual content",
    className: "shadow-popover",
  },
  {
    name: "Modal",
    utility: "shadow-modal",
    description: "Dialogs and modal surfaces",
    className: "shadow-modal",
  },
  {
    name: "Player",
    utility: "shadow-player",
    description: "Floating music player surfaces",
    className: "shadow-player",
  },
];

function ShadowCard({ token }: { token: ShadowToken }) {
  return (
    <div className="space-y-4">
      <div
        className={`rounded-card border-border bg-surface-elevated flex h-36 items-center justify-center border ${token.className}`}
      >
        <span className="text-label text-foreground">{token.name}</span>
      </div>

      <div className="space-y-1">
        <p className="text-label text-foreground">{token.name}</p>

        <code className="font-code text-caption text-muted-foreground block">{token.utility}</code>

        <p className="text-caption text-muted-foreground">{token.description}</p>
      </div>
    </div>
  );
}

function ShadowGroup({ title, tokens }: { title: string; tokens: ShadowToken[] }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-display text-title">{title}</h2>
        <div className="bg-border mt-2 h-px" />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-8">
        {tokens.map((token) => (
          <ShadowCard key={token.utility} token={token} />
        ))}
      </div>
    </section>
  );
}

function Shadows() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-14">
        <header className="space-y-3">
          <p className="text-label text-accent-foreground">Design System</p>

          <h1 className="font-display text-heading">Shadow & Elevation Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-2xl">
            A consistent elevation system for cards, floating content, dropdowns, dialogs, and
            player surfaces.
          </p>
        </header>

        <ShadowGroup title="Primitive Elevation" tokens={primitiveShadows} />
        <ShadowGroup title="Semantic Elevation" tokens={semanticShadows} />
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Shadows",
  component: Shadows,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Shadows>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
