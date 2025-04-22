import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AdminForm = ({ formData, onChange, onSubmit, isLogin }) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="your-email@example.com"
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Your password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        {isLogin ? 'Login' : 'Signup'}
      </Button>
    </Form>
  );
};

export default AdminForm;
