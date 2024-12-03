// Dependencies
import type { Metadata } from "next";
import Image from "next/image";

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
        {/* Headings: prose-headings (targets h1, h2, h3, h4, th) */}
        <h1 className="prose-headings">Main Heading</h1>
        <h2 className="prose-headings">Secondary Heading</h2>
        <h3 className="prose-headings">Tertiary Heading</h3>
        <h4 className="prose-headings">Quaternary Heading</h4>

        {/* Paragraphs: prose-p (targets p) */}
        <p className="prose-p">
          This is a paragraph demonstrating the prose-p utility class. It
          inherits styles from @tailwindcss/typography without requiring any
          overrides.
        </p>

        {/* Links: prose-a (targets a) */}
        <a href="#" className="prose-a">
          This is a link using prose-a
        </a>

        {/* Blockquotes: prose-blockquote (targets blockquote) */}
        <blockquote className="prose-blockquote">
          This is a blockquote using prose-blockquote
        </blockquote>

        {/* Figures: prose-figure (targets figure) and prose-figcaption */}
        <figure className="prose-figure">
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Figure example"
            width={600}
            height={400}
          />
          <figcaption className="prose-figcaption">
            This is a figure caption using prose-figcaption
          </figcaption>
        </figure>

        {/* Inline Text */}
        <div className="space-y-4">
          <strong className="prose-strong">Bold text using prose-strong</strong>
          <em className="prose-em">Emphasized text using prose-em</em>
          <kbd className="prose-kbd">Keyboard input using prose-kbd</kbd>
          <code className="prose-code">Code using prose-code</code>
        </div>

        {/* Preformatted Text: prose-pre (targets pre) */}
        <pre className="prose-pre">
          {`function example() {
  return "Preformatted text using prose-pre";
}`}
        </pre>

        {/* Lists */}
        <div className="space-y-6">
          {/* Ordered List */}
          <ol className="prose-ol">
            <li className="prose-li">First ordered item</li>
            <li className="prose-li">Second ordered item</li>
            <li className="prose-li">Third ordered item</li>
          </ol>

          {/* Unordered List */}
          <ul className="prose-ul">
            <li className="prose-li">First unordered item</li>
            <li className="prose-li">Second unordered item</li>
            <li className="prose-li">Third unordered item</li>
          </ul>
        </div>

        {/* Tables */}
        <table className="prose-table">
          <thead className="prose-thead">
            <tr className="prose-tr">
              <th className="prose-th">Header 1</th>
              <th className="prose-th">Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr className="prose-tr">
              <td className="prose-td">Cell 1</td>
              <td className="prose-td">Cell 2</td>
            </tr>
          </tbody>
        </table>

        {/* Media */}
        <div className="space-y-4">
          {/* Image */}
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Image example"
            className="prose-img w-full"
            width={500}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Video */}
          <video className="prose-video" controls>
            <source src="/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Separator */}
        <hr className="prose-hr" />
      </article>
    </main>
  );
}
