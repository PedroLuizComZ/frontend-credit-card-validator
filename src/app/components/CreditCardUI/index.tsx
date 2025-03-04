import React from "react";

interface CreditCardUIProps {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv?: string;
  isFlipped?: boolean;
}

export default function CreditCardUI({
  cardNumber,
  cardHolder,
  expiryDate,
  cvv,
  isFlipped = false,
}: CreditCardUIProps) {
  return (
    <div className="relative w-full h-56 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105">
      <div
        className={`absolute w-full h-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-6 text-white transition-opacity duration-500 ${
          isFlipped ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-start">
          <span className="text-xl font-semibold text-purple-400">Credit Card</span>
        </div>

        <div className="mt-6">
          <span className="text-2xl tracking-widest text-purple-200">
            {cardNumber || "XXXX XXXX XXXX XXXX"}
          </span>
        </div>

        <div className="mt-4 flex justify-between">
          <span className="text-sm uppercase text-purple-300">
            {cardHolder || "CARDHOLDER NAME"}
          </span>
          <span className="text-sm text-purple-300">VALID THRU: {expiryDate || "MM/YY"}</span>
        </div>

        <div className="absolute bottom-4 right-4 w-12 h-12 bg-purple-500 rounded-full blur-sm opacity-50"></div>
      </div>

      <div
        className={`absolute w-full h-full bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 text-white transition-opacity duration-500 ${
          isFlipped ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="h-8 bg-black mt-4 rounded-lg"></div>

        <div className="mt-4 flex justify-end">
          <span className="text-sm text-purple-300">CVV: {cvv || "XXX"}</span>
        </div>

        <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500 rounded-full blur-sm opacity-50"></div>
      </div>
    </div>
  );
}