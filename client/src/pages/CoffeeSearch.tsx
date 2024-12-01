import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

// Define separate interface when new object is received
interface Instruction {
  name: number;
  text: string;
  // image: string; // included in API response, looks empty
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
            <br />
            <br />
            <img className="coffee-thumbnail" src={coffee.image} alt={coffee.name} />

            <h4>Description:</h4>
            {coffee.description}
            <br />
            <br />


            <h4>Yield:</h4>
            {coffee.recipeYield}
            <br />
            <br />

            <h4>Category: </h4>
            {coffee.category}
            <br />
            <br />

            <h4>Ingredients:</h4>
            <ul>
              {coffee.recipeIngredient.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <br />

            <h4>Instructions:</h4>
            <ol>
              {coffee.recipeInstructions.map((instruction, index) => (
                <li key={index}>
                  {instruction.text}
                </li>
              ))}
            </ol>
            <br />
            <br />

            <h4>Recipe Creation Date:</h4>
            {coffee.datePublished}
            <br />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default CoffeeSearch;


