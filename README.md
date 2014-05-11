Improcjs
--------

### Описание
Система для изменения параметров изображения в браузере. 
Задание отборочного этапа UA Web Challenge VI. 

### Возможности
- Загрузка изображений
- Изменение параметров изображения в отдельном потоке.
- Добавление фильтров

### Поддерживаемые фильтры
- Гауссово размытие
- Медианный фильтр
- Довавление шума

### Добавление фильтров

Для добавление фильтра необходимо воспользоваться ф-цией 

	Processor.addFilter(filterName, scriptPath)

- @param _{ String }_ название фильтра
- @param _{ String }_ путь к скрипту

#### Пример:
	var proc = new Improcjs.Processor(cwd);
	proc.addFilter("blur", "filters/blur.js");

Фильтр должен реализовывать следующий интерфейс:
	
	Filter.processFilter(data, rect, amount)
- @param _{ Uint8ClampedArray }_ изображение
- @param _{ Object }_ ширина и высота
- @param _{ Number }_ интенсивность фильтра

Фильтр должен быть оформлен в отдельный скрипт. 
Объект должен добавляться к пространству имен Improcjs.

	(function(Improcjs) {
		
		Improcjs.{filterName} = {
			processFilter: function(data, rect, amount) {
				...
			}
		};

	})(this.Improcjs || (this.Improcjs = {}));
