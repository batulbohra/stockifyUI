import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
export default function StockTable({ data }) {
  const rows = Object.entries(data).map(([date, values]) => (
    <TableRow key={date}>
      <TableCell>{date}</TableCell>
      <TableCell>{values['1. open']}</TableCell>
      <TableCell>{values['2. high']}</TableCell>
      <TableCell>{values['3. low']}</TableCell>
      <TableCell>{values['4. close']}</TableCell>
      <TableCell>{values['5. volume']}</TableCell>
    </TableRow>
  ));

  return (
    <TableContainer component={Paper} elevation={5}>
      <Table aria-label="stock table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Open</TableCell>
            <TableCell>High</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Close</TableCell>
            <TableCell>Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}
