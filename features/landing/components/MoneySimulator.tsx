"use client";

import { useState } from "react";

interface MoneyOption {
  amount: number;
  label: string;
  items: {
    emoji: string;
    title: string;
    description: string;
  }[];
}

const moneyOptions: MoneyOption[] = [
  {
    amount: 5,
    label: "5万円",
    items: [
      { emoji: "🍣", title: "高級寿司ディナー", description: "大切な人と最高の寿司を堪能" },
      { emoji: "👟", title: "ブランドスニーカー", description: "NIKEやadidasの限定モデル" },
      { emoji: "🎮", title: "Nintendo Switch", description: "ゲーム機本体+ソフト数本" },
      { emoji: "💆", title: "エステ・マッサージ", description: "全身リラクゼーション5回分" },
    ],
  },
  {
    amount: 10,
    label: "10万円",
    items: [
      { emoji: "✈️", title: "国内旅行", description: "沖縄や北海道で2泊3日の贅沢旅" },
      { emoji: "📱", title: "最新iPhone", description: "最新モデルに機種変更" },
      { emoji: "🎸", title: "趣味の道具", description: "ギター、カメラ、ゴルフクラブなど" },
      { emoji: "👔", title: "スーツ一式", description: "オーダーメイドのスーツ" },
    ],
  },
  {
    amount: 30,
    label: "30万円",
    items: [
      { emoji: "🌴", title: "海外旅行", description: "ハワイやグアムで1週間バカンス" },
      { emoji: "💻", title: "MacBook Pro", description: "最新スペックのノートPC" },
      { emoji: "🚗", title: "運転免許", description: "合宿免許で免許取得" },
      { emoji: "💎", title: "ブランド品", description: "憧れの時計やバッグ" },
    ],
  },
  {
    amount: 50,
    label: "50万円",
    items: [
      { emoji: "🏠", title: "引っ越し費用", description: "新生活のスタート資金" },
      { emoji: "🌍", title: "ヨーロッパ旅行", description: "イタリア・フランス周遊2週間" },
      { emoji: "📚", title: "資格・スクール", description: "プログラミングスクールや MBA" },
      { emoji: "🦷", title: "歯列矯正", description: "インビザラインで歯並び改善" },
    ],
  },
  {
    amount: 100,
    label: "100万円",
    items: [
      { emoji: "🚙", title: "中古車購入", description: "状態の良い中古車が手に入る" },
      { emoji: "💒", title: "結婚式の頭金", description: "人生最高の日への第一歩" },
      { emoji: "📈", title: "投資の元手", description: "年利5%で5万円の不労所得" },
      { emoji: "🏝️", title: "世界一周", description: "1ヶ月かけて世界を巡る旅" },
    ],
  },
];

export function MoneySimulator() {
  const [selectedIndex, setSelectedIndex] = useState(2); // デフォルト30万円

  const selected = moneyOptions[selectedIndex];

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        その{selected.label}があったら...
      </h3>
      <p className="text-gray-500 text-center mb-6">
        パチンコに使ったお金で、こんなことができました
      </p>

      {/* 金額セレクター */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {moneyOptions.map((option, index) => (
          <button
            key={option.amount}
            onClick={() => setSelectedIndex(index)}
            className={`px-4 py-2 rounded-full font-bold transition-all ${
              index === selectedIndex
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-emerald-100"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* アイテムグリッド */}
      <div className="grid md:grid-cols-2 gap-4">
        {selected.items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-4xl">{item.emoji}</div>
              <div>
                <h4 className="font-bold text-gray-800">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 追加のメッセージ */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 text-sm mb-2">
          パチンコの平均負け額は<span className="font-bold text-red-500">月5〜10万円</span>と言われています
        </p>
        <p className="text-emerald-700 font-medium">
          1年続ければ、<span className="text-2xl font-bold">{selected.amount * 12}万円</span>の節約に！
        </p>
      </div>
    </section>
  );
}
