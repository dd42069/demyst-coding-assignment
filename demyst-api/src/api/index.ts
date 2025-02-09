import express from 'express';

import { getBalanceSheet } from '../controllers/xero';
import BalanceSheetResponse from '../interfaces/BalanceSheetResponse';

const router = express.Router();

router.get<{}, BalanceSheetResponse>('/balance-sheet', (req, res) => {
  getBalanceSheet(req, res);
});

export default router;
