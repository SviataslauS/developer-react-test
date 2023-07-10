import React from 'react';
import { HotTable, HotTableProps } from '@handsontable/react';
import Handsontable from 'handsontable';

import 'handsontable/dist/handsontable.min.css';

interface HeatmapProps {
  tableHeaders: Array<string>;
  tableData: Array<Array<string | number>>;
  minValue: number;
  maxValue: number;
}


export const HandsontableWidget: React.FC<HeatmapProps> = ({ tableHeaders, tableData, minValue, maxValue }) => {
  const getCellRenderer = (_instance: Handsontable, TD: HTMLTableCellElement, row: number, col: number, prop: any, value: any) => {
    TD.textContent = value;
    if (!maxValue || !minValue || col === 0) {
      return TD;
    }

    const intensity = Math.round(((value - minValue) / (maxValue - minValue)) * 100)/100;
    const color = `rgba(255, 0, 0, ${intensity})`;
    TD.style.backgroundColor = color;

    return TD;
  };

  const hotTableProps: HotTableProps = {
    data: tableData,
    colHeaders: tableHeaders,
    rowHeaders: false,
    stretchH: 'all',
    autoColumnSize: true,
    cells: () => ({ className: 'heatmap-cell', renderer: getCellRenderer }),
    className: 'heatmap-table',
  };

  return <HotTable {...hotTableProps} />;
};

