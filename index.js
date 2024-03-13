import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(express.json());

app.get("/", async (req, res) => {
  const result = await axios.get(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );

  // get list of drinks
  const drinksList = result.data.drinks;
  // get 1st drink
  const drink = drinksList[0];
  // create an array to include all the ingredients + measurements
  const ingredientList = [];

  // console.log(drink.strDrink);

  for (let i = 0; i < 15; i++) {
    // console.log(i + 1);
    // console.log(drink["strIngredient" + i]);
    const ingredientIndex = "strIngredient" + i;
    const measureIndex = "strMeasure" + i;
    const ingredient = drink[ingredientIndex];
    const measure = drink[measureIndex];
    if (
      (ingredient != null || ingredient != undefined) &&
      (measure != null || measure != undefined)
    ) {
      ingredientList.push({ ingredient, measure });
    }
  }
  console.log({
    name: drink.strDrink,
    glass: drink.strGlass,
    ingredients: ingredientList,
    image: drink.strDrinkThumb,
    instructions: drink.strInstructions,
  });
  res.render("index.ejs", {
    name: drink.strDrink,
    glass: drink.strGlass,
    ingredients: ingredientList,
    image: drink.strDrinkThumb,
    instructions: drink.strInstructions,
  });

  // res.json({
  //   name: drink.strDrink,
  //   glass: drink.strGlass,
  //   ingredients: ingredientList,
  //   image: drink.strDrinkThumb,
  // });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
