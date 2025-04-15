import './blocks/index.css';
import { EventEmitter } from './components/base/events';
import { CardsData } from './components/CardsData';
import { UserData } from './components/UserData';
import { IApi, ICard, IUser } from './types';
import { API_URL, settings } from './utils/constants';
import { Api } from './components/base/api';
import { AppApi } from './components/AppApi';

const events = new EventEmitter()
const cardsData = new CardsData(events)
const userData = new UserData(events)

const baseApi: IApi = new Api(API_URL, settings)
const api = new AppApi(baseApi)

// Загрузка данных пользователя и карточек при инициализации
Promise.all([api.getUser(), api.getCards()])
	.then(([userInfo, initialCards]) => {
		try {
			// Устанавливаем данные пользователя
			userData.setUserInfo(userInfo);
			console.log(userData.getUserInfo())

			// Устанавливаем данные карточек
			cardsData.cards = initialCards;
			console.log(cardsData.cards)
			// Можно добавить логирование успешной загрузки
			console.log('Данные пользователя и карточки успешно загружены');
		} catch (error) {
			// Обработка ошибок при установке данных
			console.error('Ошибка при обработке полученных данных:', error);
		}
	})
	.catch((err) => {
		// Обработка ошибок при запросе к API
		console.error('Ошибка при загрузке данных:', err);

		// Здесь можно добавить код для отображения ошибки пользователю
		// Например, показать сообщение об ошибке
	})
	.finally(() => {
		// Действия, которые нужно выполнить независимо от результата загрузки
		// Например, скрыть индикатор загрузки
		console.log('Попытка загрузки данных завершена');
	});
