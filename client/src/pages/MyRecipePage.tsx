// import { useState } from 'react';
// import { Button, Container } from 'react-bootstrap';
// import { useQuery, useMutation } from '@apollo/client';
// import ReactStars from 'react-rating-stars-component';


// import { GET_USER_SHOPS } from '../../graphql/queries';
// import { Shop } from '../../interfaces';
// import { UPDATE_SHOP_RATING } from '../../graphql/mutations';

// import CreateCoffeeModal from './components/CreateCoffeeModal';
// import ViewCoffeeModal from './components/ViewCoffeeModal';

// function Dashboard() {
//   const { data: shopData } = useQuery(GET_USER_SHOPS);
//   const [updateShopRating] = useMutation(UPDATE_SHOP_RATING);
//   const [selectedShop, setSelectedShop] = useState<null | Shop>(null);
//   const [showCreateCoffeeModal, setShowCreateCoffeeModal] = useState(false);
//   const [showCoffeesModal, setShowCoffeesModal] = useState(false);


//   const handleShowCreateCoffeeModal = (shop: Shop) => {
//     setSelectedShop(shop);
//     setShowCreateCoffeeModal(true);
//   };

//   const handleShowCoffeesModal = (shop: Shop) => {
//     setSelectedShop(shop);
//     setShowCoffeesModal(true);
//   };

//   const handleRatingChange = async (newRating: number, shopId: string) => {
//     try {
//       await updateShopRating({
//         variables: {
//           shopId,
//           rating: newRating
//         },
//         refetchQueries: [{ query: GET_USER_SHOPS }]
//       });
//     } catch (error) {
//       console.error('Error updating rating:', error);
//     }
//   };

//   return (
//     <Container>
//       <h3 className="mt-4 fw-light">Your Shops</h3>
//       <hr />

//       {/* need to set shop output */}
//       <section className="d-grid gap-4 shop-output">
//         {shopData && !shopData.getUserShops.length && <p>No shops have beed added yet.</p>}

//         {shopData && shopData.getUserShops.map((shop: Shop) => (
//           <article key={shop._id} className="border p-4">
//             <h4>{shop.name}</h4>
//             <p>Location: {shop.location}</p>
//             <ReactStars
//               count={5}
//               value={shop.rating}
//               onChange={(newRating: any) => handleRatingChange(newRating, shop._id)} // TODO 
//               size={24}
//               activeColor="#FFD700"
//               edit={true}
//             />

//             <div className="d-flex button-wrap">
//               <Button
//                 variant="primary"
//                 className="me-2"
//                 onClick={() => handleShowCreateCoffeeModal(shop)}>Add Coffee</Button>
//               <Button
//                 variant="secondary"
//                 className="me-2"
//                 onClick={() => handleShowCoffeesModal(shop)}>View Coffee</Button>
//             </div>
//           </article>
//         ))}
//       </section>

//       <CreateCoffeeModal
//         selectedShop={selectedShop}
//         showCreateCoffeeModal={showCreateCoffeeModal}
//         setShowCreateCoffeeModal={setShowCreateCoffeeModal}
//       />

//       <ViewCoffeeModal
//         showCoffeesModal={showCoffeesModal}
//         setShowCoffeesModal={setShowCoffeesModal}
//         selectedShop={selectedShop}
//       />

//     </Container>
//   )
// }

// export default Dashboard;