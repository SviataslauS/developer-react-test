import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


interface HeatmapProps {
  tableHeaders: Array<string>;
  tableData: Array<Array<string | number>>;
}
export const HandsontableWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;

  const showColHeader = (item: string) => {
    return <TableCell>{item}</TableCell>;
  };

  const showColHeaders = () => {
    return (
      <TableRow>{tableHeaders.map((header) => showColHeader(header))}</TableRow>
    );
  };

  const showRowItem = (item: Array<string | number>) => {
    return item.map((x) => <TableCell>{x}</TableCell>);
  };

  const showRowData = () => {
    return tableData.map((x) => <TableRow>{showRowItem(x)}</TableRow>);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>{showColHeaders()}</TableHead>
          <TableBody>{showRowData()}</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
