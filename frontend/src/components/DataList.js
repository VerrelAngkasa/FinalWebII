import React from "react";
import { Box, VStack, Heading, Text, IconButton, HStack } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const NoteList = ({ notes, onDelete, onEdit }) => {
  return (
    <VStack spacing={4} width="full">
      {notes.map((note) => (
        <Box key={note._id} width="full" p={4} background="yellow.200" borderWidth={1} borderRadius="md">
          <HStack justifyContent="space-between" alignItems="start">
            <Box flex={1}>
              <Heading size="md" mb={2}>
                {note.title}
              </Heading>
              <Text>{note.content}</Text>
            </Box>
            <HStack>
              <IconButton icon={<EditIcon />} colorScheme="blue" variant="outline" onClick={() => onEdit(note)} />
              <IconButton icon={<DeleteIcon />} colorScheme="red" variant="outline" onClick={() => onDelete(note._id)} />
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default NoteList;
