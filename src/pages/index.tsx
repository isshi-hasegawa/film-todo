import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { Flex, Grid, Spinner } from '@chakra-ui/react'
import Header from 'src/components/header'
import Tasks from 'src/components/tasks'
import Search from 'src/components/search'
import About from 'src/components/about'
import Footer from 'src/components/footer'
import { useIsShowSearchState } from 'src/hooks/isShowSearchState'

const Home: NextPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn()
    }
  }, [session])

  const { isShowSearch } = useIsShowSearchState()

  return (
    <>
      <Head>
        <title>俺の映画リスト</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {!session ? (
        <Flex direction="column" minH="100vh" placeItems="center">
          <About />
          <Footer />
        </Flex>
      ) : (
        <Flex direction="column" minH="100vh">
          <Header />
          <Grid placeItems="center" px="1rem" py="72px" flex={1}>
            {!isShowSearch ? <Tasks /> : <Search />}
          </Grid>
          <Footer />
        </Flex>
      )}
    </>
  )
}

export default Home
