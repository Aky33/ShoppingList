import { useState } from "react"
import type { FormEvent } from "react"
import { Form, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";
import type { UserOutputType } from "../../types/user-output-type";
import { useFetch } from "../../hooks/use-fetch";

type Props = {
    idShoppingList: string
    onInsert: (idShoppingList: string, idUser: string) => void
}

const AllowedUsersListAddForm = ({ idShoppingList, onInsert } : Props) => {
    const { t } = useTranslation("allowedUsersListAddForm");
    const {data: users} = useFetch<UserOutputType[]>('http://localhost:8080/users/find')
    
    const [idUser, setIdUser] = useState('')

    const insert = async (e: FormEvent) => {
        e.preventDefault()
        
        onInsert(idShoppingList, idUser)
    }

    return (
        <Form onSubmit={insert}>
            <Form.Group className="mb-3">
                {users?.map(item => (
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