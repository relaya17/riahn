import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: Date;
  isTranslated?: boolean;
  originalLanguage?: string;
  translatedText?: string;
  type: 'text' | 'image' | 'audio' | 'file';
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
  onTranslate?: () => void;
  onPlayAudio?: () => void;
  onRetry?: () => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isOwn,
  onTranslate,
  onPlayAudio,
  onRetry,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Icon name="schedule" size={12} color="#999" />;
      case 'sent':
        return <Icon name="check" size={12} color="#999" />;
      case 'delivered':
        return <Icon name="done-all" size={12} color="#999" />;
      case 'read':
        return <Icon name="done-all" size={12} color="#667eea" />;
      default:
        return null;
    }
  };

  const getMessageStyle = () => {
    if (isOwn) {
      return [styles.messageContainer, styles.ownMessage];
    }
    return [styles.messageContainer, styles.otherMessage];
  };

  const getBubbleStyle = () => {
    if (isOwn) {
      return [styles.messageBubble, styles.ownBubble];
    }
    return [styles.messageBubble, styles.otherBubble];
  };

  const getTextStyle = () => {
    if (isOwn) {
      return [styles.messageText, styles.ownText];
    }
    return [styles.messageText, styles.otherText];
  };

  return (
    <View style={getMessageStyle()}>
      {!isOwn && (
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{message.senderName}</Text>
        </View>
      )}

      <View style={getBubbleStyle()}>
        {message.type === 'text' && (
          <>
            <Text style={getTextStyle()}>{message.text}</Text>
            
            {message.isTranslated && message.translatedText && (
              <View style={styles.translationContainer}>
                <Text style={styles.translationLabel}>תרגום:</Text>
                <Text style={styles.translatedText}>{message.translatedText}</Text>
              </View>
            )}
          </>
        )}

        {message.type === 'audio' && (
          <View style={styles.audioContainer}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={onPlayAudio}>
              <Icon name="play-arrow" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.audioDuration}>0:15</Text>
          </View>
        )}

        {message.type === 'image' && (
          <View style={styles.imageContainer}>
            <Text style={getTextStyle()}>📷 תמונה</Text>
          </View>
        )}

        <View style={styles.messageFooter}>
          <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
          {isOwn && getStatusIcon()}
        </View>
      </View>

      <View style={styles.messageActions}>
        {message.type === 'text' && !message.isTranslated && onTranslate && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onTranslate}>
            <Icon name="translate" size={16} color="#667eea" />
          </TouchableOpacity>
        )}

        {message.status === 'sending' && onRetry && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onRetry}>
            <Icon name="refresh" size={16} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    maxWidth: width * 0.8,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  senderInfo: {
    marginBottom: 4,
    marginLeft: 12,
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  messageBubble: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ownBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  ownText: {
    color: '#fff',
  },
  otherText: {
    color: '#333',
  },
  translationContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  translationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  translatedText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  audioDuration: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  imageContainer: {
    padding: 8,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
    marginRight: 4,
  },
  messageActions: {
    flexDirection: 'row',
    marginTop: 4,
    marginHorizontal: 8,
  },
  actionButton: {
    padding: 4,
    marginHorizontal: 2,
  },
});

export default ChatMessage;
