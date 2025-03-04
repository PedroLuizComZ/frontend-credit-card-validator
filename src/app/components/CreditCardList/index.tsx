import React from "react";
import CreditCardUI from "@/app/components/CreditCardUI";
import { Card } from "@/types/creditCard";

interface CreditCardListProps {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
}

export default function CreditCardList({ cards, onEdit, onDelete }: CreditCardListProps) {
  return (
    <div className="mt-6 w-full max-w-4xl px-4">
      <h2 className="text-lg font-semibold mb-4">Saved Cards</h2>
      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="transform transition-transform duration-200 hover:scale-105"
            >
              <div className="bg-white rounded-lg shadow-md p-4">
                <CreditCardUI
                  cardNumber={card.cardNumber}
                  cardHolder={card.cardHolder}
                  expiryDate={card.expiryDate}
                />
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(card)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(card.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No saved cards.</p>
      )}
    </div>
  );
}