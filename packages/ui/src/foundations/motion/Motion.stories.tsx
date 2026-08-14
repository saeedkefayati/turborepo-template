import type { Meta, StoryObj } from "@storybook/react-vite";

type DurationToken = {
  name: string;
  value: string;
  utility: string;
  className: string;
  description: string;
};

const durationTokens: DurationToken[] = [
  {
    name: "Instant",
    value: "0ms",
    utility: "duration-instant",
    className: "duration-instant",
    description: "Immediate state changes",
  },
  {
    name: "Fast",
    value: "120ms",
    utility: "duration-fast",
    className: "duration-fast",
    description: "Hover and simple feedback",
  },
  {
    name: "Normal",
    value: "200ms",
    utility: "duration-normal",
    className: "duration-normal",
    description: "Default interface transitions",
  },
  {
    name: "Slow",
    value: "320ms",
    utility: "duration-slow",
    className: "duration-slow",
    description: "Panels and larger movements",
  },
  {
    name: "Slower",
    value: "500ms",
    utility: "duration-slower",
    className: "duration-slower",
    description: "Large or emphasized transitions",
  },
];

type EasingToken = {
  name: string;
  utility: string;
  className: string;
  description: string;
};

const easingTokens: EasingToken[] = [
  {
    name: "Standard",
    utility: "ease-standard",
    className: "ease-standard",
    description: "General interface movement",
  },
  {
    name: "Enter",
    utility: "ease-enter",
    className: "ease-enter",
    description: "Elements entering the interface",
  },
  {
    name: "Exit",
    utility: "ease-exit",
    className: "ease-exit",
    description: "Elements leaving the interface",
  },
];

function DurationCard({ token }: { token: DurationToken }) {
  return (
    <div className="rounded-card border-border bg-surface-elevated shadow-card border p-5">
      <div className="rounded-pill bg-surface-muted mb-5 h-10 overflow-hidden">
        <div
          className={`rounded-pill bg-primary ease-standard h-full w-10 transition-transform hover:translate-x-32 motion-reduce:duration-0 ${token.className}`}
        />
      </div>

      <p className="text-label text-foreground">{token.name}</p>

      <code className="font-code text-caption text-muted-foreground mt-1 block">
        {token.utility}
      </code>

      <p className="text-caption text-muted-foreground mt-1">{token.value}</p>

      <p className="text-body-sm text-muted-foreground mt-3">{token.description}</p>
    </div>
  );
}

function EasingCard({ token }: { token: EasingToken }) {
  return (
    <div className="rounded-card border-border bg-surface-elevated shadow-card border p-5">
      <div className="rounded-pill bg-surface-muted mb-5 h-10 overflow-hidden">
        <div
          className={`rounded-pill bg-primary duration-slower h-full w-10 transition-transform hover:translate-x-32 motion-reduce:duration-0 ${token.className}`}
        />
      </div>

      <p className="text-label text-foreground">{token.name}</p>

      <code className="font-code text-caption text-muted-foreground mt-1 block">
        {token.utility}
      </code>

      <p className="text-body-sm text-muted-foreground mt-3">{token.description}</p>
    </div>
  );
}

function Motion() {
  return (
    <main className="bg-background text-foreground min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-14">
        <header className="space-y-3">
          <p className="text-label text-accent-foreground">Design System</p>

          <h1 className="font-display text-heading">Motion Foundations</h1>

          <p className="font-body text-body text-muted-foreground max-w-2xl">
            Semantic duration and easing tokens for consistent, responsive, and accessible motion
            across the interface.
          </p>
        </header>

        <section className="space-y-6">
          <div>
            <h2 className="font-display text-title">Duration</h2>
            <div className="bg-border mt-2 h-px" />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
            {durationTokens.map((token) => (
              <DurationCard key={token.utility} token={token} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="font-display text-title">Easing</h2>
            <div className="bg-border mt-2 h-px" />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
            {easingTokens.map((token) => (
              <EasingCard key={token.utility} token={token} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const meta = {
  title: "Foundations/Motion",
  component: Motion,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Motion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
