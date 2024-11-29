import { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';

import { CREATE_POST } from '../../../graphql/mutations';
import { GET_POSTS_FOR_PET, GET_ALL_POSTS } from '../../../graphql/queries';
import { Pet } from '../../../interfaces';

const initialFormData = {
  title: '',
  body: '',
  errorMessage: ''
};

interface ModalProps {
  selectedPet: Pet | null;
  showCreatePostModal: boolean;
  setShowCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreatePostModal({
  selectedPet,
  showCreatePostModal,
  setShowCreatePostModal
}: ModalProps) {
  const [formData, setFormData] = useState(initialFormData);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{
      query: GET_POSTS_FOR_PET,
      variables: {
        petId: selectedPet?._id
      }
    }, { query: GET_ALL_POSTS }]
  });

  const handleModalClose = () => {
    setFormData({ ...initialFormData });
    setShowCreatePostModal(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async () => {
    try {
      await createPost({
        variables: {
          ...formData,
          pet: selectedPet?._id
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
    <Modal show={showCreatePostModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create post for {selectedPet?.name}</Modal.Title>
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
              placeholder="Enter the title of your post"
              autoFocus
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter the post details</Form.Label>
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
          Add Post
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreatePostModal;