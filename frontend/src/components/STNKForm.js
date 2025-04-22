import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';

const STNKForm = ({ onSubmit, initialSTNK = null }) => {
  const [formData, setFormData] = useState({
    layanan: '',
    nomor_plat: '',
    nama: '',
    alamat: '',
    merk: '',
    tipe: '',
    tahun: '',
    harga: '',
  });

  useEffect(() => {
    if (initialSTNK) {
      setFormData({
        layanan: initialSTNK.layanan || '',
        nomor_plat: initialSTNK.nomor_plat || '',
        nama: initialSTNK.nama || '',
        alamat: initialSTNK.alamat || '',
        merk: initialSTNK.merk || '',
        tipe: initialSTNK.tipe || '',
        tahun: initialSTNK.tahun || '',
        harga: initialSTNK.harga || '',
        _id: initialSTNK._id || undefined,
      });
    } else {
      setFormData({
        layanan: '',
        nomor_plat: '',
        nama: '',
        alamat: '',
        merk: '',
        tipe: '',
        tahun: '',
        harga: '',
      });
    }
  }, [initialSTNK]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialSTNK) {
      setFormData({
        layanan: '',
        nomor_plat: '',
        nama: '',
        alamat: '',
        merk: '',
        tipe: '',
        tahun: '',
        harga: '',
      });
    }
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Layanan</Form.Label>
            <Form.Select name="layanan" value={formData.layanan} onChange={handleChange} required>
              <option value="">Pilih layanan</option>
              <option value="Pembaharuan STNK">Pembaharuan STNK</option>
              <option value="Pembuatan SIM">Pembuatan SIM</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nomor Plat</Form.Label>
                <Form.Control name="nomor_plat" value={formData.nomor_plat} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control name="nama" value={formData.nama} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Alamat</Form.Label>
            <Form.Control as="textarea" name="alamat" value={formData.alamat} onChange={handleChange} required />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Merk</Form.Label>
                <Form.Control name="merk" value={formData.merk} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tipe</Form.Label>
                <Form.Control name="tipe" value={formData.tipe} onChange={handleChange} required />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tahun</Form.Label>
                <Form.Control type="number" name="tahun" value={formData.tahun} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Harga</Form.Label>
            <Form.Control type="number" name="harga" value={formData.harga} onChange={handleChange} required />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            {initialSTNK ? 'Perbarui Data STNK' : 'Tambah Data STNK'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default STNKForm;
