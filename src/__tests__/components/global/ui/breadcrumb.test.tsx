import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '@/components/ui/breadcrumb';

// Mock the Lucide React icons
vi.mock('lucide-react', () => ({
  ChevronRight: () => <div data-testid="chevron-icon"></div>,
  MoreHorizontal: () => <div data-testid="more-icon">...</div>
}));

// Mock Radix UI Slot component
vi.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children, className, ...props }: any) => (
    <div data-testid="breadcrumb-link-slot" className={className} {...props}>
      {children}
    </div>
  ),
}));

describe('Breadcrumb components', () => {
  it('renders Breadcrumb correctly', () => {
    render(<Breadcrumb data-testid="breadcrumb">Breadcrumb content</Breadcrumb>);
    const breadcrumb = screen.getByTestId('breadcrumb');
    
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.getAttribute('aria-label')).toBe('breadcrumb');
    expect(breadcrumb.textContent).toBe('Breadcrumb content');
  });

  it('renders BreadcrumbList correctly', () => {
    render(<BreadcrumbList data-testid="breadcrumb-list">List content</BreadcrumbList>);
    const list = screen.getByTestId('breadcrumb-list');
    
    expect(list).toBeDefined();
    expect(list.tagName).toBe('OL');
    expect(list.className).toContain('flex');
    expect(list.className).toContain('text-muted-foreground');
    expect(list.textContent).toBe('List content');
  });

  it('renders BreadcrumbItem correctly', () => {
    render(<BreadcrumbItem data-testid="breadcrumb-item">Item content</BreadcrumbItem>);
    const item = screen.getByTestId('breadcrumb-item');
    
    expect(item).toBeDefined();
    expect(item.tagName).toBe('LI');
    expect(item.className).toContain('inline-flex');
    expect(item.textContent).toBe('Item content');
  });

  it('renders BreadcrumbLink correctly', () => {
    render(<BreadcrumbLink href="#" data-testid="breadcrumb-link">Link content</BreadcrumbLink>);
    const link = screen.getByTestId('breadcrumb-link');
    
    expect(link).toBeDefined();
    expect(link.tagName).toBe('A');
    expect(link.className).toContain('hover:text-foreground');
    expect(link.getAttribute('href')).toBe('#');
    expect(link.textContent).toBe('Link content');
  });

  it('renders BreadcrumbLink with asChild prop', () => {
    render(<BreadcrumbLink asChild>Slot content</BreadcrumbLink>);
    
    // When asChild is true, the component renders using the mocked Slot component
    const linkSlot = screen.getByTestId('breadcrumb-link-slot');
    expect(linkSlot).toBeDefined();
    expect(linkSlot.textContent).toBe('Slot content');
    expect(linkSlot.className).toContain('hover:text-foreground');
  });

  it('renders BreadcrumbPage correctly', () => {
    render(<BreadcrumbPage data-testid="breadcrumb-page">Page content</BreadcrumbPage>);
    const page = screen.getByTestId('breadcrumb-page');
    
    expect(page).toBeDefined();
    expect(page.tagName).toBe('SPAN');
    expect(page.getAttribute('aria-current')).toBe('page');
    expect(page.getAttribute('aria-disabled')).toBe('true');
    expect(page.className).toContain('text-foreground');
    expect(page.textContent).toBe('Page content');
  });

  it('renders BreadcrumbSeparator correctly with default chevron', () => {
    render(<BreadcrumbSeparator data-testid="breadcrumb-separator" />);
    const separator = screen.getByTestId('breadcrumb-separator');
    const chevron = screen.getByTestId('chevron-icon');
    
    expect(separator).toBeDefined();
    expect(separator.tagName).toBe('LI');
    expect(separator.getAttribute('aria-hidden')).toBe('true');
    expect(chevron).toBeDefined();
  });

  it('renders BreadcrumbSeparator with custom children', () => {
    render(<BreadcrumbSeparator data-testid="breadcrumb-separator">-</BreadcrumbSeparator>);
    const separator = screen.getByTestId('breadcrumb-separator');
    
    expect(separator).toBeDefined();
    expect(separator.textContent).toBe('-');
    expect(screen.queryByTestId('chevron-icon')).toBeNull();
  });

  it('renders BreadcrumbEllipsis correctly', () => {
    render(<BreadcrumbEllipsis data-testid="breadcrumb-ellipsis" />);
    const ellipsis = screen.getByTestId('breadcrumb-ellipsis');
    const moreIcon = screen.getByTestId('more-icon');
    
    expect(ellipsis).toBeDefined();
    expect(ellipsis.tagName).toBe('SPAN');
    expect(ellipsis.getAttribute('aria-hidden')).toBe('true');
    expect(moreIcon).toBeDefined();
    expect(screen.getByText('More')).toBeDefined();
    expect(screen.getByText('More').className).toContain('sr-only');
  });

  it('renders a complete breadcrumb navigation', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    
    expect(screen.getByRole('navigation')).toBeDefined();
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Products')).toBeDefined();
    expect(screen.getByText('Current Page')).toBeDefined();
    expect(screen.getAllByTestId('chevron-icon').length).toBe(3);
    expect(screen.getByTestId('more-icon')).toBeDefined();
  });

  it('applies custom className correctly to all components', () => {
    render(
      <Breadcrumb data-testid="breadcrumb" className="custom-breadcrumb">
        <BreadcrumbList data-testid="list" className="custom-list">
          <BreadcrumbItem data-testid="item" className="custom-item">
            <BreadcrumbLink data-testid="link" className="custom-link" href="#">Link</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator data-testid="separator" className="custom-separator" />
          <BreadcrumbItem>
            <BreadcrumbPage data-testid="page" className="custom-page">Page</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbEllipsis data-testid="ellipsis" className="custom-ellipsis" />
        </BreadcrumbList>
      </Breadcrumb>
    );
    
    expect(screen.getByTestId('breadcrumb').className).toContain('custom-breadcrumb');
    expect(screen.getByTestId('list').className).toContain('custom-list');
    expect(screen.getByTestId('item').className).toContain('custom-item');
    expect(screen.getByTestId('link').className).toContain('custom-link');
    expect(screen.getByTestId('separator').className).toContain('custom-separator');
    expect(screen.getByTestId('page').className).toContain('custom-page');
    expect(screen.getByTestId('ellipsis').className).toContain('custom-ellipsis');
  });
});
