import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import Layout from './components/layout'
import PageLoader from './components/shared/PageLoader'
import PokemonDetailPage from './pages/PokemonDetailPage'
import PokemonListPage from './pages/PokemonListPage'

function App() {

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />

            <Route
              path="/pokemon/:id"
              element={
                <Suspense fallback={<PageLoader />}>
                  <PokemonDetailPage />
                </Suspense>
              }
            />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App
