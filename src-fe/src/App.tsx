import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './auth/protected-route.tsx'
import { LoginPage } from './pages/login-page.tsx'

import Layout from './layout/layout.tsx'
import ShoppingListLayout from './layout/shopping-list-layout.tsx'

import ShoppingList from './pages/shopping-list/shopping-list.tsx'
import ShoppingListItem from './pages/shopping-list/shopping-list-item.tsx'

//debug
import type { ShoppingListOutputType } from "./types/shopping-list-output-type"
import type { EntityOutputType } from "./types/entity-output-type"
import { useState } from "react"
import type { AllowedUserOutputType } from './types/allowed-user-output-type.ts'
import type { UserOutputType } from './types/user-output-type.ts'
//debug

const App = () => {
  const [shoppingListsData, setShoppingListsData] = useState<ShoppingListOutputType[]>([
    {
      _id: "1",
      idOwner: "1",
      name: "Nákupní seznam 2",
      isDeleted: false
    },
    {
      _id: "2",
      idOwner: "2",
      name: "Nákupní seznam 4",
      isDeleted: true
    }
  ])
  const [entitiesData, setEntitiesData] = useState<EntityOutputType[]>([
    {
      _id: "1",
      idShoppingList: "1",
      description: "Rohlíky",
      isDone: false
    },
    {
      _id: "2",
      idShoppingList: "1",
      description: "Máslo",
      isDone: false
    },
    {
      _id: "3",
      idShoppingList: "1",
      description: "Jablka",
      isDone: true
    },
    {
      _id: "4",
      idShoppingList: "2",
      description: "Čaj",
      isDone: false
    },
    {
      _id: "5",
      idShoppingList: "2",
      description: "Brambory",
      isDone: false
    }
  ])
  const [allowedUsers, setAllowedUsers] = useState<AllowedUserOutputType[]>([
    {
      _id: "1",
      idShoppingList: "1",
      idUser: "2"
    },
    {
      _id: "2",
      idShoppingList: "2",
      idUser: "1"
    }
  ])
  const [users] = useState<UserOutputType[]>([
    {
      _id: "1",
      login: "FrantaFlinta"
    },
    {
      _id: "2",
      login: "KarelStodola"
    },
    {
      _id: "3",
      login: "MarieVeliká"
    }
  ])

  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Navigate to='/shopping-list' replace />} />
          <Route path='/shopping-list' element={<ShoppingListLayout />}>
            <Route path='' element={<ShoppingList shoppingListsData={shoppingListsData} setShoppingListsData={setShoppingListsData} users={users} />} />
            <Route path=':id' element={<ShoppingListItem shoppingListsData={shoppingListsData} setShoppingListsData={setShoppingListsData} entitiesData={entitiesData} setEntitiesData={setEntitiesData} allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers} users={users} />} />
          </Route>
        </Route>
      </Routes>
    </Layout>
  )
}

export default App