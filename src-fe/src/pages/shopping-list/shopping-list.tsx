import { useState } from "react"
import { Container, Card, Alert, Button, Modal } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

import { useFetch } from "../../hooks/UseFetch"
import ShoppingList from "../../components/shopping-list/shopping-list"
import ShoppingListAddForm from "../../components/shopping-list/shopping-list-add-form"

import type { ShoppingListOutputType } from "../../types/shopping-list-output-type"


const KategorieSeznam = () => {
    const {data, refetch, error} = useFetch<ShoppingListOutputType[]>('http://localhost:8080/shopping-list/list')
    const [showModal, setShowModal] = useState(false)

    //Musí být specificky napsáno jinak se perou typy
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Seznam Kategorií</Card.Title>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {data && data.length == 0 && <div>Nic tu není.</div>}
                    {data && <ShoppingList lists={data} />}
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Button onClick={openModal}>
                            <FaPlus />
                        </Button>
                    </div>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vložení nové Kategorie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ShoppingListAddForm 
                                onInsert={() => {
                                    refetch()
                                    closeModal()
                                }} 
                            />
                        </Modal.Body>
                    </Modal>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default KategorieSeznam