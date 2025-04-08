import React, { useEffect, useState } from "react";
import { Box, FormControl, FormLabel, Input, Textarea, Button, VStack } from "@chakra-ui/react";

const NoteForm = ({ onSubmit, initialNote = null }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Efek untuk memperbarui form saat initialNote berubah
  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || "");
      setContent(initialNote.content || "");
    } else {
      // Reset form jika tidak ada initialNote
      setTitle("");
      setContent("");
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      content,
      _id: initialNote ? initialNote._id : undefined,
    });

    // Reset form setelah submit
    if (!initialNote) {
      setTitle("");
      setContent("");
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Judul Catatan</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul catatan" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Isi Catatan</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Tulis catatan Anda di sini" rows={4} />
        </FormControl>
        <Button colorScheme="blue" type="submit" width="full">
          {initialNote ? "Perbarui Catatan" : "Tambah Catatan"}
        </Button>
      </VStack>
    </Box>
  );
};

export default NoteForm;
