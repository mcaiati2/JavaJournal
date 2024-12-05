# Project 3 Info:

## Updated:
AuthForm.tsx
![alt text](image.png)

## Commands
  * npm run build (at top level) to rebuild client/server and start dev server
  * dep 'insert commit message here' origin HEAD:main

## App Names:
  * JavaJournal
  * Cool Beans
  * Sip Society

## Conversion
  **Shop = Pet**
  **Coffee = Post**
  **Age = Rating**
  **Type = Location**

## To-Do
  * Adjust testing files
  * Rating conversion to float
  * Match optional with not optional in the typedefs/resolvers/queries/mutations/etc
  * Move Coffee interface to new file

## Features Ideas/Backlog
  * Drop-down selection for flavor notes
  * Star rating instead of field (coffee cup empty vs full)
  * Google API Location Field
  * Retype password for validation creation
  * Prevent duplicate shops
  * Auto capitalize inputs for consistency
  * ? Shop Image Logo (also add to Modal) - Coffee Object / Shop Object ?
  !['brewing info/find your roast'](image.png)
  * Brew methods (click into a picture to see info) ![example](image-97.png)
  * French press calculator (api?)


# Data We're Capturing
  * User Model
    * Username
    * Email
    * Password

  * Shop Model
   * Name
   * Rating
   * Location (api or field)
   * Associated Coffees

  * Coffee Model
    * Name
    * Flavor
    * Associated Shop
    * Comments
    * Photo Upload


## Log
11/26
App working
Coffee Model complete (Coffee.ts)
Changed db

11/27
Mutations.ts completed
Context.d.ts not changed 
interfaces > index.d.ts

## Debugging:

## Copilot Prompt:
"without changing any of my code, can you please add comments to each line explaining in great detail what that line is doing? please include comments for imports and exports. please write the comments to help a beginner programmer understand the code"


## Sample API Response:

_id
name
image
description
recipeYield
datePublished
prepTime ?
totalTime ?
recipeIngredient
category


  {
    "_id": "6681b8d94507f78afe80183b",
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": "Caffè Mocha",
    "image": "https://athome.starbucks.com/sites/default/files/2021-06/1_CAH_CaffeMocha_Hdr_2880x16602.jpg",
    "description": "This Starbucks classic combines espresso, bittersweet mocha sauce and steamed milk for a sweetly satisfying coffee. Top it off with whipped cream and chocolate shavings for a delicious mug of coffee ready to be enjoyed any time at home.",
    "recipeYield": "1 serving",
    "datePublished": "Wed, 06/02/2021 - 13:58",
    "prepTime": "PT7M",
    "totalTime": "PT7M",
    "recipeIngredient": [
      "1 oz Starbucks® Espresso Roast ground coffee or",
      "1 cup milk of your choice",
      "3 Tbsp mocha sauce",
      "",
      ""
    ],
    "recipeInstructions": [
      {
        "@type": "HowToStep",
        "name": "01",
        "text": "Prepare 1 shot of espresso and pour into a mug.",
        "image": ""
      },
      {
        "@type": "HowToStep",
        "name": "02",
        "text": "Froth your milk using your preferred method. For more information on how to froth your milk, see our frothing guide here.",
        "image": ""
      },
      {
        "@type": "HowToStep",
        "name": "03",
        "text": "Add mocha sauce into your mug and gently stir into the coffee.",
        "image": ""
      },
      {
        "@type": "HowToStep",
        "name": "04",
        "text": "Gently pour your frothed milk into your mug until it’s almost full.",
        "image": ""
      }
    ],
    "category": "HOT BEVERAGES"
  },
  



  import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import ReactStars from 'react-rating-stars-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { GET_USER_SHOPS, GET_SAVED_RECIPES } from '../../graphql/queries';
import { Shop, Recipe } from '../../interfaces';
import { UPDATE_SHOP_RATING, DELETE_RECIPE, DELETE_SHOP } from '../../graphql/mutations';

import CreateCoffeeModal from './components/CreateCoffeeModal';
import ViewCoffeeModal from './components/ViewCoffeeModal';


