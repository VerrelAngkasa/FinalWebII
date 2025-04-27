import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllSTNK, getSTNKById, updateSTNKById, deleteSTNKById } from '../services/STNKService';

const getAuthToken = () => localStorage.getItem('jwtToken');

const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const STNKPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedSTNK, setSelectedSTNK] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedPlat, setUpdatedPlat] = useState('');
  const [alert, setAlert] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const fetchData = async () => {
    try {
      const result = await getAllSTNK();
      setData(result);
    } catch (err) {
      setAlert('Gagal memuat data STNK.');
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = getAuthToken();
      if (!token) {
        setShowErrorModal(true); // Tampilkan modal jika token tidak ada
      } else {
        setAuthHeader();
        try {
          await axios.get('/api/auth/validate-token'); // Validasi token
          fetchData(); // Ambil data jika token valid
        } catch (error) {
          setShowErrorModal(true); // Tampilkan modal jika token tidak valid
        }
      }
    };

    checkToken();
  }, []);

  const handleLoginRedirect = () => {
    navigate('/admin/login'); // Arahkan ke halaman login
  };

  const handleEdit = async (id) => {
    try {
      const stnk = await getSTNKById(id);
      setSelectedSTNK(stnk);
      setUpdatedPlat(stnk.nomor_plat);
      setShowModal(true);
    } catch (err) {
      setAlert('Gagal mengambil data STNK.');
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSTNKById(selectedSTNK._id, { nomor_plat: updatedPlat });
      setShowModal(false);
      fetchData();
    } catch (err) {
      setAlert('Gagal memperbarui data STNK.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSTNKById(id);
      fetchData();
    } catch (err) {
      setAlert('Gagal menghapus data STNK.');
    }
  };

  return (
    <>
      <Container className="mt-4">
        <h3 className="text-center mb-4">Data Pembaharuan STNK</h3>
        {alert && <Alert variant="danger">{alert}</Alert>}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nomor Plat</th>
              <th>Nama</th>
              <th>Tahun</th>
              <th>Harga</th>
              <th>Updated At</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((stnk) => (
              <tr key={stnk.id}>
                <td>{stnk.nomor_plat}</td>
                <td>{stnk.nama}</td>
                <td>{stnk.tahun}</td>
                <td>{stnk.harga}</td>
                <td>{new Date(stnk.updatedAt).toLocaleString()}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(stnk.id)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(stnk.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal Edit */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Nomor Plat</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Nomor Plat</Form.Label>
              <Form.Control
                type="text"
                value={updatedPlat}
                onChange={(e) => setUpdatedPlat(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Batal</Button>
            <Button variant="primary" onClick={handleUpdate}>Simpan</Button>
          </Modal.Footer>
        </Modal>
      </Container>

      {/* Modal Error */}
      <Modal show={showErrorModal} onHide={handleLoginRedirect} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error: Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda tidak memiliki akses. Silakan login terlebih dahulu.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLoginRedirect}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default STNKPage;