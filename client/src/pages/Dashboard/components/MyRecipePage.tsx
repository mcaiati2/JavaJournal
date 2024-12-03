import { useState, useEffect } from 'react';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';

import { GET_SAVED_RECIPES } from '../graphql/queries';
import { DELETE_RECIPE } from '../../graphql/mutations';
import { Recipe } from '../../interfaces/index.d';
import { useStore } from '../../store';

const SavedRecipes = () => {
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const { state } = useStore()!;
  const { data, loading, error } = useQuery(GET_SAVED_RECIPES);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);

  useEffect(() => {
    if (!loading && data) {
      setUserRecipes([...data.getSavedRecipes]);
    }
  }, [data, loading]);

  const handleDeleteRecipe = async (_id: string) => {
    try {
      await deleteRecipe({
        variables: {
          id: _id
        }
      });

      setUserRecipes(userRecipes.filter(recipe => recipe._id !== _id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error loading recipes!</Alert>;

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          <h1>Viewing {!state.loading && state.user.username}'s saved recipes!</h1>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {userRecipes.length
            ? `Viewing ${userRecipes.length} saved ${userRecipes.length === 1 ? 'recipe' : 'recipes'
            }:`
            : 'You have no saved recipes!'}
        </h2>
        <section className='d-grid gap-4 recipe-grid'>
          {userRecipes.map((recipe) => {
            return (
              <Card border='dark' key={recipe._id}>
                {recipe.image ? (
                  <Card.Img
                    className='result-image'
                    src={recipe.image}
                    alt={`The cover for ${recipe.title}`}
                    variant='top'
                  />
                ) : null}
                <Card.Body className='d-flex flex-column'>
                  <Card.Title>{recipe.title}</Card.Title>
                  <p className='small flex-fill'>Authors: {recipe.authors}</p>
                  <details>
                    <summary>Description</summary>
                    <Card.Text className='p-2'>{recipe.description}</Card.Text>
                  </details>
                  <Button
                    className='btn-block btn-danger'
                    onClick={() => handleDeleteRecipe(recipe._id)}
                  >
                    Delete this Recipe!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </section>
      </Container>
    </>
  );
};

export default SavedRecipes;