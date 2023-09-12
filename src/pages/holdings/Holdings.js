
import Orders from "../dashboard/Orders";
import { Container,Grid,Paper,Card, CardContent,Typography } from "@mui/material";
import Deposits from "../dashboard/Deposits";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../authentication/UserSlice";
import HoldingGrid from "./HoldingsTable";

export default function Holdings(){
  const [data,setData]=useState([]);
  const user = useSelector(selectUser);
  const [gridData,setGridData]= useState([]);
  const [balance,setBalance]=useState(0);

  useEffect(() => {
    console.log("here");
    getUsrPortfolioapi();
    getUsrWallet();
  }, []);

async function getUsrPortfolioapi() {
  try {
    
    console.log(user?.email);
    const response = await fetch(`http://localhost:8080/api/portfolio/detail?query=${user?.email}`);
    const data = await response.json();
    if(response.status===200){
      await setData(data);
      setGridData(data.portfolioStockModelList);
    console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUsrWallet() {
  try {
    const response = await fetch(`http://localhost:8080/api/user/walletBalance?query=${user?.email}`);
    const data = await response.text();
    if(response.status===200){
      if(data){
        setBalance(Number(data).toFixed(2));
      }
    
    console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

return(
  <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
  <Grid container spacing={4}>
   < Grid item xs={4}>
      <Card> 
      <CardContent>
      
        <Typography variant="h6" sx={{ fontSize: 18 }} >
          Current Holding Value
        </Typography>
        <Typography sx={{ mt: 2 }}  >
          {data.netPortfolioValue}
        </Typography>
       </CardContent> 
      </Card>
    </Grid>
    < Grid item xs={4}>
    <Card> 
      <CardContent>
      
        <Typography variant="h6" sx={{ fontSize: 18 }} >
            {data.netPortfolioGain?data.netPortfolioGain>0?"Net Profit":"Net Loss":"Loading..."}
        </Typography>
        {/*<Typography sx={{ mt: 2 }}  >*/}
          {data.netPortfolioGain?data.netPortfolioGain>0?<Typography sx={{ mt: 2 }} color='green'>{data.netPortfolioGain}</Typography>:<Typography sx={{ mt: 2 }} color='red'>{data.netPortfolioGain}</Typography>:"Loading..."}

        {/*</Typography>*/}
       </CardContent> 
      </Card>
    </Grid>
    < Grid item xs={4}>
    <Card> 
      <CardContent>
      
        <Typography variant="h6" sx={{ fontSize: 18 }} >
          Wallet Banalence
        </Typography>
        <Typography sx={{ mt: 2 }}  >
          {balance}
        </Typography>
       </CardContent> 
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <HoldingGrid  data={gridData}/>
      </Paper>
    </Grid>
  </Grid>  

  {/* <Copyright sx={{ pt: 4 }} /> */}
</Container>




)};