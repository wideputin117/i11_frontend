import { axiosInstance } from "@/utils/axiosInstance"
import { useRouter } from "next/navigation"
import { useState } from "react"

const RoleRedirect = ({ role }) => {
    const router = useRouter()

    const [userdata, setuserdata] = useState (null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/users/me`)
                // console.log(response.data, "the data is")

                if (response?.data?.data?.role != role || response?.data?.success == false) {
                    router.push("/")
                }
                setuserdata(response?.data?.data)
            } catch (error) {
                // console.error("Error fetching user data:", error)
                if (error) {
                    router.push("/")
                }
            }
        }

        fetchUserData()
    }, [])

    return null
}

export default RoleRedirect
