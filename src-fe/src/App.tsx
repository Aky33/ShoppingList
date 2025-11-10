import { Routes, Route } from 'react-router-dom'

import Layout from './layout/Layout.tsx'
import ShoppingListLayout from './layout/ShoppingListLayout.tsx'

import ShoppingList from './pages/shopping-list/shopping-list.tsx'
import ShoppingListItem from './pages/shopping-list/shopping-list-item.tsx'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/shopping-list' element={<ShoppingListLayout />}>
          <Route path='' element={<ShoppingList />} />
          <Route path=':id' element={<ShoppingListItem />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App