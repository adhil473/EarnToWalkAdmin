import { axiosConfig } from "../config/AxiosConfig";

export const signUp = async(formData) =>{
    try {
        const response = await axiosConfig.post("/auth/register",{
            name:formData.name,
            email:formData.email,
            phone:formData.phone,
            password:formData.password,
            referralCode:formData.referralCode,
        })
         if (response.data.data.accessToken) {
            localStorage.setItem('accessToken', response.data.data.accessToken);
        }
        if (response.data.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.data.refreshToken);
        }
         return response.data
    } catch (error) {
        console.error('signup failed', error?.response?.data || error.message);
         throw error
    }
}

// export const signIn = async(formData) =>{
//     try {
//         const response = await axiosConfig.post("/admin/login",{
//             email: formData.email,
//             password: formData.password
//         })
//          if (response.data.data.accessToken) {
//             localStorage.setItem('accessToken', response.data.data.accessToken);
//         }
//         if (response.data.data.refreshToken) {
//             localStorage.setItem('refreshToken', response.data.data.refreshToken);
//         }
//          return response.data
//     } catch (error) {
//         console.error('signin failed', error?.response?.data || error.message);
//          throw error
//     }
// }


export const changePassword = async(passwordData)=>{
    try {
        const response = await axiosConfig.post('auth/change-password',{
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
        })
        return response.data
    } catch (error) {
        return error?.response?.data || error.message  
    }
}


// earn to walk admin signIn
export const signIn = async (data) => {
    try {
        const res = await axiosConfig.post("/admin/login", data);

        const { token, admin } = res.data;

        if (token) {
            localStorage.setItem("accessToken", token);
        }
        // admin logined detail if need in future use
        if (admin) {
            localStorage.setItem("admin", JSON.stringify(admin));
        }

        return res.data;

    } catch (error) {
        console.error("Login failed:", error?.response?.data || error.message);
        throw error;
    }
};


