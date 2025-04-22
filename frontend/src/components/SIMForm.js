import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const SIMForm = ({ onSubmit, initialSIM = null, token }) => {
    const [layanan, setLayanan] = useState('');
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tipe, setTipe] = useState('');
    const [tahun, setTahun] = useState('');
    const [harga, setHarga] = useState('');

    // Effect to set initial values when editing
    useEffect(() => {
        if (initialSIM) {
            setLayanan(initialSIM.layanan);
            setNama(initialSIM.nama);
            setAlamat(initialSIM.alamat);
            setTipe(initialSIM.tipe);
            setTahun(initialSIM.tahun);
            setHarga(initialSIM.harga);
        } else {
            setLayanan('');
            setNama('');
            setAlamat('');
            setTipe('');
            setTahun('');
            setHarga('');
        }
    }, [initialSIM]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Adding token to the request headers
        onSubmit({
            layanan,
            nama,
            alamat,
            tipe,
            tahun,
            harga,
            _id: initialSIM ? initialSIM._id : undefined,
            token: token,  // Attach token to the form data
        });

        // Reset form after submission if it's a new SIM entry
        if (!initialSIM) {
            setLayanan('');
            setNama('');
            setAlamat('');
            setTipe('');
            setTahun('');
            setHarga('');
        }
    };

    return (
        <Form onSubmit={handleSubmit} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '20px' }}>
            <h4>{initialSIM ? 'Perbarui Data SIM' : 'Tambah Data SIM'}</h4>

            <Form.Group controlId="layanan">
                <Form.Label>Layanan</Form.Label>
                <Form.Control
                    as="select"
                    value={layanan}
                    onChange={(e) => setLayanan(e.target.value)}
                    required
                >
                    <option value="">Pilih tipe layanan</option>
                    <option value="Pembaharuan STNK">Pembaharuan STNK</option>
                    <option value="Pembuatan SIM">Pembuatan SIM</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Masukkan nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="alamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                    as="textarea"
                    placeholder="Masukkan alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    rows={3}
                    required
                />
            </Form.Group>

            <Form.Group controlId="tipe">
                <Form.Label>Tipe SIM</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Check
                        type="radio"
                        label="SIM A"
                        value="SIM A"
                        checked={tipe === 'SIM A'}
                        onChange={(e) => setTipe(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="SIM B1"
                        value="SIM B1"
                        checked={tipe === 'SIM B1'}
                        onChange={(e) => setTipe(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="SIM C"
                        value="SIM C"
                        checked={tipe === 'SIM C'}
                        onChange={(e) => setTipe(e.target.value)}
                    />
                </InputGroup>
            </Form.Group>

            <Form.Group controlId="tahun">
                <Form.Label>Tahun Pembuatan</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Masukkan tahun"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="harga">
                <Form.Label>Harga</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Harga"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    required
                />
            </Form.Group>

            <Button variant="success" type="submit" block>
                {initialSIM ? 'Perbarui Data SIM' : 'Tambah Data SIM'}
            </Button>
        </Form>
    );
};

export default SIMForm;
