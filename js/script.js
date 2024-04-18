'use strict';

const title = document.getElementById('title');
const artist = document.getElementById('artist');
const year = document.getElementById('year');
const template = document.querySelector('#new-cd');
const tBody = document.querySelector('tbody');

if (!localStorage.getItem('cds')) {
  console.log('No cds');
  localStorage.setItem('cds', JSON.stringify([]));
}

renderCDs();

document.querySelector('#new-music-frm').addEventListener('submit', e => {
  e.preventDefault();
  console.log(title.value, artist.value, year.value);

  const idMaker = Math.floor(10000 + Math.random() * 9000);

  const newCD = {
    id: idMaker,
    artist: artist.value,
    title: title.value,
    year: year.value,
  };

  const cds = JSON.parse(localStorage.getItem('cds'));
  cds.push(newCD);
  localStorage.setItem('cds', JSON.stringify(cds));

  title.value = '';
  artist.value = '';
  year.value = '';
  renderCDs([newCD]);
});

function renderCDs(newCD) {
  const cds = newCD ? newCD : JSON.parse(localStorage.getItem('cds'));

  console.log(localStorage.getItem('cds'));

  cds.forEach(cd => {
    console.log(cd);

    const clone = template.content.cloneNode(true);
    clone.querySelector('#new-author').textContent = cd.artist;
    clone.querySelector('#new-title').textContent = cd.title;
    clone.querySelector('#new-year').textContent = cd.year;
    clone.querySelector('#new-delete').addEventListener('click', function () {
      this.parentElement.remove();
      const cds = JSON.parse(localStorage.getItem('cds'));
      console.log(cds.findIndex(c => c.title == cd.title && c.artist == cd.artist));
      const newCDS = cds.filter(c => c.id !== cd.id);
      console.log('index', newCDS);
      localStorage.setItem('cds', JSON.stringify(newCDS));
    });

    tBody.appendChild(clone);
  });
}
