import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { GetStaticProps, NextPage } from "next/types";
import { getCustomer } from "../api/customers/[id]";
import customers, { getCustomers } from "../api/customers";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Order ID",
    width: 100,
  },
  {
    field: "customerId",
    headerName: "Customer ID",
    width: 100,
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 400,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    sortable: true,
    width: 160,
  },
];

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCustomers();

  let orders: any = [];

  data.forEach((customer) => {
    if (customer.orders) {
      customer.orders.forEach((order) => {
        orders.push({
          ...order,
          customer: customer.name,
          customerId: customer._id,
          id: order._id,
          price: Number(order.price.$numberDecimal),
        });
      });
    }
  });

  return {
    props: {
      orders: orders,
    },
    revalidate: 60,
  };
};

const Orders: NextPage = (props: any) => {
  const { customerId } = useRouter().query;
  console.log(customerId);
  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                field: "customerId",
                operator: "equals",
                value: customerId,
              },
            ],
          }}
          rows={props.orders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
            filter: {
              filterModel: {
                items: [
                  {
                    field: "customerId",
                    operator: "equals",
                    value: customerId,
                  },
                ],
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default Orders;
