import {ICard, IUser, TCardInfo, TUserAvatar, TUserBaseInfo} from '../types';
import {IApi} from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi.get<ICard[]>('/cards').then((cards: ICard[]) => cards);
	}

	getUser(): Promise<IUser> {
		return this._baseApi.get<IUser>('/users/me').then((user: IUser) => user);
	}

	addCard(data: TCardInfo): Promise<ICard> {
		return this._baseApi.post<ICard>('/cards', data).then((card: ICard) => card);
	}

	removeCard(cardId: string): Promise<{message: string}> {
		return this._baseApi.post<{message: string}>(`/cards/${cardId}`, {}, 'DELETE').then((res: {message: string}) => res);
	}

	setUserInfo(data: TUserBaseInfo): Promise<IUser> {
		return this._baseApi.post<IUser>('/users/me', data, "PATCH").then((res: IUser) => res);
	}

	setUserAvatar(data: TUserAvatar): Promise<IUser> {
		return this._baseApi.post<IUser>('/users/me/avatar', data, "PATCH").then((res: IUser) => res);
	}

	changeLikeCardStatus(cardId: string, like: boolean): Promise<ICard> {
		const method = like ? 'DELETE' : 'POST';
		return this._baseApi.post<ICard>(`/cards/like/${cardId}`, {}, method).then((res: ICard) => res);
	}
}