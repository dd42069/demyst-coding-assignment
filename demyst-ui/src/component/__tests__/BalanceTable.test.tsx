import React from 'react';
import { render, screen } from '@testing-library/react';
import BalanceTable from '../BalanceTable';

describe('BalanceTable Component', () => {
  const headerArray = ['', '2025-02-10', '2025-02-11'];
  const rowArray = [
    { type: 'Section', value: 'Bank' },
    {
      type: 'Row', cells: ['My Bank Account', "126.70",
        "99.60"]
    },
    {
      "type": "SummaryRow",
      "cells": [
        "Total Bank",
        "104076.70",
        "104049.60"
      ]
    },
  ];

  test('renders table headers correctly', () => {
    render(<BalanceTable headerArray={headerArray} rowArray={[]} />);
    expect(screen.getByText("2025-02-10")).toBeInTheDocument();
    expect(screen.getByText("2025-02-11")).toBeInTheDocument();
  });

  test('renders Section, Row, and SummaryRow types correctly', () => {
    render(<BalanceTable headerArray={headerArray} rowArray={rowArray} />);

    // Check if section headers are rendered correctly
    expect(screen.getByText('2025-02-10')).toBeInTheDocument();
    expect(screen.getByText('2025-02-11')).toBeInTheDocument();

    // Check if table rows are rendered correctly
    expect(screen.getByText('My Bank Account')).toBeInTheDocument();
    expect(screen.getByText('126.70')).toBeInTheDocument();
    expect(screen.getByText('99.60')).toBeInTheDocument();

    // Check if SummaryRow is bold
    const totalSummary = screen.getByText('Total Bank');
    expect(totalSummary).toBeInTheDocument();
    expect(totalSummary).toHaveStyle('font-weight: 600');
  });

  test('renders an empty table without crashing', () => {
    render(<BalanceTable headerArray={[]} rowArray={[]} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});