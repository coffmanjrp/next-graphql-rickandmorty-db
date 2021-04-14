import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  Flex,
  Heading,
  HStack,
  Image,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import { SettingsIcon, ChevronLeftIcon } from '@chakra-ui/icons';

const Character = ({ character }) => {
  const router = useRouter();

  if (!character) {
    return 'Loading....';
  }

  const {
    name,
    image,
    gender,
    type,
    location,
    origin,
    species,
    status,
  } = character;

  return (
    <>
      <Head>
        <title>{name} ｜ Rick and Morty DB</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        mb={4}
        flexDirection="column"
        align="center"
        justify="center"
        py={8}
      >
        <Heading as="h1" size="2xl" mb={8}>
          {name}
        </Heading>
        <HStack mb={10}>
          <Image
            src={image}
            alt={name}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
          />
          <List p={10} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
            <ListItem>
              <ListIcon as={SettingsIcon} color="green.500" />
              Species: {species}
            </ListItem>
            <ListItem>
              <ListIcon as={SettingsIcon} color="green.500" />
              Gender: {gender}
            </ListItem>
            {type && (
              <ListItem>
                <ListIcon as={SettingsIcon} color="green.500" />
                Type: {type}
              </ListItem>
            )}
            <ListItem>
              <ListIcon as={SettingsIcon} color="green.500" />
              Origin: {origin.name}
            </ListItem>
            <ListItem>
              <ListIcon as={SettingsIcon} color="green.500" />
              Location: {location.name}
            </ListItem>
            <ListItem>
              <ListIcon as={SettingsIcon} color="green.500" />
              Status: {status}
            </ListItem>
          </List>
        </HStack>
        <Button
          leftIcon={<ChevronLeftIcon />}
          colorScheme="teal"
          variant="solid"
          onClick={() => router.push('/')}
        >
          Go Back
        </Button>
      </Flex>
    </>
  );
};

export async function getStaticProps({ params }) {
  const { id } = params;

  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        character(id: ${id}) {
          id
          name
          status
          species
          type
          gender
          image
          origin {
            name
          }
          location {
            name
          }
        }
      } 
    `,
  });

  return {
    props: {
      character: data.character,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Character;
