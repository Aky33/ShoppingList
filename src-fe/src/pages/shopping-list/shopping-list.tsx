import { useState } from "react"
import { Container, Card, Button, Modal, Alert } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next";

import { useFetch } from "../../hooks/use-fetch"
import ShoppingList from "../../components/shopping-list/shopping-list"
import ShoppingListAddForm from "../../components/shopping-list/shopping-list-add-form"

import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import type { ShoppingListInputType } from "../../types/shopping-list-input-type";
import usePost from "../../hooks/use-post";
import type { ShoppingListUpdateType } from "../../types/shopping-list-update-type";
import usePut from "../../hooks/use-put";
import useDelete from "../../hooks/use-delete";

const ShoppingListPage = () => {
    const { t } = useTranslation("shoppingList");

    const {data, refetch, error} = useFetch<ShoppingListOutputType[]>('http://localhost:8080/shopping-lists/find')
    const shoppingListInsert = usePost<ShoppingListInputType>('http://localhost:8080/shopping-lists/insert')
    const updateShoppingList = usePut<ShoppingListUpdateType>('http://localhost:8080/shopping-lists/update')
    const deleteShoppingList = useDelete('http://localhost:8080/shopping-lists/delete')

    const [showOnlyNotDeleted, setShowOnlyNotDeleted] = useState(true)
    const [showAddModal, setShowAddModal] = useState(false)

    //Musí být specificky napsáno jinak se perou typy
    const openAddModal = () => setShowAddModal(true)
    const closeAddModal = () => setShowAddModal(false)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>{t("title")}</Card.Title>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {data && data.length == 0 && <div>{t("empty")}</div>}
                    {data && <ShoppingList 
                        lists={data.filter(item => (showOnlyNotDeleted && !item.isDeleted) || !showOnlyNotDeleted)}
                        update={(list: ShoppingListOutputType) => {
                            updateShoppingList({
                                id: list._id,
                                idOwner: list.idOwner,
                                name: list.name,
                                isDeleted: !list.isDeleted
                            })

                            refetch()
                        }}
                        remove={(list: ShoppingListOutputType) => {
                            deleteShoppingList(list._id)
                            refetch()
                        }} 
                    />}
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={showOnlyNotDeleted} onChange={() => setShowOnlyNotDeleted(!showOnlyNotDeleted)} id="showOnlyNotDoneSwitch" />
                            <label className="form-check-label" htmlFor="showOnlyNotDoneSwitch">{t("showOnlyNotDeleted")}</label>
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
                            <ShoppingListAddForm 
                                onInsert={(name: string) => {
                                    const newShoppingList: ShoppingListInputType = {
                                        name
                                    }

                                    shoppingListInsert(newShoppingList)

                                    refetch()
                                    closeAddModal()
                                }} 
                            />
                        </Modal.Body>
                    </Modal>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default ShoppingListPage