import React, { forwardRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';

// Mock the Radix UI components
vi.mock('@radix-ui/react-navigation-menu', () => {
  return {
    Root: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="navigation-root" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    List: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <ul data-testid="navigation-list" className={className} {...props} ref={ref}>
        {children}
      </ul>
    )),
    Item: ({ children, ...props }: any) => (
      <li data-testid="navigation-item" {...props}>
        {children}
      </li>
    ),
    Trigger: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <button data-testid="navigation-trigger" className={className} {...props} ref={ref}>
        {children}
      </button>
    )),
    Content: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="navigation-content" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    Link: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <a data-testid="navigation-link" className={className} {...props} ref={ref}>
        {children}
      </a>
    )),
    Indicator: forwardRef(({ className, ...props }: any, ref: any) => (
      <div data-testid="navigation-indicator" className={className} {...props} ref={ref} />
    )),
    Viewport: forwardRef(({ className, ...props }: any, ref: any) => (
      <div data-testid="navigation-viewport" className={className} {...props} ref={ref} />
    ))
  };
});

// Mock the Lucide React icons
vi.mock('lucide-react', () => ({
  ChevronDown: () => <div data-testid="chevron-down-icon">▼</div>
}));

describe('NavigationMenu components', () => {
  it('renders NavigationMenu correctly', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>Menu Item</NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
    
    expect(screen.getByTestId('navigation-root')).toBeDefined();
    expect(screen.getByTestId('navigation-list')).toBeDefined();
    expect(screen.getByTestId('navigation-item')).toBeDefined();
    expect(screen.getByTestId('navigation-viewport')).toBeDefined();
    expect(screen.getByText('Menu Item')).toBeDefined();
  });

  it('renders NavigationMenuTrigger correctly', () => {
    render(
      <NavigationMenuTrigger>Trigger</NavigationMenuTrigger>
    );
    
    const trigger = screen.getByTestId('navigation-trigger');
    expect(trigger).toBeDefined();
    expect(trigger.textContent).toContain('Trigger');
    expect(screen.getByTestId('chevron-down-icon')).toBeDefined();
  });

  it('renders NavigationMenuContent correctly', () => {
    render(
      <NavigationMenuContent>Content</NavigationMenuContent>
    );
    
    const content = screen.getByTestId('navigation-content');
    expect(content).toBeDefined();
    expect(content.textContent).toBe('Content');
  });

  it('renders NavigationMenuLink correctly', () => {
    render(
      <NavigationMenuLink href="#">Link</NavigationMenuLink>
    );
    
    const link = screen.getByTestId('navigation-link');
    expect(link).toBeDefined();
    expect(link.textContent).toBe('Link');
    expect(link.getAttribute('href')).toBe('#');
  });

  it('renders NavigationMenuIndicator correctly', () => {
    render(<NavigationMenuIndicator />);
    
    expect(screen.getByTestId('navigation-indicator')).toBeDefined();
  });

  it('renders a complete navigation menu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 1</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink href="/item1">Item 1 Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/item2">Item 2</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator />
      </NavigationMenu>
    );
    
    // Check all components are rendered
    expect(screen.getByTestId('navigation-root')).toBeDefined();
    expect(screen.getByTestId('navigation-list')).toBeDefined();
    expect(screen.getAllByTestId('navigation-item').length).toBe(2);
    expect(screen.getByTestId('navigation-trigger')).toBeDefined();
    expect(screen.getByTestId('navigation-content')).toBeDefined();
    expect(screen.getAllByTestId('navigation-link').length).toBe(2);
    expect(screen.getByTestId('navigation-indicator')).toBeDefined();
    expect(screen.getByTestId('navigation-viewport')).toBeDefined();
    
    // Check text content
    expect(screen.getByText('Item 1')).toBeDefined();
    expect(screen.getByText('Item 1 Link')).toBeDefined();
    expect(screen.getByText('Item 2')).toBeDefined();
  });

  it('applies custom className correctly to all components', () => {
    render(
      <NavigationMenu className="custom-menu">
        <NavigationMenuList className="custom-list">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">Trigger</NavigationMenuTrigger>
            <NavigationMenuContent className="custom-content">Content</NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className="custom-link" href="#">Link</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuIndicator className="custom-indicator" />
        <NavigationMenuViewport className="custom-viewport" />
      </NavigationMenu>
    );
    
    expect(screen.getByTestId('navigation-root').className).toContain('custom-menu');
    expect(screen.getByTestId('navigation-list').className).toContain('custom-list');
    expect(screen.getByTestId('navigation-trigger').className).toContain('custom-trigger');
    expect(screen.getByTestId('navigation-content').className).toContain('custom-content');
    expect(screen.getByTestId('navigation-link').className).toContain('custom-link');
    expect(screen.getByTestId('navigation-indicator').className).toContain('custom-indicator');
    // Use queryAllByTestId to handle multiple elements with the same data-testid
    const viewports = screen.queryAllByTestId('navigation-viewport');
    expect(viewports.some(viewport => viewport.className.includes('custom-viewport'))).toBe(true);
  });
});
