import { useState } from "react"
import { Container, Card, /*Alert,*/ Button, Modal } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { useTranslation } from "react-i18next";

//import { useFetch } from "../../hooks/UseFetch"
import ShoppingList from "../../components/shopping-list/shopping-list"
import ShoppingListAddForm from "../../components/shopping-list/shopping-list-add-form"

import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"
import type { UserOutputType } from "../../types/user-output-type";

type Props = {
    shoppingListsData: ShoppingListOutputType[]
    setShoppingListsData: React.Dispatch<React.SetStateAction<ShoppingListOutputType[]>>
    users: UserOutputType[]
}

const ShoppingListPage = ({shoppingListsData, setShoppingListsData, users}: Props) => {
    const { t } = useTranslation("shoppingList");

    //const {data, refetch, error} = useFetch<ShoppingListOutputType[]>('http://localhost:8080/shopping-list/list')
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
                    {/*error && <Alert variant="danger">{error}</Alert>*/}
                    {shoppingListsData && shoppingListsData.length == 0 && <div>{t("empty")}</div>}
                    {shoppingListsData && <ShoppingList lists={shoppingListsData.filter(item => (showOnlyNotDeleted && !item.isDeleted) || !showOnlyNotDeleted)} setShoppingListsData={setShoppingListsData} users={users} />}
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
                                    shoppingListsData.push({
                                        _id: (shoppingListsData.length +1).toString(),
                                        idOwner: "TODO vůbec netuším jak to sem dostat bez be",
                                        name,
                                        isDeleted: false
                                    });
                                    
                                    //refetch()
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