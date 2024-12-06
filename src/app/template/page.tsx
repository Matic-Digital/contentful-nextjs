// Dependencies
import type { Metadata } from "next";
import Image from "next/image";
import MuxVideo from "@mux/mux-video-react";
import { PLACEHOLDER_IMAGE } from "@/constants/images";
import { DEFAULT_METADATA } from "@/constants/metadata";

/**
 * Metadata for the Template page
 */
export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  title: `Template | ${DEFAULT_METADATA.title}`,
  description: "Template page showcasing various content elements and styles",
};

export default async function TemplatePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Typography Section */}
      <article className="prose prose-slate mx-auto lg:prose-lg mb-16">
        <h1>Typography Components</h1>
        
        {/* Headings */}
        <h2>Headings</h2>
        <h3>Tertiary Heading</h3>
        <h4>Quaternary Heading</h4>

        {/* Paragraphs */}
        <p>
          This is a paragraph demonstrating the prose utility class. It
          inherits styles from @tailwindcss/typography without requiring any
          overrides.
        </p>

        {/* Links */}
        <a href="#">
          This is a link using prose
        </a>

        {/* Blockquotes */}
        <blockquote>
          This is a blockquote using prose
        </blockquote>

        {/* Figures */}
        <figure>
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Figure example"
            width={600}
            height={400}
            className="aspect-video rounded-lg object-cover"
            priority
          />
          <figcaption>
            This is a figure caption using prose
          </figcaption>
        </figure>

        {/* Inline Text */}
        <div className="flex flex-col space-y-2">
          <strong>Bold text using prose</strong>
          <em>Emphasized text using prose</em>
          <kbd>Keyboard input using prose</kbd>
          <code>Code using prose</code>
        </div>

        {/* Preformatted Text */}
        <pre>
          {`function example() {
  return "Preformatted text using prose-pre";
}`}
        </pre>

        {/* Lists */}
        <div>
          {/* Ordered List */}
          <ol>
            <li>First ordered item</li>
            <li>Second ordered item</li>
            <li>Third ordered item</li>
          </ol>

          {/* Unordered List */}
          <ul>
            <li>First unordered item</li>
            <li>Second unordered item</li>
            <li>Third unordered item</li>
          </ul>
        </div>

        {/* Tables */}
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell 1</td>
              <td>Cell 2</td>
            </tr>
          </tbody>
        </table>

        {/* Media */}
        <div>
          {/* Image */}
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Image example"
            width={500}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="aspect-video rounded-lg object-cover"
            priority
          />

          {/* Video */}
          <MuxVideo
            playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
            metadata={{
              video_title: "Video example",
            }}
            controls
          />
        </div>
      </article>

      {/* Animation Examples Section */}
      <article className="prose prose-slate mx-auto lg:prose-lg">
        <h1>Animation Examples</h1>
        
        {/* Fade Up Animation */}
        <section>
          <h2>Fade Up Animation</h2>
          <p className="animate-fade-up">
            This paragraph demonstrates the fade up animation with prose styling.
          </p>
          <p className="animate-fade-up [animation-delay:200ms]">
            This paragraph shows a delayed fade up animation, also maintaining prose styles.
          </p>
        </section>

        {/* Scale Animations */}
        <section>
          <h2>Scale Animations</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <a href="" className="hover:animate-scale-up active:animate-scale-down
            text-primary border border-primary rounded-md text-center p-4">
              Interactive link with scale animations
            </a>
            <blockquote className="hover:animate-subtle-scale my-auto">
              Blockquote with subtle scale on hover
            </blockquote>
          </div>
        </section>

        {/* Slide Animation */}
        <section>
          <h2>Slide Animation</h2>
          <blockquote className="hover:animate-slide-right">
            This blockquote slides right on hover while maintaining prose styling
          </blockquote>
        </section>

        {/* Combined Animations */}
        <section>
          <h2>Combined Animations</h2>
          <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <figure className="animate-fade-up hover:animate-scale-up m-0">
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Animated figure example"
                width={300}
                height={200}
                className="rounded"
              />
              <figcaption>
                Figure with fade up and scale animations
              </figcaption>
            </figure>
            <div className="animate-fade-up [animation-delay:200ms]">
              <pre className="hover:animate-slide-right">
{`function animate() {
  return "Code with animations";
}`}
              </pre>
            </div>
          </div>
          
          {/* List with animations */}
          <ul className="animate-fade-up [animation-delay:400ms]">
            <li className="hover:animate-slide-right">First animated item</li>
            <li className="hover:animate-slide-right [animation-delay:100ms]">Second animated item</li>
            <li className="hover:animate-slide-right [animation-delay:200ms]">Third animated item</li>
          </ul>
          
          {/* Table with animations */}
          <table className="animate-fade-up [animation-delay:600ms]">
            <thead>
              <tr>
                <th className="hover:animate-subtle-scale">Animated Header 1</th>
                <th className="hover:animate-subtle-scale">Animated Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:animate-slide-right">
                <td>Cell 1</td>
                <td>Cell 2</td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    </main>
  );
}
