export interface ParameterOption {
    value: string;
    label: string;
  }
  
  export const parameterOptions: ParameterOption[] = [
    { value: 'co_gt', label: 'CO(GT)' },
    { value: 'pt08_s1_co', label: 'PT08.S1(CO)' },
    { value: 'nmhc_gt', label: 'NMHC(GT)' },
    { value: 'c6h6_gt', label: 'C6H6(GT)' },
    { value: 'pt08_s2_nmhc', label: 'PT08.S2(NMHC)' },
    { value: 'nox_gt', label: 'NOx(GT)' },
    { value: 'pt08_s3_nox', label: 'PT08.S3(NOx)' },
    { value: 'no2_gt', label: 'NO2(GT)' },
    { value: 'pt08_s4_no2', label: 'PT08.S4(NO2)' },
    { value: 'pt08_s5_o3', label: 'PT08.S5(O3)' },
    { value: 't', label: 'Temperature (T)' },
    { value: 'rh', label: 'Relative Humidity (RH)' },
    { value: 'ah', label: 'Absolute Humidity (AH)' },
  ];
  
  export interface IntervalOption {
    value: string;
    label: string;
  }
  
  export const intervals: IntervalOption[] = [
    { value: '1_day', label: '1 Day' },
    { value: '5_day', label: '5 Days' },
    { value: '1_month', label: '1 Month' },
    { value: '6_month', label: '6 Months' },
    { value: 'custom', label: 'Custom' },
  ];
  
  export const lastDate: Date = new Date(2005, 3, 4); // April 4, 2005
  export const minDate: Date = new Date(2004, 2, 10); // March 10, 2004
  