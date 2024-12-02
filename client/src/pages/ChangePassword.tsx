import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { CHANGE_PASSWORD } from '../graphql/mutations';

const initialFormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  errorMessage: ''
};

function ChangePassword() {
  const [formData, setFormData] = useState(initialFormData);
  const [changePassword] = useMutation(CHANGE_PASSWORD);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setFormData({
        ...formData,
        errorMessage: 'New password and confirm password do not match'
      });
      return;
    }

    try {
      await changePassword({
        variables: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }
      });

      navigate('/dashboard');
    } catch (error: any) {
      setFormData({
        ...formData,
        errorMessage: error.message
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit} style={{ width: '500px' }} className="mx-auto mt-5">
        <h2 className="text-center mt-3">Change Password</h2>

        {formData.errorMessage && (
          <p className="text-center text-danger">{formData.errorMessage}</p>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Current Password</Form.Label>
          <Form.Control
            name="currentPassword"
            value={formData.currentPassword}
            type="password"
            placeholder="Enter current password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="newPassword"
            value={formData.newPassword}
            type="password"
            placeholder="Enter new password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            name="confirmPassword"
            value={formData.confirmPassword}
            type="password"
            placeholder="Confirm new password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Change Password
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ChangePassword;