const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const env = require("dotenv");
env.config();

const app = express();
app.use(bodyParser.urlencoded({ extented: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let dburl = process.env.MONGOURL;
let port = process.env.PORT;

mongoose.connect(dburl);

//The survey schema
const surveySchema = {
  full_name: String,
  email: String,
  age: Number,
  contact: String,
  likes_pizza: String,
  likes_pasta: String,
  likes_pap_and_wors: String,
  rate_movies: Number,
  rate_radio: Number,
  rate_eatout: Number,
  rate_watch_tv: Number,
};

const People = mongoose.model("survey", surveySchema);

//The survey calculations respond
app.get("/", async (req, res) => {
  try {
    //Utilizing the database to compute meaningful results
    const listOfPeople = await People.find({});

    const totalSurveys = listOfPeople.length;
    let oldestAge = 0;
    let youngestAge = 200;

    for (let i = 0; i < totalSurveys; i++) {
      if (listOfPeople[i].age < youngestAge) {
        youngestAge = listOfPeople[i].age;
      }
      if (listOfPeople[i].age > oldestAge) {
        oldestAge = listOfPeople[i].age;
      }
    }
    //oldest and youngest calculated

    //calculate average age,total of people who like pizza,pasta and papand wors, movieRate, radioRate,TVRate,eatOutRate averages
    let totalAge = 0;
    let totalPizzaLiking = 0;
    let totalPastaLiking = 0;
    let totalPapLiking = 0;
    let totalMovieRate = 0;
    let totalEatOutRate = 0;
    let totalRadioRate = 0;
    let totalTVRate = 0;

    for (let i = 0; i < totalSurveys; i++) {
      //total age calculation
      totalAge += listOfPeople[i].age;
      //total rates for the hobbies mentioned
      totalMovieRate += listOfPeople[i].rate_movies;
      totalEatOutRate += listOfPeople[i].rate_eatout;
      totalTVRate += listOfPeople[i].rate_watch_tv;
      totalRadioRate += listOfPeople[i].rate_radio;

      //calculating the amount of people that like certain foods
      if (listOfPeople[i].likes_pizza == "Yes") totalPizzaLiking += 1;
      if (listOfPeople[i].likes_pasta == "Yes") totalPastaLiking += 1;
      if (listOfPeople[i].likes_pap_and_wors == "Yes") totalPapLiking += 1;
    }
    let averageAge = (totalAge / totalSurveys).toFixed(1);
    let pizzaPercentage = ((totalPizzaLiking / totalSurveys) * 100).toFixed(1);
    let pastaPercentage = ((totalPastaLiking / totalSurveys) * 100).toFixed(1);

    let papAndWorsPercentage = ((totalPapLiking / totalSurveys) * 100).toFixed(
      1
    );

    let movieAverage = (totalMovieRate / totalSurveys).toFixed(1);
    let tvAverage = (totalTVRate / totalSurveys).toFixed(1);
    let radioAverage = (totalRadioRate / totalSurveys).toFixed(1);
    let eatoutAverage = (totalEatOutRate / totalSurveys).toFixed(1);

    if (totalSurveys == 0) {
      averageAge = 0;
      oldestAge = 0;
      youngestAge = 0;
      pizzaPercentage = 0;
      pastaPercentage = 0;
      papAndWorsPercentage = 0;
      movieAverage = 0;
      radioAverage = 0;
      eatoutAverage = 0;
      tvAverage = 0;
    }

    res.render("index", {
      surveyTotal: totalSurveys,
      ageAverage: averageAge,
      oldest: oldestAge,
      youngest: youngestAge,
      percentageOfPizza: pizzaPercentage,
      percentageOfPasta: pastaPercentage,
      percentageOfPapAndWOrs: papAndWorsPercentage,
      averageRateOfMovies: movieAverage,
      averageRateOfRadio: radioAverage,
      averageRateOfEatOut: eatoutAverage,
      averageRateOfTv: tvAverage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

//The survey posting request to the database
app.post("/", function (req, res) {
  //calculate age first before posting the data

  // getting only the year
  const dateOfBirth = req.body.dob;
  let year = dateOfBirth.substring(0, 4);
  let yearNum = parseInt(year);
  let ageCalculated = 2025 - yearNum;

  //posting the survey details according to the scheema
  let newSurvey = new People({
    full_name: req.body.fullname,
    email: req.body.email,
    age: ageCalculated,
    contact: req.body.contact,
    likes_pizza: req.body.likePizza,
    likes_pasta: req.body.likePasta,
    likes_pap_and_wors: req.body.likePapAndWors,
    rate_movies: req.body.movieRate,
    rate_radio: req.body.radioRate,
    rate_eatout: req.body.eatRate,
    rate_watch_tv: req.body.tvRate,
  });
  //saving the data in the database
  newSurvey.save();

  res.redirect("/");
});

app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});
