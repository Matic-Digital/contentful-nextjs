import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Layout, Main, Section, Container, Article, Box } from '@/components/global/matic-ds';

describe('Matic Design System Components', () => {
  describe('Layout Component', () => {
    // Note: Layout component renders an HTML element which is difficult to test in JSDOM
    // So we'll just test that it renders its children
    it('renders children', () => {
      // Use a custom render function that doesn't mount to document.body
      const { container } = render(
        <Layout>
          <div data-testid="layout-child">Layout Content</div>
        </Layout>,
        { container: document.createElement('div') }
      );
      
      // Just check that the content is rendered
      expect(container.textContent).toContain('Layout Content');
    });
    
    it('applies custom classes', () => {
      const { container } = render(
        <Layout className="custom-class">
          <div>Content</div>
        </Layout>,
        { container: document.createElement('div') }
      );
      
      // Check that the html element has the custom class
      const html = container.firstChild;
      expect(html).toHaveClass('custom-class');
    });
  });
  
  describe('Main Component', () => {
    it('renders children within a main element', () => {
      render(
        <Main>
          <div data-testid="main-child">Main Content</div>
        </Main>
      );
      
      expect(screen.getByTestId('main-child')).toBeInTheDocument();
      
      // Check that it renders as a main element
      const mainElement = screen.getByText('Main Content').closest('main');
      expect(mainElement).toBeInTheDocument();
    });
    
    it('applies custom classes and ID', () => {
      render(
        <Main className="custom-main" id="main-id">
          <div>Content</div>
        </Main>
      );
      
      const mainElement = screen.getByText('Content').closest('main');
      expect(mainElement).toHaveClass('custom-main');
      expect(mainElement).toHaveAttribute('id', 'main-id');
    });
  });
  
  describe('Section Component', () => {
    it('renders children within a section element', () => {
      render(
        <Section>
          <div data-testid="section-child">Section Content</div>
        </Section>
      );
      
      expect(screen.getByTestId('section-child')).toBeInTheDocument();
      
      // Check that it renders as a section element
      const sectionElement = screen.getByText('Section Content').closest('section');
      expect(sectionElement).toBeInTheDocument();
    });
    
    it('applies custom classes and ID', () => {
      render(
        <Section className="custom-section" id="section-id">
          <div>Content</div>
        </Section>
      );
      
      const sectionElement = screen.getByText('Content').closest('section');
      expect(sectionElement).toHaveClass('custom-section');
      expect(sectionElement).toHaveAttribute('id', 'section-id');
    });
  });
  
  describe('Container Component', () => {
    it('renders children within a div element', () => {
      render(
        <Container>
          <div data-testid="container-child">Container Content</div>
        </Container>
      );
      
      expect(screen.getByTestId('container-child')).toBeInTheDocument();
    });
    
    it('applies container class by default', () => {
      render(
        <Container>
          <div>Content</div>
        </Container>
      );
      
      const container = screen.getByText('Content').parentElement;
      expect(container).toHaveClass('container');
    });
    
    it('applies max-w-full class when width is full', () => {
      render(
        <Container width="full">
          <div>Content</div>
        </Container>
      );
      
      const container = screen.getByText('Content').parentElement;
      expect(container).toHaveClass('max-w-full');
    });
    
    it('applies custom classes and ID', () => {
      render(
        <Container className="custom-container" id="container-id">
          <div>Content</div>
        </Container>
      );
      
      const container = screen.getByText('Content').parentElement;
      expect(container).toHaveClass('custom-container');
      expect(container).toHaveAttribute('id', 'container-id');
    });
  });
  
  describe('Article Component', () => {
    it('renders children within an article element', () => {
      render(
        <Article>
          <div data-testid="article-child">Article Content</div>
        </Article>
      );
      
      expect(screen.getByTestId('article-child')).toBeInTheDocument();
      
      // Check that it renders as an article element
      const articleElement = screen.getByText('Article Content').closest('article');
      expect(articleElement).toBeInTheDocument();
    });
    
    it('renders HTML content when provided', () => {
      render(
        <Article html={{ __html: '<p data-testid="html-content">HTML Content</p>' }} />
      );
      
      expect(screen.getByTestId('html-content')).toBeInTheDocument();
      expect(screen.getByText('HTML Content')).toBeInTheDocument();
    });
    
    it('applies custom classes and ID', () => {
      render(
        <Article className="custom-article" id="article-id">
          <div>Content</div>
        </Article>
      );
      
      const articleElement = screen.getByText('Content').closest('article');
      expect(articleElement).toHaveClass('custom-article');
      expect(articleElement).toHaveAttribute('id', 'article-id');
    });
  });
  
  describe('Box Component', () => {
    it('renders children with default flex row layout', () => {
      render(
        <Box>
          <div data-testid="box-child">Box Content</div>
        </Box>
      );
      
      expect(screen.getByTestId('box-child')).toBeInTheDocument();
      
      const boxElement = screen.getByText('Box Content').parentElement;
      expect(boxElement).toHaveClass('flex');
      expect(boxElement).toHaveClass('flex-row');
    });
    
    it('renders with column direction when specified', () => {
      render(
        <Box direction="col">
          <div>Content</div>
        </Box>
      );
      
      const boxElement = screen.getByText('Content').parentElement;
      expect(boxElement).toHaveClass('flex-col');
    });
    
    it('applies gap classes when specified', () => {
      render(
        <Box gap={4}>
          <div>Content</div>
        </Box>
      );
      
      const boxElement = screen.getByText('Content').parentElement;
      expect(boxElement).toHaveClass('gap-4');
    });
    
    it('renders as grid when cols is specified', () => {
      render(
        <Box cols={3}>
          <div>Content</div>
        </Box>
      );
      
      const boxElement = screen.getByText('Content').parentElement;
      expect(boxElement).toHaveClass('grid');
      expect(boxElement).toHaveClass('grid-cols-3');
    });
    
    it('applies responsive classes for different breakpoints', () => {
      render(
        <Box 
          direction={{ base: 'col', md: 'row' }}
          gap={{ base: 2, md: 4 }}
          cols={{ base: 1, md: 2, lg: 3 }}
        >
          <div>Content</div>
        </Box>
      );
      
      const boxElement = screen.getByText('Content').parentElement;
      
      // When cols is specified, it becomes a grid layout
      expect(boxElement).toHaveClass('grid');
      expect(boxElement).toHaveClass('gap-2');
      expect(boxElement).toHaveClass('md:gap-4');
      
      // Check responsive grid classes
      expect(boxElement).toHaveClass('grid-cols-1');
      expect(boxElement).toHaveClass('md:grid-cols-2');
      expect(boxElement).toHaveClass('lg:grid-cols-3');
    });
  });
});
