import { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { CREATE_COFFEE } from '../../../graphql/mutations';
import { GET_COFFEES_FOR_SHOP, GET_ALL_COFFEES } from '../../../graphql/queries';
import { Shop } from '../../../interfaces';

const initialFormData = {
  title: '',
  body: '',
  errorMessage: ''
};

interface ModalProps {
  selectedShop: Shop | null;
  showCreateCoffeeModal: boolean;
  setShowCreateCoffeeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateCoffeeModal({
  selectedShop,
  showCreateCoffeeModal,
  setShowCreateCoffeeModal
}: ModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [createCoffee] = useMutation(CREATE_COFFEE, {
    refetchQueries: [{
      query: GET_COFFEES_FOR_SHOP,
      variables: {
        shopId: selectedShop?._id
      }
    }, { query: GET_ALL_COFFEES }]
  });

  const handleModalClose = () => {
    setFormData({ ...initialFormData });
    setShowCreateCoffeeModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      await createCoffee({
        variables: {
          ...formData,
          shop: selectedShop?._id
        }
      });

      setFormData({ ...initialFormData });

      handleModalClose();
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }

  return (
    <Modal show={showCreateCoffeeModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create coffee for {selectedShop?.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {formData.errorMessage && <Alert variant="danger">{formData.errorMessage}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={formData.title}
              type="text"
              placeholder="Enter the name of your coffee"
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter the coffee details</Form.Label>
            <Form.Control
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              as="textarea"
              rows={3}
              placeholder="Type your details" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Coffee
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateCoffeeModal;