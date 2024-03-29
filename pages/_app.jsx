import { ChakraProvider } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider>
      <AnimatePresence>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
            },
            pageExit: {
              backgroundColor: 'white',
              filter: `invert()`,
              opacity: 0,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ChakraProvider>
  );
}

export default MyApp;
