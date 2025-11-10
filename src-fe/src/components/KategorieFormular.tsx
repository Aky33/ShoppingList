import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button, Alert, Container } from "react-bootstrap"
import type { KategorieInputType } from "../types/KategorieInputType"
import usePost from "../hooks/UsePost"

type Props = {
    onVlozeni: () => void
}

const KategorieFormular = ({ onVlozeni } : Props) => {
    const odesliData = usePost<KategorieInputType>("http://localhost:8080/kategorie")
    
    const [nazev, setNazev] = useState('')

    const zmakniOdeslani = async (e: FormEvent) => {
        e.preventDefault()

        const novaKategorie: KategorieInputType = { nazev }
        const res = await odesliData(novaKategorie)

        if (res.ok) {
            setNazev('')
            onVlozeni()
        } else {
            console.error("Data se neposlaly")
        }
    }

    return (
        <Form onSubmit={zmakniOdeslani}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="nazev">Název:</Form.Label>
                <Form.Control id="nazev" type="text" placeholder="Název kategorie" value={nazev} onChange={(e) => setNazev(e.target.value)} required />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Vlož</Button>
            </div>
        </Form>
    )
}

export default KategorieFormular