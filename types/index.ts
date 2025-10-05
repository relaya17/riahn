// Export all global types
export * from './global';
export * from './web';
export * from './mobile';

// Export specific types from model files to avoid conflicts
export type { GroupMember, IGroup, IGroupDocument, IGroupModel } from './group.types';
export type { Achievement, IUserProgress, IUserProgressDocument, IUserProgressModel } from './userProgress.types';
export type { NotificationType, INotification, INotificationDocument, INotificationModel } from './notification.types';
export type { MessageAttachment, IMessage, IMessageDocument, IMessageModel } from './message.types';
export type { IForumPost, IForumReply } from '../models/ForumPost';
export type { ILesson, ILessonDocument, ILessonModel } from '../models/Lesson';

// Export additional types for components
export type { Language, LanguageLevel } from './global';