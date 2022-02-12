const rowdiv=document.querySelector(".row");
const makeImages = (shows) => {
   
    for (let result of shows) {
    if (result.image) {
        const section = document.createElement("section");
        section.classList.add("card");
      
        const figure = document.createElement("figure");
      figure.classList.add("img-container");
      
      const img = document.createElement("IMG");
      img.classList.add("cards-img");
      img.src = result.image.medium;

      const figcaption=document.createElement("figcaption");
      figcaption.classList.add("cards-img-caption");
      figcaption.innerHTML = result.summary;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      section.appendChild(figure);
      rowdiv.appendChild(section);
    }
  }
};

const seasonsearch = document.querySelector(".seasonsearch");
const episodesearch = document.querySelector(".episodesearch");

seasonsearch.addEventListener('change',async()=>{
    const seasonsearchvalue = seasonsearch.options[seasonsearch.selectedIndex].text;
    const episodesearchvalue = episodesearch.options[episodesearch.selectedIndex].text;

     const res = await axios.get(
    `https://api.tvmaze.com/shows/179/episodes?q=${seasonsearchvalue+episodesearchvalue}`
  );
  makeImages(res.data);
});