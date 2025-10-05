import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../ui/Card';

const {width} = Dimensions.get('window');

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  progress: number;
  completed: boolean;
  language: string;
  category: string;
  thumbnail?: string;
}

interface LessonCardProps {
  lesson: Lesson;
  onPress: () => void;
  onStart?: () => void;
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  onPress,
  onStart,
}) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return '#4ade80';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'מתחיל';
      case 'intermediate':
        return 'בינוני';
      case 'advanced':
        return 'מתקדם';
      default:
        return level;
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} דקות`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} שעות ${remainingMinutes} דקות`;
  };

  return (
    <Card
      style={styles.card}
      onPress={onPress}
      gradient={true}
      colors={['#fff', '#f8fafc']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.description}>{lesson.description}</Text>
        </View>
        <View style={[styles.levelBadge, {backgroundColor: getLevelColor(lesson.level)}]}>
          <Text style={styles.levelText}>{getLevelText(lesson.level)}</Text>
        </View>
      </View>

      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <Icon name="schedule" size={16} color="#666" />
          <Text style={styles.metaText}>{formatDuration(lesson.duration)}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="language" size={16} color="#666" />
          <Text style={styles.metaText}>{lesson.language}</Text>
        </View>
        <View style={styles.metaItem}>
          <Icon name="category" size={16} color="#666" />
          <Text style={styles.metaText}>{lesson.category}</Text>
        </View>
      </View>

      {lesson.progress > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {width: `${lesson.progress}%`},
              ]}
            />
          </View>
          <Text style={styles.progressText}>{lesson.progress}%</Text>
        </View>
      )}

      <View style={styles.actions}>
        {lesson.completed ? (
          <View style={styles.completedContainer}>
            <Icon name="check-circle" size={20} color="#4ade80" />
            <Text style={styles.completedText}>הושלם</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={onStart || onPress}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.startButtonGradient}>
              <Icon name="play-arrow" size={20} color="#fff" />
              <Text style={styles.startButtonText}>
                {lesson.progress > 0 ? 'המשך' : 'התחל'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 32,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  actions: {
    alignItems: 'center',
  },
  completedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    fontSize: 14,
    color: '#4ade80',
    marginLeft: 4,
    fontWeight: '600',
  },
  startButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default LessonCard;
