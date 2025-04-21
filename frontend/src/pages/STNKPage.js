import React, { useState, useEffect, useCallback } from 'react';
import { Container, VStack, Heading, Toast } from '@chakra-ui/react';
import STNKForm from '../components/STNKForm';
import STNKList from '../components/STNKList';
import * as dataSTNKService from '../services/dataSTNKService';

const STNKPage = () => {
    const [stnk, setSTNKData] = useState([]);
    const [editingSTNK, setEditingSTNK] = useState(null);
    const toast = Toast();

    const fetchSTNKData = useCallback(async () => {
        try {
            const fetchedSTNKData = await dataSTNKService.getAllSTNK();
            setSTNKData(fetchedSTNKData);
        } catch (err) {
            toast({
                title: 'Error fetching STNK data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

    }, [toast]);

    useEffect(() => {
        fetchSTNKData();
    }, [fetchSTNKData]);

    const handleAddSTNK = async (stnkData) => {
        try {
            if (stnkData._id) {
                const updateSTNK = await dataSTNKService.updateSTNKById(stnkData._id, {
                    tipe: stnkData.tipe,
                });

                // Update STNK data at state
                setSTNKData(stnk.map((stnk) => (stnk._id === stnkData._id ? updateSTNK : stnk)));

                // Reset editingSTNK state
                setEditingSTNK(null);

                toast({
                    title: 'Successfully updated STNK data',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Proses tambah catatan baru
                const newSTNK = await dataSTNKService.createSTNK(stnkData);
                setSTNKData([newSTNK, ...stnk]);

                toast({
                    title: 'Successfully created new STNK data',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (err) {
            toast({
                title: "Error handling STNK data",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDeleteSTNK = async (id) => {
        try {
            await dataSTNKService.deleteSTNKById(id);
            setSTNKData(stnk.filter((stnk) => stnk._id !== id));

            // Reset editing STNK if STNK data is being deleted
            if (editingSTNK && editingSTNK._id === id) {
                setEditingSTNK(null);
            }

            toast({
                title: 'Successfully deleted STNK data',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: 'Error deleting STNK data',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleEditSTNK = (stnk) => {
        setEditingSTNK(stnk);
    };

    return (
        <Container maxW = 'container.md' py={8}>
            <VStack spacing = {8} width = 'full'>
                <Heading>Pembaharuan STNK Sumatra Jaya Abadi</Heading>

                <STNKForm onSubmit={handleAddSTNK} initialSTNK={editingSTNK} />

                <STNKList stnk={stnk} onDelete={handleDeleteSTNK} onEdit={handleEditSTNK} />
            </VStack>
        </Container>
    );
};

export default STNKPage;