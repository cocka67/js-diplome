'use strict';

// Создаем объект класса UserForm
const userForm = new UserForm();

// Устанавливаем свойство loginFormCallback с нужной функциональностью
userForm.loginFormCallback = (data) => {
    // Выполняем запрос на сервер для попытки авторизации пользователя
    ApiConnector.login(data, (response) => {
        console.log(response); // Выводим ответ сервера в консоль для отладки

        if (response.success) {
            // Успешная авторизация
            console.log("Авторизация успешна");
            // Обновляем страницу
            location.reload();
        } else {
            // Ошибка авторизации
            console.error("Ошибка авторизации: " + response.error);
            // Выводим ошибку в окно для ошибок
            userForm.setLoginErrorMessage(response.error);
        }
    });
};

userForm.registerFormCallback = (data) => {
    // Выполняем запрос на сервер для попытки авторизации пользователя
    ApiConnector.register(data, (response) => {
        console.log(response); // Выводим ответ сервера в консоль для отладки

        if (response.success) {
            // Успешная авторизация
            console.log("Вы успешно зарегистрировались");
            // Обновляем страницу
            location.reload();
        } else {
            // Ошибка авторизации
            console.error("Ошибка регистрации: " + response.error);
            // Выводим ошибку в окно для ошибок
            userForm.setRegisterErrorMessage(response.error);
        }
    });
};
