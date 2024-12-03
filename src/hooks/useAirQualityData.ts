import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { ParameterOption } from '../components/constants';

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  options: any;
}

interface UseAirQualityDataResult {
  chartData: ChartData | null;
  loading: boolean;
}

interface ResponseDataItem {
  date: string;
  time: string;
  [key: string]: any;
}

const useAirQualityData = (
  parameters: string[],
  startDate: Date,
  endDate: Date,
  parameterOptions: ParameterOption[]
): UseAirQualityDataResult => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAirQualityData = async () => {
      setLoading(true);

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

      const start = format(startDate, 'yyyy-MM-dd');
      const end = format(endDate, 'yyyy-MM-dd');

      const dateDifferenceInDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

      const aggregationInterval = dateDifferenceInDays > 5 ? 'daily' : 'hourly';

      try {
        const response = await axios.get(`${API_BASE_URL}/air-quality`, {
          params: {
            parameters: parameters.join(','),
            startDate: start,
            endDate: end,
            interval: aggregationInterval,
          },
        });

        const responseData: ResponseDataItem[] = response.data.data;

        const processedData = processDataForChart(responseData, parameters, aggregationInterval, parameterOptions);

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (parameters.length > 0) {
      fetchAirQualityData();
    } else {
      setChartData(null);
    }
  }, [parameters, startDate, endDate, parameterOptions]);

  const processDataForChart = (
    data: ResponseDataItem[],
    parameters: string[],
    aggregationInterval: string,
    parameterOptions: ParameterOption[]
  ): ChartData => {
    const categories = data.map((item) => {
      const dateStr = format(new Date(item.date), 'yyyy-MM-dd');
      const dateTimeStr = `${dateStr} ${item.time}`;
      return dateTimeStr;
    });

    const series = parameters.map((param) => ({
      name: parameterOptions.find((p) => p.value === param)?.label || param,
      data: data.map((item) => item[param]),
    }));

    const xAxisFormat = aggregationInterval === 'daily' ? 'dd MMM yyyy' : 'dd MMM yyyy HH:mm';

    return {
      series: series,
      options: {
        chart: {
          id: 'air-quality-chart',
          type: 'line',
          height: 480,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: categories,
          type: 'datetime',
          labels: {
            format: xAxisFormat,
          },
        },
        yaxis: {
          labels: {
            formatter: function (val: number) {
              return val ? val.toFixed(2) : '';
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        markers: {
          size: 0,
        },
        tooltip: {
          x: {
            format: xAxisFormat,
          },
        },
        legend: {
          show: true,
          position: 'bottom',
          labels: {
            useSeriesColors: false,
          },
        },
      },
    };
  };

  return { chartData, loading };
};

export default useAirQualityData;
