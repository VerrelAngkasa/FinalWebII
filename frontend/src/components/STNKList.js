import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const STNKList = ({ stnkdata, onDelete, onEdit }) => {
  return (
    <div className="mt-4">
      {stnkdata.map((item) => (
        <Card key={item._id} className="mb-3">
          <Card.Body>
            <Row>
              <Col md={10}>
                <h5>{item.layanan} - {item.nomor_plat}</h5>
                <p><strong>Nama:</strong> {item.nama}</p>
                <p><strong>Alamat:</strong> {item.alamat}</p>
                <p><strong>Merk:</strong> {item.merk} | <strong>Tipe:</strong> {item.tipe} | <strong>Tahun:</strong> {item.tahun}</p>
                <p><strong>Harga:</strong> Rp{item.harga.toLocaleString()}</p>
              </Col>
              <Col md={2} className="d-flex flex-column align-items-end justify-content-center">
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(item)} className="mb-2">
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(item._id)}>
                  Hapus
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default STNKList;
