import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Navbar } from './components/Navbar';
import { AgreementsPage } from './pages/AgreementsPage';
import { TodosPage } from './pages/TodosPage';
import { ToolboxPage } from './pages/ToolboxPage';
import { ThemeProvider } from './context/ThemeContext';
import { Login } from './pages/LoginPage';

// Mock user data - replace with actual auth
const mockUser = {
  name: 'María González',
  role: 'assistant'
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <div className="min-h-screen">
            <Navbar user={mockUser} />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/agreements" element={<AgreementsPage />} />
              <Route path="/todos" element={<TodosPage />} />
              <Route path="/toolbox" element={<ToolboxPage />} />
            </Routes>
          </div>
        </LocalizationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
