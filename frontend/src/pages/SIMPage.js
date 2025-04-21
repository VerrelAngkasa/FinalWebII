import React, { useState, useEffect, useCallback } from 'react';
import { Container, Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import SIMForm from '../components/SIMForm';
import SIMList from '../components/SIMList';
import * as dataSIMService from '../services/dataSIMService';

const SIMPage = () => {
  const [sim, setSIMData] = useState([]);
  const [editingSIM, setEditingSIM] = useState(null);

  const fetchSIMData = useCallback(async () => {
    try {
      const fetchedSIMData = await dataSIMService.getAllSIM();
      setSIMData(fetchedSIMData);
    } catch (err) {
      showNotification({
        title: 'Gagal mengambil data SIM',
        color: 'red',
        message: 'Terjadi kesalahan saat memuat data dari server.',
      });
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
          title: 'Berhasil diperbarui',
          message: 'Data SIM berhasil diperbarui.',
          color: 'green',
        });
      } else {
        const newSIM = await dataSIMService.createSIM(simData);
        setSIMData([newSIM, ...sim]);

        showNotification({
          title: 'Berhasil ditambahkan',
          message: 'Data SIM baru berhasil ditambahkan.',
          color: 'green',
        });
      }
    } catch (err) {
      showNotification({
        title: 'Terjadi kesalahan',
        message: 'Gagal menambahkan atau memperbarui data SIM.',
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
        title: 'Berhasil dihapus',
        message: 'Data SIM berhasil dihapus.',
        color: 'green',
      });
    } catch (err) {
      showNotification({
        title: 'Gagal menghapus',
        message: 'Terjadi kesalahan saat menghapus data SIM.',
        color: 'red',
      });
    }
  };

  const handleEditSIM = (sim) => {
    setEditingSIM(sim);
  };

  return (
    <Container size="md" py="lg">
      <Stack spacing="xl">
        <Title order={2}>Pembuatan SIM | Sumatra Jaya Abadi</Title>
        <SIMForm onSubmit={handleAddSIM} initialSIM={editingSIM} />
        <SIMList sim={sim} onDelete={handleDeleteSIM} onEdit={handleEditSIM} />
      </Stack>
    </Container>
  );
};

export default SIMPage;