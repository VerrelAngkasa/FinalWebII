import React, { useEffect, useState } from 'react';
import { Box, TextInput, Textarea, Button, Select, Radio, Stack, Group, Title, } from '@mantine/core';

const SIMForm = ({ onSubmit, initialSIM = null }) => {
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
        e.preeventDefault();
        onSubmit({
            layanan,
            nama,
            alamat,
            tipe,
            tahun,
            harga,
            _id: initialSIM ? initialSIM._id : undefined,
        });

        // Reset form after submission
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
        <Box component="form" onSubmit={handleSubmit} p="md" style={{ border: '1px solid #e2e8f0', borderRadius: 8 }}>
            <Stack spacing="md">
                <Title order={4}>Formulir SIM</Title>

                <Select
                    label="Layanan"
                    placeholder="Pilih tipe layanan"
                    data={[
                        { value: 'Pembaharuan STNK', label: 'Pembaharuan STNK' },
                        { value: 'Pembuatan SIM', label: 'Pembuatan SIM' },
                    ]}
                    value={layanan}
                    onChange={setLayanan}
                    required
                />

                <TextInput
                    label="Nama"
                    placeholder="Masukkan nama"
                    value={nama}
                    onChange={(e) => setNama(e.currentTarget.value)}
                    required
                />

                <Textarea
                    label="Alamat"
                    placeholder="Masukkan alamat"
                    value={alamat}
                    onChange={(e) => setAlamat(e.currentTarget.value)}
                    autosize
                    minRows={2}
                    required
                />

                <Radio.Group
                    name="tipe"
                    label="Tipe SIM"
                    value={tipe}
                    onChange={setTipe}
                    required
                >
                    <Group mt="xs">
                        <Radio value="SIM A" label="SIM A" />
                        <Radio value="SIM B1" label="SIM B1" />
                        <Radio value="SIM C" label="SIM C" />
                    </Group>
                </Radio.Group>

                <TextInput
                    label="Tahun"
                    placeholder="Tahun pembuatan"
                    type="number"
                    value={tahun}
                    onChange={(e) => setTahun(e.currentTarget.value)}
                    required
                />

                <TextInput
                    label="Harga"
                    placeholder="Harga"
                    type="number"
                    value={harga}
                    onChange={(e) => setHarga(e.currentTarget.value)}
                    required
                />

                <Button type="submit" fullWidth color="green">
                    {initialSIM ? 'Perbarui Data SIM' : 'Tambah Data SIM'}
                </Button>
            </Stack>
        </Box>
    );
};

export default SIMForm;