import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
// import CandlestickChartComponent from './CandlestickChartComponent';
import CanvasJSReact from '@canvasjs/react-charts';
import datautil from './datautil';
import StockTable from './StockTable';
import { Grid } from '@mui/material';
import BuyPopUp from './BuyPopUp';
import SellPopUp from './SellPopUp';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



export default function PopUp(props) {
  const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    props.setOpen(false);
   
  };
  const chartoptions = {
    animationEnabled: true,
    exportEnabled: true,
    title:{
      text: props.value
    },
    data: [{
      type: "candlestick",
      dataPoints: datautil(props.data)
    }]
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        fullWidth
        maxWidth="lg"
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          STOCK DETAIL
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
         {/* <CandlestickChartComponent data={props.data} /> */}
         <Grid container>
            <Grid xs={6}>
              <CanvasJSChart options = {chartoptions} />
            </Grid>
            <Grid xs={6} padding={1}>
              <StockTable  data={props.data}/>
            </Grid>
         </Grid>

          {/* <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography> */}

        </DialogContent>
        <DialogActions sx={{justifyContent:"space-around"}}>
          <SellPopUp data={props.detailData} close={props.setOpen} name={props.value}/>
          <Typography fontWeight="bold" >
            Current Price: {props.detailData.curPrice}
           </Typography>
          {/* <Button sx={{bgcolor:"green"}} variant="contained" size="large" onClick={handleClose}>
            BUY
          </Button> */}
          <BuyPopUp data={props.detailData} close={props.setOpen} name={props.value}/>
        </DialogActions>
      </BootstrapDialog>
        
    </div>
  );
}
