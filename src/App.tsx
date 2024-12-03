import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import AirQualityChart from './components/AirQualityChart';
import themes from './themes';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes()}>
        <CssBaseline />
        <AirQualityChart />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
