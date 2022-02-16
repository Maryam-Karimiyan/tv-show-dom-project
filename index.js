const rowdiv = document.querySelector(".row");
const seasonsearch = document.querySelector(".seasonsearch");
let seasonsearchvalue;
const searchtextBox = document.querySelector(".searchtextbox");

//====Function===//
function AddEpisodes(shows) {
  for (let result of shows) {
    const optionEl = document.createElement("option");
    if (result.number > 9) {
      optionEl.textContent = `Season0${result.season}Episode${result.number}`;
    } else {
      optionEl.textContent = `Season0${result.season}Episode0${result.number}`;
    }

    seasonsearch.appendChild(optionEl);
  }
}

const makeCards = (result) => {
  const section = document.createElement("section");
  section.classList.add("card");

  const cardtop = document.createElement("div");
  const cardtopi = document.createElement("span");
  cardtopi.innerHTML = '<i class="far fa-play-circle"></i>';
  cardtop.classList.add("card-top");
  cardtop.textContent = result.name;

  const figure = document.createElement("figure");
  figure.classList.add("img-container");

  const img = document.createElement("IMG");
  img.classList.add("cards-img");
  img.src = result.image.medium;

  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("cards-img-caption");
  figcaption.innerHTML = result.summary;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  cardtop.appendChild(cardtopi);

  section.appendChild(cardtop);
  section.appendChild(figure);
  rowdiv.appendChild(section);
};
const makeCardsBySearch = (shows) => {
  rowdiv.innerHTML = "";
  const showresult = shows.filter(
    (file) =>
      file.name.toLowerCase().includes(searchtextBox.value.toLowerCase()) ||
      file.summary.toLowerCase().includes(searchtextBox.value.toLowerCase())
  );
  showresult.forEach((element) => {
    makeCards(element);
  });
};

const makeImages = (shows) => {
  rowdiv.innerHTML = "";
  for (let result of shows) {
    if (seasonsearch.selectedIndex === 0 && result.image) {
      makeCards(result);
    } else if (
      result.number >= 10 &&
      result.season == seasonsearchvalue.slice(7, 8) &&
      result.number == seasonsearchvalue.slice(-2)
    ) {
      makeCards(result);
    } else if (
      result.number < 10 &&
      result.season == seasonsearchvalue.slice(7, 8) &&
      result.number == seasonsearchvalue.slice(-2)
    ) {
      makeCards(result);
    }
  }
};

//====Events====//

seasonsearch.addEventListener("change", async () => {
  seasonsearchvalue = seasonsearch.options[seasonsearch.selectedIndex].text;
  const res = await axios.get(
    `https://api.tvmaze.com/shows/179/episodes?q=${seasonsearchvalue}`
  );
  makeImages(res.data);
});

window.addEventListener("load", async () => {
  const res = await axios.get(
    `https://api.tvmaze.com/shows/179/episodes?q=${seasonsearchvalue}`
  );
  AddEpisodes(res.data);
  makeImages(res.data);
});

searchtextBox.addEventListener("input", async () => {
  const res = await axios.get(
    `https://api.tvmaze.com/shows/179/episodes?q=${seasonsearchvalue}`
  );
  makeCardsBySearch(res.data);
});
