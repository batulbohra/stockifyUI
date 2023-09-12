import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [

  { field: 'stockName', headerName: 'Stock Name',flex:2 },
  { field: 'symbol', headerName: 'Symbol',flex:1 },
  { field: 'date', headerName: 'Date',flex:1 },
  { field: 'volume', headerName: 'Volume Traded',flex:1 },
  { field: 'price', headerName: 'Trading Price',flex:1 },
  { field: 'cost', headerName: 'Traded value',flex:1 },
  { field: 'transactionType', headerName: 'Action',flex:1 },
];

const datadummy =[
	{
		"stockName": "Amazon.com Inc  AMZN",
		"symbol": "AMZN",
		"date": "2023-09-10",
		"volume": 5,
		"price": 138.23,
		"cost": 691.15,
		"transactionType": "buy"
	},
	{
		"stockName": "Alphabet Inc - Class C  GOOG",
		"symbol": "GOOG",
		"date": "2023-09-10",
		"volume": 1,
		"price": 137.2,
		"cost": 137.2,
		"transactionType": "buy"
	},
	{
		"stockName": "Amazon.com Inc  AMZN",
		"symbol": "AMZN",
		"date": "2023-09-10",
		"volume": 2,
		"price": 138.23,
		"cost": 276.46,
		"transactionType": "sell"
	}
];

export default function HistoryGrid(props) {
  return (
      
     <DataGrid autoHeight  rows={props.data} getRowId={(row) => row.transactionId} columns={columns} pageSize={5} />
      
    
  );
}
