import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import ReactStars from 'react-rating-stars-component';

import { GET_USER_SHOPS, GET_SAVED_RECIPES } from '../../graphql/queries';
import { Shop, Recipe } from '../../interfaces';
import { UPDATE_SHOP_RATING, DELETE_RECIPE } from '../../graphql/mutations';

import CreateCoffeeModal from './components/CreateCoffeeModal';
import ViewCoffeeModal from './components/ViewCoffeeModal';

function Dashboard() {
  const { data: shopData } = useQuery(GET_USER_SHOPS);
  const [updateShopRating] = useMutation(UPDATE_SHOP_RATING);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [selectedShop, setSelectedShop] = useState<null | Shop>(null);
  const [showCreateCoffeeModal, setShowCreateCoffeeModal] = useState(false);
  const [showCoffeesModal, setShowCoffeesModal] = useState(false);

  const { data: savedRecipesData, loading: loadingSavedRecipes, error: errorSavedRecipes } = useQuery(GET_SAVED_RECIPES);

  const handleShowCreateCoffeeModal = (shop: Shop) => {
    setSelectedShop(shop);
    setShowCreateCoffeeModal(true);
  };

  const handleShowCoffeesModal = (shop: Shop) => {
    setSelectedShop(shop);
    setShowCoffeesModal(true);
  };

  const handleRatingChange = async (newRating: number, shopId: string) => {
    try {
      await updateShopRating({
        variables: {
          shopId,
          rating: newRating
        },
        refetchQueries: [{ query: GET_USER_SHOPS }]
      });
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteRecipe({
        variables: { recipeId },
        update: (cache) => {
          const existingRecipes: any = cache.readQuery({ query: GET_SAVED_RECIPES });
          if (existingRecipes) {
            const newRecipes = existingRecipes.savedRecipes.filter((recipe: Recipe) => recipe.id !== recipeId);
            cache.writeQuery({
              query: GET_SAVED_RECIPES,
              data: { savedRecipes: newRecipes },
            });
          }
        },
      });
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <Container>
      <h3 className="mt-4 fw-light">Your Shops</h3>
      <hr />

      <section className="d-grid gap-4 shop-output">
        {shopData && !shopData.getUserShops.length && <p>No shops have been added yet.</p>}

        {shopData && shopData.getUserShops.map((shop: Shop) => (
          <article key={shop._id} className="border p-4">
            <h4>{shop.name}</h4>
            <p>Location: {shop.location}</p>
            <ReactStars
              count={5}
              value={shop.rating}
              onChange={(newRating: any) => handleRatingChange(newRating, shop._id)}
              size={24}
              activeColor="#FFD700"
              edit={true}
            />
            <div className="d-flex button-wrap">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => handleShowCreateCoffeeModal(shop)}>Add Coffee</Button>
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => handleShowCoffeesModal(shop)}>View Coffee</Button>
            </div>
          </article>
        ))}
      </section>

      <CreateCoffeeModal
        selectedShop={selectedShop}
        showCreateCoffeeModal={showCreateCoffeeModal}
        setShowCreateCoffeeModal={setShowCreateCoffeeModal}
      />

      <ViewCoffeeModal
        showCoffeesModal={showCoffeesModal}
        setShowCoffeesModal={setShowCoffeesModal}
        selectedShop={selectedShop}
      />

      {savedRecipesData && savedRecipesData.savedRecipes && savedRecipesData.savedRecipes.length > 0 && (
        <div className="mt-5">
          <h2>Saved Recipes</h2>
          {loadingSavedRecipes && <p>Loading saved recipes...</p>}
          {errorSavedRecipes && <p>Error loading saved recipes: {errorSavedRecipes.message}</p>}
          {savedRecipesData.savedRecipes.map((recipe: Recipe) => (
            <section key={recipe.id}>
              <div className="thin-rounded-outline">
                <div className="m-5">
                  <h1 className="mb-4">{recipe.title}</h1>
                  <h4 className="mt-4 mb-2">Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h4 className="mt-4 mb-2">Instructions:</h4>
                  <ol>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                  <Button className="mt-3" variant="danger" onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</Button>
                </div>
              </div>
              <div className="spacer"></div>
            </section>
          ))}
        </div>
      )}
    </Container>
  )
}

export default Dashboard;