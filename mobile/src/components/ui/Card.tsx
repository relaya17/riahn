import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  gradient?: boolean;
  colors?: string[];
  shadow?: boolean;
  borderRadius?: number;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  gradient = false,
  colors = ['#fff', '#f8f9fa'],
  shadow = true,
  borderRadius = 15,
  padding = 16,
}) => {
  const cardStyle = [
    styles.card,
    {
      borderRadius,
      padding,
    },
    shadow && styles.shadow,
    style,
  ];

  const CardComponent = gradient ? LinearGradient : View;
  const cardProps = gradient
    ? {
        colors: colors,
        style: cardStyle,
      }
    : {
        style: cardStyle,
      };

  const content = (
    <>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {subtitle && <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>}
      {children}
    </>
  );

  if (onPress) {
    return (
      <CardComponent {...cardProps}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          {content}
        </TouchableOpacity>
      </CardComponent>
    );
  }

  return <CardComponent {...cardProps}>{content}</CardComponent>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 4,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
});

export default Card;
