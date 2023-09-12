import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PopUp from '../../Components/PopUp';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../authentication/UserSlice';

const columns = [
    { field: 'stockName', headerName: 'Stock Name',flex:2 },
  { field: 'symbol', headerName: 'Symbol',flex:1 },
  { field: 'curPrice', headerName: 'Current Price',flex:1 },
  { field: 'curVolume', headerName: 'Current Volume',flex:1 },
  { field: 'curCost', headerName: 'Holding value',flex:1 },
  { field: 'percentagePriceChange', headerName: 'Today Change',flex:1 },
  
];


export default function HoldingsTable(props) {
  const user = useSelector(selectUser);
  const [stock,setStock]= useState("");
  const [openPopup,setOpenPopup]= useState(false);
  const[historyData,setHistoryData]=useState([]);
  const [stockDetailData,setStockDetailData]=useState([]);

  const handleClose=()=>{
    setOpenPopup(false);
  }
  
function getStockNameBySymbol(arr, symbol) {
  const obj = arr.find(item => item.symbol === symbol);
  return obj ? obj.stockName : null;
}
  const handleRowClick=(e)=>{
    console.log(e.id );
    if(e.id ){
      let fstock= getStockNameBySymbol(props.data,e.id)
      fstock?setStock(fstock):setStock("");
      console.log(stock);
      getHistoryDataAPI(e.id);
      StockDetailAPI(e.id);
      setOpenPopup(true);
      
    }
    
  
  }
  async function StockDetailAPI(sym) {
    const url = 'http://localhost:8080/api/stock-listing/stock-detail';
    const data = {
      email: user?.email,
      stockName: stock,
      symbol: sym
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
       setStockDetailData(json);
    } catch (error) {
      console.error(error);
    }
  }
  
  const  getHistoryDataAPI =async(value)=>{  
      try {
        // make the request and get the response
        const response = await fetch(
          `http://localhost:8080/api/stock-listing/stock-price-history?query=${value}`
        );
        // check the status code
        if (response.ok) {
          // parse the response as JSON
          const json = await response.json();
          // set the data state
          console.log(json);
          setHistoryData(json);
        } else {
          // throw an error or handle it differently
          throw new Error("Something went wrong");
        }
      } catch (error) {
        // handle the error
        console.error(error);
      }
    }


  

  
  

  console.log(props.data);
  return (
     <>
      <PopUp value={stock} open={openPopup} setOpen={handleClose} data={historyData} detailData={stockDetailData}/>

      <DataGrid autoHeight  rows={props.data} getRowId={(row) => row.symbol} columns={columns} pageSize={5} onRowClick={handleRowClick} />
    </>
    
  );
}
