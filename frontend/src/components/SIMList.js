import React from 'react';
import { Card, Button, Row, Col, Stack } from 'react-bootstrap';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const SIMList = ({ simdata, onDelete, onEdit }) => {
  return (
    <Stack gap={3}>
      {simdata.map((sim) => (
        <Card key={sim._id} border="light" style={{ width: '100%' }}>
          <Card.Body>
            <Row className="d-flex align-items-start">
              <Col xs={8}>
                <Card.Title>{sim.layanan}</Card.Title>
                <Card.Text>{sim.content}</Card.Text>
              </Col>
              <Col xs={4} className="d-flex justify-content-end">
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(sim)}  // Passing the entire SIM object
                >
                  <IconEdit size={18} />
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => onDelete(sim._id)}  // Passing the SIM ID to delete
                >
                  <IconTrash size={18} />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default SIMList;
