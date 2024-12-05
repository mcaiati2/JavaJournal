import { useQuery } from '@apollo/client';
import { GET_SHOP_RATINGS } from '../../../graphql/queries';
import ReactStars from 'react-rating-stars-component';

interface ShopProps {
  shopId: string;
}
const ShopRating: React.FC<ShopProps> = ({ shopId }) => {
  const { loading, error, data } = useQuery(GET_SHOP_RATINGS, {
    variables: { shopId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const ratings = data.shop.coffees.map((coffee: { rating: number }) => coffee.rating);
  const averageRating = ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length;
  return (
    <div>
      <h2>{data.shop.name}</h2>
      <ReactStars
        count={5}
        value={averageRating}
        edit={true}
        size={24}
        activeColor="#f9c8a1"
      />
    </div>
  );
};
export default ShopRating;