export interface Card {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export interface CardsState {
  cards: Card[];
}
