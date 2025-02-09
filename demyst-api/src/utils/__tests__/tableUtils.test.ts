import { parseRow } from '../tableUtils';


describe('parseRow', () => {
  it('should parse headers correctly', () => {
    const input = [
      {
        RowType: 'Header',
        Cells: [{ Value: '' }, { Value: '09 February 2025' }, { Value: '10 February 2024' }],
      },
    ];

    const result = parseRow(input);
    expect(result.headerArray).toEqual(['', '09 February 2025', '10 February 2024']);
    expect(result.rowArray).toEqual([]);
  });

  it('should parse sections with titles and cells correctly', () => {
    const input = [
      {
        'RowType': 'Section',
        'Title': 'Bank',
        'Rows': [
          {
            'RowType': 'Row',
            'Cells': [
              {
                'Value': 'My Bank Account',
                'Attributes': [
                  {
                    'Value': 'd2e3044e-2fb8-42fa-be17-64c8956d5f57',
                    'Id': 'account',
                  },
                ],
              },
              {
                'Value': '126.70',
                'Attributes': [
                  {
                    'Value': 'd2e3044e-2fb8-42fa-be17-64c8956d5f57',
                    'Id': 'account',
                  },
                ],
              },
              {
                'Value': '99.60',
                'Attributes': [
                  {
                    'Value': 'd2e3044e-2fb8-42fa-be17-64c8956d5f57',
                    'Id': 'account',
                  },
                ],
              },
            ],
          },
          {
            'RowType': 'SummaryRow',
            'Cells': [
              {
                'Value': 'Total Bank',
              },
              {
                'Value': '104076.70',
              },
              {
                'Value': '104049.60',
              },
            ],
          },
        ],
      },
    ];

    const result = parseRow(input);
    expect(result.headerArray).toEqual([]);
    expect(result.rowArray).toEqual([
      { type: 'Section', value: 'Bank' },
      { type: 'Row', cells: ['My Bank Account', '126.70', '99.60'] },
      { type: 'SummaryRow', cells: ['Total Bank', '104076.70', '104049.60'] },
    ]);
  });

  it('should handle empty input correctly', () => {
    const result = parseRow([]);
    expect(result.headerArray).toEqual([]);
    expect(result.rowArray).toEqual([]);
  });

  it('should handle empty rows', () => {
    const input = [
      {
        RowType: 'Section',
        Title: 'Test Section',
        Rows: [
        ],
      },
    ];

    const result = parseRow(input);
    expect(result.headerArray).toEqual([]);
    expect(result.rowArray).toEqual([{
      'type': 'Section',
      'value': 'Test Section',
    }]);
  });
});
