import { redirect } from "next/navigation";

const page = () => {
    return (
        redirect('/users?page=1')
    )
}



export default page
