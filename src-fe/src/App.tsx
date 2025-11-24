import { Routes, Route, Navigate } from 'react-router-dom'

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
  const [shoppingListData, setShoppingListData] = useState<ShoppingListOutputType>({
    _id: "00000000000",
    name: "Nákupní seznam 2"
  })
  const [entitiesData, setEntitiesData] = useState<EntityOutputType[]>([
    {
      _id: "00000000001",
      idShoppingList: "00000000000",
      description: "Rohlíky",
      isDone: false
    },
    {
      _id: "00000000002",
      idShoppingList: "00000000000",
      description: "Máslo",
      isDone: false
    },
    {
      _id: "00000000003",
      idShoppingList: "00000000000",
      description: "Jablka",
      isDone: true
    }
  ])
  const [allowedUsers, setAllowedUsers] = useState<AllowedUserOutputType[]>([
    {
      _id: "000001",
      idShoppingList: "00000000000",
      idUser: "000001"
    },
    {
      _id: "000002",
      idShoppingList: "00000000000",
      idUser: "000002"
    },
  ])
  const [users] = useState<UserOutputType[]>([
    {
      _id: "000001",
      login: "FrantaFlinta"
    },
    {
      _id: "000002",
      login: "KarelStodola"
    },
    {
      _id: "000003",
      login: "MarieVeliká"
    }
  ])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/shopping-list/00000000000" replace />} />
        <Route path='/shopping-list' element={<ShoppingListLayout />}>
          <Route path='' element={<ShoppingList />} />
          <Route path=':id' element={<ShoppingListItem shoppingListData={shoppingListData} setShoppingListData={setShoppingListData} entitiesData={entitiesData} setEntitiesData={setEntitiesData} allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers} users={users} />} />
        </Route>
      </Routes>
    </Layout>
  )
}

export default App