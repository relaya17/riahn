import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  TrendingUp as TrendingUpIcon,
  Lightbulb as LightbulbIcon,
  FitnessCenter as FitnessIcon,
  Restaurant as FoodIcon,
  WaterDrop as WaterIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { 
  toggleCoachMode, 
  setCoachMood, 
  addRecommendation,
  markRecommendationAsRead,
  updateProductivityScore,
  generateSmartRecommendations 
} from '../store/aiAssistantSlice';
import { calculateTopTasks } from '../store/tasksSlice';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AIAssistant: React.FC = () => {
  const dispatch = useDispatch();
  const { coach, recommendations, isCoachMode, dailyInsights } = useSelector((state: RootState) => state.aiAssistant);
  const { tasks, topTasks } = useSelector((state: RootState) => state.tasks);
  const { dailyStats } = useSelector((state: RootState) => state.health);
  
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState(coach.currentMood);

  // נתונים לדוגמה לגרף פרודוקטיביות
  const productivityData = [
    { day: 'א', productivity: 65 },
    { day: 'ב', productivity: 78 },
    { day: 'ג', productivity: 82 },
    { day: 'ד', productivity: 75 },
    { day: 'ה', productivity: 90 },
    { day: 'ו', productivity: 85 },
    { day: 'ש', productivity: 70 },
  ];

  useEffect(() => {
    // חישוב משימות מובילות
    dispatch(calculateTopTasks());
    
    // יצירת המלצות חכמות
    const completedToday = tasks.filter(t => 
      t.completed && new Date(t.createdAt).toDateString() === new Date().toDateString()
    ).length;
    
    dispatch(generateSmartRecommendations({
      tasks,
      currentTime: new Date().toISOString(),
      completedToday,
    }));
  }, [dispatch, tasks]);

  const handleMoodChange = () => {
    dispatch(setCoachMood(selectedMood));
    setShowMoodDialog(false);
    
    // המלצות לפי מצב רוח
    switch (selectedMood) {
      case 'tired':
        dispatch(addRecommendation({
          type: 'productivity',
          title: 'מצב רוח עייף',
          message: 'נסה משימות קצרות ופשוטות. אולי כדאי לקחת הפסקה קצרה?',
          priority: 'medium',
        }));
        break;
      case 'stressed':
        dispatch(addRecommendation({
          type: 'health',
          title: 'לחץ גבוה',
          message: 'מומלץ לקחת נשימות עמוקות ולעשות מדיטציה קצרה',
          priority: 'high',
        }));
        break;
      case 'motivated':
        dispatch(addRecommendation({
          type: 'productivity',
          title: 'מצב רוח מעולה!',
          message: 'זה הזמן המושלם למשימות מורכבות וחשובות',
          priority: 'low',
        }));
        break;
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'motivated': return '🚀';
      case 'focused': return '🎯';
      case 'tired': return '😴';
      case 'stressed': return '😰';
      default: return '😊';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'priority': return <WarningIcon color="error" />;
      case 'health': return <FitnessIcon color="primary" />;
      case 'productivity': return <TrendingUpIcon color="success" />;
      case 'time': return <TimerIcon color="info" />;
      default: return <InfoIcon />;
    }
  };

  return (
    <Box>
      {/* AI Coach Header */}
      <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                <PsychologyIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h5" component="h2">
                  AI Coach Assistant
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {coach.dailyGoal}
                </Typography>
              </Box>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" component="div">
                {getMoodEmoji(coach.currentMood)}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => setShowMoodDialog(true)}
                sx={{ color: 'white', borderColor: 'white', mt: 1 }}
              >
                שנה מצב רוח
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Top Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                <TrophyIcon color="primary" />
                Top 3 Tasks for Today
              </Typography>
              <List>
                {topTasks.map((task, index) => (
                  <ListItem key={task.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 1 }}>
                    <ListItemIcon>
                      <Chip label={index + 1} color="primary" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={`AI Priority: ${task.aiPriority || 0} | ${task.priority} priority`}
                    />
                    <Chip 
                      label={task.category} 
                      size="small" 
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Productivity Score */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Productivity Score
              </Typography>
              <Box textAlign="center" mb={2}>
                <Typography variant="h3" color="primary">
                  {coach.productivityScore}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={coach.productivityScore} 
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {coach.productivityScore >= 80 ? 'מעולה! אתה בדרך הנכונה' :
                 coach.productivityScore >= 60 ? 'לא רע, יש מקום לשיפור' :
                 'נסה להתמקד במשימות החשובות ביותר'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Stats */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Health & Wellness
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <WaterIcon color="primary" fontSize="large" />
                    <Typography variant="h6">{Math.round(dailyStats.waterIntake / 1000 * 10) / 10}L</Typography>
                    <Typography variant="caption">מים</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <FitnessIcon color="success" fontSize="large" />
                    <Typography variant="h6">{dailyStats.exerciseMinutes}min</Typography>
                    <Typography variant="caption">אימון</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <FoodIcon color="warning" fontSize="large" />
                    <Typography variant="h6">{dailyStats.caloriesConsumed}</Typography>
                    <Typography variant="caption">קלוריות</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center">
                    <TimerIcon color="info" fontSize="large" />
                    <Typography variant="h6">{dailyStats.breaksTaken}</Typography>
                    <Typography variant="caption">הפסקות</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Productivity Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Productivity Trend
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="productivity" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center" gap={1}>
                <LightbulbIcon color="primary" />
                AI Recommendations
              </Typography>
              <List>
                {recommendations.slice(0, 5).map((rec) => (
                  <ListItem 
                    key={rec.id} 
                    sx={{ 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 1, 
                      mb: 1,
                      opacity: rec.read ? 0.7 : 1,
                    }}
                  >
                    <ListItemIcon>
                      {getRecommendationIcon(rec.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={rec.title}
                      secondary={rec.message}
                    />
                    <Box display="flex" gap={1}>
                      <Chip 
                        label={rec.priority} 
                        size="small" 
                        color={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'default'}
                      />
                      {!rec.read && (
                        <IconButton 
                          size="small" 
                          onClick={() => dispatch(markRecommendationAsRead(rec.id))}
                        >
                          <CheckCircleIcon color="success" />
                        </IconButton>
                      )}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Mood Dialog */}
      <Dialog open={showMoodDialog} onClose={() => setShowMoodDialog(false)}>
        <DialogTitle>
          איך אתה מרגיש היום?
          <IconButton
            aria-label="close"
            onClick={() => setShowMoodDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>מצב רוח</InputLabel>
            <Select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value as any)}
              label="מצב רוח"
            >
              <MenuItem value="motivated">מלא מוטיבציה 🚀</MenuItem>
              <MenuItem value="focused">ממוקד 🎯</MenuItem>
              <MenuItem value="tired">עייף 😴</MenuItem>
              <MenuItem value="stressed">לחוץ 😰</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMoodDialog(false)}>ביטול</Button>
          <Button onClick={handleMoodChange} variant="contained">שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIAssistant;
