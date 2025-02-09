export interface Cell {
  Value: string;
}

export interface Row {
  RowType: string;
  Cells?: Cell[];
  Title?: string;
  Rows?: Row[];
}