function Dashboard() {
  const { data: shopData, refetch: refetchShops } = useQuery(GET_USER_SHOPS);
  const { data: savedRecipesData, loading: loadingSavedRecipes, error: errorSavedRecipes, refetch: refetchRecipes } = useQuery(GET_SAVED_RECIPES);
  const [updateShopRating] = useMutation(UPDATE_SHOP_RATING);
  const [deleteRecipe] = useMutation(DELETE_RECIPE);
  const [deleteShop] = useMutation(DELETE_SHOP);
  const [selectedShop, setSelectedShop] = useState<null | Shop>(null);
  const [showCreateCoffeeModal, setShowCreateCoffeeModal] = useState(false);
  const [showCoffeesModal, setShowCoffeesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteShopModal, setShowDeleteShopModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [shopToDelete, setShopToDelete] = useState<string | null>(null);

  useEffect(() => {
    refetchShops();
    refetchRecipes();
  }, [refetchShops, refetchRecipes]);

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

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setShowDeleteModal(true);
  };

  const confirmDeleteRecipe = async () => {
    if (!recipeToDelete) return;

    try {
      await deleteRecipe({
        variables: { recipeId: recipeToDelete },
        update: (cache) => {
          const existingRecipes: any = cache.readQuery({ query: GET_SAVED_RECIPES });
          if (existingRecipes) {
            const newRecipes = existingRecipes.savedRecipes.filter((recipe: Recipe) => recipe.id !== recipeToDelete);
            cache.writeQuery({
              query: GET_SAVED_RECIPES,
              data: { savedRecipes: newRecipes },
            });
          }
        },
      });
      setShowDeleteModal(false);
      setRecipeToDelete(null);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setRecipeToDelete(null);
  };

  const handleDeleteShop = (shopId: string) => {
    setShopToDelete(shopId);
    setShowDeleteShopModal(true);
  };

  const confirmDeleteShop = async () => {
    if (!shopToDelete) return;

    try {
      await deleteShop({
        variables: { shopId: shopToDelete },
        refetchQueries: [{ query: GET_USER_SHOPS }]
      });
      setShowDeleteShopModal(false);
      setShopToDelete(null);
    } catch (error) {
      console.error('Error deleting shop:', error);
    }
  };

  const handleCloseDeleteShopModal = () => {
    setShowDeleteShopModal(false);
    setShopToDelete(null);
  };

  return (
    <div className="journal-bg-img">
      <div style={{ paddingTop: '70px' }}>
        <h2 className="mt-5 mx-5 fw-light"><FontAwesomeIcon icon={faCoffee} /> My Journal</h2>
        <hr />

        <div className="fav-section">
          <div className="fav-header mx-5 mb-5">
            <h3>Shops</h3>
            <p>Click on a shop to add a coffee or view existing coffees.</p>
            <hr />
          </div>
          <section className="shop-output mt-4 mx-5">
            {shopData && !shopData.getUserShops.length && <p>No favorites have been added yet.</p>}

            {shopData && shopData.getUserShops.map((shop: Shop) => (
              <article key={shop._id} className="thin-rounded-outline shop-card p-4 mb-4">
                <h4>{shop.name}</h4>
                <p>Location: {shop.location}</p>
                <ReactStars
                  count={5}
                  value={shop.rating}
                  onChange={(newRating: any) => handleRatingChange(newRating, shop._id)}
                  size={24}
                  activeColor="#f9c8a1"
                  edit={true}
                />
                <div className="d-flex button-wrap">
                  <Button
                    className="me-2 add-btn"
                    onClick={() => handleShowCreateCoffeeModal(shop)}>Add Coffee</Button>
                  <Button
                    className="me-2 view-coffee-btn"
                    onClick={() => handleShowCoffeesModal(shop)}>View Coffee</Button>
                  <Button
                    className="me-2 delete-btn"
                    onClick={() => handleDeleteShop(shop._id)}
                  >
                    Delete Shop
                  </Button>
                </div>
              </article>
            ))}
          </section>
        </div>

        {savedRecipesData && savedRecipesData.savedRecipes && savedRecipesData.savedRecipes.length > 0 && (
          <div className="fav-section">
            <div className="fav-header mx-5 mb-5">
              <h3>Saved Recipes</h3>
              <hr />
            </div>
            {loadingSavedRecipes && <p>Loading saved recipes...</p>}
            {errorSavedRecipes && <p>Error loading saved recipes: {errorSavedRecipes.message}</p>}
            {savedRecipesData.savedRecipes.map((recipe: Recipe) => (
              <section key={recipe.id}>
                <div className="thin-rounded-outline mx-5">
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
                    <Button className="me-2 delete-btn" onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</Button>
                  </div>
                </div>
                <div className="spacer"></div>
              </section>
            ))}
          </div>
        )}

        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this recipe?
          </Modal.Body>
          <Modal.Footer>
            <Button className="cancel-btn" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button className="delete-btn" onClick={confirmDeleteRecipe}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteShopModal} onHide={handleCloseDeleteShopModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this shop?
          </Modal.Body>
          <Modal.Footer>
            <Button className="cancel-btn" onClick={handleCloseDeleteShopModal}>
              Cancel
            </Button>
            <Button className="delete-btn" onClick={confirmDeleteShop}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

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

        
      </div>
    </div>
  );
}

export default Dashboard;