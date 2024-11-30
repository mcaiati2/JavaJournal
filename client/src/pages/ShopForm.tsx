import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { CREATE_SHOP } from '../graphql/mutations';
import { GET_USER_SHOPS } from '../graphql/queries';

const initialFormData = {
  name: '',
  location: '',
  rating: '',
  errorMessage: ''
};

function ShopForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [createShop] = useMutation(CREATE_SHOP, {
    refetchQueries: [{ query: GET_USER_SHOPS }]
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createShop({
        variables: {
          ...formData,
          rating: Number(formData.rating)
        }
      });

      navigate('/dashboard');
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: '500px' }} className="mx-auto mt-5">
        <h2 className="text-center mt-3">Create Shop</h2>

        {formData.errorMessage && (
          <p className="text-center text-danger">{formData.errorMessage}</p>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Enter the shop's name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" onChange={handleInputChange} value={formData.location} type="text" placeholder="Enter the shop's location" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter the Shop's Rating</Form.Label>
          <Form.Control name="rating" onChange={handleInputChange} value={formData.rating} type="number" />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default ShopForm;

