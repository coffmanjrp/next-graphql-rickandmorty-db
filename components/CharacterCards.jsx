import NextLink from 'next/link';
import { Heading, Text, SimpleGrid, Flex, Image, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function CharacterCards({ characters }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing="40px">
      {characters.map((character) => (
        <NextLink href={`/character/${character.id}`} passHref>
          <Link>
            <motion.div
              key={character.id}
              whileHover={{
                scale: [1, 1.4, 1.2],
                rotate: [0, 10, -10, 0],
                filter: [
                  'hue-rotate(0) contrast(100%)',
                  'hue-rotate(360deg) contrast(200%)',
                  'hue-rotate(45deg) contrast(300%)',
                  'hue-rotate(0) contrast(100%)',
                ],
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <Flex
                justify="center"
                flexDirection="column"
                p="1.5rem"
                backgroundColor="white"
                color="inherit"
                border="1px solid #eaeaea"
                borderRadius="10px"
                transition="color 0.15s ease, border-color 0.15s ease"
                zIndex="1"
              >
                <Image src={character.image} w="fill" />
                <Heading as="h4" align="center" size="md" my="0.5rem">
                  {character.name}
                </Heading>
                <Text align="center"> Origin: {character.origin.name}</Text>
                <Text align="center"> Location: {character.location.name}</Text>
              </Flex>
            </motion.div>
          </Link>
        </NextLink>
      ))}
    </SimpleGrid>
  );
}

export default CharacterCards;
