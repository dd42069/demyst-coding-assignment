import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { getBalanceSheet } from './api/api.ts';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import BalanceTable from './component/BalanceTable.tsx';
import Typography from '@mui/material/Typography';


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showError, setShowError] = useState(false)
  const [balanceSheetData, setBalanceSheetData] = useState({
    reportTitle: [], headerArray: [], rowArray: []
  })

  useEffect(() => {
    setIsLoading(true)
    getBalanceSheet()
      .then(res => {
        setBalanceSheetData(res)
      }).catch((err) => {
        setShowError(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [])

  function renderError() {
    return <Alert variant="filled" severity="error">
      Failed to load balance sheet, please try again in few minutes.
    </Alert>
  }
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',  // Centers the box horizontally
        padding: 2,          // Optional: for padding inside the box
      }}
    >
      <>
        <Grid spacing={2} direction="row">
          <Grid size="grow"></Grid>
          <Grid container sx={{
            justifyContent: "center",
            alignItems: "center",
          }} size={{ md: 4 }} direction={'column'}>
            {isLoading && <CircularProgress />}
            {showError && renderError()}
            {!isLoading &&<>
              <Typography variant='h4'>{balanceSheetData.reportTitle[0]}</Typography>
              <br/>
              <Typography variant='h6'>{balanceSheetData.reportTitle[1]} {balanceSheetData.reportTitle[2]}</Typography>
              </>
            }
          </Grid>
          <Grid size="grow"></Grid>
        </Grid>
      </>
      <>
        <Grid spacing={2} direction="row" sx={{maxHeight: "30vh"}}>
          {!isLoading && <BalanceTable headerArray={balanceSheetData.headerArray} rowArray={balanceSheetData.rowArray} />}
        </Grid>
      </>
    </Box >
  );
}

export default App;
