import { Heading, Text, SimpleGrid, Flex, Image } from '@chakra-ui/react';

function Characters({ characters }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="40px">
      {characters.map((character) => (
        <Flex
          key={character.id}
          justify="center"
          flexDirection="column"
          p="1.5rem"
          color="inherit"
          border="1px solid #eaeaea"
          borderRadius="10px"
          transition="color 0.15s ease, border-color 0.15s ease"
        >
          <Image src={character.image} w="fill" />
          <Heading as="h4" align="center" size="md" my="0.5rem">
            {character.name}
          </Heading>
          <Text align="center"> Origin: {character.origin.name}</Text>
          <Text align="center"> Location: {character.location.name}</Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
}

export default Characters;
