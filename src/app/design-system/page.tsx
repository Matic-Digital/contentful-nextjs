import { Text } from '@/components/global/matic-ds';
import { cn } from '@/lib/utils';

const Section = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => (
  <section className={cn('mb-12', className)}>
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">{title}</h2>
    <div className="space-y-6">{children}</div>
  </section>
);

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('p-6 border rounded-lg bg-card text-card-foreground shadow-sm', className)}>
    {children}
  </div>
);

export default function DesignSystemPage() {
  const textVariants = ['display', 'headline', 'title', 'body', 'label'] as const;
  const sizes = ['lg', 'md', 'sm', 'xs', 'xxs'] as const;
  const lineHeights = ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'] as const;
  const letterSpacings = ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'] as const;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Matic Design System</h1>
        <p className="text-lg text-muted-foreground">A collection of reusable components for building UIs</p>
      </header>

      {/* Text Component */}
      <Section title="Text Component">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Variants</h3>
          <div className="space-y-4">
            {textVariants.map((variant) => (
              <div key={variant} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground mb-2">Variant: {variant}</p>
                <Text variant={variant}>
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Sizes</h3>
          <div className="space-y-4">
            {sizes.map((size) => (
              <div key={size} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground mb-2">Size: {size}</p>
                <Text size={size}>
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Line Heights</h3>
          <div className="space-y-4">
            {lineHeights.map((lineHeight) => (
              <div key={lineHeight} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground mb-2">Line Height: {lineHeight}</p>
                <Text lineHeight={lineHeight} className="bg-gray-100 p-2 rounded">
                  The quick brown fox jumps over the lazy dog<br />
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Letter Spacing</h3>
          <div className="space-y-4">
            {letterSpacings.map((letterSpacing) => (
              <div key={letterSpacing} className="border-b pb-4 last:border-b-0 last:pb-0">
                <p className="text-sm text-muted-foreground mb-2">Letter Spacing: {letterSpacing}</p>
                <Text letterSpacing={letterSpacing}>
                  The quick brown fox jumps over the lazy dog
                </Text>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Layout Components */}
      <Section title="Layout Components">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Container</h3>
          <div className="bg-gray-100 p-4 rounded">
            <div className="border-2 border-dashed border-gray-400 p-4">
              <p className="text-sm text-muted-foreground mb-2">Default Container</p>
              <div className="bg-white p-4 border">
                <p>This is inside a container</p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Section</h3>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 p-4 border-b">
              <p className="text-sm text-muted-foreground">Section Component</p>
            </div>
            <div className="p-4">
              <p>Section content goes here</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-8 mb-4">Box</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Box with padding</p>
              <div className="bg-gray-100 p-4 rounded">
                <p>Box content</p>
              </div>
            </div>
            <div className="border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Box with custom class</p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p>Custom styled box</p>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Prose Component */}
      <Section title="Prose Component">
        <Card>
          <div className="prose max-w-none">
            <h3>Prose Example</h3>
            <p>This is an example of prose content that will have nice typography applied automatically.</p>
            <ul>
              <li>List item one</li>
              <li>List item two</li>
              <li>List item three</li>
            </ul>
            <blockquote>
              <p>A well-known quote, contained in a blockquote element.</p>
            </blockquote>
          </div>
        </Card>
      </Section>

      {/* Responsive Example */}
      <Section title="Responsive Example">
        <Card>
          <div className="space-y-4">
            <Text variant="title" size="lg" className="block md:hidden">Mobile Only Title</Text>
            <Text variant="title" size="lg" className="hidden md:block">Desktop Title</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border p-4 rounded-lg">
                  <Text variant="label" className="block mb-2">Card {i}</Text>
                  <Text>This card will stack on mobile and show in a grid on larger screens.</Text>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
