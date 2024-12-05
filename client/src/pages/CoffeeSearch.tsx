import { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
      setShowModal(true);
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleViewJournal = () => {
    setShowModal(false);
    navigate('/dashboard');
  };

  return (

    <div className="recipe-search-page-image">
      
        <h2 className="text-center pt-5">Find Coffee Recipe</h2>
    
      <Form onSubmit={handleSubmit} className="auth-form mx-auto mt-5">
        <Form.Group className="mt-5 mb-3">
          <Form.Label>Enter coffee type</Form.Label>
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. mocha"
            className="italic-placeholder"
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button className="submit-btn d-grid gap-2" type="submit">
            Submit
          </Button>
        </div>
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
                <Button className="add-btn" onClick={() => handleSaveRecipe(coffee)}>Save Recipe</Button>
              </div>
            </div>
            <div className="spacer"></div>
          </section>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Saved</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Recipe saved! Do you want to save more recipes or view your journal?
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancel-btn" onClick={handleCloseModal}>
            Save More Recipes
          </Button>
          <Button className="add-btn" onClick={handleViewJournal}>
            View My Journal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CoffeeSearch;