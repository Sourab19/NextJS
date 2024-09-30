import { Button, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

import PersonIcon from "@mui/icons-material/Person";
import type { Customer } from "../pages/customers";
import Link from "next/link";

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
      <Link
        href={{
          pathname: "/orders",
          query: {
            customerId: customer._id?.toString(),
          },
        }}
      >
        <Button variant="contained">View Orders</Button>
      </Link>
    </Grid>
  );
};
export default Customer;
