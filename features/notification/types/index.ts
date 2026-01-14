export type NotificationType = "FRIEND_RESET" | "FRIEND_REQUEST" | "FRIEND_ACCEPTED";

export type Notification = {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  relatedUserId: string | null;
  createdAt: Date;
};
