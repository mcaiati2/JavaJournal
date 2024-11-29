import { Button, Modal } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import { GET_COFFEES_FOR_SHOP } from '../../../graphql/queries';
import { Shop, Coffee } from '../../../interfaces';

interface ModalProps {
  showCoffeesModal: boolean;
  setShowCoffeesModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedShop: Shop | null;
}

function ViewCoffeeModal({
  showCoffeesModal,
  setShowCoffeesModal,
  selectedShop
}: ModalProps) {
  const { data: coffeeData } = useQuery(GET_COFFEES_FOR_SHOP, {
    variables: {
      shopId: selectedShop?._id
    }
  });

  const handleModalClose = () => setShowCoffeesModal(false);

  return (
    <Modal show={showCoffeesModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Coffees for {selectedShop?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {coffeeData && !coffeeData.getCoffeesForShop.length && (
          <p>No coffees have been added.</p>
        )}

        {coffeeData && coffeeData.getCoffeesForShop.map((coffee: Coffee) => (
          <article key={coffee._id} className="mb-4">
            <h5>{coffee.title}</h5>
            <p>{coffee.body}</p>
          </article>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ViewCoffeeModal;