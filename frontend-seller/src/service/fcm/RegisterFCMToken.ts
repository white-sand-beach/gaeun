import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies()
const accessToken = cookies.get("accessToken")
const RegisterFCMToken = async (token: string): Promise<any> => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/api/fcmtokens", {
            "token": token,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response)
        return response
    }
    catch (err) {
        console.error(err)
    }
};

export default RegisterFCMToken;