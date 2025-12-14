import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"

type Props = {
    onInsert: (name: string) => void
}

const ShoppingListAddForm = ({ onInsert } : Props) => {
    const { t } = useTranslation("shoppingListAddForm")
    const [name, setName] = useState('')

    const sendAway = async (e: FormEvent) => {
        e.preventDefault()

        onInsert(name)
        setName('')
    }

    return (
        <Form onSubmit={sendAway}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">{t("name")}</Form.Label>
                <Form.Control id="name" type="text" placeholder={t("namePlaceholder")} value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">{t("add")}</Button>
            </div>
        </Form>
    )
}

export default ShoppingListAddForm