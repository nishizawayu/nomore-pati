type DayCounterProps = {
  dayCount: number;
  startDate: Date;
};

export function DayCounter({ dayCount, startDate }: DayCounterProps) {
  const formattedDate = new Date(startDate).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <p className="text-gray-600 mb-2">パチ禁継続中</p>
      <p className="text-7xl font-bold text-blue-600 mb-2">{dayCount}</p>
      <p className="text-2xl text-gray-700 mb-4">日</p>
      <p className="text-sm text-gray-500">開始日: {formattedDate}</p>
    </div>
  );
}
