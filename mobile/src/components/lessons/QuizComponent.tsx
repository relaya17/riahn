import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../ui/Card';
import Button from '../ui/Button';

const {width} = Dimensions.get('window');

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  type: 'multiple-choice' | 'true-false' | 'fill-blank';
}

interface QuizComponentProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  onNext?: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  questions,
  onComplete,
  onNext,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score, questions.length);
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return [
        styles.option,
        selectedAnswer === index && styles.selectedOption,
      ];
    }

    if (index === currentQuestion.correctAnswer) {
      return [styles.option, styles.correctOption];
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return [styles.option, styles.incorrectOption];
    }

    return styles.option;
  };

  const getOptionIcon = (index: number) => {
    if (!showResult) return null;

    if (index === currentQuestion.correctAnswer) {
      return <Icon name="check-circle" size={20} color="#4ade80" />;
    }

    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return <Icon name="cancel" size={20} color="#ef4444" />;
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {width: `${progress}%`}]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
      </View>

      {/* Question Card */}
      <Card style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.type === 'fill-blank' && (
          <View style={styles.fillBlankContainer}>
            <Text style={styles.fillBlankText}>
              השלם את החסר: _____
            </Text>
          </View>
        )}
      </Card>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => handleAnswerSelect(index)}
            disabled={showResult}>
            <View style={styles.optionContent}>
              <Text style={styles.optionText}>{option}</Text>
              {getOptionIcon(index)}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Explanation */}
      {showResult && currentQuestion.explanation && (
        <Card style={styles.explanationCard}>
          <Text style={styles.explanationTitle}>הסבר:</Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
        </Card>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        {!showResult ? (
          <Button
            title="בדוק תשובה"
            onPress={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            style={styles.submitButton}
          />
        ) : (
          <Button
            title={currentQuestionIndex < questions.length - 1 ? 'הבא' : 'סיום'}
            onPress={handleNext}
            style={styles.nextButton}
            gradient={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  questionCard: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 26,
    textAlign: 'center',
  },
  fillBlankContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  fillBlankText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  selectedOption: {
    borderColor: '#667eea',
    backgroundColor: '#f0f4ff',
  },
  correctOption: {
    borderColor: '#4ade80',
    backgroundColor: '#f0fdf4',
  },
  incorrectOption: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  explanationCard: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    marginTop: 'auto',
  },
  submitButton: {
    marginBottom: 16,
  },
  nextButton: {
    marginBottom: 16,
  },
});

export default QuizComponent;
