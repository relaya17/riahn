import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Tabs, 
  Tab, 
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import TaskManager from './components/TaskManager';
import KanbanBoard from './components/KanbanBoard';
import AIAssistant from './components/AIAssistant';
import { store } from './store';

// יצירת ערכת נושא מותאמת
const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                🚀 Smart Productivity Hub
              </Typography>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="ניהול משימות">
                <Tab label="🤖 AI Assistant" />
                <Tab label="📋 רשימת משימות" />
                <Tab label="📊 לוח Kanban" />
              </Tabs>
            </Box>
            
            <TabPanel value={tabValue} index={0}>
              <AIAssistant />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TaskManager />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <KanbanBoard />
            </TabPanel>
          </Container>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
