import { CssBaseline, StyledEngineProvider } from '@mui/material';
import AirQualityChart from './components/AirQualityChart';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <AirQualityChart />
    </StyledEngineProvider>
  );
}

export default App;
