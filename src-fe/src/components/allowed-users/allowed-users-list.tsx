import { Button } from "react-bootstrap"
import type { EntityOutputType } from "../../types/entity-output-type"
import { FaTrash } from "react-icons/fa"
import type { AllowedUserOutputType } from "../../types/allowed-user-output-type"
import type { UserOutputType } from "../../types/user-output-type"

type Props = {
    allowedUsers: AllowedUserOutputType[]
    setAllowedUsers: React.Dispatch<React.SetStateAction<AllowedUserOutputType[]>>
    users: UserOutputType[]
}

const AllowedUsersList = ({ allowedUsers, setAllowedUsers, users }: Props) => {
    const remove = async(entity: AllowedUserOutputType) => {
        setAllowedUsers(prev => {
            let arr: AllowedUserOutputType[] = []

            prev.forEach(item => {
                if (item._id != entity._id) arr.push(item)
            })

            return arr
        })
    }

    return (
        <div>
            {allowedUsers.map((item) => (
                <div className={`btn btn-light mb-1 col-12 d-flex justify-content-between align-items-center`}>
                    <span>{users.find(user => user._id == item.idUser)?.login}</span>
                    <Button className="btn btn-danger" size="sm" onClick={() => remove(item)}><FaTrash /></Button>
                </div>
            ))}
        </div>
    )
}

export default AllowedUsersList