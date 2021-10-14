let searchForm = document.querySelector("form")

let showingMoviesDiv = document.querySelectorAll(".row")[1]
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");


showMovies = (title, releaseDate, poster, imdbID) => {
  return `
  <div class="card flex-row m-5"><img class="card-img-left example-card-img-responsive" src ="${poster}"/>
    <div class="card-body">
      <h4 class="card-title h5 h4-sm">${title}</h4>
      <p class="card-text">Released date: ${releaseDate}</p>
      <button type="button" class="btn btn-primary" id="${imdbID}" onclick="modalShow(this.id)">Show more info</button>
    </div>
  </div>
  `
}

showMovie = (title, releaseDate, poster, plot) => {
  return `
  <div class="card flex-row m-5"><img class="card-img-left example-card-img-responsive" src ="${poster}"/>
    <div class="card-body">
      <h4 class="card-title h5 h4-sm">${title}</h4>
      <p class="card-text">Released date: ${releaseDate}</p>
      <p class="card-text">${plot}</p>
      <span class="close">&times;</span>
    </div>
  </div>
  `
}

async function findingFilms (input) {
  let response = await fetch(`https://www.omdbapi.com/?&apikey=HEHEHEHEHE&s=${input}`);
  const filmList = await response.json();
  showingMoviesDiv.innerHTML = ""
  for(let i = 0; i < filmList.Search.length; i++){
    let titleList = filmList.Search[i].Title
    let year = filmList.Search[i].Year
    let poster = filmList.Search[i].Poster
    let imdbID = filmList.Search[i].imdbID
    showingMoviesDiv.innerHTML += showMovies(titleList, year, poster, imdbID)
    let buttonShowMore = document.querySelector(`#${imdbID}`)
    console.log(buttonShowMore)
  }  
}

async function imdbInfo (id) {
  let response = await fetch(`https://www.omdbapi.com/?&apikey=HEHEHEHEHE&i=${id}`);
  const movie = await response.json();
  console.log(movie)

  const title = movie.Title
  const releaseDate = movie.Released
  const poster = movie.Poster
  const plot = movie.Plot

  modal.innerHTML = showMovie(title, releaseDate, poster,  plot)
}

modalShow = (id) => {
  imdbInfo(id)
  modal.style.display = "block";
  
  let span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let searchInput = searchForm[0].value
  findingFilms(searchInput)
})

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}