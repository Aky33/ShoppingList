import { use, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Card, Alert, Button, Modal, Form, FormCheck } from "react-bootstrap"
import type { FormEvent } from "react"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next";

import { useFetch } from "../../hooks/UseFetch"
import EntityList from "../../components/entity-list/entity-list"
import EntityListAddForm from "../../components/entity-list/entity-list-add-form"

import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import type { EntityOutputType } from "../../types/entity-output-type"
import type { AllowedUserOutputType } from "../../types/allowed-user-output-type"
import type { UserOutputType } from "../../types/user-output-type"
import AllowedUsersList from "../../components/allowed-users/allowed-users-list"
import AllowedUsersListAddForm from "../../components/allowed-users/allowed-users-list-add-form"

type Props = {
    shoppingListData: ShoppingListOutputType
    setShoppingListData: React.Dispatch<React.SetStateAction<ShoppingListOutputType>>
    entitiesData: EntityOutputType[]
    setEntitiesData: React.Dispatch<React.SetStateAction<EntityOutputType[]>>
    allowedUsers: AllowedUserOutputType[]
    setAllowedUsers: React.Dispatch<React.SetStateAction<AllowedUserOutputType[]>>
    users: UserOutputType[]
}

const ShoppingListItem = ({shoppingListData, setShoppingListData, entitiesData, setEntitiesData, allowedUsers, setAllowedUsers, users}: Props) => {
    const { t } = useTranslation("shoppingListItem");

    //const params = useParams<{id: string}>()
    //const {data: shoppingListData, refetch: shoppingListRefetch, error: shoppingListError} = useFetch<ShoppingListOutputType>('http://localhost:8080/shopping-list/get' + params.id)
    //const {data: entitiesData, refetch: entitiesRefetch, error: entitiesError} = useFetch<>('http://localhost:8080/shopping-list/get' + params.id)

    const [showOnlyNotDone, setShowOnlyNotDone] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [shoppingListName, setShoppingListName] = useState(shoppingListData.name)

    const [showAddModal, setShowAddModal] = useState(false)
    const [showAllowedUsersModal, setShowAllowedUsersModal] = useState(false)
    const [showAddAllowedUsersModal, setShowAddAllowedUsersModal] = useState(false)


    const startEditMode = () => setEditMode(true)
    const endEditMode = async (e: FormEvent) => {
        e.preventDefault()

        setShoppingListData({ ...shoppingListData, name: shoppingListName })
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
                        <span>{shoppingListData.name}</span>
                        {!editMode && <Button className="btn btn-secondary" onClick={startEditMode}>{t("edit")}</Button>}       {/*Při první příležitosti vyrveme pryč, je to ohavnost, ale úkol to vyžaduje*/}
                        {editMode && <Form onSubmit={endEditMode}><Form.Control id="name" type="text" value={shoppingListName} onChange={(e) => setShoppingListName(e.target.value)} required /><Button variant="btn btn-secondary" type="submit">{t("edit")}</Button></Form>}
                        <Button className="btn btn-secondary" onClick={openAllowedUsersModal}>Uživatelé</Button>
                    </Card.Title> 
                </Card.Header>
                <Card.Body>
                    {/*shoppingListError && <Alert variant="danger">{shoppingListError}</Alert>*/}
                    {/*entitiesError && <Alert variant="danger">{entitiesError}</Alert>*/}
                    {entitiesData && entitiesData.length == 0 && <div>{t("empty")}</div>}
                    {entitiesData && <EntityList entities={entitiesData.filter(item => (showOnlyNotDone && !item.isDone) || !showOnlyNotDone)} setEntitiesData={setEntitiesData} />}
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
                                idShoppingList={shoppingListData._id}
                                onInsert={(idShoppingList: string, description: string) => {
                                    entitiesData.push({
                                        _id: "xxx",
                                        idShoppingList: idShoppingList,
                                        description: description,
                                        isDone: false
                                    });

                                    //refetch()
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
                            {allowedUsers && <AllowedUsersList allowedUsers={allowedUsers} setAllowedUsers={setAllowedUsers} users={users} />}
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
                                idShoppingList={shoppingListData._id}
                                users={users}
                                onInsert={(idShoppingList: string, idUser: string) => {
                                    allowedUsers.push({
                                        _id: "xxx",
                                        idShoppingList: idShoppingList,
                                        idUser: idUser
                                    });

                                    //refetch()
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