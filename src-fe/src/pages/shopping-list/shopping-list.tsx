import { useState } from "react"
import { Container, Card, Alert, Button, Modal } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"

import { useFetch } from "../../hooks/UseFetch"
import KategorieFormular from "../../components/KategorieFormular"
import ShoppingList from "../../components/shopping-list"

import type { KategorieOutputType } from "../../types/KategorieOutputType"


const KategorieSeznam = () => {
    const {data: kategorie, refetch, error} = useFetch<KategorieOutputType[]>('http://localhost:8080/kategorie')
    const [showModal, setShowModal] = useState(false)

    //Musí být specificky napsáno jinak se perou typy
    const zmakniOtevreniModalu = () => setShowModal(true)
    const zmakniZavreniModalu = () => setShowModal(false)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Seznam Kategorií</Card.Title>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {kategorie && kategorie.length == 0 && <div>Nic tu není.</div>}
                    {kategorie && <ShoppingList lists={kategorie} />}
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-end">
                        <Button onClick={zmakniOtevreniModalu}>
                            <FaPlus />
                        </Button>
                    </div>

                    <Modal show={showModal} onHide={zmakniZavreniModalu}>
                        <Modal.Header closeButton>
                            <Modal.Title>Vložení nové Kategorie</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <KategorieFormular 
                                onVlozeni={() => {
                                    refetch()
                                    zmakniZavreniModalu()
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