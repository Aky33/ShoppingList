import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";

type Props = {
    idShoppingList: string
    onUpdate: (idShoppingList: string, name: string) => void
}

const ShoppingListUpdateForm = ({ idShoppingList, onUpdate } : Props) => {
    const { t } = useTranslation("shoppingListUpdateForm");
    const [name, setName] = useState('')

    const update = async (e: FormEvent) => {
        e.preventDefault()
        onUpdate(idShoppingList, name)
    }

    return (
        <Form onSubmit={update}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="name">{t("nameLabel")}</Form.Label>
                <Form.Control id="name" type="text" placeholder={t("namePlaceHolder")} value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">{t("update")}</Button>
            </div>
        </Form>
    )
}

export default ShoppingListUpdateForm