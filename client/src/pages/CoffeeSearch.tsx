import { useState, useEffect } from 'react';
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
  const [apiKey, setApiKey] = useState<string>('');

  const fetchApiKey = async () => {
    try {
      const response = await fetch('/api/get-api-key');
      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (error) {
      console.error('Error fetching API key:', error);
      setError('Failed to fetch API key');
    }
  };

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchCoffees = async (query: string) => {
    try {
      const response = await fetch(`https://starbucks-coffee-db2.p.rapidapi.com/api/recipes?name=${query}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-rapidapi-ua': 'RapidAPI-Playground',
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'starbucks-coffee-db2.p.rapidapi.com'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCoffees(data);
    } catch (error: any) {
      console.error('Error fetching coffees:', error);
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
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <Container>
      <div className="mt-5">
        <h1>Search Coffees</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-5 mb-5">
          <Form.Label>Enter coffee type (e.g., mocha)</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter coffee type"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Search
        </Button>
      </Form>

      {error && <div>Error: {error}</div>}

      <div className="m-5">
        {coffees.map((coffee) => (
          <section key={coffee._id}>
            <div className="thin-rounded-outline">
              <div className="m-5">
                <h1 className="mb-4">{coffee.name}</h1>
                <img className="coffee-thumbnail mb-5" src={coffee.image} alt={coffee.name} />
                <h4 className="mb-2">Description:</h4>
                {coffee.description}
                <h4 className="mt-4 mb-2">Yield:</h4>
                {coffee.recipeYield}
                <h4 className="mt-4 mb-2">Category: </h4>
                {coffee.category}
                <h4 className="mt-4 mb-2">Ingredients:</h4>
                <ul>
                  {coffee.recipeIngredient.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4 className="mt-4 mb-2">Instructions:</h4>
                <ol>
                  {coffee.recipeInstructions.map((instruction, index) => (
                    <li key={index}>
                      {instruction.text}
                    </li>
                  ))}
                </ol>
                <Button className="mt-5" variant="success" onClick={() => handleSaveRecipe(coffee)}>Save Recipe</Button>
              </div>
            </div>
            <div className="spacer"></div>
          </section>
        ))}
      </div>
    </Container>
  );
}

export default CoffeeSearch;