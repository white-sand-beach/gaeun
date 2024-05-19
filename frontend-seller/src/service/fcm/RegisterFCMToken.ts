import axios from "axios";

const RegisterFCMToken = async (fcmtoken: string, accessToken: string): Promise<any> => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + "/api/fcmtokens", {
            "token": fcmtoken,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(response.data)
        return response.data
    }
    catch (err) {
        console.error(err)
        throw err
    }
};

export default RegisterFCMToken;