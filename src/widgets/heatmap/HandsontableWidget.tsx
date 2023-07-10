import React from 'react';
import { HotTable, HotTableProps } from '@handsontable/react';
import 'handsontable/dist/handsontable.min.css';

interface HeatmapProps {
  tableHeaders: Array<string>;
  tableData: Array<Array<string | number>>;
  minValue: number;
  maxValue: number;
}

export const HandsontableWidget: React.FC<HeatmapProps> = ({ tableHeaders, tableData, minValue, maxValue }) => {
  const getCellMeta = (row: number, col: number) => {
    if(col === 0 || !minValue || !maxValue){
      return {};
    }

    const value = tableData[row][col] as number;
    const max = maxValue;
    const min = minValue;
    const intensity = (value - min) / (max - min);
    const color = `rgba(255, 0, 0, ${intensity})`;
    return { style: { background: color } };
  };

  const hotTableProps: HotTableProps = {
    data: tableData,
    colHeaders: tableHeaders,
    rowHeaders: true,
    stretchH: 'all',
    cells: getCellMeta,
    className: 'heatmap-table',
    licenseKey: 'non-commercial-and-evaluation',
};

  return <HotTable {...hotTableProps} />;
};

