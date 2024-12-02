import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface RecipeCardProps {
  recipe: {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>
          <strong>Ingredients:</strong>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </Card.Text>
        <Card.Text>
          <strong>Instructions:</strong>
          <ol>
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </Card.Text>
        <Button variant="primary">Edit</Button>
        <Button variant="danger" className="ml-2">Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;