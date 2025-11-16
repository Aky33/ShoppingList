import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
//import usePost from "../hooks/UsePost"
import { useTranslation } from "react-i18next";

type Props = {
    idShoppingList: string
    onInsert: (idShoppingList: string, description: string) => void
}

const EntityListAddForm = ({ idShoppingList, onInsert } : Props) => {
    const { t } = useTranslation("entityListAddForm");
    //const sendData = usePost<EntityInputType>("http://localhost:8080/entity/insert")
    
    const [description, setDescription] = useState('')

    const insert = async (e: FormEvent) => {
        e.preventDefault()

        //const newEntity: EntityInputType = { idShoppingList, description }
        onInsert(idShoppingList, description)

        //const res = await sendData(newList)

        /*if (res.ok) {
            setDescription('')
            onInsert()
        } else {
            console.error("Data se neposlaly")
        }*/
    }

    return (
        <Form onSubmit={insert}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="description">{t("descriptionLabel")}</Form.Label>
                <Form.Control id="description" type="text" placeholder={t("descriptionPlaceHolder")} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">{t("insert")}</Button>
            </div>
        </Form>
    )
}

export default EntityListAddForm