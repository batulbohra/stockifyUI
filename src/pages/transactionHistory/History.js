
import Orders from "../dashboard/Orders";
import { Container,Grid,Paper,Card, CardContent,Typography } from "@mui/material";
import Deposits from "../dashboard/Deposits";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../authentication/UserSlice";
import HistoryGrid from "./HistoryGrid";

export default function History(){
  const [data,setData]=useState([]);
  const user = useSelector(selectUser);
  

  useEffect(() => {
    console.log("here");
    getUsrHistory();

  }, []);

async function getUsrHistory() {
  try {
    
    console.log(user?.email);
    const response = await fetch(`http://localhost:8080/api/transaction/history?query=${user?.email}`);
    const data = await response.json();
    if(response.status===200){
      await setData(data);
      
    console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}

// async function getUsrWallet() {
//   try {
//     const response = await fetch(`http://localhost:8080/api/user/walletBalance?query=${user?.email}`);
//     const data = await response.text();
//     if(response.status===200){
//       if(data){
//         setBalance(Number(data).toFixed(2));
//       }
    
//     console.log(data);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

return(
  <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
  <Grid container spacing={4}>
   {/* < Grid item xs={4}>
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
         Net Gains
        </Typography>
        <Typography sx={{ mt: 2 }}  >
        {data.netPortfolioGain}

        </Typography>
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
    </Grid> */}
    <Grid item xs={12} alignItems="center">
      <Typography variant="h6">
        Transaction History
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Paper>
        <HistoryGrid  data={data}/>
      </Paper>
    </Grid>
  </Grid>  

  {/* <Copyright sx={{ pt: 4 }} /> */}
</Container>




)};