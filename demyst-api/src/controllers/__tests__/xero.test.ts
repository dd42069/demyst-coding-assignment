import { getBalanceSheet } from '../xero';
import { Request, Response } from 'express';

global.fetch = jest.fn();
jest.mock('../../utils/logger');
jest.mock('../../utils/nconf', () => ({
  get: jest.fn(),
}));
// jest.mock('../../utils/tableUtils', () => ({
//   parseRow: jest.fn(),
// }));

describe('getBalanceSheet', () => {
  const mockReq = jest.fn() as unknown as Request;
  // const mockRes = jest.fn() as unknown as Response;
  const mockRes = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  } as unknown as jest.Mocked<Response>;

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return parsed balance sheet data on success', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        Reports: [
          {
            ReportTitles: ['Balance Sheet'],
            Rows: [{
              'RowType': 'Header',
              'Cells': [
                {
                  'Value': '',
                },
                {
                  'Value': '09 February 2025',
                },
                {
                  'Value': '10 February 2024',
                },
              ],
            }],
          },
        ],
      }),
    }));
    await getBalanceSheet(mockReq, mockRes);
    console.log('bruh:', JSON.stringify(mockRes.json.mock.calls));
    expect(JSON.stringify(mockRes.json.mock.calls[0][0])).toBe('{"reportTitle":["Balance Sheet"],"headerArray":["","09 February 2025","10 February 2024"],"rowArray":[]}');
  });

  test('should return 500 error if fetch fails', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));
    await getBalanceSheet(mockReq, mockRes);
    console.log('bruh:', JSON.stringify(mockRes.status.mock.calls));
    expect(JSON.stringify(mockRes.json.mock.calls[0][0])).toBe('{"error":"Internal server error"}');
  });
});
