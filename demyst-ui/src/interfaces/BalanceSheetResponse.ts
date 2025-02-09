export default interface BalanceSheetResponse {
  reportTitle: string[],
  headerArray: string[],
  rowArray: { type: string; value?: string | undefined; cells?: string[]; }[]
}
