// Dependencies
import type { Metadata } from 'next';
import Image from 'next/image';

import MuxVideo from '@mux/mux-video-react';

import { Main, Container, Section, Prose, Box } from '@/components/global/matic-ds';

import { PLACEHOLDER_IMAGE } from '@/constants/images';
import { DEFAULT_METADATA } from '@/constants/metadata';

/**
 * Metadata for the Template page
 */
export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  title: `Template | ${DEFAULT_METADATA.title}`,
  description: 'Template page showcasing various content elements and styles'
};

export default async function TemplatePage() {
  return (
    <Container>
      <Main>
        <Prose>
          <h5>Headings</h5>

          {/* Typography Section */}
          <h1>XLarge Header</h1>

          {/* Headings */}
          <h2>Large Header</h2>
          <h3>Large Section Header</h3>

          <br />

          <hr />
          <h5>Body Copy</h5>

          {/* Paragraphs */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>

          {/* Links */}
          <a href="#">Link using prose</a>

          {/* Blockquotes */}
          <blockquote>This is a blockquote using prose</blockquote>

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
            <figcaption>This is a figure caption using prose</figcaption>
          </figure>

          {/* Inline Text */}
          <Box direction="col" gap={2}>
            <strong>Bold text using prose</strong>
            <em>Emphasized text using prose</em>
            <kbd>Keyboard input using prose</kbd>
            <code>Code using prose</code>
          </Box>

          {/* Preformatted Text */}
          <pre>
            {`function example() {
  return "Preformatted text using prose";
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
              <tr>
                <td>Cell 3</td>
                <td>Cell 4</td>
              </tr>
            </tbody>
          </table>

          {/* Media Section */}
          <hr />
          <h4>Media Components</h4>

          <br />

          {/* Images */}
          <Image
            src={PLACEHOLDER_IMAGE}
            alt="Example image"
            width={600}
            height={400}
            className="aspect-video rounded-lg object-cover"
            priority
          />

          {/* Videos */}
          <MuxVideo
            playbackId="DS00Spx1CV902MCtPj5WknGlR102V5HFkDe"
            metadata={{
              video_title: 'Example Video'
            }}
            className="aspect-video rounded-lg"
          />

          {/* Animation Examples Section */}
          <hr />
          <h4>Animation Examples</h4>

          {/* Fade Up Animation */}
          <Section>
            <h5>Fade Up Animation</h5>
            <p className="animate-fade-up">
              This paragraph demonstrates the fade up animation with prose styling.
            </p>
            <p className="animate-fade-up [animation-delay:200ms]">
              This paragraph shows a delayed fade up animation, also maintaining prose styles.
            </p>
          </Section>

          {/* Scale Animations */}
          <Section>
            <h5>Scale Animations</h5>
            <Box cols={{ base: 1, sm: 2 }} gap={4} className="not-prose my-4">
              <a
                href="#"
                className="rounded-md border border-primary p-4 text-center text-primary hover:animate-scale-up active:animate-scale-down"
              >
                Interactive link with scale animations
              </a>
              <blockquote className="my-auto hover:animate-subtle-scale">
                Blockquote with subtle scale on hover
              </blockquote>
            </Box>
          </Section>

          {/* Slide Animation */}
          <Section>
            <h5>Slide Animation</h5>
            <blockquote className="hover:animate-slide-right">
              This blockquote slides right on hover while maintaining prose styling
            </blockquote>
          </Section>

          {/* Combined Animations */}
          <Section>
            <h5>Combined Animations</h5>
            <Box cols={{ base: 1, sm: 2 }} gap={4} className="not-prose my-4">
              <figure className="m-0 animate-fade-up hover:animate-scale-up">
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Animated figure example"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <figcaption>Figure with fade up and scale animations</figcaption>
              </figure>
              <div className="animate-fade-up [animation-delay:200ms]">
                <pre className="hover:animate-slide-right">
                  {`function animate() {
  return "Code with animations";
}`}
                </pre>
              </div>
            </Box>

            {/* List with animations */}
            <ul className="animate-fade-up [animation-delay:400ms]">
              <li className="hover:animate-slide-right">First animated item</li>
              <li className="[animation-delay:100ms] hover:animate-slide-right">
                Second animated item
              </li>
              <li className="[animation-delay:200ms] hover:animate-slide-right">
                Third animated item
              </li>
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
          </Section>
        </Prose>
      </Main>
    </Container>
  );
}
