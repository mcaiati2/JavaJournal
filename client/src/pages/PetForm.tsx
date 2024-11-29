import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

import { CREATE_PET } from '../graphql/mutations';
import { GET_USER_PETS } from '../graphql/queries';

const initialFormData = {
  name: '',
  type: '',
  age: 0,
  errorMessage: ''
};

function PetForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [createPet] = useMutation(CREATE_PET, {
    refetchQueries: [{ query: GET_USER_PETS }]
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
      await createPet({
        variables: {
          ...formData,
          age: Number(formData.age)
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
        <h2 className="text-center mt-3">Create Pet</h2>

        {formData.errorMessage && (
          <p className="text-center text-danger">{formData.errorMessage}</p>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" onChange={handleInputChange} value={formData.name} type="text" placeholder="Enter the pet's name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control name="type" onChange={handleInputChange} value={formData.type} type="text" placeholder="Enter the pet's type" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Enter the Pet's Age</Form.Label>
          <Form.Control name="age" onChange={handleInputChange} value={formData.age} type="number" />
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

export default PetForm;

