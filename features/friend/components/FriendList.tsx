import { Friend } from "../types";

type FriendListProps = {
  friends: Friend[];
};

export function FriendList({ friends }: FriendListProps) {
  if (friends.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        まだフレンドがいません
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
        >
          <div>
            <p className="font-medium text-gray-800">{friend.name}</p>
            <p className="text-sm text-gray-500">{friend.email}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{friend.dayCount}</p>
            <p className="text-sm text-gray-500">日継続中</p>
          </div>
        </div>
      ))}
    </div>
  );
}
