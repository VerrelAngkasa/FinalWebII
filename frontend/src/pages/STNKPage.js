import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import STNKForm from '../components/STNKForm';
import STNKList from '../components/STNKList';
import * as dataSTNKService from '../services/STNKService';

const STNKPage = () => {
  const [stnk, setSTNKData] = useState([]);
  const [editingSTNK, setEditingSTNK] = useState(null);
  const [alert, setAlert] = useState(null);

  const fetchSTNKData = useCallback(async () => {
    try {
      const fetchedSTNKData = await dataSTNKService.getAllSTNK();
      setSTNKData(fetchedSTNKData);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Gagal memuat data STNK' });
    }
  }, []);

  useEffect(() => {
    fetchSTNKData();
  }, [fetchSTNKData]);

  const handleAddSTNK = async (stnkData) => {
    try {
      if (stnkData._id) {
        const updated = await dataSTNKService.updateSTNKById(stnkData._id, stnkData);
        setSTNKData((prev) =>
          prev.map((s) => (s._id === stnkData._id ? updated : s))
        );
        setAlert({ type: 'success', message: 'Data STNK berhasil diperbarui' });
      } else {
        const created = await dataSTNKService.createSTNK(stnkData);
        setSTNKData((prev) => [created, ...prev]);
        setAlert({ type: 'success', message: 'Data STNK berhasil ditambahkan' });
      }
      setEditingSTNK(null);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Gagal memproses data STNK' });
    }
  };

  const handleDeleteSTNK = async (id) => {
    try {
      await dataSTNKService.deleteSTNKById(id);
      setSTNKData((prev) => prev.filter((s) => s._id !== id));
      setAlert({ type: 'success', message: 'Data STNK berhasil dihapus' });

      if (editingSTNK && editingSTNK._id === id) {
        setEditingSTNK(null);
      }
    } catch (err) {
      setAlert({ type: 'danger', message: 'Gagal menghapus data STNK' });
    }
  };

  const handleEditSTNK = async (stnk) => {
    try {
      const data = await dataSTNKService.getSTNKById(stnk._id);
      setEditingSTNK(data);
    } catch (err) {
      setAlert({ type: 'danger', message: 'Gagal memuat detail data STNK' });
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center">Pembaharuan STNK | Sumatra Jaya Abadi</h2>

      {alert && (
        <Alert
          variant={alert.type}
          dismissible
          onClose={() => setAlert(null)}
        >
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col md={6}>
          <STNKForm onSubmit={handleAddSTNK} initialSTNK={editingSTNK} />
        </Col>
        <Col md={6}>
          <STNKList stnkdata={stnk} onEdit={handleEditSTNK} onDelete={handleDeleteSTNK} />
        </Col>
      </Row>
    </Container>
  );
};

export default STNKPage;
