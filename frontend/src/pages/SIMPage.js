import React, { useState, useEffect, useCallback } from 'react';
import { Container, VStack, Heading, useToast } from '@chakra-ui/react';
import SIMForm from '../components/SIMForm';
import SIMList from '../components/STNKForm';
import * as dataSIMService from '../services/dataSIMService';

const SIMPage = () => {
    const [sim, setSIMData] = useState([]);
    const [editingSIM, setEditingSIM] = useState(null);
    const toast = useToast();

    const fetchSIMData = useCallback(async () => {
        try {
            const fetchedSIMData = await dataSIMService.getAllSIM();
            setSIMData(fetchedSIMData);
        } catch (err) {
            toast({
                title: 'Error fetching SIM data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

    }, [toast]);

    useEffect(() => {
        fetchSIMData();
    }, [fetchSIMData]);

    const handleAddSIM = async (simData) => {
        try {
            if (simData._id) {
                const updateSIM = await dataSIMService.updateSIMById(simData._id, {
                    tipe: simData.tipe,
                });

                // Update SIM data at state
                setSIMData(sim.map((sim) => (sim._id === simData._id ? updateSIM : sim)));

                // Reset editingSIM state
                setEditingSIM(null);

                toast({
                    title: 'Successfully updated SIM data',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Proses tambah catatan baru
                const newSIM = await dataSIMService.createSIM(simData);
                setSIMData([newSIM, ...sim]);

                toast({
                    title: 'Successfully created new SIM data',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (err) {
            toast({
                title: "Error handling SIM data",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSIM = async (id) => {
        try {
            await dataSIMService.deleteSIMById(id);
            setSIMData(sim.filter((sim) => sim._id !== id));

            // Reset editing SIM if SIM data is being deleted
            if (editingSIM && editingSIM._id === id) {
                setEditingSIM(null);
            }

            toast({
                title: 'Successfully deleted SIM data',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: 'Error deleting SIM data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEditSIM = (sim) => {
        setEditingSIM(sim);
    };

    return (
        <Container maxW = 'container.md' py={8}>
            <VStack spacing = {8} width = 'full'>
                <Heading>Aplikasi Sumatra Jaya Abadi</Heading>

                <SIMForm onSubmit={handleAddSIM} initialSIM={editingSIM} />

                <SIMList sim={sim} onDelete={handleDeleteSIM} onEdit={handleEditSIM} />
            </VStack>
        </Container>
    );
};

export default SIMPage;