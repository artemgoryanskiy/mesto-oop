import {IUser, IUserData, TUserPublicInfo} from '../types';
import {IEvents} from './base/events';

export class UserData implements IUserData {
	protected name: string;
	protected about: string;
	protected avatar: string;
	protected _id: string;
	protected cohort: string;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getUserInfo(): TUserPublicInfo {
		return { name: this.name, about: this.about, avatar: this.avatar };
	}

	setUserInfo(userData: IUser) {
		this.about = userData.about;
		this.avatar = userData.avatar;
		this.cohort = userData.cohort;
		this._id = userData._id;
		this.name = userData.name;
		this.events.emit('user:changed')
	}
}