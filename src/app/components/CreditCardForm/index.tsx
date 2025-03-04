import { useState } from "react";
import CreditCardUI from "@/app/components/CreditCardUI";
import { publicApi } from "@/services/api";
import { Card } from "@/types/creditCard";
import { AxiosError } from "axios";

interface CreditCardFormProps {
  onSave: (card: Card) => void;
  initialData?: Card;
}

export default function CreditCardForm({
  onSave,
  initialData,
}: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState(initialData?.cardNumber || "");
  const [cardHolder, setCardHolder] = useState(initialData?.cardHolder || "");
  const [expiryDate, setExpiryDate] = useState(initialData?.expiryDate || "");
  const [cvv, setCvv] = useState(initialData?.cvv || "");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d{0,2})/, "$1/$2")
      .slice(0, 5);
  };

  const validateCard = async () => {
    try {
      const response = await publicApi.post("/credit-card/validate-card", {
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardHolder,
        expiryDate,
        cvv,
      });
  
      const { valid } = response.data;
  
      if (valid) {
        setIsValid(true);
        setError(null);
        onSave({
          id: initialData?.id || Date.now(),
          cardNumber,
          cardHolder,
          expiryDate,
          cvv,
        });
      } else {
        setIsValid(false);
        setError("Invalid credit card details.");
      }
    } catch (err: unknown) {
      setIsValid(false);
  
      // Verifica se o erro é uma instância de AxiosError
      if (err instanceof AxiosError) {
        const errorMessage =
          err.response?.data?.error ||
          "An error occurred while validating the card. Please try again.";
        setError(errorMessage);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <CreditCardUI
        cardNumber={cardNumber}
        cardHolder={cardHolder}
        expiryDate={expiryDate}
        cvv={cvv}
        isFlipped={isFlipped}
      />
      <div className="w-96 space-y-4">
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full p-2 border rounded-lg"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 border rounded-lg"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 p-2 border rounded-lg"
            value={expiryDate}
            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-1/2 p-2 border rounded-lg"
            value={cvv}
            onChange={(e) => {
              setCvv(e.target.value.replace(/\D/g, "").slice(0, 4));
              setIsFlipped(true);
            }}
            onBlur={() => setIsFlipped(false)}
          />
        </div>
        <button
          onClick={validateCard}
          className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Update Card" : "Validate Card"}
        </button>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
        {isValid !== null && !error && (
          <p
            className={`mt-2 text-center ${
              isValid ? "text-green-500" : "text-red-500"
            }`}
          >
            {isValid ? "Valid Credit Card" : "Invalid Credit Card"}
          </p>
        )}
      </div>
    </div>
  );
}
