import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function BalanceTable({ headerArray, rowArray }) {
  function renderHeader(
    headerArray: string[]
  ) {
    return (
      <TableHead>
        <TableRow>
          {headerArray.map((col: string, index: number) => (
            <TableCell key={`balance-table-header-${index}`}>{col}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  function renderRow(rowArray: { type: string; value?: string | undefined; cells?: string[]; }[]) {
    return (
      <TableBody>
        {rowArray.map(((row, index) => {
          const type = row.type
          if (type === "Section") {
            const isPreviousSection = rowArray[index - 1]?.type === "Section"
            return (
              <TableRow key={`balance-table-section-${index}`}>
                {!isPreviousSection && row.value !== "" && <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}><Typography variant={"h4"}>{row.value}</Typography></TableCell>}
                {isPreviousSection && <TableCell sx={{ borderBottom: 0, }}><Typography variant={"h5"}>{row.value}</Typography></TableCell>}
              </TableRow>
            )
          } else if (type === "Row" && row.cells && row.cells.length > 0) {
            return (<TableRow key={`balance-table-row-${index}`}>
              {row.cells.map((cell, cellIndex) => {
                return <TableCell sx={{ borderBottom: 0, }} key={`balance-table-row-cell-${index}_${cellIndex}`}>{cell}</TableCell>
              })}
            </TableRow>)
          } else if (type === "SummaryRow" && row.cells && row.cells.length > 0) {
            return (<TableRow sx={{ borderSpacing: "auto auto 16px auto" }} key={`balance-table-summaryrow-${index}`}>
              {row.cells.map((cell, cellIndex) => {
                return <TableCell sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }} key={`balance-table-summaryrow-cell-${index}_${cellIndex}`}><Typography fontWeight={"600"}>{cell}</Typography></TableCell>
              })}
            </TableRow>)
          }
          return <TableCell></TableCell>
        }))}
      </TableBody>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: '85vh' }}>
        <Table stickyHeader sx={{ minWidth: 500 }}>
          {renderHeader(headerArray)}
          {renderRow(rowArray)}
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default BalanceTable
