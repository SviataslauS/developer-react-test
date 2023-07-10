import React, { useState } from "react";
import {
  Box,
} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";

import { HeatmapProps } from "./Heatmap.props";
import { buildHeatmapOptions } from "../highchartsUtils";

HighchartsHeatmap(Highcharts);

export const HighchartsWidget = (props: HeatmapProps) => {
  const [options, setOptions] = useState<Highcharts.Options>();

  React.useEffect(() => {
    const newOptions = buildHeatmapOptions(props);
    setOptions(newOptions);
  }, [props])
  
  return (
    <Box>
      {options && <HighchartsReact highcharts={Highcharts} options={options} />}
    </Box>
  );
};
