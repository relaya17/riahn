import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { RootState } from '../store';
import { fetchTasks, addTask, updateTask, deleteTask, Task } from '../store/tasksSlice';

const TaskManager: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks() as any);
  }, [dispatch]);

  // הוספת משימה חדשה
  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      await dispatch(addTask({
        title: newTask,
        priority,
        description: '',
        completed: false,
        status: 'todo',
        category: 'general',
        subtasks: [],
      }) as any).unwrap();
      
      setNewTask('');
      setPriority('medium');
    } catch (error) {
      console.error('שגיאה בהוספת משימה:', error);
    }
  };

  // עריכת משימה
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  // שמירת עריכת משימה
  const handleSaveEdit = async () => {
    if (editingTask) {
      try {
        await dispatch(updateTask(editingTask) as any).unwrap();
        setShowModal(false);
        setEditingTask(null);
      } catch (error) {
        console.error('שגיאה בעדכון משימה:', error);
      }
    }
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>טוען משימות...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="הוספת משימה חדשה" />
        <CardContent>
          <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="הכנס כותרת משימה..."
              value={newTask}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>עדיפות</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                label="עדיפות"
              >
                <MenuItem value="low">נמוכה</MenuItem>
                <MenuItem value="medium">בינונית</MenuItem>
                <MenuItem value="high">גבוהה</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" startIcon={<AddIcon />}>
              הוסף
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={`רשימת משימות (${tasks.length})`} />
        <CardContent>
          {tasks.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              אין משימות להצגה
            </Typography>
          ) : (
            <List>
              {tasks.map((task) => (
                <ListItem
                  key={task.id}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                    '&:last-child': { mb: 0 }
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => dispatch(updateTask({ ...task, completed: !task.completed }) as any)}
                  />
                  <ListItemText
                    primary={task.title}
                    sx={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                      color: task.completed ? 'text.secondary' : 'text.primary'
                    }}
                  />
                  <Chip
                    label={task.priority === 'high' ? 'גבוהה' : 
                           task.priority === 'medium' ? 'בינונית' : 'נמוכה'}
                    color={getPriorityColor(task.priority)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditTask(task)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => dispatch(deleteTask(task.id) as any)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>

      {/* Dialog לעריכת משימה */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditingTask({ ...editingTask, title: e.target.value })}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>
            ביטול
          </Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TaskManager;
