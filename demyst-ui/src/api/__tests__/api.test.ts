import { getBalanceSheet } from '../api';  // Adjust the path based on your project structure
import { API_URL } from '../../constants/url'; // Assuming your constants are here

global.fetch = jest.fn();


describe('getBalanceSheet', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('should return balance sheet data when the fetch is successful', async () => {
    const mockData = {
      reportTitle: ['Balance Sheet', 'As of', '2025-02-10'],
      headerArray: ['', '2025-02-10', '2025-02-11'],
      rowArray: [
        { type: 'Section', value: 'Assets' },
        { type: 'Row', cells: ['2025-02-10', '126.70', '99.60'] },
        { type: 'SummaryRow', cells: ['Total Bank', '104076.70', '104076.42'] },
      ],
    };

    // Mock the fetch response
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    }));

    const result = await getBalanceSheet();
    
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`, { method: 'GET' });
  });

  test('should throw error if the fetch response is not ok (e.g., 404)', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('404')));

    try {
      await getBalanceSheet();
    } catch (error) {
      expect(error).toEqual(new Error('404'));
    }

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`, { method: 'GET' });
  });

  test('should throw error if there is a network error', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
      status: "Network Error",
    }));

    try {
      await getBalanceSheet();
    } catch (error) {
      expect(error).toEqual(new Error('Network Error'));
    }

    expect(fetch).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`, { method: 'GET' });
  });
});