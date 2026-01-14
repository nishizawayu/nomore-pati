export type FriendshipStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  status: FriendshipStatus;
  createdAt: Date;
  sender: {
    id: string;
    name: string;
    email: string;
  };
  receiver: {
    id: string;
    name: string;
    email: string;
  };
};

export type Friend = {
  id: string;
  name: string;
  email: string;
  startDate: Date;
  dayCount: number;
};
