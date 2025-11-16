import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
//import usePost from "../hooks/UsePost"
import { useTranslation } from "react-i18next";
import type { AllowedUserOutputType } from "../../types/allowed-user-output-type";
import type { UserOutputType } from "../../types/user-output-type";

type Props = {
    idShoppingList: string
    users: UserOutputType[]
    onInsert: (idShoppingList: string, idUser: string) => void
}

const AllowedUsersListAddForm = ({ idShoppingList, users, onInsert } : Props) => {
    const { t } = useTranslation("allowedUsersListAddForm");
    //const sendData = usePost<EntityInputType>("http://localhost:8080/entity/insert")
    
    const [idUser, setIdUser] = useState('')

    const insert = async (e: FormEvent) => {
        e.preventDefault()

        //const newEntity: EntityInputType = { idShoppingList, description }
        onInsert(idShoppingList, idUser)
        console.log(idUser)

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
                {users.map(item => (
                    <div>
                        <input className="form-check-input" type="radio" name="idUser" value={item._id} onChange={(e) => setIdUser(e.target.value)} />
                        <label className="form-check-label">
                            {item.login}
                        </label>
                    </div>
                ))}
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">{t("insert")}</Button>
            </div>
        </Form>
    )
}

export default AllowedUsersListAddForm