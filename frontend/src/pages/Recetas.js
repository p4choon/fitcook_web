import React, { useState, useEffect } from "react";
import "./recetas.css";
import { FiSearch } from "react-icons/fi";

const Recetas = () => {
  const [searchInput, setSearchInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const getRandomMeals = async () => {
    const randomMeals = [];
    for (let i = 0; i < 12; i++) {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await response.json();
      const meal = data.meals[0];
      randomMeals.push(meal);
    }
    return randomMeals;
  };

  const getMealList = () => {
    if (searchInput.trim() !== "") {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.meals) {
            setMeals(data.meals);
          } else {
            setMeals([]);
          }
        });
    } else {
      getRandomMeals()
        .then((randomMeals) => {
          setMeals(randomMeals);
        })
        .catch((error) => {
          console.log("Error fetching random meals:", error);
          setMeals([]);
        });
    }
  };

  const getMealRecipe = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        const meal = data.meals[0];
        setSelectedMeal(meal);
        setShowRecipe(true);
      });
  };

  const closeRecipeModal = () => {
    setShowRecipe(false);
    setSelectedMeal(null);
  };

  useEffect(() => {
    getMealList();
  }, []);

  return (
    <div className="recetasContainer">
      <div className="meal-wrapper">
        <div className="meal-search">
          <h2 className="title">Encuentra nuevas ideas para recetas</h2>
          <blockquote>
            "La cocina no la puedes separar de la persona que la hace, ni del lugar donde la consumes."
            <br />
            <cite>- Alain Ducasse</cite>
          </blockquote>

          <div className="meal-search-box">
            <input
              type="text"
              className="search-control"
              placeholder="Escribe un ingrediente"
              value={searchInput}
              onChange={handleSearchInput}
            />
            <button
              type="submit"
              className="search-btn btn"
              onClick={getMealList}
            >
              <FiSearch />
            </button>
          </div>
        </div>

        <div className="meal-result">
          <h2 className="title">Tus resultados:</h2>
          <div id="meal">
            {meals.length > 0 ? (
              meals.map((meal) => (
                <div className="meal-item" key={meal.idMeal}>
                  <div className="meal-img">
                    <img src={meal.strMealThumb} alt="food" />
                  </div>
                  <div className="meal-name">
                    <h3>{meal.strMeal}</h3>
                    <button
                      className="recipe-btn"
                      onClick={() => getMealRecipe(meal.idMeal)}
                    >
                      Ver Receta
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hemos encontrado ninguna receta 😪</p>
            )}
          </div>
        </div>

        {showRecipe && selectedMeal && (
          <div className="modal">
            <div className="modal-content">
              <button
                type="button"
                className="close-btn"
                onClick={closeRecipeModal}
              >
                <i className="fas fa-times"></i>
              </button>
              <h2>{selectedMeal.strMeal}</h2>
              <p className="recipe-category">{selectedMeal.strCategory}</p>
              <div className="recipe-instruct">
                <h3>Instrucciones:</h3>
                <p>{selectedMeal.strInstructions}</p>
              </div>
              <div className="recipe-ingredients">
                <h3>Ingredientes:</h3>
                <ul>
                  {Object.entries(selectedMeal)
                    .filter(
                      ([key, value]) =>
                        key.startsWith("strIngredient") && value
                    )
                    .map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                </ul>
              </div>
              {selectedMeal.strYoutube && (
                <div className="recipe-link">
                  <a
                    href={selectedMeal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver Video
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recetas;
