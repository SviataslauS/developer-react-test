import Highcharts from "highcharts";
import _ from "lodash";


const getDefaultOptions = (type: string): Highcharts.Options => ({
    chart: {
      type,
      plotBorderWidth: 1,
    },
    title: {
      text: _.startCase(`${type} chart`),
    },
    xAxis: {
      categories: undefined,
    },
    yAxis: {
      categories: undefined,
      title: undefined,
      reversed: true,
    },
    colorAxis: {
      minColor: '#FFFFFF',
      maxColor: '#FF0000',
    },
    series: [
      {
        // data: Array<Array<number>> // array of items where item is [ x, y, value ]
        dataLabels: {
          enabled: true,
        },
      } as Highcharts.SeriesOptionsType,
    ],
    credits: {
      enabled: false,
    },
  });

export const getOptions = (type: string, options = {} as Highcharts.Options) :Highcharts.Options  => {
    return _.merge(getDefaultOptions(type), options);
};


const CHART_TYPES = { HEATMAP: 'heatmap' };
export interface BuildPartialOptions {
  xCategories: Array<string>,
  yCategories: Array<string>,
  seriesData: number[][], 
  minValue: number;
  maxValue: number;
};
export const buildHeatmapOptions = (props: BuildPartialOptions): Highcharts.Options => {
  const partial = {
    xAxis: {categories: props.xCategories} as Highcharts.XAxisOptions,
    yAxis: { categories: props.yCategories} as Highcharts.YAxisOptions,
    colorAxis: {
      min: props.minValue,
      max: props.maxValue
    },
    series: [
      {
        type: CHART_TYPES.HEATMAP,
        data: props.seriesData as Array<(Array<number>|Highcharts.PointOptionsObject)>,
        dataLabels: {
          enabled: true,
          formatter: function () {
              return Highcharts.numberFormat(this.point.value || 0, 2);
          }
        },
      } as Highcharts.SeriesHeatmapOptions,
    ],
    tooltip: {
      formatter: function() {
        return (`<b>${this.point.value }</b>`);
      }
    },
  } as Highcharts.Options;
  
  return getOptions(CHART_TYPES.HEATMAP, partial);
}
