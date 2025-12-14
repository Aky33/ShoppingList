import {  useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Card, Button, Modal, Form, Alert } from "react-bootstrap"
import type { FormEvent } from "react"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next";

import EntityList from "../../components/entity-list/entity-list"
import EntityListAddForm from "../../components/entity-list/entity-list-add-form"

import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import type { EntityOutputType } from "../../types/entity-output-type"
import type { AllowedUserOutputType } from "../../types/allowed-user-output-type"
import AllowedUsersList from "../../components/allowed-users/allowed-users-list"
import AllowedUsersListAddForm from "../../components/allowed-users/allowed-users-list-add-form"
import { useFetch } from "../../hooks/use-fetch"
import usePut from "../../hooks/use-put"
import useDelete from "../../hooks/use-delete"
import usePost from "../../hooks/use-post"
import type { EntityInputType } from "../../types/entity-input-type"
import type { AllowedUserInputType } from "../../types/allowed-user-input-type"
import type { EntityUpdateType } from "../../types/entity-update-type"
import type { ShoppingListUpdateType } from "../../types/shopping-list-update-type"

const ShoppingListItem = () => {
    const { t } = useTranslation("shoppingListItem");

    const params = useParams<{id: string}>()
    console.log("Params ID:", params.id);

    const {data: shoppingListsData, refetch: shoppingListsRefetch, error: shoppingListsError} = useFetch<ShoppingListOutputType[]>(`http://localhost:8080/shopping-lists/find?id=${params.id}`)
    const updateShoppingListData = usePut<ShoppingListUpdateType>('http://localhost:8080/shopping-lists/update')
    const shoppingList = shoppingListsData?.[0]

    const {data: entitiesData, refetch: entitiesRefetch, error: entitiesError} = useFetch<EntityOutputType[]>(shoppingList ? 'http://localhost:8080/list-items/find?idShoppingList=' + shoppingList?._id : null)
    const insertEntityData = usePost<EntityInputType>('http://localhost:8080/list-items/insert')
    const updateEntityData = usePut<EntityUpdateType>('http://localhost:8080/list-items/update')
    const deleteEntityData = useDelete('http://localhost:8080/list-items/delete')

    const {data: allowedUsers, refetch: allowedUsersRefetch, error: allowedUsersError} = useFetch<AllowedUserOutputType[]>(shoppingList ? 'http://localhost:8080/allowed-users/find?idShoppingList=' + shoppingList?._id : null)
    const insertAllowedUserData = usePost<AllowedUserInputType>('http://localhost:8080/allowed-users/insert')
    const deleteUserData = useDelete('http://localhost:8080/allowed-users/delete')
    
    const [showOnlyNotDone, setShowOnlyNotDone] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [shoppingListName, setShoppingListName] = useState<string | null>(null)

    useEffect(() => { 
        setShoppingListName(shoppingList? shoppingList.name : null)
    }, [shoppingList?.name])

    const [showAddModal, setShowAddModal] = useState(false)
    const [showAllowedUsersModal, setShowAllowedUsersModal] = useState(false)
    const [showAddAllowedUsersModal, setShowAddAllowedUsersModal] = useState(false)

    // Kontrola shoppingListu jestli se nám nevrátí null
    if (!shoppingList) {
        return (
            <Container>
                {shoppingListsError && <Alert variant="danger">{shoppingListsError}</Alert>}
                <div>Loading...</div>
            </Container>
        )
    }

    const startEditMode = () => setEditMode(true)
    const endEditMode = async (e: FormEvent) => {
        e.preventDefault()

        await updateShoppingListData({
            id: shoppingList._id,
            idOwner: shoppingList.idOwner,
            isDeleted: shoppingList.isDeleted,
            name: shoppingListName!
        })

        shoppingListsRefetch()
        setEditMode(false)
    }

    //Musí být specificky napsáno jinak se perou typy
    const openAddModal = () => setShowAddModal(true)
    const closeAddModal = () => setShowAddModal(false)

    const openAllowedUsersModal = () => setShowAllowedUsersModal(true)
    const closeAllowedUsersModal = () => setShowAllowedUsersModal(false)

    const openAddAllowedUsersModal = () => setShowAddAllowedUsersModal(true)
    const closeAddAllowedUsersModal = () => setShowAddAllowedUsersModal(false)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title className="d-flex justify-content-between align-items-center">        
                        <span>{shoppingList.name}</span>
                        {!editMode && <Button className="btn btn-secondary" onClick={startEditMode}>{t("edit")}</Button>}       {/*Při první příležitosti vyrveme pryč, je to ohavnost, ale úkol to vyžaduje*/}
                        {editMode && <Form onSubmit={endEditMode}><Form.Control id="name" type="text" value={shoppingListName!} onChange={(e) => setShoppingListName(e.target.value)} required /><Button variant="btn btn-secondary" type="submit">{t("edit")}</Button></Form>}
                        <Button className="btn btn-secondary" onClick={openAllowedUsersModal}>Uživatelé</Button>
                    </Card.Title> 
                </Card.Header>
                <Card.Body>
                    {shoppingListsError && <Alert variant="danger">{shoppingListsError}</Alert>}
                    {allowedUsersError && <Alert variant="danger">{allowedUsersError}</Alert>}
                    {entitiesError && <Alert variant="danger">{entitiesError}</Alert>}
                    {entitiesData && entitiesData.length == 0 && <div>{t("empty")}</div>}
                    {entitiesData && <EntityList 
                        entities={entitiesData.filter(item => (showOnlyNotDone && !item.isDone) || !showOnlyNotDone)} 
                        update={(entity: EntityOutputType) => {
                            console.log("Toggling isDone for entity:", entity);

                            updateEntityData({
                                id: entity._id,
                                idShoppingList: entity.idShoppingList,
                                description: entity.description,
                                isDone: !entity.isDone
                            })

                            entitiesRefetch()
                        }}
                        remove={(entity: EntityOutputType) => {
                            console.log("Deleting entity:", entity);

                            deleteEntityData(entity._id)
                            entitiesRefetch()
                        }} />}
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={showOnlyNotDone} onChange={() => setShowOnlyNotDone(!showOnlyNotDone)} id="showOnlyNotDoneSwitch" />
                            <label className="form-check-label" htmlFor="showOnlyNotDoneSwitch">Ukaž pouze nedokončené</label>
                        </div>
                        <Button onClick={openAddModal}>
                            <FaPlus />
                        </Button>
                    </div>

                    <Modal show={showAddModal} onHide={closeAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{t("add")}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <EntityListAddForm 
                                idShoppingList={shoppingList._id}
                                onInsert={(idShoppingList: string, description: string) => {
                                    insertEntityData({
                                        idShoppingList: idShoppingList,
                                        description: description
                                    })

                                    entitiesRefetch()
                                    closeAddModal()
                                }} 
                            />
                        </Modal.Body>
                    </Modal>

                    <Modal show={showAllowedUsersModal} onHide={closeAllowedUsersModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Uživatelé</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {allowedUsers && <AllowedUsersList allowedUsers={allowedUsers} remove={
                                (user: AllowedUserOutputType) => {
                                    deleteUserData(user._id)
                                    allowedUsersRefetch()
                                }} 
                            />}
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="d-flex justify-content-end">
                                <Button onClick={openAddAllowedUsersModal}>
                                    <FaPlus />
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showAddAllowedUsersModal} onHide={closeAddAllowedUsersModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Přidej povoleného uživatele</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AllowedUsersListAddForm 
                                idShoppingList={shoppingList._id}
                                onInsert={(idShoppingList: string, idUser: string) => {
                                    insertAllowedUserData({
                                        idShoppingList: idShoppingList,
                                        idUser: idUser
                                    })

                                    allowedUsersRefetch()
                                    closeAddAllowedUsersModal()
                                }} 
                            />
                        </Modal.Body>
                    </Modal>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default ShoppingListItem