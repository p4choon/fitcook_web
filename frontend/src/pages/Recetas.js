import "./recetas.css";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FiSearch } from "react-icons/fi";

const Recetas = () => {
  const [searchInput, setSearchInput] = useState('');
  const [mealList, setMealList] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getRandomRecipes();
  }, []);

  const getRandomRecipes = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setMealList(data.meals.slice(0, 12));
        } else {
          setMealList([]);
        }
      })
      .catch(error => {
        console.error('Error fetching random recipes:', error);
        setMealList([]);
      });
  };

  const handleSearch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          setMealList(data.meals);
        } else {
          setMealList([]);
        }
      })
      .catch(error => {
        console.error('Error fetching meal list:', error);
        setMealList([]);
      });
  };

  const openRecipeModal = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          setMealDetails(data.meals[0]);
          setShowModal(true);
        } else {
          setMealDetails(null);
        }
      })
      .catch(error => {
        console.error('Error fetching meal details:', error);
        setMealDetails(null);
      });
  };

  const closeRecipeModal = () => {
    setMealDetails(null);
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="meal-wrapper">
        <div className="meal-search">
          <h2 className="title">Encuentra nuevas ideas para recetas</h2>
          <blockquote>
            "La cocina no la puedes separar de la persona que la hace, ni del lugar donde la consumes."<br />
            <cite>- Alain Ducasse</cite>
          </blockquote>

          <div className="meal-search-box">
            <input
              type="text"
              className="search-control"
              placeholder="Escribe un ingrediente"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button type="button" className="search-btn btn" onClick={handleSearch}>
              <FiSearch />
            </button>
          </div>
        </div>

        <div className="meal-result">
          <h2 className="title">Tus resultados:</h2>
          <div id="meal">
            {mealList.length > 0 ? (
              mealList.map(meal => (
                <div className="meal-item" key={meal.idMeal} data-id={meal.idMeal}>
                  <div className="meal-img">
                    <img src={meal.strMealThumb} alt="food" />
                  </div>
                  <div className="meal-name">
                    <h3>{meal.strMeal}</h3>
                    <button className="recipe-btn" onClick={() => openRecipeModal(meal.idMeal)}>
                      Ver Receta
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No hemos encontrado la receta.</p>
            )}
          </div>
        </div>

        <Modal show={showModal} onHide={closeRecipeModal}>
          {mealDetails && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{mealDetails.strMeal}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>{mealDetails.strCategory}</p>
                <div className="recipe-instruct">
                  <h3>Instrucciones:</h3>
                  <p>{mealDetails.strInstructions}</p>
                </div>
                <div className="recipe-meal-img">
                  <img src={mealDetails.strMealThumb} alt="" />
                </div>
                <div className="recipe-link">
                  <a href={mealDetails.strYoutube} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeRecipeModal}>
                  Volver
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Recetas;
