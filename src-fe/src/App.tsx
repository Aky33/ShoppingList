import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './auth/protected-route.tsx'
import { LoginPage } from './pages/login-page.tsx'

import Layout from './layout/layout.tsx'
import ShoppingListLayout from './layout/shopping-list-layout.tsx'

import ShoppingList from './pages/shopping-list/shopping-list.tsx'
import ShoppingListItem from './pages/shopping-list/shopping-list-item.tsx'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Navigate to='/shopping-list' replace />} />
          <Route path='/shopping-list' element={<ShoppingListLayout />}>
            <Route path='' element={<ShoppingList />} />
            <Route path=':id' element={<ShoppingListItem />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  )
}

export default App