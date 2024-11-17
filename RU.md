# Sticky Observer

_[🇬🇧 In English](./README.md)_

JavaScript-обертка для наблюдения за состоянием sticky-элементов. Использует [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Утилита принимает отступы через параметр `offsets` и уменьшает каждый переданный отступ на 1px, а затем измененные значения передает как [rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
Когда Observer отдает событие, мы вычисляем разницу в координатах между наблюдаемым элементом и root-элементом.
Если эта разница равна примерно 1px, элемент считается закрепленным.


## Демо

HTML-страничка: https://kokoccc.github.io/sticky-observer

CodePen: https://codepen.io/kokoc/pen/MWNxzdr


## ⚠️ Важно

Единого решения по отслеживанию закрепления sticky-элементов нет. Кроме того, Observer делает вычисления с разной точностью, этот момент не контролируется. Скрипт допускает небольшую погрешность чуть менее чем в 1px, и по результатам проверок это значительно повышает точность срабатываний.

Впрочем, все равно нельзя дать гарантию, что отслеживание будет работать правильно во всех браузерах на всех устройствах.
Проверьте работу скрипта перед тем, как использовать его в своем проекте.


## Установка (NPM-пакет)

Для установки `StickyObserver` в качестве NPM-пакета добавляем его как зависимость:

```shell
# NPM
npm install @kokoccc/sticky-observer

# Yarn
yarn add @kokoccc/sticky-observer
```

Затем импортируем:

```js
// Node.js
const StickyObserver = require('@kokoccc/sticky-observer')

// ES6 Module
import StickyObserver from '@kokoccc/sticky-observer'
```


## Установка (браузер)

Загрузка осуществляется через тег `<script>`:

```html
<!-- Удалите '.min' перед расширением, чтобы загрузить версию без минификации -->
<script src="https://unpkg.com/@kokoccc/sticky-observer/dist/sticky-observer.umd.min.js"></script>
```


## Использование

Создаем инстанс `StickyObserver` и вызываем метод `observe`, чтобы начать наблюдение:

```js
const observer = new StickyObserver(callback, offsets, root)
observer.observe(element) // Здесь передаем HTML-элемент
```

### Parameters:

`callback` (обязательный) — функция обратного вызова, которая вызывается каждый раз, когда элемент становится закрепленным или незакрепленным. Принимает 3 аргумента:

- `states` — объект с булевыми флагами: `isTop`, `isRight`, `isBottom`, `isLeft` и `isStuck` (`true`, если хотя бы один из флагов направления равен `true`)
- `entries` — см. [описание на MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#entries)
- `observer` — см. [описание на MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#observer)

`offsets` (необязательный) — объект с необязательными свойствами: `top`, `right`, `bottom`, `left`. Их значения должны соответствовать CSS-отступам целевого элемента с теми же названиями (в пикселях). Например, если в CSS у нас есть `top: 20px`, здесь мы должны указать `{ top: 20 }`

`root` (необязательный) — см. [описание на MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#root)


## Пример

```js
const element = document.querySelector('.header')
const offsets = { top: 0 } // Мы хотим, чтобы шапка закреплялась наверху

const onIntersect = ({ isStuck }, [entry], observer) => {
  const { target } = entry // `target` здесь равен `element`
  target.classList.toggle('stuck', isStuck) // переключаем класс для изменения стилей
}

// Третий параметр здесь опущен, поэтому будет использоваться область просмотра страницы
const observer = new StickyObserver(onIntersect, offsets)

// Запускаем наблюдатель, передав целевой элемент
observer.observe(element)

// ...если нужно, останавливаем наблюдение через некоторое время
observer.disconnect()
```

Более полные примеры с исходным кодом можно посмотреть на [демо-страницах](#demo).


## Лицензия

[MIT](./LICENSE)


