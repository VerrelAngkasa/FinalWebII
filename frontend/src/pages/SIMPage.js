import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllSIM, createSIM, getSIMById, updateSIMById, deleteSIMById } from '../services/SIMService';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';

const getAuthToken = () => localStorage.getItem('jwtToken');

const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const SIMPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSIM, setSelectedSIM] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    layanan: 'Pembuatan SIM',
    nama: '',
    alamat: '',
    tipe: 'SIM A',
    tahun: new Date().getFullYear(),
    harga: 0
  });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = getAuthToken();
      if (!token) {
        setShowModal(true);
      } else {
        setAuthHeader();
      }
    };

    checkToken();
  }, []);

  const tipeSIM = ['SIM A', 'SIM B1', 'SIM C'];

  const fetchData = async () => {
    try {
      const result = await getAllSIM();
      console.log('Fetched data:', result);
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setAlert('Gagal memuat data SIM.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    if (!formData.nama || !formData.alamat || formData.harga <= 0) {
      setAlert('Semua field harus diisi dengan benar');
      return false;
    }
    return true;
  };

  const handleCreateSIM = async () => {
    try {
      if (!validateForm()) return;

      const dataToSend = {
        ...formData,
        harga: Number(formData.harga),
        tahun: Number(formData.tahun)
      };

      console.log('Sending data:', dataToSend);
      const response = await createSIM(dataToSend);
      console.log('Create response:', response);

      setShowCreateModal(false);
      setFormData({
        layanan: 'Pembuatan SIM',
        nama: '',
        alamat: '',
        tipe: 'SIM A',
        tahun: new Date().getFullYear(),
        harga: 0
      });

      await fetchData();
      setAlert('Data SIM berhasil ditambahkan');
    } catch (err) {
      console.error('Error creating SIM:', err);
      setAlert('Gagal menambahkan data SIM.');
    }
  };

  const handleDetailClick = async (id) => {
    try {
      console.log('Fetching detail for ID:', id);
      if (!id) {
        setAlert('ID SIM tidak valid');
        return;
      }
      const sim = await getSIMById(id);
      if (!sim) {
        setAlert('Data SIM tidak ditemukan');
        return;
      }
      setSelectedSIM(sim);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error fetching detail:', err);
      setAlert('Gagal memuat detail SIM');
    }
  };

  const handleEditClick = async (id) => {
    try {
      console.log('Fetching data for edit, ID:', id);
      if (!id) {
        setAlert('ID SIM tidak valid');
        return;
      }
      const sim = await getSIMById(id);
      if (!sim) {
        setAlert('Data SIM tidak ditemukan');
        return;
      }
      setSelectedSIM(sim);
      setFormData({ ...formData, tipe: sim.tipe });
      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching data for edit:', err);
      setAlert('Gagal memuat data untuk edit');
    }
  };

  const handleUpdateSIM = async () => {
    try {
      if (!selectedSIM?._id) {
        setAlert('ID SIM tidak valid');
        return;
      }
      console.log('Updating SIM with ID:', selectedSIM._id);
      await updateSIMById(selectedSIM._id, { tipe: formData.tipe });
      setShowEditModal(false);
      await fetchData();
      setAlert('Data SIM berhasil diperbarui');
    } catch (err) {
      console.error('Error updating:', err);
      setAlert('Gagal memperbarui data SIM');
    }
  };

  const handleDeleteClick = (sim) => {
    console.log('SIM to delete:', sim); // Debug log
    if (!sim || !sim._id) {
      setAlert('ID SIM tidak valid');
      return;
    }
    setSelectedSIM(sim);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedSIM || !selectedSIM._id) {
        setAlert('ID SIM tidak valid');
        return;
      }

      console.log('Deleting SIM with ID:', selectedSIM._id); // Debug log
      await deleteSIMById(selectedSIM._id);
      setShowDeleteModal(false);
      await fetchData();
      setAlert('Data SIM berhasil dihapus');
    } catch (err) {
      console.error('Error deleting:', err);
      setAlert('Gagal menghapus data SIM');
    }
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Button
            variant="link"
            className="p-0 me-3"
            onClick={() => navigate('/dashboard')}
          >
            <BsArrowLeft size={24} />
          </Button>
          <h2 className="mb-0">Data SIM</h2>
        </div>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          Tambah SIM
        </Button>
      </div>

      {alert && (
        <Alert
          variant="info"
          dismissible
          onClose={() => setAlert(null)}
          className="mb-4"
        >
          {alert}
        </Alert>
      )}

      <Row className="g-4">
        {data.map((sim) => (
          <Col key={sim.id} lg={4} md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  <span>{sim.nama}</span>
                  <small className="text-muted">{sim.tipe}</small>
                </Card.Title>
                <Card.Text>
                  <p className="mb-1"><strong>Alamat:</strong> {sim.alamat}</p>
                  <p className="mb-1"><strong>Tahun:</strong> {sim.tahun}</p>
                  <p className="mb-1">
                    <strong>Harga:</strong> Rp {sim.harga?.toLocaleString('id-ID')}
                  </p>
                </Card.Text>
                <div className="d-flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleDetailClick(sim.id)}
                  >
                    Detail
                  </Button>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEditClick(sim.id)}
                  >
                    Edit Tipe
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteClick(sim)} // Pass the entire sim object
                  >
                    Hapus
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Error */}
      <Modal show={showModal} onHide={() => navigate('/admin/login')} centered>
        <Modal.Header closeButton>
          <Modal.Title>Error: Unauthorized</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Anda tidak memiliki akses. Silakan login terlebih dahulu.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => navigate('/admin/login')}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data SIM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipe SIM</Form.Label>
              <Form.Select
                value={formData.tipe}
                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              >
                {tipeSIM.map((tipe) => (
                  <option key={tipe} value={tipe}>{tipe}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                type="number"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="number"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: parseInt(e.target.value) })}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleCreateSIM}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Detail Modal */}
      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail SIM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSIM && (
            <div>
              <p><strong>Layanan:</strong> {selectedSIM.layanan}</p>
              <p><strong>Nama:</strong> {selectedSIM.nama}</p>
              <p><strong>Alamat:</strong> {selectedSIM.alamat}</p>
              <p><strong>Tipe SIM:</strong> {selectedSIM.tipe}</p>
              <p><strong>Tahun:</strong> {selectedSIM.tahun}</p>
              <p><strong>Harga:</strong> Rp {selectedSIM.harga?.toLocaleString('id-ID')}</p>
              <p><strong>Dibuat:</strong> {new Date(selectedSIM.createdAt).toLocaleString()}</p>
              <p><strong>Diperbarui:</strong> {new Date(selectedSIM.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tipe SIM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tipe SIM</Form.Label>
              <Form.Select
                value={formData.tipe}
                onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
              >
                {tipeSIM.map((tipe) => (
                  <option key={tipe} value={tipe}>{tipe}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleUpdateSIM}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus data SIM {selectedSIM?.nama}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SIMPage;