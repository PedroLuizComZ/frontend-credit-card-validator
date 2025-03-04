import { Card, CardsState } from "@/types/creditCard";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CardsState = {
  cards: [],
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Card>) => {
      state.cards.push(action.payload); 
    },
    editCard: (state, action: PayloadAction<Card>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload; 
      }
    },
    deleteCard: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload); 
    },
  },
});

export const { addCard, editCard, deleteCard } = cardsSlice.actions;

export default cardsSlice.reducer;