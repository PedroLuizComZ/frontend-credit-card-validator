import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { addCard, editCard } from "@/store/features/cardsSlice";
import CreditCardForm from "@/app/components/CreditCardForm";
import { Card } from "@/types/creditCard";

export default function AddEditCreditCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const cards = useSelector((state: RootState) => state.cards.cards);

  const cardToEdit = cards.find((card) => card.id === Number(id));

  const handleSave = (card: Card) => {
    if (cardToEdit) {
      dispatch(editCard(card)); 
    } else {
      dispatch(addCard(card)); 
    }
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">
        {cardToEdit ? "Edit Credit Card" : "Add Credit Card"}
      </h1>
      <CreditCardForm onSave={handleSave} initialData={cardToEdit} />
    </div>
  );
}