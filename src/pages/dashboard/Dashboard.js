import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Autocomplete,TextField } from '@mui/material';
import { useState,useRef } from 'react';
import PopUp from '../../Components/PopUp';
import { Outlet } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../authentication/UserSlice';
import { SettingsPower } from '@mui/icons-material';
import { logout } from '../authentication/UserSlice';
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const baseURL = process.env.REACT_APP_BASE_URL;
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [openPopup,setOpenPopup]=React.useState(false);
  const [historyData,setHistoryData]=React.useState({});
  const [stock,setStock]=React.useState("");
  const [stockDetailData,setStockDetailData]=React.useState({});
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch =useDispatch();
  // const [defaultV,setdefaultV]=React.useState("");
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function handleClose(value){
    setOpenPopup(false);
    // setdefaultV(false);
  }
  
  const [options, setOptions] = useState([]);
const previousController = useRef();
let debounceTimeout;
const getData = (searchTerm) => {


    // Clear the previous debounce timeout
    clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
   
  fetch(`${baseURL}/api/stock-listing/ticker-search?query=` + searchTerm, {
    // signal,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(function (response) {
            // check the status code
            if (response.status === 200) {
              // parse the response as JSON
              return response.json();
            } else {
              // throw an error or handle it differently
              throw new Error("Something went wrong");
            }
      
     
    })
    .then(function (myJson) {
      console.log(
        "search term: " + searchTerm + ", results: ",
        myJson
      );
      setOptions(myJson);
    })
    .catch(function (error) {
      // handle the error
      console.error(error);
    });
  },500);
};
const onInputChange = (event, value, reason) => {
  if (value  && value.length>2 && value.length<8 ) {
    
    getData(value);
   

  }else if(value.length>8){

    let sym = value.split("  ")[1];
    console.log(sym);
    getHistoryDataAPI(sym);
    setStock(value);
    StockDetailAPI(sym);
    setOpenPopup(true);

  } else {
    setOptions([]);
  }
};
async function StockDetailAPI(sym) {
  const url = `${baseURL}/api/stock-listing/stock-detail`;
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
          `${baseURL}/api/stock-listing/stock-price-history?query=${value}`
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

const handleSelectStock =(event,value)=>{
  if(value){
    console.log("selected "+value.name)
    handlePopUp(value.name);

  }

};
const handlePopUp=(e)=>{
  if(e.target.value){
    console.log(e.target.value);
    setOpenPopup(true);
 }else{
  console.log("emptyValue")
 }
 
};

const handleLogout=()=>{
  dispatch(logout());
  navigate("/login");
};


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Stockify
            </Typography>
            <Autocomplete                      
                      id="search box"
                      options={options}
                      fullWidth                      
                      onInputChange={onInputChange}
                      getOptionLabel={(option) =>{ return(option.name +"  "+option.symbol);}}
                      sx={{ margin:1.5, bgcolor:"whitesmoke",borderRadius:"15px"}}
                      style={{ width: 500 }}
                     
                      renderInput={(params) => (
                        <TextField {...params} label="Search Stocks...." variant="filled" />
                      )}
                      
                    />
            <Typography>{user?.name}</Typography>        
            <IconButton color="inherit" onClick={handleLogout}>
              
                <SettingsPower/>
              
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <React.Fragment>    
              <ListItemButton onClick={(e)=>{navigate("/home/dashboard"); }}> 
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
              <ListItemButton onClick={(e)=>{navigate("/home/holding")}}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Holdings" />
              </ListItemButton>
              <ListItemButton onClick={(e)=>{navigate("/home/transactions") }}>
                <ListItemIcon>
                  <ReceiptLongIcon/>
                </ListItemIcon>
                <ListItemText primary="Trading History" />
              </ListItemButton>

            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            {/* {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <PopUp value={stock} open={openPopup} setOpen={handleClose} data={historyData} detailData={stockDetailData} data1={{"2023-09-08":{"1. open":"40.2800","2. high":"40.4500","3. low":"40.0000","4. close":"40.2900","5. volume":"2073694"},"2023-09-07":{"1. open":"40.6900","2. high":"40.8600","3. low":"40.1700","4. close":"40.3700","5. volume":"3834273"},"2023-09-06":{"1. open":"41.7000","2. high":"42.1700","3. low":"41.5100","4. close":"41.6200","5. volume":"2315736"},"2023-09-05":{"1. open":"41.9200","2. high":"42.0500","3. low":"41.6400","4. close":"41.7800","5. volume":"1269119"},"2023-09-01":{"1. open":"42.0450","2. high":"42.8400","3. low":"42.0100","4. close":"42.2500","5. volume":"3812572"},"2023-08-31":{"1. open":"41.4800","2. high":"41.8000","3. low":"41.2400","4. close":"41.4100","5. volume":"2083226"},"2023-08-30":{"1. open":"41.6500","2. high":"42.0900","3. low":"41.5700","4. close":"42.0500","5. volume":"2590525"}}}/>
          <Outlet/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
