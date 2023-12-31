
import Orders from "../dashboard/Orders";
import { Container,Grid,Paper, Typography, } from "@mui/material";
import Deposits from "../dashboard/Deposits";

export default function MarketStatus(){



return(
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
  <Grid container spacing={3}>
    {/* Chart */}
    <Grid item xs={12} md={8} lg={9}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Typography variant="h4">WORK IN PROGRESS</Typography>
       
        
      </Paper>
    </Grid>
    {/* Recent Deposits */}
    {/* <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <Deposits />
      </Paper>
    </Grid>
    {/* Recent Orders */}
    {/* <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Orders />
      </Paper>
    </Grid>  */}
  </Grid>
  {/* <Copyright sx={{ pt: 4 }} /> */}
</Container>




)};