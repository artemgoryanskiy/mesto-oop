import {ICard, ICardsData} from '../types';
import { IEvents } from './base/events';

export class CardsData implements ICardsData {
	protected _cards: ICard[];
	protected _preview: string | null = null;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICard[]) {
		this._cards = cards;
		this.events.emit('cards:changed');
	}

	get cards() {
		return this._cards;
	}

	addCard(card: ICard) {
		this._cards = [card, ...this._cards];
		this.events.emit('cards:changed');
	}

	deleteCard(cardId: string, payload: Function | null = null) {
		this._cards = this.cards.filter((card) => cardId !== cardId);

		if (payload) {
			payload();
		} else {
			this.events.emit('cards:changed');
		}
	}

	updateCard(card: ICard, payload: Function | null = null) {
		const findedCard = this._cards.find((item) => item._id === card._id);
		if (!findedCard) this.addCard(card);

		Object.assign(findedCard, card);

		if (payload) {
			payload();
		} else {
			this.events.emit('cards:changed');
		}
	}

	getCard(cardId: string): ICard {
		return this._cards.find((item) => item._id === cardId);
	}

	set preview(cardId: string | null) {
		if(!cardId) {
			this._preview = null
			return
		}
		const selectedCard = this.getCard(cardId);
		if (selectedCard) {
			this.preview = cardId;
			this.events.emit('cards:selected');
		}
	}

	get preview() {
		return this._preview;
	}
}