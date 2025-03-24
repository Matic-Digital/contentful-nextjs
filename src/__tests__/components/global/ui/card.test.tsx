import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';

describe('Card components', () => {
  it('renders Card correctly', () => {
    render(<Card data-testid="card">Card content</Card>);
    const card = screen.getByTestId('card');
    
    expect(card).toBeDefined();
    expect(card.textContent).toBe('Card content');
    expect(card.className).toContain('rounded-xl');
    expect(card.className).toContain('border');
    expect(card.className).toContain('bg-card');
  });

  it('renders CardHeader correctly', () => {
    render(<CardHeader data-testid="card-header">Header content</CardHeader>);
    const header = screen.getByTestId('card-header');
    
    expect(header).toBeDefined();
    expect(header.textContent).toBe('Header content');
    expect(header.className).toContain('flex');
    expect(header.className).toContain('p-6');
  });

  it('renders CardTitle correctly', () => {
    render(<CardTitle data-testid="card-title">Title content</CardTitle>);
    const title = screen.getByTestId('card-title');
    
    expect(title).toBeDefined();
    expect(title.textContent).toBe('Title content');
    expect(title.className).toContain('font-semibold');
  });

  it('renders CardDescription correctly', () => {
    render(<CardDescription data-testid="card-description">Description content</CardDescription>);
    const description = screen.getByTestId('card-description');
    
    expect(description).toBeDefined();
    expect(description.textContent).toBe('Description content');
    expect(description.className).toContain('text-sm');
    expect(description.className).toContain('text-muted-foreground');
  });

  it('renders CardContent correctly', () => {
    render(<CardContent data-testid="card-content">Content</CardContent>);
    const content = screen.getByTestId('card-content');
    
    expect(content).toBeDefined();
    expect(content.textContent).toBe('Content');
    expect(content.className).toContain('p-6');
    expect(content.className).toContain('pt-0');
  });

  it('renders CardFooter correctly', () => {
    render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);
    const footer = screen.getByTestId('card-footer');
    
    expect(footer).toBeDefined();
    expect(footer.textContent).toBe('Footer content');
    expect(footer.className).toContain('flex');
    expect(footer.className).toContain('p-6');
    expect(footer.className).toContain('pt-0');
  });

  it('renders a complete card with all components', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );
    
    const card = screen.getByTestId('card');
    
    expect(card).toBeDefined();
    expect(screen.getByText('Card Title')).toBeDefined();
    expect(screen.getByText('Card Description')).toBeDefined();
    expect(screen.getByText('Card Content')).toBeDefined();
    expect(screen.getByText('Card Footer')).toBeDefined();
  });

  it('applies custom className correctly to all components', () => {
    render(
      <Card data-testid="card" className="custom-card">
        <CardHeader data-testid="header" className="custom-header">Header</CardHeader>
        <CardTitle data-testid="title" className="custom-title">Title</CardTitle>
        <CardDescription data-testid="description" className="custom-description">Description</CardDescription>
        <CardContent data-testid="content" className="custom-content">Content</CardContent>
        <CardFooter data-testid="footer" className="custom-footer">Footer</CardFooter>
      </Card>
    );
    
    expect(screen.getByTestId('card').className).toContain('custom-card');
    expect(screen.getByTestId('header').className).toContain('custom-header');
    expect(screen.getByTestId('title').className).toContain('custom-title');
    expect(screen.getByTestId('description').className).toContain('custom-description');
    expect(screen.getByTestId('content').className).toContain('custom-content');
    expect(screen.getByTestId('footer').className).toContain('custom-footer');
  });
});
