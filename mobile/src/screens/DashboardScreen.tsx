import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../providers/AuthProvider';
import {useLanguage} from '../providers/LanguageProvider';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const DashboardHome: React.FC = () => {
  const {user} = useAuth();
  const {t} = useLanguage();
  const navigation = useNavigation();

  const quickActions = [
    {
      title: t('dashboard.lessons'),
      icon: 'school',
      color: '#4facfe',
      onPress: () => navigation.navigate('Lessons'),
    },
    {
      title: t('dashboard.chat'),
      icon: 'chat',
      color: '#667eea',
      onPress: () => navigation.navigate('Chat'),
    },
    {
      title: t('dashboard.profile'),
      icon: 'person',
      color: '#f093fb',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      title: t('dashboard.settings'),
      icon: 'settings',
      color: '#764ba2',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            {t('dashboard.welcome')}, {user?.name}
          </Text>
          <Text style={styles.subtitle}>
            המשך את מסע הלמידה שלך
          </Text>
        </View>

        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.actionCard, {backgroundColor: action.color}]}
              onPress={action.onPress}>
              <Icon name={action.icon} size={30} color="#fff" />
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>התקדמות השבוע</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>שיעורים הושלמו</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>דקות למידה</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>שפות נלמדות</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const DashboardScreen: React.FC = () => {
  const {t} = useLanguage();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Lessons':
              iconName = 'school';
              break;
            case 'Chat':
              iconName = 'chat';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={DashboardHome}
        options={{tabBarLabel: t('dashboard.welcome')}}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{tabBarLabel: t('dashboard.lessons')}}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{tabBarLabel: t('dashboard.chat')}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: t('dashboard.profile')}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  actionCard: {
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 20,
    borderRadius: 15,
    padding: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

// Placeholder components for other tabs
const LessonsScreen: React.FC = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Lessons Screen</Text>
  </View>
);

const ChatScreen: React.FC = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Chat Screen</Text>
  </View>
);

const ProfileScreen: React.FC = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>Profile Screen</Text>
  </View>
);

export default DashboardScreen;
