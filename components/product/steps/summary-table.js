"use client";

import CurrencyReadOnly from "@/components/currency/currency-read-only";
import { Card, Table } from "@mantine/core";

const summary = [
  {
    title: "Switch OLED",
    qty: 3,
    rate: 24999,
    amt: 74997,
  },
  {
    title: "UV Printing: 1 Side",
    qty: 3,
    rate: 1,
    amt: 3,
  },
  {
    title: "SubTotal:",
    qty: "",
    rate: "",
    amt: 75000,
    bold: true,
  },
  {
    title: "Vat:",
    qty: "",
    rate: "",
    amt: `7000`,
    bold: true,
  },
  { title: "Total:", qty: "", rate: "", amt: 82000, bold: true },
];

const SummaryTable = ({ data }) => {
  const rows = data.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td fw={element?.bold ? 700 : 500}>{element.title}</Table.Td>
      <Table.Td fw={element?.bold ? 700 : 500}>{element.qty}</Table.Td>
      <Table.Td fw={element?.bold ? 700 : 500}>
        <CurrencyReadOnly prefix={false} value={element.rate} currency="aed" />
      </Table.Td>
      <Table.Td fw={element?.bold ? 700 : 500} ta={"right"}>
        <CurrencyReadOnly value={element.amt} currency="aed" />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card px={5} bg={"gray.0"}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Product</Table.Th>
            <Table.Th>Qty</Table.Th>
            <Table.Th>Rate</Table.Th>
            <Table.Th ta={"right"}>Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default SummaryTable;
