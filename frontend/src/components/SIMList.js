import React from 'react';
import { Box, Stack, Title, Text, ActionIcon, Group, Paper } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const SIMList = ({ simdata, onDelete, onEdit }) => {
  return (
    <Stack spacing="md" w="100%">
      {simdata.map((sim) => (
        <Paper key={sim._id} withBorder shadow="sm" p="md" radius="md" bg="yellow.1">
          <Group position="apart" align="flex-start">
            <Box style={{ flex: 1 }}>
              <Title order={4} mb="xs">
                {simdata.layanan}
              </Title>
              <Text>{simdata.content}</Text>
            </Box>
            <Group spacing="xs">
              <ActionIcon color="blue" variant="outline" onClick={() => onEdit(simdata)}>
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon color="red" variant="outline" onClick={() => onDelete(simdata._id)}>
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Paper>
      ))}
    </Stack>
  );
};

export default SIMList;
