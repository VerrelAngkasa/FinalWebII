import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllSTNK, createSTNK, getSTNKById, updateSTNKById, deleteSTNKById } from '../services/STNKService';
import { BsArrowLeft } from 'react-icons/bs';
import axios from 'axios';
import styled from 'styled-components';
import { StyledPage } from '../components/Style';

const STNKContainer = styled(Container)`
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

const STATUS_COLORS = {
  'Pending': 'warning',
  'In Progress': 'info',
  'Done': 'success'
};

const STATUS_PRIORITY = {
  'Pending': 1,
  'In Progress': 2,
  'Done': 3
};

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Done'];

const STNKPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSTNK, setSelectedSTNK] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    layanan: 'Pembaharuan STNK',
    nomor_plat: '',
    nama: '',
    alamat: '',
    merk: '',
    tipe: '',
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

  useEffect(() => {
    const checkTokenAndFetchData = async () => {
      const token = getAuthToken();
      if (!token) {
        setShowModal(true);
      } else {
        setAuthHeader();
        await fetchData(); // Add this line to fetch data after auth check
      }
    };
    checkTokenAndFetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  // Update fetchData to include better error handling
  const fetchData = async () => {
    try {
      const result = await getAllSTNK();
      if (!Array.isArray(result)) {
        console.error('Invalid data format received:', result);
        showNotification('Format data tidak valid');
        return;
      }

      const sortedData = result.sort((a, b) => {
        const statusCompare = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        if (statusCompare !== 0) return statusCompare;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      console.log('Fetched and sorted data:', sortedData);
      setData(sortedData);
    } catch (err) {
      console.error('Error fetching data:', err);
      showNotification('Gagal memuat data STNK');
    }
  };

  const validateForm = () => {
    if (!formData.nama || !formData.alamat || !formData.nomor_plat ||
      !formData.merk || !formData.tipe || formData.harga <= 0) {
      showNotification('Semua field harus diisi dengan benar');
      return false;
    }
    return true;
  };

  const handleCreateSTNK = async () => {
    try {
      if (!validateForm()) return;

      const dataToSend = {
        layanan: 'Pembaharuan STNK', // Make sure this matches exactly what backend expects
        nomor_plat: formData.nomor_plat.trim(),
        nama: formData.nama.trim(),
        alamat: formData.alamat.trim(),
        merk: formData.merk.trim(),
        tipe: formData.tipe.trim(),
        tahun: Number(formData.tahun),
        harga: Number(formData.harga),
        status: 'Pending'
      };

      await createSTNK(dataToSend);
      setShowCreateModal(false);
      setFormData({
        layanan: 'Pembaharuan STNK',
        nomor_plat: '',
        nama: '',
        alamat: '',
        merk: '',
        tipe: '',
        tahun: new Date().getFullYear(),
        harga: 0,
        status: 'Pending'
      });
      await fetchData();
      showNotification('Data STNK berhasil ditambahkan');
    } catch (err) {
      console.error('Error creating STNK:', err.response?.data || err.message);
      showNotification(err.response?.data?.message || 'Gagal menambahkan data STNK.');
    }
  };

  const handleDetailClick = async (id) => {
    try {
      if (!id || typeof id !== 'string') {
        showNotification('ID STNK tidak valid atau tidak terdefinisi');
        return;
      }
      const stnk = await getSTNKById(id);
      if (!stnk) {
        showNotification('Data STNK tidak ditemukan');
        return;
      }
      setSelectedSTNK(stnk);
      setShowDetailModal(true);
    } catch (err) {
      console.error('Error fetching detail:', err);
      showNotification('Gagal memuat detail STNK');
    }
  };

  const handleEditClick = async (id) => {
    try {
      if (!id || typeof id !== 'string') {
        showNotification('ID STNK tidak valid atau tidak terdefinisi');
        return;
      }
      const stnk = await getSTNKById(id);
      if (!stnk) {
        showNotification('Data STNK tidak ditemukan');
        return;
      }
      setSelectedSTNK(stnk);
      setFormData({
        ...formData,
        nomor_plat: stnk.nomor_plat,
        status: stnk.status
      });
      setShowEditModal(true);
    } catch (err) {
      console.error('Error fetching data for edit:', err);
      showNotification('Gagal memuat data untuk edit');
    }
  };

  const handleUpdateSTNK = async () => {
    try {
      if (!selectedSTNK?._id) {
        showNotification('ID STNK tidak valid');
        return;
      }

      const updateData = {
        nomor_plat: formData.nomor_plat.trim(),
        status: formData.status
      };

      await updateSTNKById(selectedSTNK._id, updateData);
      setShowEditModal(false);
      await fetchData();
      showNotification('Data STNK berhasil diperbarui');
    } catch (err) {
      console.error('Error updating:', err.response?.data || err.message);
      showNotification(err.response?.data?.message || 'Gagal memperbarui data STNK');
    }
  };

  const handleDeleteClick = (stnk) => {
    if (!stnk?._id || typeof stnk._id !== 'string') {
      console.error('Missing or invalid STNK id:', stnk);
      showNotification('ID STNK tidak valid atau tidak terdefinisi');
      return;
    }
    setSelectedSTNK(stnk);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedSTNK?._id || typeof selectedSTNK._id !== 'string') {
        showNotification('ID STNK tidak valid atau tidak terdefinisi');
        return;
      }
      await deleteSTNKById(selectedSTNK._id);
      setShowDeleteModal(false);
      await fetchData();
      showNotification('Data STNK berhasil dihapus');
    } catch (err) {
      console.error('Error deleting:', err);
      showNotification('Gagal menghapus data STNK');
    }
  };

  return (
    <StyledPage>
      <STNKContainer fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <ActionButton
              variant="link"
              className="p-0 me-3"
              onClick={() => navigate('/dashboard')}
            >
              <BsArrowLeft size={24} />
            </ActionButton>
            <PageTitle>Data Pembaharuan STNK | Sumatera Jaya Abadi</PageTitle>
          </div>
          <ActionButton variant="primary" onClick={() => setShowCreateModal(true)}>
            + Tambah Data
          </ActionButton>
        </div>

        {/* Update the card mapping section */}
        <Row className="g-4">
          {data.length === 0 ? (
            <Col xs={12}>
              <Alert variant="info" className="text-center rounded-3 shadow-sm">
                Belum ada data Pembaharuan STNK
              </Alert>
            </Col>
          ) : (
            data.map((stnk) => (
              <Col key={stnk._id} lg={3} md={6}>
                <DataCard>
                  <Card.Body>
                    <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-truncate">{stnk.nama}</span>
                      <Badge bg={STATUS_COLORS[stnk.status]} className="ms-2">
                        {stnk.status}
                      </Badge>
                    </Card.Title>
                    <div className="mb-3">
                      <p className="mb-2">
                        <strong>Nomor Plat:</strong>{' '}
                        <span className="text-muted">{stnk.nomor_plat}</span>
                      </p>
                      <p className="mb-2">
                        <strong>Alamat:</strong>{' '}
                        <span className="text-wrap">{stnk.alamat}</span>
                      </p>
                      <p className="mb-2">
                        <strong>Merk:</strong>{' '}
                        <span>{stnk.merk}</span>
                      </p>
                      <p className="mb-2">
                        <strong>Harga:</strong>{' '}
                        <span>Rp {stnk.harga?.toLocaleString('id-ID')}</span>
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <ActionButton
                        size="sm"
                        variant="info"
                        onClick={() => handleDetailClick(stnk._id)}
                      >
                        Detail
                      </ActionButton>
                      <ActionButton
                        size="sm"
                        variant="warning"
                        onClick={() => handleEditClick(stnk._id)}
                      >
                        Edit
                      </ActionButton>
                      <ActionButton
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteClick(stnk)}
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

        <StyledModal show={showCreateModal} onHide={() => setShowCreateModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Data STNK</Modal.Title>
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
                <Form.Label>Nomor Plat</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nomor_plat}
                  onChange={(e) => setFormData({ ...formData, nomor_plat: e.target.value })}
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
                <Form.Label>Merk</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.merk}
                  onChange={(e) => setFormData({ ...formData, merk: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipe</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.tipe}
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                  required
                />
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
            <Button variant="primary" onClick={handleCreateSTNK}>
              Simpan
            </Button>
          </Modal.Footer>
        </StyledModal>

        <StyledModal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Detail STNK</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSTNK && (
              <div>
                <p><strong>Layanan:</strong> {selectedSTNK.layanan}</p>
                <p><strong>Nama:</strong> {selectedSTNK.nama}</p>
                <p><strong>Nomor Plat:</strong> {selectedSTNK.nomor_plat}</p>
                <p><strong>Alamat:</strong> {selectedSTNK.alamat}</p>
                <p><strong>Merk:</strong> {selectedSTNK.merk}</p>
                <p><strong>Tipe:</strong> {selectedSTNK.tipe}</p>
                <p><strong>Tahun:</strong> {selectedSTNK.tahun}</p>
                <p><strong>Harga:</strong> Rp {selectedSTNK.harga?.toLocaleString('id-ID')}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge bg={STATUS_COLORS[selectedSTNK.status]}>
                    {selectedSTNK.status}
                  </Badge>
                </p>
                <p><strong>Dibuat:</strong> {new Date(selectedSTNK.createdAt).toLocaleString()}</p>
                <p><strong>Diperbarui:</strong> {new Date(selectedSTNK.updatedAt).toLocaleString()}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </StyledModal>

        <StyledModal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Data STNK</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nomor Plat</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nomor_plat}
                  onChange={(e) => setFormData({ ...formData, nomor_plat: e.target.value })}
                  required
                />
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
            <Button variant="primary" onClick={handleUpdateSTNK}>
              Simpan
            </Button>
          </Modal.Footer>
        </StyledModal>

        <StyledModal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Hapus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Apakah Anda yakin ingin menghapus data STNK {selectedSTNK?.nama}?
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
      </STNKContainer>
    </StyledPage >
  );

};

export default STNKPage;