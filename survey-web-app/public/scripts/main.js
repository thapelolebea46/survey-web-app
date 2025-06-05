function displayFill() {
  document.getElementById("form-container").style = "display:block;";
  document.getElementById("results-container").style = "display:none;";
  document.getElementById("zero-survey").style = "display:none";
  document.getElementById("fillLink").style.color = "blue";
  document.getElementById("displayLink").style.color = "black";
}
function displaySurvey(el) {
  if (el != 0) {
    document.getElementById("form-container").style = "display:none;";
    document.getElementById("results-container").style = "display:block;";
    document.getElementById("zero-survey").style = "display:none";
  }
  if (el == 0) {
    document.getElementById("form-container").style = "display:none;";
    document.getElementById("results-container").style = "display:none;";
    document.getElementById("zero-survey").style = "display:block";
  }
  document.getElementById("fillLink").style.color = "black";
  document.getElementById("displayLink").style.color = "blue";
}
const dobInput = document.getElementById("dob");

// Set limits
function saveSurvey() {
  //accessing and manipulating the elements filled out
  const name = document.getElementById("fullname");
  const email = document.getElementById("email");
  const contact = document.getElementById("contact");

  const pizza = document.getElementById("pizza");
  const pasta = document.getElementById("pasta");
  const papandwors = document.getElementById("papandwors");

  const movieRate = document.querySelector('input[name="movieRate"]:checked');
  const radioRate = document.querySelector('input[name="radioRate"]:checked');
  const eatRate = document.querySelector('input[name="eatRate"]:checked');
  const tvRate = document.querySelector('input[name="tvRate"]:checked');

  //changing the scheema details before sending to the server
  if (pizza.checked) document.getElementById("pizza").value = "Yes";
  if (!pizza.checked) document.getElementById("pizza").value = "No";
  if (pasta.checked) document.getElementById("pasta").value = "Yes";
  if (!pasta.checked) document.getElementById("pasta").value = "No";
  if (papandwors.checked) document.getElementById("papandwors").value = "Yes";
  if (!papandwors.checked) document.getElementById("papandwors").value = "No";

  let data =
    name.value + "\n" + email.value + "\n" + contact.value + "\n" + age + "\n";
  if (pizza.checked) data += "\nLoves pizza\n";
  if (pasta.checked) data += "\nLoves pasta\n";
  if (papandwors.checked) data += "\nLoves Wors and pap\n";
  data += "watching movies: " + movieRate.value + "\n";
  data += "\nListening to radio: " + radioRate.value + "\n";
  data += "\nLoves eating: " + eatRate.value + "\n";
  data += "\nLoves watching tv\n" + tvRate.value;

  document.getElementById("pasta").checked = true;
  document.getElementById("pizza").checked = true;
  document.getElementById("papandwors").checked = true;
  alert(data);
}
function tvRateClicked(v) {
  //seting the right value for each rating
  const tvRate = document.querySelector('input[name="tvRate"]:checked');
  tvRate.value = v;
}
function eatRateClicked(v) {
  //seting the right value for each rating
  const eatRate = document.querySelector('input[name="eatRate"]:checked');
  eatRate.value = v;
}

function radioRateClicked(v) {
  //seting the right value for each rating
  const radioRate = document.querySelector('input[name="radioRate"]:checked');
  radioRate.value = v;
}
function movieRateClicked(v) {
  //seting the right value for each rating
  const movieRate = document.querySelector('input[name="movieRate"]:checked');
  movieRate.value = v;
}
