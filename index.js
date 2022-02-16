const rowdiv = document.querySelector(".row");
const seasonsearch = document.querySelector(".seasonsearch");
let seasonsearchvalue;
const searchtextBox = document.querySelector(".searchtextbox");

//====Function===//
function AddEpisodes(shows) {
  shows.map((result) => {
    const optionEl = document.createElement("option");
    if (result.number > 9) {
      optionEl.textContent = `Season0${result.season}Episode${result.number}`;
    } else {
      optionEl.textContent = `Season0${result.season}Episode0${result.number}`;
    }

    seasonsearch.appendChild(optionEl);
  });
}

const makeCards = (result) => {
  const section = document.createElement("section");
  section.classList.add("card");

  const cardtop = document.createElement("div");
  const cardtopi = document.createElement("span");
  cardtopi.innerHTML = '<i class="far fa-play-circle"></i>';
  cardtop.classList.add("card-top");
  cardtop.textContent = result.name;
  const seasonEpisode = document.createElement("div");
  if (result.number < 10) {
    seasonEpisode.textContent = `Season0${result.season}Episode0${result.number}`;
  } else {
    seasonEpisode.textContent = `Season0${result.season}Episode${result.number}`;
  }
  const figure = document.createElement("figure");
  figure.classList.add("img-container");

  const aEl=document.createElement('a');
  aEl.setAttribute("href",result.url)
  const img = document.createElement("IMG");
  img.classList.add("cards-img");
  img.src = result.image.medium;

  const figcaption = document.createElement("figcaption");
  figcaption.classList.add("cards-img-caption");
  figcaption.innerHTML = result.summary;

  aEl.appendChild(img);
  figure.appendChild(aEl);
  figure.appendChild(figcaption);

  cardtop.appendChild(cardtopi);
  cardtop.appendChild(seasonEpisode);

  section.appendChild(cardtop);
  section.appendChild(figure);
  rowdiv.appendChild(section);
};
const makeCardsBySearch = (shows) => {
  rowdiv.innerHTML = "";
  const showresult = shows.filter(file =>
    file.name.toLowerCase().includes(searchtextBox.value.toLowerCase()) ||
    file.summary.toLowerCase().includes(searchtextBox.value.toLowerCase())
  );
  showresult.forEach(element => {
    makeCards(element);
  });

  const numberof_found = document.querySelector(".numberof_found");
  if (searchtextBox.value.length !== 0) {
    numberof_found.style.display = "inline-block";
    numberof_found.innerHTML = `Result Number: ${showresult.length}`;
  } else {
    numberof_found.innerHTML = "";
  }
};

const makeImages = (shows) => {
  rowdiv.innerHTML = "";
  shows.map((result) => {
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
  });
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
