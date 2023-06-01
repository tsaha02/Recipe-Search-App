import { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

function Recipe() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const YOUR_APP_ID = "6a3ff0b6";
  const YOUR_APP_KEY = "1d2e342a30aa28b698d5bb70027b4561";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

  const getRecipeInfo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.hits && data.hits.length === 0) {
        setError("No recipes found. Please try a different keyword.");
      } else if (!data.hits || !data.hits[0].recipe) {
        setError("No information available for the entered keyword.");
      } else {
        setError("");
        setRecipes(data.hits);
        console.log(data.hits);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="recipe-app">
      <Container>
        <h1 className="recipe-app__title">Get All Your Food Recipes Here</h1>
        <Form className="recipe-app__search-form" onSubmit={handleSubmit}>
          <Row className="align-items-center">
            <Col xs={12} sm={8} md={6} lg={4}>
              <Form.Control
                className="recipe-app__input"
                type="text"
                placeholder="Enter Ingredient"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                size="lg"
              />
            </Col>
            <Col xs={12} sm={4} md={6} lg={2}>
              <Button
                className="recipe-app__submit"
                type="submit"
                variant="primary"
                size="lg"
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {error ? <Alert variant="danger">{error}</Alert> : null}

        <div className="recipe-app__recipes">
          {recipes.length > 0 &&
            recipes.map((recipe) => {
              return (
                <div
                  key={recipe.recipe.uri}
                  className="recipe-app__recipe-tile"
                >
                  <h2>{recipe.recipe.label}</h2>
                  <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                  <ul className="recipe-app__ingredient-list">
                    {recipe.recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.text}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      </Container>
    </div>
  );
}

export default Recipe;
