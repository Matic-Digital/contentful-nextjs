import React, { forwardRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
} from '@/components/ui/dropdown-menu';

// Mock the Radix UI components
vi.mock('@radix-ui/react-dropdown-menu', () => {
  return {
    Root: forwardRef(({ children, ...props }: any, ref: any) => (
      <div data-testid="dropdown-root" {...props} ref={ref}>
        {children}
      </div>
    )),
    Trigger: forwardRef(({ children, ...props }: any, ref: any) => (
      <button data-testid="dropdown-trigger" {...props} ref={ref}>
        {children}
      </button>
    )),
    Portal: ({ children, ...props }: any) => (
      <div data-testid="dropdown-portal" {...props}>
        {children}
      </div>
    ),
    Content: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-content" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    Item: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-item" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    CheckboxItem: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-checkbox-item" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    RadioItem: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-radio-item" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    Label: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-label" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    Separator: forwardRef(({ className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-separator" className={className} {...props} ref={ref} />
    )),
    Group: forwardRef(({ children, ...props }: any, ref: any) => (
      <div data-testid="dropdown-group" {...props} ref={ref}>
        {children}
      </div>
    )),
    Sub: forwardRef(({ children, ...props }: any, ref: any) => (
      <div data-testid="dropdown-sub" {...props} ref={ref}>
        {children}
      </div>
    )),
    SubTrigger: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-sub-trigger" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    SubContent: forwardRef(({ children, className, ...props }: any, ref: any) => (
      <div data-testid="dropdown-sub-content" className={className} {...props} ref={ref}>
        {children}
      </div>
    )),
    RadioGroup: forwardRef(({ children, ...props }: any, ref: any) => (
      <div data-testid="dropdown-radio-group" {...props} ref={ref}>
        {children}
      </div>
    )),
    ItemIndicator: forwardRef(({ children, ...props }: any, ref: any) => (
      <span data-testid="dropdown-item-indicator" {...props} ref={ref}>
        {children}
      </span>
    ))
  };
});

// Mock the Lucide React icons
vi.mock('lucide-react', () => ({
  Check: () => <div data-testid="check-icon">✓</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">→</div>,
  Circle: () => <div data-testid="circle-icon">○</div>
}));

describe('DropdownMenu components', () => {
  it('renders basic dropdown menu correctly', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId('dropdown-root')).toBeDefined();
    expect(screen.getByTestId('dropdown-trigger')).toBeDefined();
    expect(screen.getByTestId('dropdown-content')).toBeDefined();
    expect(screen.getAllByTestId('dropdown-item').length).toBe(2);
    expect(screen.getByText('Open Menu')).toBeDefined();
    expect(screen.getByText('Item 1')).toBeDefined();
    expect(screen.getByText('Item 2')).toBeDefined();
  });

  it('renders dropdown menu with checkbox items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked={true}>Option 1</DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={false}>Option 2</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getAllByTestId('dropdown-checkbox-item').length).toBe(2);
    expect(screen.getByText('Option 1')).toBeDefined();
    expect(screen.getByText('Option 2')).toBeDefined();
  });

  it('renders dropdown menu with radio items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value="option1">
            <DropdownMenuRadioItem value="option1">Radio 1</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="option2">Radio 2</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId('dropdown-radio-group')).toBeDefined();
    expect(screen.getAllByTestId('dropdown-radio-item').length).toBe(2);
    expect(screen.getByText('Radio 1')).toBeDefined();
    expect(screen.getByText('Radio 2')).toBeDefined();
  });

  it('renders dropdown menu with label and separator', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu Label</DropdownMenuLabel>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId('dropdown-label')).toBeDefined();
    expect(screen.getByTestId('dropdown-separator')).toBeDefined();
    expect(screen.getByText('Menu Label')).toBeDefined();
  });

  it('renders dropdown menu with shortcut', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            Copy
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Paste
            <DropdownMenuShortcut>⌘V</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByText('⌘C')).toBeDefined();
    expect(screen.getByText('⌘V')).toBeDefined();
  });

  it('renders dropdown menu with submenu', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
              <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId('dropdown-sub')).toBeDefined();
    expect(screen.getByTestId('dropdown-sub-trigger')).toBeDefined();
    expect(screen.getByTestId('dropdown-sub-content')).toBeDefined();
    expect(screen.getByText('More Options')).toBeDefined();
    expect(screen.getByText('Sub Item 1')).toBeDefined();
    expect(screen.getByText('Sub Item 2')).toBeDefined();
  });

  it('renders dropdown menu with inset components', () => {
    // For this test, we need to directly test the components with inset prop
    // Since our mock implementation doesn't handle the inset class properly

    // Test DropdownMenuLabel with inset
    const { unmount: unmountLabel } = render(
      <DropdownMenuLabel inset data-testid="inset-label">
        Inset Label
      </DropdownMenuLabel>
    );
    const labelElement = screen.getByTestId('inset-label');
    expect(labelElement.className).toContain('pl-8');

    // Clean up
    unmountLabel();

    // Test DropdownMenuItem with inset
    const { unmount: unmountItem } = render(
      <DropdownMenuItem inset data-testid="inset-item">
        Inset Item
      </DropdownMenuItem>
    );
    const itemElement = screen.getByTestId('inset-item');
    expect(itemElement.className).toContain('pl-8');

    // Clean up
    unmountItem();

    // Test DropdownMenuSubTrigger with inset
    render(
      <DropdownMenuSubTrigger inset data-testid="inset-trigger">
        Inset Trigger
      </DropdownMenuSubTrigger>
    );
    const triggerElement = screen.getByTestId('inset-trigger');
    expect(triggerElement.className).toContain('pl-8');
  });

  it('renders dropdown menu with group', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 1</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Group 2</DropdownMenuLabel>
            <DropdownMenuItem>Item 3</DropdownMenuItem>
            <DropdownMenuItem>Item 4</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getAllByTestId('dropdown-group').length).toBe(2);
    expect(screen.getAllByTestId('dropdown-label').length).toBe(2);
    expect(screen.getByText('Group 1')).toBeDefined();
    expect(screen.getByText('Group 2')).toBeDefined();
  });

  it('applies custom className correctly to components', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger className="custom-trigger">Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent className="custom-content">
          <DropdownMenuItem className="custom-item">Item 1</DropdownMenuItem>
          <DropdownMenuSeparator className="custom-separator" />
          <DropdownMenuLabel className="custom-label">Label</DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    expect(screen.getByTestId('dropdown-trigger').className).toBe('custom-trigger');
    expect(screen.getByTestId('dropdown-content').className).toContain('custom-content');
    expect(screen.getByTestId('dropdown-item').className).toContain('custom-item');
    expect(screen.getByTestId('dropdown-separator').className).toContain('custom-separator');
    expect(screen.getByTestId('dropdown-label').className).toContain('custom-label');
  });
});
