import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_RECIPE } from '../graphql/mutations';

interface Instruction {
  name: number;
  text: string;
}

interface Coffee {
  _id: string;
  name: string;
  image: string;
  description: string;
  recipeYield: string;
  datePublished: string;
  prepTime: string;
  totalTime: string;
  recipeIngredient: string[];
  recipeInstructions: Instruction[];
  category: string;
}

function CoffeeSearch() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [saveRecipe] = useMutation(SAVE_RECIPE);

  const fetchCoffees = async (query: string) => {
    try {
      const response = await fetch(`https://starbucks-coffee-db2.p.rapidapi.com/api/recipes?name=${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-rapidapi-ua': 'RapidAPI-Playground',
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'starbucks-coffee-db2.p.rapidapi.com'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCoffees(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCoffees(query);
  };

  const handleSaveRecipe = async (recipe: Coffee) => {
    try {
      await saveRecipe({
        variables: {
          recipeId: recipe._id,
          title: recipe.name,
          ingredients: recipe.recipeIngredient,
          instructions: recipe.recipeInstructions.map(instruction => instruction.text)
        }
      });
      alert('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <Container>
      <h1>Search Coffees</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter coffee type (e.g., mocha)</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter coffee type"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      {error && <div>Error: {error}</div>}
      <ul>
        {coffees.map((coffee) => (
          <li key={coffee._id}>
            <h2>{coffee.name}</h2>
            <img className="coffee-thumbnail" src={coffee.image} alt={coffee.name} />
            <h4>Description:</h4>
            {coffee.description}
            <h4>Yield:</h4>
            {coffee.recipeYield}
            <h4>Category: </h4>
            {coffee.category}
            <h4>Ingredients:</h4>
            <ul>
              {coffee.recipeIngredient.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4>Instructions:</h4>
            <ol>
              {coffee.recipeInstructions.map((instruction, index) => (
                <li key={index}>
                  {instruction.text}
                </li>
              ))}
            </ol>
        


            <Button variant="success" onClick={() => handleSaveRecipe(coffee)}>Save Recipe</Button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default CoffeeSearch;