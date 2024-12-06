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
      <article className="prose prose-slate mx-auto lg:prose-lg">
        {/* Headings */}
        <h1>Main Heading</h1>
        <h2>Secondary Heading</h2>
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
