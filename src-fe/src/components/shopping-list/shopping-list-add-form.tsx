import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
//import type { ShoppingListInputType } from "../../types/shopping-list-input-type"
//import usePost from "../../hooks/UsePost"
import { useTranslation } from "react-i18next"

type Props = {
    onInsert: (name: string) => void
}

const ShoppingListAddForm = ({ onInsert } : Props) => {
    const { t } = useTranslation("shoppingListAddForm")
    //const sendData = usePost<ShoppingListInputType>("http://localhost:8080/shopping-list/insert")
    
    const [name, setName] = useState('')

    const sendAway = async (e: FormEvent) => {
        e.preventDefault()

        //const newList: ShoppingListInputType = { name }
        //const res = await sendData(newList)

        onInsert(name)
        setName('')

        /*if (res.ok) {
            setName('')
            onInsert()
        } else {
            console.error("Data se neposlaly")
        }*/
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