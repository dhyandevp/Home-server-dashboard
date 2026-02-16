import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MetricCard } from './MetricCard';

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="CPU" value="30%" />);
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
  });
});
