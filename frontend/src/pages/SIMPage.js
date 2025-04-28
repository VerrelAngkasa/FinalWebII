import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllSIM, createSIM, getSIMById, updateSIMById, deleteSIMById } from '../services/SIMService';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import styled from 'styled-components';
import { StyledPage } from '../components/Style';

const SIMContainer = styled(Container)`
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 100vh;
  padding: 2rem;
`;

const DataCard = styled(Card)`
  transition: all 0.3s ease;
  border: none !important;
  border-radius: 15px !important;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .badge {
    padding: 0.5em 1em;
    font-weight: 500;
  }
`;

const ActionButton = styled(Button)`
  transition: all 0.3s ease;
  border-radius: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 15px;
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    border-bottom: 1px solid #eee;
    background: #f8f9fa;
    border-radius: 15px 15px 0 0;
  }

  .modal-footer {
    border-top: 1px solid #eee;
    background: #f8f9fa;
    border-radius: 0 0 15px 15px;
  }
`;

const PageTitle = styled.h2`
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 0;
`;

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
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    layanan: 'Pembuatan SIM',
    nama: '',
    alamat: '',
    tipe: 'SIM A',
    tahun: new Date().getFullYear(),
    harga: 0,
    status: 'Pending'
  });

  const showNotification = (message) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 3000);
  };

  const tipeSIM = ['SIM A', 'SIM B1', 'SIM C'];

  const STATUS_COLORS = {
    'Pending': 'warning',
    'In Progress': 'info',
    'Done': 'success'
  };

  // Add this after your STATUS_COLORS constant
  const STATUS_PRIORITY = {
    'Pending': 1,
    'In Progress': 2,
    'Done': 3
  };

  const STATUS_OPTIONS = ['Pending', 'In Progress', 'Done'];

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

  const fetchData = async () => {
    try {
      const result = await getAllSIM();
      // Sort data based on status priority
      const sortedData = result.sort((a, b) => {
        // First sort by status priority
        const statusCompare = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        if (statusCompare !== 0) return statusCompare;

        // If status is same, sort by creation date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      console.log('Fetched and sorted data:', sortedData);
      setData(sortedData);
    } catch (err) {
      console.error('Error fetching data:', err);
      showNotification('Gagal memuat data SIM.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    if (!formData.nama || !formData.alamat || formData.harga <= 0) {
      showNotification('Semua field harus diisi dengan benar');
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

      await createSIM(dataToSend);
      setShowCreateModal(false);
      setFormData({
        layanan: 'Pembuatan SIM',
        nama: '',
        alamat: '',
        tipe: 'SIM A',
        tahun: new Date().getFullYear(),
        harga: 0,
        status: 'Pending'
      });
      await fetchData();
      showNotification('Data SIM berhasil ditambahkan');
    } catch (err) {
      console.error('Error creating SIM:', err);
      showNotification('Gagal menambahkan data SIM.');
    }
  };

  const handleDetailClick = async (id) => {
    try {
      console.log('Fetching detail for ID:', id);
      if (!id) {
        showNotification('ID SIM tidak valid');
        return;
      }
      const sim = await getSIMById(id);
      if (!sim) {
        showNotification('Data SIM tidak ditemukan');
        return;
      }
      setSelectedSIM(sim);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error fetching detail:', err);
      showNotification('Gagal memuat detail SIM');
    }
  };

  const handleEditClick = async (id) => {
    try {
      console.log('Fetching data for edit, ID:', id);
      if (!id) {
        showNotification('ID SIM tidak valid');
        return;
      }
      const sim = await getSIMById(id);
      if (!sim) {
        showNotification('Data SIM tidak ditemukan');
        return;
      }
      setSelectedSIM(sim);
      setFormData({
        ...formData,
        tipe: sim.tipe,
        status: sim.status
      });
      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching data for edit:', err);
      showNotification('Gagal memuat data untuk edit');
    }
  };

  const handleUpdateSIM = async () => {
    try {
      if (!selectedSIM?._id) {
        showNotification('ID SIM tidak valid');
        return;
      }
      await updateSIMById(selectedSIM._id, {
        tipe: formData.tipe,
        status: formData.status
      });
      setShowEditModal(false);
      await fetchData();
      showNotification('Data SIM berhasil diperbarui');
    } catch (err) {
      console.error('Error updating:', err);
      showNotification('Gagal memperbarui data SIM');
    }
  };

  const handleDeleteClick = (sim) => {
    if (!sim || !sim._id) {
      console.error('Missing SIM id:', sim);
      showNotification('ID SIM tidak valid');
      return;
    }
    setSelectedSIM(sim);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedSIM || !selectedSIM._id) {
        console.error('Missing selectedSIM _id:', selectedSIM);
        showNotification('ID SIM tidak valid');
        return;
      }
      await deleteSIMById(selectedSIM._id);
      setShowDeleteModal(false);
      await fetchData();
      showNotification('Data SIM berhasil dihapus');
    } catch (err) {
      console.error('Error deleting:', err);
      showNotification('Gagal menghapus data SIM');
    }
  };

  return (
    <StyledPage>
      <Container fluid className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <ActionButton
              variant="link"
              className="p-0 me-3"
              onClick={() => navigate('/dashboard')}
            >
              <BsArrowLeft size={24} />
            </ActionButton>
            <PageTitle>Data Pembuatan SIM | Sumatera Jaya Abadi</PageTitle>
          </div>
          <ActionButton variant="primary" onClick={() => setShowCreateModal(true)}>
            + Tambah Data
          </ActionButton>
        </div>

        <Row className="g-4">
          {data.length === 0 ? (
            <Col xs={12}>
              <Alert variant="info" className="text-center rounded-3 shadow-sm">
                Belum ada data Pembuatan SIM
              </Alert>
            </Col>
          ) : (
            data.map((sim) => (
              <Col key={sim._id} lg={3} md={6}>
                <DataCard>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-truncate">{sim.nama}</span>
                      <Badge bg={STATUS_COLORS[sim.status]} className="ms-2">
                        {sim.status}
                      </Badge>
                    </Card.Title>
                    <div className="mb-3">
                      <p className="mb-2">
                        <strong>Alamat:</strong>{' '}
                        <span className="text-wrap">{sim.alamat}</span>
                      </p>
                      <p className="mb-2">
                        <strong>Tipe:</strong>{' '}
                        <span className="text-muted">{sim.tipe}</span>
                      </p>
                      <p className="mb-2">
                        <strong>Tahun:</strong>{' '}
                        {sim.tahun}
                      </p>
                      <p className="mb-2">
                        <strong>Harga:</strong>{' '}
                        <span>Rp {sim.harga?.toLocaleString('id-ID')}</span>
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <ActionButton
                        size="sm"
                        variant="info"
                        onClick={() => handleDetailClick(sim._id)}
                      >
                        Detail
                      </ActionButton>
                      <ActionButton
                        size="sm"
                        variant="warning"
                        onClick={() => handleEditClick(sim._id)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(sim)}
                      >
                        Hapus
                      </ActionButton>
                    </div>
                  </Card.Body>
                </DataCard>
              </Col>
            ))
          )}
        </Row>

        <StyledModal show={showModal} onHide={() => navigate('/admin/login')} centered>
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
        </StyledModal>

        <StyledModal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
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
        </StyledModal>

        <StyledModal show={showDetailModal} onHide={() => setShowDetailModal(false)}>
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
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge bg={STATUS_COLORS[selectedSIM.status]}>
                    {selectedSIM.status}
                  </Badge>
                </p>
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
        </StyledModal>

        <StyledModal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data SIM</Modal.Title>
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
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
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
        </StyledModal>

        <StyledModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
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
        </StyledModal>
      </Container>
    </StyledPage>
  );
};

export default SIMPage;