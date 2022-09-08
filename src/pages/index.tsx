import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { Button, Grid, Heading, Spinner } from '@chakra-ui/react'
import SignIn from './auth/signin'
import Header from 'src/components/Header'
import Tasks from 'src/components/Tasks'
import { useState } from 'react'
import Search from 'src/components/Search'

const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const [taskListId, setTaskListId] = useState<string>('')
  const [isShowSearchMovies, setIsShowSearchMovies] = useState<boolean>(false)

  if (status === 'loading')
    return (
      <Grid h="100vh" placeItems="center" px="5rem">
        <Spinner size="xl" />
      </Grid>
    )

  return (
    <>
      {!session && (
        <Grid
          sx={{
            h: '100vh',
            placeItems: 'center',
            px: '5rem',
          }}
        >
          <Heading>ログインしてください</Heading>
          <SignIn />
        </Grid>
      )}
      {session && !isShowSearchMovies && (
        <>
          <Header
            setTaskListId={setTaskListId}
            setIsShowSearchMovies={setIsShowSearchMovies}
          />
          <Grid placeItems="center" px="5rem" paddingTop="72px">
            <Button my={4} onClick={() => setIsShowSearchMovies(true)}>
              タスクを登録する
            </Button>
            <Tasks taskListId={taskListId} />
          </Grid>
        </>
      )}
      {session && isShowSearchMovies && (
        <>
          <Header
            setTaskListId={setTaskListId}
            setIsShowSearchMovies={setIsShowSearchMovies}
          />
          <Grid placeItems="center" px="5rem" paddingTop="72px">
            <Search taskListId={taskListId} />
          </Grid>
        </>
      )}
    </>
  )
}

export default Home
