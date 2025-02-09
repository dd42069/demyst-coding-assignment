import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { getBalanceSheet } from '../api/api.ts';

// Mock the API function
jest.mock('../api/api.ts', () => ({
  getBalanceSheet: jest.fn(),
}));

describe('App Component', () => {
  const mockData = {
    reportTitle: ['Balance Sheet', 'As of', '2025-02-10'],
    headerArray: ['', '2025-02-10', '2025-02-11'],
    rowArray: [
      { type: 'Section', value: 'Assets' },
      { type: 'Row', cells: ['My Bank Account', "126.70",
        "99.60"] },
      { type: 'SummaryRow', cells: [
        "Total Bank",
        "104076.70",
        "104049.60"
      ] },
    ],
  };

  test('shows loading spinner initially', () => {
    (getBalanceSheet as jest.Mock).mockResolvedValueOnce({});
    render(<App />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('As of 2025-02-10')).not.toBeInTheDocument();
    expect(screen.queryByText('Assets')).not.toBeInTheDocument();
    expect(screen.queryByText('My Bank Account')).not.toBeInTheDocument();
  });

  test('renders error message if API request fails', async () => {
    (getBalanceSheet as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<App />);

    await screen.findByText(/Failed to load balance sheet, please try again in few minutes./i);
  });

  test('renders balance sheet data after successful API response', async () => {
    (getBalanceSheet as jest.Mock).mockResolvedValueOnce(mockData);

    render(<App />);

    await screen.findByText('Balance Sheet');
    expect(screen.getByText('As of 2025-02-10')).toBeInTheDocument();
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('My Bank Account')).toBeInTheDocument();
  });
});