import { useParams } from "react-router-dom"
import { Container, Card } from "react-bootstrap"

import { useFetch } from "../../hooks/UseFetch"
import type { KategorieOutputType } from "../../types/KategorieOutputType"

const KategorieDetail = () => {
    const params = useParams<{id: string}>()
    const {data: kategorie} = useFetch<KategorieOutputType>('http://localhost:8080/kategorie/' + params.id)

    return (
        <Container>
            <Card>
                <Card.Header>
                    <Card.Title>Detail Kategorie</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text><strong>Id:</strong> {kategorie?.id}</Card.Text>
                    <Card.Text><strong>Název:</strong> {kategorie?.nazev}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default KategorieDetail