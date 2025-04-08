import React, { useState, useEffect, useCallback } from "react";
import { Container, VStack, Heading, useToast } from "@chakra-ui/react";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import * as noteService from "../../services/noteService"; //penghubung dengan backend.

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const toast = useToast();

  const fetchNotes = useCallback(async () => {
    try {
      const fetchedNotes = await noteService.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      toast({
        title: "Gagal mengambil catatan dari server",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleAddNote = async (noteData) => {
    try {
      if (noteData._id) {
        // Proses update
        const updatedNote = await noteService.updateNote(noteData._id, {
          title: noteData.title,
          content: noteData.content,
        });

        // Update notes di state
        setNotes(notes.map((note) => (note._id === noteData._id ? updatedNote : note)));

        // Reset editing
        setEditingNote(null);

        toast({
          title: "Catatan diperbarui",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        // Proses tambah catatan baru
        const newNote = await noteService.createNote(noteData);
        setNotes([newNote, ...notes]);

        toast({
          title: "Catatan ditambahkan",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal menyimpan catatan",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await noteService.deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));

      // Reset editing jika catatan yang dihapus sedang diedit
      if (editingNote && editingNote._id === id) {
        setEditingNote(null);
      }

      toast({
        title: "Catatan dihapus",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Gagal menghapus catatan",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} width="full">
        <Heading>Aplikasi Catatan Sederhana</Heading>

        <NoteForm onSubmit={handleAddNote} initialNote={editingNote} />

        <NoteList notes={notes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
      </VStack>
    </Container>
  );
};

export default NotesPage;
