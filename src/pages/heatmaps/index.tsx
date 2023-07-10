import React, { useState } from "react";
import {
    Alert,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import { HighchartsWidget, HandsontableWidget , HeatmapProps as ParsedData} from "../../widgets";
import * as dataSource from "../../dataSources/versions.json";


export const HeatmapsPage = () => {
  const { tableHeaders, tableData } = dataSource;
  const [parsedData, setParsedData] = useState({} as ParsedData);

  React.useEffect(() => {
    const yCategories = [] as Array<string>;
    const seriesData = [] as Array<Array<number>>;
    let minValue: number = 0;
    let maxValue: number = 0;
    tableData?.forEach((row, rowIdx) => 
      row?.forEach((cellValue, cellIdx) => {
        const isFirstColumn = cellIdx === 0;
        if (isFirstColumn) {
          yCategories.push(cellValue as string)
        } else {
          seriesData.push([cellIdx, rowIdx, cellValue as number]); // [ x, y, value ]
          if (maxValue < (cellValue as number)){
            maxValue = cellValue as number;
          }
          if (minValue > (cellValue as number)){
            minValue = cellValue as number;
          }
        }
      }));

      const newData = { xCategories: tableHeaders, yCategories, seriesData, minValue, maxValue };
      setParsedData(newData);
    }, [tableData, tableHeaders])
  
    return (
    <Grid container spacing={3}>
      <Grid item lg={12}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Highcharts Heatmap
        </Typography>
        <HighchartsWidget {...parsedData} />
      </Grid>
      <Grid item lg={12}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Handsontable Heatmap
        </Typography>
        <HandsontableWidget
          tableHeaders={tableHeaders}
          tableData={tableData}
          minValue={parsedData.minValue}
          maxValue={parsedData.maxValue}
        />
      </Grid>
    </Grid>
    );
};