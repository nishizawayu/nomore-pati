"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  days: number;
  message: string;
  achievement: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "T.Sさん",
    days: 180,
    message:
      "彼女できました。今まで休日に何してたか聞かれて正直に答えられるようになったのがデカい。「趣味は読書です」って言える人生最高。",
    achievement: "彼女できた",
  },
  {
    id: 2,
    name: "K.Mさん",
    days: 365,
    message:
      "1年で貯めた500万円で島を買いました。今は王として君臨しています。国民はヤギ3匹ですが、みんな僕を慕ってくれています。建国おすすめです。",
    achievement: "建国しました",
  },
  {
    id: 3,
    name: "Y.Tさん",
    days: 90,
    message:
      "肌がめちゃくちゃ綺麗になりました。友達に「なんか発光してない？」って言われました。睡眠と野菜、最強の美容液でした。",
    achievement: "肌ツヤ最高",
  },
  {
    id: 4,
    name: "S.Hさん",
    days: 60,
    message:
      "浮いたお金で寿司食べまくってたら、大将に弟子入りを勧められました。来月から寿司職人として修行します。人生何があるかわからん。",
    achievement: "寿司職人へ転身",
  },
  {
    id: 5,
    name: "A.Nさん",
    days: 120,
    message:
      "暇すぎて資格の勉強始めたら受かりまくって、気づいたら年収倍になってました。暇って怖い。",
    achievement: "年収2倍",
  },
  {
    id: 6,
    name: "M.Kさん",
    days: 200,
    message:
      "ジム通い始めたらベンチプレス140kg挙がるようになりました。この前引っ越し業者に「うち来ません？」ってスカウトされました。",
    achievement: "ゴリラ化",
  },
  {
    id: 7,
    name: "R.Oさん",
    days: 30,
    message:
      "たった1ヶ月で睡眠の質が爆上がり。毎朝5時に目覚める健康体に。近所のおばあちゃんにラジオ体操のエースとして期待されています。",
    achievement: "朝5時起き",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // 10秒後に自動再生を再開
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        やめたらこうなりました
      </h3>
      <p className="text-gray-500 text-center mb-8">
        実際にパチ禁を続けている方々の声
      </p>

      <div className="relative">
        {/* カルーセル本体 */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 mx-auto max-w-2xl">
                  {/* 達成バッジ */}
                  <div className="flex justify-center mb-4">
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <span>🏆</span>
                      {testimonial.achievement}
                    </span>
                  </div>

                  {/* 日数 */}
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-blue-600">
                      {testimonial.days}
                    </span>
                    <span className="text-gray-600 ml-1">日継続</span>
                  </div>

                  {/* メッセージ */}
                  <blockquote className="text-gray-700 text-center text-lg leading-relaxed mb-6">
                    「{testimonial.message}」
                  </blockquote>

                  {/* 名前 */}
                  <p className="text-gray-500 text-center font-medium">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 左右の矢印 */}
        <button
          onClick={goToPrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-0 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all"
          aria-label="前へ"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-0 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all"
          aria-label="次へ"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* ドットインジケーター */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentIndex
                ? "bg-blue-600 w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
