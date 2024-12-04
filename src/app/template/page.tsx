// Dependencies
import type { Metadata } from "next";
import Image from "next/image";
import MuxVideo from "@mux/mux-video-react";

/**
 * Metadata for the Template page
 */
export const metadata: Metadata = {
  title: "Template | Matic",
  description: "Our Matic Template",
};

/**
 * Default image to display when article has no featured image
 */
const PLACEHOLDER_IMAGE = "https://placehold.co/600x400/png";

export default async function TemplatePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose prose-slate mx-auto lg:prose-lg">
        {/* Headings */}
        <h1>Main Heading</h1>
        <h2>Secondary Heading</h2>
        <h3>Tertiary Heading</h3>
        <h4>Quaternary Heading</h4>

        {/* Paragraphs */}
        <p>
          This is a paragraph demonstrating the prose-p utility class. It
          inherits styles from @tailwindcss/typography without requiring any
          overrides.
        </p>

        {/* Links */}
        <a href="#">
          This is a link using prose-a
        </a>

        {/* Blockquotes */}
        <blockquote>
          This is a blockquote using prose-blockquote
        </blockquote>

        {/* Figures */}
        <figure>
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Figure example"
            width={600}
            height={400}
          />
          <figcaption>
            This is a figure caption using prose-figcaption
          </figcaption>
        </figure>

        {/* Inline Text */}
        <div className="flex flex-col space-y-2">
          <strong>Bold text using prose-strong</strong>
          <em>Emphasized text using prose-em</em>
          <kbd>Keyboard input using prose-kbd</kbd>
          <code>Code using prose-code</code>
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
          />

          {/* Video */}
          <MuxVideo
            src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe.m3u8"
            type="hls"
            metadata={{
              video_id: "video-template",
              video_title: "Template Video",
            }}
            controls
          />
        </div>

        {/* Separator */}
        <hr />
      </article>
    </main>
  );
}
