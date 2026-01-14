export type User = {
  id: string;
  name: string;
  email: string;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UserUpdateParams = {
  name?: string;
  email?: string;
  startDate?: Date;
};
