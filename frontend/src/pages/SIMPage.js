import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container, Alert } from 'react-bootstrap';
import { getAllSIM, getSIMById, updateSIMById, deleteSIMById } from '../services/SIMService';

const SIMPage = () => {
  const [data, setData] = useState([]);
  const [selectedSIM, setSelectedSIM] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedTipe, setUpdatedTipe] = useState('');
  const [alert, setAlert] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getAllSIM();
      setData(result);
    } catch (err) {
      setAlert('Gagal memuat data SIM.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const sim = await getSIMById(id);
      setSelectedSIM(sim);
      setUpdatedTipe(sim.tipe);
      setShowModal(true);
    } catch (err) {
      setAlert('Gagal mengambil data SIM.');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSIMById(selectedSIM._id, { tipe: updatedTipe });
      setShowModal(false);
      fetchData();
    } catch (err) {
      setAlert('Gagal memperbarui data SIM.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSIMById(id);
      fetchData();
    } catch (err) {
      setAlert('Gagal menghapus data SIM.');
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Data Pembuatan SIM</h3>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Tipe</th>
            <th>Tahun</th>
            <th>Harga</th>
            <th>Updated At</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sim) => (
            <tr key={sim.id}>
              <td>{sim.nama}</td>
              <td>{sim.tipe}</td>
              <td>{sim.tahun}</td>
              <td>{sim.harga}</td>
              <td>{new Date(sim.updatedAt).toLocaleString()}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(sim.id)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(sim.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tipe SIM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tipe</Form.Label>
            <Form.Control
              as="select"
              value={updatedTipe}
              onChange={(e) => setUpdatedTipe(e.target.value)}
            >
              <option value="SIM A">SIM A</option>
              <option value="SIM B1">SIM B1</option>
              <option value="SIM C">SIM C</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
          <Button variant="primary" onClick={handleUpdate}>Simpan</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SIMPage;
