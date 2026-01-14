"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Request = {
  id: string;
  sender: {
    id: string;
    name: string;
    email: string;
  };
};

type PendingRequestsProps = {
  requests: Request[];
};

export function PendingRequests({ requests }: PendingRequestsProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAccept = async (id: string) => {
    setLoadingId(id);
    try {
      await fetch(`/api/friends/${id}/accept`, { method: "POST" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    setLoadingId(id);
    try {
      await fetch(`/api/friends/${id}/reject`, { method: "POST" });
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  if (requests.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-gray-800 mb-3">
        フレンド申請 ({requests.length}件)
      </h3>
      <div className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-medium text-gray-800">{request.sender.name}</p>
              <p className="text-sm text-gray-500">{request.sender.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(request.id)}
                disabled={loadingId === request.id}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                承認
              </button>
              <button
                onClick={() => handleReject(request.id)}
                disabled={loadingId === request.id}
                className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400 disabled:opacity-50"
              >
                拒否
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
