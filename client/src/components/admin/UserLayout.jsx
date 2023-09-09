import { useQuery } from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest";
import UserCard from "./UserCard";

const UserLayout = () => {
    const { isLoading, error, data } = useQuery({
        queryKey: ["users"],
        queryFn: () =>
            newRequest.get(`admin/users`).then((res) => {
                return res.data;
            }),
    });
    
    return (
        <div className=" h-full overflow-y-auto lg:p-2 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {
                isLoading? "Loading Users":
                error? "Something went Wrong":
                data.length === 0 ? "No Users Exists":
                data.map((user)=>(
                    <UserCard key={user._id} {...user}/>
                ))
            }
        </div>
    )
}

export default UserLayout