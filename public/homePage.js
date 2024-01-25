// Создаем объект класса LogoutButton

const logoutButton = new LogoutButton();

// Определяем функцию, которая будет вызываться по клику на кнопке выхода

logoutAction = () => {
    // Выполняем запрос на деавторизацию
    ApiConnector.logout((response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем страницу
            location.reload();
        } else {
            // Если не успешно, выводим сообщение об ошибке (можно также обработать по-другому)
            console.error('Ошибка при деавторизации:', response.error);
        }
    });
}

// Присваиваем созданную функцию свойству action объекта LogoutButton
logoutButton.action = logoutAction;

// Выполняем запрос на получение текущего пользователя
ApiConnector.current((response) => {
    // Проверяем, выполнен ли запрос успешно
    if (response.success) {
        // Если успешно, вызываем метод отображения данных профиля
        ProfileWidget.showProfile(response);
    }
});


// Создаем объект класса RatesBoard
const ratesBoard = new RatesBoard();

// Функция для выполнения запроса получения курсов валют
currencyRates = () => {
    // Выполняем запрос на получение курсов валют
    ApiConnector.getStocks((response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, очищаем таблицу и заполняем её полученными данными
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

// Вызываем функцию для получения текущих валют
currencyRates();

// Устанавливаем интервал выполнения функции каждую минуту
setInterval(currencyRates, 60000);


// Создаем объект класса MoneyManager
const moneyManager = new MoneyManager();

// Определяем функцию для пополнения баланса
moneyManager.addMoneyCallback = (data) => {
    // Выполняем запрос на пополнение баланса
    ApiConnector.addMoney(data, (response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем данные профиля и выводим сообщение об успехе
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            // Если не успешно, выводим сообщение об ошибке
            moneyManager.setMessage(false, response.error);
        }
    });
}

// Определяем функцию для конвертации валюты
moneyManager.conversionMoneyCallback = (data) => {
    // Выполняем запрос на конвертацию валюты
    ApiConnector.convertMoney(data, (response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем данные профиля и выводим сообщение об успехе
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация валюты успешно выполнена");
        } else {
            // Если не успешно, выводим сообщение об ошибке
            moneyManager.setMessage(false, response.error);
        }
    });
}

// Определяем функцию для перевода валюты
moneyManager.sendMoneyCallback = (data) => {
    // Выполняем запрос на перевод валюты
    ApiConnector.transferMoney(data, (response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем данные профиля и выводим сообщение об успехе
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод валюты успешно выполнен");
        } else {
            // Если не успешно, выводим сообщение об ошибке
            moneyManager.setMessage(false, response.error);
        }
    });
}


// Создаем объект класса FavoritesWidget
const favoritesWidget = new FavoritesWidget();

// Запрос начального списка избранного
ApiConnector.getFavorites((response) => {
    // Проверяем, выполнен ли запрос успешно
    if (response.success) {
        // Если успешно, очищаем текущий список избранного и заполняем новыми данными
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        // Заполняем выпадающий список для перевода денег
        favoritesWidget.updateUsersList(response.data);
    } else {
        // Если не успешно, выводим сообщение об ошибке
        favoritesWidget.setMessage(false, response.error);
    }
});

// Реализация добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    // Выполняем запрос на добавление пользователя в избранное
    ApiConnector.addUserToFavorites(data, (response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем данные избранного и выводим сообщение об успехе
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в избранное");
        } else {
            // Если не успешно, выводим сообщение об ошибке
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

// Реализация удаления пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    // Выполняем запрос на удаление пользователя из избранного
    ApiConnector.removeUserFromFavorites(data.id, (response) => {
        // Проверяем, выполнен ли запрос успешно
        if (response.success) {
            // Если успешно, обновляем данные избранного и выводим сообщение об успехе
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно удален из избранного");
        } else {
            // Если не успешно, выводим сообщение об ошибке
            favoritesWidget.setMessage(false, response.error);
        }
    });
};
