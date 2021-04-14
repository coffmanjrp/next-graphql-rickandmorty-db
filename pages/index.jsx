import { useState } from 'react';
import Head from 'next/head';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  Heading,
  Input,
  Stack,
  IconButton,
  Box,
  Flex,
  Link,
  Image,
  useToast,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import CharacterCards from '../components/CharacterCards';

function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  const [search, setSearch] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await fetch('/api/SearchCharacters', {
      method: 'post',
      body: search,
    });
    const { characters, error } = await results.json();
    if (error) {
      toast({
        position: 'bottom',
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setCharacters(characters);
    }
  };

  const handleResetButton = async () => {
    setSearch('');
    setCharacters(initialState.characters);
  };

  return (
    <Flex direction="column" justify="center" align="center">
      <Head>
        <title>Rick and Morty DB</title>
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
          Rick and Morty
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack maxW="350px" w="100%" isInline mb={8}>
            <Input
              placeholder="Search"
              value={search}
              border="none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Search database"
              icon={<SearchIcon />}
              disabled={search === ''}
              type="submit"
            />
            <IconButton
              colorScheme="red"
              aria-label="Reset "
              icon={<CloseIcon />}
              disabled={search === ''}
              onClick={handleResetButton}
            />
          </Stack>
        </form>
        <CharacterCards characters={characters} />
      </Flex>

      <Flex
        as="footer"
        justify="center"
        align="center"
        w="100%"
        h="100px"
        borderTop="1px solid #eaeaea"
      >
        <Link
          href="https://vercel.com?utm_source=create-next-app&amp;utm_medium=default-template&amp;utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          d="flex"
          justify="center"
          align="center"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" ml="0.5rem" h="25px" />
        </Link>
      </Flex>
    </Flex>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
            next
            prev
          }
          results {
            name
            id
            image
            location {
              name
            }
            origin {
              name
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}

export default Home;
