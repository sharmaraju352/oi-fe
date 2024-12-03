import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, SelectChangeEvent } from '@mui/material';
import Chart from 'react-apexcharts';

import ParameterSelector from './ParameterSelector';
import IntervalSelector from './IntervalSelector';
import DateRangePicker from './DateRangePicker';
import UploadModal from './UploadModal';
import SkeletonTotalGrowthBarChart from './GraphSkeleton';
import MainCard from './MainCard';

import useAirQualityData from '../hooks/useAirQualityData';

import { parameterOptions, intervals, lastDate, minDate } from './constants';

const AirQualityChart: React.FC = () => {
  const [parameters, setParameters] = useState<string[]>(['co_gt']);

  const handleParameterChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setParameters(typeof value === 'string' ? value.split(',') : (value as string[]));
  };

  const [interval, setInterval] = useState<string>('1_day');

  const [startDate, setStartDate] = useState<Date>(lastDate);
  const [endDate, setEndDate] = useState<Date>(lastDate);
  const [isCustomDate, setIsCustomDate] = useState<boolean>(false);

  useEffect(() => {
    if (interval !== 'custom') {
      setIsCustomDate(false);

      let newStartDate = new Date(lastDate);

      if (interval === '1_day') {
        newStartDate = new Date(lastDate);
      } else if (interval === '5_day') {
        newStartDate.setDate(lastDate.getDate() - 4);
      } else if (interval === '1_month') {
        newStartDate.setMonth(lastDate.getMonth() - 1);
      } else if (interval === '6_month') {
        newStartDate.setMonth(lastDate.getMonth() - 6);
      }

      if (newStartDate < minDate) {
        newStartDate = new Date(minDate);
      }

      setStartDate(newStartDate);
      setEndDate(lastDate);
    } else {
      setIsCustomDate(true);
    }
  }, [interval]);

  const { chartData, loading: isLoading } = useAirQualityData(parameters, startDate, endDate, parameterOptions);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {isLoading || !chartData ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Air Quality Data Visualization</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <ParameterSelector
                    parameters={parameters}
                    parameterOptions={parameterOptions}
                    handleParameterChange={handleParameterChange}
                  />
                </Grid>
                <Grid item>
                  <IntervalSelector interval={interval} intervals={intervals} setInterval={setInterval} />
                </Grid>
                <DateRangePicker
                  isCustomDate={isCustomDate}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  minDate={minDate}
                  maxDate={lastDate}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Selected Parameters:{' '}
                {parameters.length > 0
                  ? parameters
                      .map((param) => parameterOptions.find((p) => p.value === param)?.label)
                      .join(', ')
                  : 'None'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleOpenModal}>
                Upload CSV File
              </Button>
            </Grid>

            <UploadModal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} />

            <Grid item xs={12}>
              <Chart options={chartData.options} series={chartData.series} type="line" height={480} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default AirQualityChart;
