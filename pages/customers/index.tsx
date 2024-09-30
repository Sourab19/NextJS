import { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";

import { ObjectId } from "mongodb";

import { getCustomers } from "../api/customers/index";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import CustomerComponent from "../../components/Customer";

export type Customer = {
  _id?: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCustomers();

  console.log("!!!", data);
  return {
    props: {
      customers: data,
    },
    revalidate: 60,
  };
};

const Customers: NextPage = ({
  customers: c,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: { data: { customers = c } = {} } = {} } = useQuery({
    queryKey: ["customers"],
    queryFn: () => {
      return axios("/api/customers") as any;
    },
  });

  console.log(c, customers);

  if (customers) {
    return (
      <>
        <h1>Customers</h1>
        {customers.map((customer: Customer) => {
          return (
            <CustomerComponent
              key={customer._id?.toString()}
              customer={customer}
            />
          );
        })}
      </>
    );
  }
  return null;
};

export default Customers;
