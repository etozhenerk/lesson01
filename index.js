const books = document.querySelectorAll('.book'),
      body = document.querySelector('body'),
      adv = document.querySelector('.adv'),
      elementsBook2 = books[0].querySelectorAll('ul li'),
      elementsBook5 = books[5].querySelectorAll('ul li'),
      elementsBook6 = books[2].querySelectorAll('ul li'),
      newElement = document.createElement('li');
books[0].before(books[1]);
books[3].before(books[4]);
books[5].after(books[2]);
body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
books[4].children[0].children[0].textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();
elementsBook2[9].after(elementsBook2[2]);
elementsBook2[3].after(elementsBook2[6]);
elementsBook2[6].after(elementsBook2[8]);
elementsBook5[1].after(elementsBook5[9]);
elementsBook5[9].after(elementsBook5[3]);
elementsBook5[3].after(elementsBook5[4]);
elementsBook5[7].after(elementsBook5[5]);
elementsBook6[8].after(newElement);
newElement.textContent = 'Глава 8: За пределами ES6';
