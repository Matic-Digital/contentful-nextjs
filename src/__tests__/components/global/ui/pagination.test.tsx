import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

// Mock the Lucide React icons
vi.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left-icon">ChevronLeft</div>,
  ChevronRight: () => <div data-testid="chevron-right-icon">ChevronRight</div>,
  MoreHorizontal: () => <div data-testid="more-horizontal-icon">MoreHorizontal</div>
}));

describe('Pagination components', () => {
  it('renders basic pagination correctly', () => {
    render(
      <Pagination data-testid="pagination">
        <PaginationContent data-testid="pagination-content">
          <PaginationItem>
            <PaginationPrevious href="#" data-testid="pagination-previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" data-testid="pagination-link">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis data-testid="pagination-ellipsis" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" data-testid="pagination-next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-content')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-previous')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-link')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-ellipsis')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-next')).toBeInTheDocument();
  });

  it('renders pagination with active link', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive data-testid="active-link">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const activeLink = screen.getByTestId('active-link');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders pagination with disabled link', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" disabled data-testid="disabled-link">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const disabledLink = screen.getByTestId('disabled-link');
    expect(disabledLink).toHaveAttribute('aria-disabled', 'true');
    expect(disabledLink.className).toContain('opacity-50');
  });

  it('renders pagination with different size', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" size="default" data-testid="default-size-link">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const defaultSizeLink = screen.getByTestId('default-size-link');
    expect(defaultSizeLink).toBeInTheDocument();
  });

  it('renders PaginationPrevious with correct content', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" data-testid="pagination-previous" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const previousButton = screen.getByTestId('pagination-previous');
    expect(previousButton).toHaveAttribute('aria-label', 'Go to previous page');
    expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument();
    expect(previousButton.textContent).toContain('Previous');
  });

  it('renders PaginationNext with correct content', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#" data-testid="pagination-next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const nextButton = screen.getByTestId('pagination-next');
    expect(nextButton).toHaveAttribute('aria-label', 'Go to next page');
    expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument();
    expect(nextButton.textContent).toContain('Next');
  });

  it('renders PaginationEllipsis with correct content', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis data-testid="pagination-ellipsis" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const ellipsis = screen.getByTestId('pagination-ellipsis');
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('more-horizontal-icon')).toBeInTheDocument();
    expect(ellipsis.textContent).toContain('More pages');
  });

  it('renders disabled PaginationPrevious and PaginationNext', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" disabled data-testid="disabled-previous" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" disabled data-testid="disabled-next" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );

    const disabledPrevious = screen.getByTestId('disabled-previous');
    const disabledNext = screen.getByTestId('disabled-next');
    
    expect(disabledPrevious).toHaveAttribute('aria-disabled', 'true');
    expect(disabledPrevious.className).toContain('opacity-50');
    
    expect(disabledNext).toHaveAttribute('aria-disabled', 'true');
    expect(disabledNext.className).toContain('opacity-50');
  });
});
