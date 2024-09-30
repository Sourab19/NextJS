import { Button, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import Info from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import type { Customer } from "../pages/customers";

const Customer = ({ customer }: { customer: Customer }) => {
  return (
    <Grid item>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title={customer._id?.toString()}>
          <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
        </Tooltip>
        {customer.name}
      </span>
      <p> {customer.industry} </p>
      <Button variant="contained">View Orders</Button>
    </Grid>
  );
};
export default Customer;
