import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

interface Coffee {
  title: string;
  description: string;
  ingredients: string[];
  // Add other properties as needed
}

function CoffeeList() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');

  const fetchCoffees = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
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
    fetchCoffees(`https://api.sampleapis.com/coffee/${query}`);
  };

  return (
    <Container>
      <h1>Search Coffees</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter coffee type (e.g., hot, iced)</Form.Label>
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
        {coffees.map((coffee, index) => (
          <li key={index}>
            <h2>{coffee.title}</h2>
            <p>{coffee.description}</p>
            <p>Ingredients: {coffee.ingredients.join(', ')}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}

export default CoffeeList;