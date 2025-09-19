import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';
import { format } from 'date-fns';
import { he } from 'date-fns/locale';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon
} from '@mui/icons-material';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'inProgress' | 'done';
  dueDate?: string;
  category: string;
  subtasks: Subtask[];
  createdAt: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: Task[];
}

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'todo', title: 'לעשות', tasks: [] },
    { id: 'inProgress', title: 'בתהליך', tasks: [] },
    { id: 'done', title: 'הושלם', tasks: [] }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  // יצירת ערכת נושא מותאמת
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // טעינת משימות מהשרת
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`);
      const tasks = response.data;
      
      // ארגון משימות לפי עמודות
      const newColumns = columns.map(column => ({
        ...column,
        tasks: tasks.filter((task: Task) => task.status === column.id)
      }));
      
      setColumns(newColumns);
    } catch (error) {
      console.error('שגיאה בטעינת משימות:', error);
    }
  };

  // עדכון משימה
  const updateTask = async (task: Task) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${task.id}`, task);
      await fetchTasks();
    } catch (error) {
      console.error('שגיאה בעדכון משימה:', error);
    }
  };

  // עדכון subtask
  const updateSubtask = async (taskId: number, subtaskId: number, completed: boolean) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${taskId}/subtasks/${subtaskId}`, { completed });
      await fetchTasks();
    } catch (error) {
      console.error('שגיאה בעדכון תת-משימה:', error);
    }
  };

  // טיפול בגרירה
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const taskId = parseInt(active.id as string);
    const newStatus = over.id as string;
    
    // מציאת המשימה
    const task = columns.flatMap(col => col.tasks).find(t => t.id === taskId);
    if (!task) return;
    
    // עדכון הסטטוס
    const updatedTask = { ...task, status: newStatus as 'todo' | 'inProgress' | 'done' };
    await updateTask(updatedTask);
  };

  // קבלת צבע לפי עדיפות
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  // קבלת צבע לפי קטגוריה
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'learning': return 'info';
      case 'development': return 'primary';
      case 'meeting': return 'warning';
      default: return 'default';
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // רכיב כרטיס משימה
  const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
      id: task.id
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <Card 
        ref={setNodeRef} 
        style={style} 
        {...attributes} 
        {...listeners}
        sx={{ mb: 2, cursor: 'grab' }}
      >
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Typography variant="h6" component="h6">
              {task.title}
            </Typography>
            <Chip 
              label={task.priority === 'high' ? 'גבוהה' : 
                     task.priority === 'medium' ? 'בינונית' : 'נמוכה'}
              color={getPriorityColor(task.priority)}
              size="small"
            />
          </Box>
          
          {task.description && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {task.description}
            </Typography>
          )}
          
          {task.dueDate && (
            <Typography variant="caption" display="block" mb={1}>
              יעד: {format(new Date(task.dueDate), 'dd/MM/yyyy', { locale: he })}
            </Typography>
          )}
          
          {task.category && (
            <Chip 
              label={task.category === 'learning' ? 'למידה' :
                     task.category === 'development' ? 'פיתוח' :
                     task.category === 'meeting' ? 'פגישה' : task.category}
              color={getCategoryColor(task.category)}
              size="small"
              sx={{ mb: 1 }}
            />
          )}
          
          {task.subtasks.length > 0 && (
            <Box mb={1}>
              <Typography variant="caption" display="block" mb={1}>
                תת-משימות:
              </Typography>
              {task.subtasks.map(subtask => (
                <FormControlLabel
                  key={subtask.id}
                  control={
                    <Checkbox
                      checked={subtask.completed}
                      onChange={(e) => updateSubtask(task.id, subtask.id, e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        textDecoration: subtask.completed ? 'line-through' : 'none',
                        color: subtask.completed ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  }
                  sx={{ display: 'block', mb: 0.5 }}
                />
              ))}
            </Box>
          )}
          
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => {
              setEditingTask(task);
              setShowModal(true);
            }}
            fullWidth
          >
            ערוך
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h3">
            לוח Kanban
          </Typography>
          <IconButton 
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>

        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
          <Box display="flex" gap={3} flexWrap="wrap">
            {columns.map(column => (
              <Box key={column.id} sx={{ flex: '1 1 300px', minWidth: 0 }}>
                <Paper sx={{ p: 2, height: 'fit-content' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" component="h5">
                      {column.title}
                    </Typography>
                    <Chip label={column.tasks.length} size="small" />
                  </Box>
                  <Box>
                    <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
                      {column.tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                    </SortableContext>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </DndContext>

        {/* Modal לעריכת משימה */}
        <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>
            עריכת משימה
            <IconButton
              aria-label="close"
              onClick={() => setShowModal(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {editingTask && (
              <Box component="form" sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  label="כותרת"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="תיאור"
                  multiline
                  rows={3}
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  margin="normal"
                />
                <Box display="flex" gap={2} sx={{ mt: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel>עדיפות</InputLabel>
                      <Select
                        value={editingTask.priority}
                        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                        label="עדיפות"
                      >
                        <MenuItem value="low">נמוכה</MenuItem>
                        <MenuItem value="medium">בינונית</MenuItem>
                        <MenuItem value="high">גבוהה</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel>סטטוס</InputLabel>
                      <Select
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as 'todo' | 'inProgress' | 'done' })}
                        label="סטטוס"
                      >
                        <MenuItem value="todo">לעשות</MenuItem>
                        <MenuItem value="inProgress">בתהליך</MenuItem>
                        <MenuItem value="done">הושלם</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  label="תאריך יעד"
                  type="date"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>קטגוריה</InputLabel>
                  <Select
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
                    label="קטגוריה"
                  >
                    <MenuItem value="general">כללי</MenuItem>
                    <MenuItem value="learning">למידה</MenuItem>
                    <MenuItem value="development">פיתוח</MenuItem>
                    <MenuItem value="meeting">פגישה</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)}>
              ביטול
            </Button>
            <Button 
              variant="contained" 
              onClick={async () => {
                if (editingTask) {
                  await updateTask(editingTask);
                  setShowModal(false);
                  setEditingTask(null);
                }
              }}
            >
              שמור
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default KanbanBoard;
