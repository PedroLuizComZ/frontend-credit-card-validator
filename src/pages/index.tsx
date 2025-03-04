import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { deleteCard } from "@/store/features/cardsSlice";
import CreditCardList from "@/app/components/CreditCardList";
import { Card } from "@/types/creditCard";

export default function CreditCardManager() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cards = useSelector((state: RootState) => state.cards.cards); 

  const handleEditCard = (card: Card) => {
    router.push(`/add-edit?id=${card.id}`);
  };

  const handleDeleteCard = (cardId: number) => {
    dispatch(deleteCard(cardId)); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Credit Card Manager</h1>
      <button
        onClick={() => router.push("/add-edit")}
        className="mb-6 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add New Card
      </button>
      <CreditCardList
        cards={cards}
        onEdit={handleEditCard}
        onDelete={handleDeleteCard}
      />
    </div>
  );
}