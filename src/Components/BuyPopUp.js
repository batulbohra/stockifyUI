import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid,TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { selectUser } from '../pages/authentication/UserSlice';

const delay =ms=> new Promise(
  resolve => setTimeout(resolve,ms)
);

export default function BuyPopUp(props) {
  const [num, setNum] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openAlertWarning, setOpenAlertWarning] = React.useState(false);
  const user = useSelector(selectUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange =(e)=>{
    setNum(e.target.value);
  }
  const handleBuyStock =()=>{
    buyStock();
  }
  const handleCloseAlert =()=>{
    setOpenAlert(false);
  }
  const handleCloseAlertWarning =()=>{
    setOpenAlertWarning(false);
  }
      
  async function buyStock() {
    const url = 'http://localhost:8080/api/transaction/buy';
    const data = {
      email: user?.email,
      stockName: props.name,
      symbol: props.data.symbol,
      price: props.data.curPrice,
      volume: num
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
      if(json.volume==0){
        handleClose(); 
        setOpenAlertWarning(true);  
      }else{

      handleClose(); 
      setOpenAlert(true);
          
      await delay(2500);
      props.close();}

      


      
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div>
      <Button disabled={props.data.curPrice>0?false:true} sx={{bgcolor:"green"}} variant="contained" size="large" onClick={handleClickOpen}>
        BUY
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >
        <DialogTitle id="BUY">
          BUY
        </DialogTitle>

        <DialogContent>
          <Grid container mt={2} spacing={2} alignItems="center" rowSpacing={5}> 

            <Grid xs={6}>
              Quantity
            </Grid>
            <Grid xs={6}>
              <TextField id='Qty' type="number" onChange={(e) => handleChange(e)}  value={num} />
            </Grid>
            
            <Grid xs={6}>
              At Market Price
            </Grid>            
            <Grid xs={6}>
              <TextField id='price'   fixed value={props.data.curPrice}  sx={{backgroundColor:"lightgrey"}} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Grid>

            <Grid xs={6}>
              Current Holdings
            </Grid>            
            <Grid xs={6}>
              <TextField id='holding' fixed sx={{backgroundColor:"lightgrey"}} value={props.data.curVolume} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
            </Grid>
          
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleBuyStock} autoFocus >
            Buy
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={10000} onClose={handleCloseAlert} >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          You have Bought Stocks Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertWarning} autoHideDuration={10000} onClose={handleCloseAlertWarning} >
        <Alert onClose={handleCloseAlertWarning} severity="warning" sx={{ width: '100%' }}>
          Insufficieft Wallet balance
        </Alert>
      </Snackbar>

    </div>
  );
}
