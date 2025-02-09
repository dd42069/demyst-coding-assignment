import { Request, Response } from 'express';
import logger from '../utils/logger';
import config from '../utils/nconf';
import { parseRow } from '../utils/tableUtils';

export async function getBalanceSheet(req: Request, res: Response) {
  try {
    const response = await fetch(`${config.get('XERO_URL')}/api.xro/2.0/Reports/BalanceSheet`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const jsonReport = (await response.json()).Reports[0];
    const parsedReport = parseRow(jsonReport.Rows);

    res.json({
      reportTitle: jsonReport.ReportTitles,
      headerArray: parsedReport.headerArray,
      rowArray: parsedReport.rowArray,
    });
  } catch (error) {
    logger.error(`getBalanceSheet - Error: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
}
