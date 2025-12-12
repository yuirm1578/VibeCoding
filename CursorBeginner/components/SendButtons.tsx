'use client';

import { useState } from 'react';

interface SendButtonsProps {
  briefingId: string;
}

export default function SendButtons({ briefingId }: SendButtonsProps) {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isSendingSlack, setIsSendingSlack] = useState(false);

  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    // 실제로는 API 호출
    setTimeout(() => {
      alert('이메일 발송이 예약되었습니다.');
      setIsSendingEmail(false);
    }, 1000);
  };

  const handleSendSlack = async () => {
    setIsSendingSlack(true);
    // 실제로는 API 호출
    setTimeout(() => {
      alert('Slack 발송이 예약되었습니다.');
      setIsSendingSlack(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={handleSendEmail}
        disabled={isSendingEmail}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSendingEmail ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            발송 중...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            이메일 발송
          </>
        )}
      </button>
      <button
        onClick={handleSendSlack}
        disabled={isSendingSlack}
        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSendingSlack ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            발송 중...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165V8.834a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523v6.331zm14.916 0a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.52-2.523V8.834a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523v6.331zm-7.458-9.18a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.52-2.523V2.523A2.528 2.528 0 0 1 9.978 0a2.528 2.528 0 0 1 2.522 2.523v3.462zM5.042 18.477a2.528 2.528 0 0 1 2.52 2.523A2.528 2.528 0 0 1 5.042 23.523v-5.046zm14.916 0v5.046a2.528 2.528 0 0 1-2.522 2.523 2.528 2.528 0 0 1-2.52-2.523v-5.046a2.528 2.528 0 0 1 2.522-2.523 2.528 2.528 0 0 1 2.52 2.523z"/>
            </svg>
            Slack 발송
          </>
        )}
      </button>
    </div>
  );
}

