import { Row } from '../interfaces/TableInterface';

export function parseRow(rowArrayResponse: Row[]) {
  const headerArray: string[] = [];
  const rowArray: { type: string; value?: string | undefined; cells?: string[]; }[] = [];
  rowArrayResponse.forEach((i: Row) => {
    if (i.RowType === 'Header') {
      i.Cells?.forEach((j: { Value: string }) => {
        headerArray.push(j.Value);
      });
    } else if (i.RowType === 'Section') {
      rowArray.push({ type: 'Section', value: i.Title });
      if (i.Rows && i.Rows.length > 0) {
        i.Rows.forEach(j => {
          const cellArray: string[] = [];
          j.Cells?.forEach((k: { Value: string; }) => {
            cellArray.push(k.Value);
          });
          const rowObj: { type: string, cells: string[] } = { type: j.RowType, cells: cellArray };
          rowArray.push(rowObj);
        });
      }
    }
  });
  return { headerArray, rowArray };
}
