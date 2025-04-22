import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { showNotification } from '@mantine/notifications'; // Keep this if you want to use Mantine notifications
import SIMForm from '../components/SIMForm';
import SIMList from '../components/SIMList';
import * as dataSIMService from '../services/SIMService';

const SIMPage = () => {
  const [sim, setSIMData] = useState([]);
  const [editingSIM, setEditingSIM] = useState(null);
  const [error, setError] = useState(null);

  const fetchSIMData = useCallback(async () => {
    try {
      const fetchedSIMData = await dataSIMService.getAllSIM();
      setSIMData(fetchedSIMData);
    } catch (err) {
      setError(err.message || 'Error fetching SIM data');
    }
  }, []);

  useEffect(() => {
    fetchSIMData();
  }, [fetchSIMData]);

  const handleAddSIM = async (simData) => {
    try {
      if (simData._id) {
        const updatedSIM = await dataSIMService.updateSIMById(simData._id, {
          tipe: simData.tipe,
        });
        setSIMData(sim.map((s) => (s._id === simData._id ? updatedSIM : s)));
        setEditingSIM(null);

        showNotification({
          title: 'Successfully updated',
          message: 'SIM data updated.',
          color: 'green',
        });
      } else {
        const newSIM = await dataSIMService.createSIM(simData);
        setSIMData([newSIM, ...sim]);

        showNotification({
          title: 'Successfully added',
          message: 'New SIM data added.',
          color: 'green',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to add or update SIM data.');
      showNotification({
        title: 'Error',
        message: err.message || 'Failed to add or update SIM data.',
        color: 'red',
      });
    }
  };

  const handleDeleteSIM = async (id) => {
    try {
      await dataSIMService.deleteSIMById(id);
      setSIMData(sim.filter((s) => s._id !== id));

      if (editingSIM && editingSIM._id === id) {
        setEditingSIM(null);
      }

      showNotification({
        title: 'Successfully deleted',
        message: 'SIM data deleted.',
        color: 'green',
      });
    } catch (err) {
      setError(err.message || 'Failed to delete SIM data.');
      showNotification({
        title: 'Error',
        message: err.message || 'Failed to delete SIM data.',
        color: 'red',
      });
    }
  };

  const handleEditSIM = async (sim) => {
    setEditingSIM(sim);
    try {
      const simData = await dataSIMService.getSIMById(sim._id); // Fetch data by ID for editing
      setEditingSIM(simData);
    } catch (err) {
      setError(err.message || 'Error fetching SIM data for editing');
      showNotification({
        title: 'Error',
        message: err.message || 'Failed to fetch SIM data for editing.',
        color: 'red',
      });
    }
  };

  return (
    <Container className="mt-5">
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}
      <Row>
        <Col>
          <h2 className="mb-4">Pembuatan SIM | Sumatra Jaya Abadi</h2>
          <SIMForm onSubmit={handleAddSIM} initialSIM={editingSIM} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SIMList sim={sim} onDelete={handleDeleteSIM} onEdit={handleEditSIM} />
        </Col>
      </Row>
    </Container>
  );
};

export default SIMPage;
