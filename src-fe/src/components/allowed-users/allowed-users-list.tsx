import { Button } from "react-bootstrap"
import { FaTrash } from "react-icons/fa"
import type { AllowedUserOutputType } from "../../types/allowed-user-output-type"
import type { UserOutputType } from "../../types/user-output-type"
import { useFetch } from "../../hooks/use-fetch"

type Props = {
    allowedUsers: AllowedUserOutputType[]
    remove: (entity: AllowedUserOutputType) => void
}

const AllowedUsersList = ({ allowedUsers, remove }: Props) => {
    const {data: users} = useFetch<UserOutputType[]>('http://localhost:8080/users/find')

    return (
        <div>
            {allowedUsers.map((item) => (
                <div className={`btn mb-1 col-12 d-flex justify-content-between align-items-center`}>
                    <span>{users?.find(user => user._id == item.idUser)?.login}</span>
                    <Button className="btn btn-danger" size="sm" onClick={() => remove(item)}><FaTrash /></Button>
                </div>
            ))}
        </div>
    )
}

export default AllowedUsersList