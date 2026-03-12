import { axiosConfig } from "../config/AxiosConfig";

export const adminProfile = async () => {
    try {
        const response = await axiosConfig.get("admin/profile")
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const planPackages = async () => {
    try {
        const response = await axiosConfig.get("packages/info")
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const adminDashboard = async () => {
    try {
        const res = await axiosConfig.get(`admin/dashboard`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const submitSupportTicket = async (formData) => {
    try {
        const res = await axiosConfig.post('tickets/create-ticket', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        return error?.response?.data || { success: false, message: error.message };
    }
};


export const supportTicketHistory = async (page = 1, limit = 10, status = '', priority = '') => {
    try {
        let url = `admin/tickets?page=${page}&limit=${limit}`;
        if (status) url += `&status=${status}`;
        if (priority) url += `&priority=${priority}`;

        const res = await axiosConfig.get(url);
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const transactions = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`earnings/all-transactions?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error('Transaction fetch error:', error);
        return error?.response?.data || { message: error.message };
    }
};

export const getUsers = async (page = 1, limit = 10, search, status) => {
    try {
        const res = await axiosConfig.get(`admin/users?page=${page}&limit=${limit}&search=${search}&status=${status}`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }

}
// export const getSingleUsers = async (id) => {
//     try {
//         const res = await axiosConfig.get(`admin/users/${id}`);
//         return res.data;
//     } catch (error) {
//         throw error?.response?.data || error;
//     }
// };

export const getUsersIncomeHistory = async (id, page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/users/${id}/income-history?page=${page}&limit=${limit}`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }

}

export const getTicketDetails = async (id) => {
    try {
        const res = await axiosConfig.get(`admin/tickets/${id}`);
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const updateTicketStatus = async (id, status) => {
    try {
        const res = await axiosConfig.patch(`admin/tickets/${id}/status`,
            {
                "status": status,
                "adminReply": "We are looking into your issue"
            }
        );
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const withdrawHistory = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/withdrawals/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error('Transaction fetch error:', error);
        return error?.response?.data || { message: error.message };
    }
};

export const withdrawAllAccept = async () => {
    try {
        const res = await axiosConfig.post(`admin/withdrawals/approve-all`);
        return res.data;
    } catch (error) {
        console.error('Transaction fetch error:', error);
        return error?.response?.data || { message: error.message };
    }
};

export const planPurchaseByAdmin = async (id, plan) => {
    try {
        const res = await axiosConfig.post(`admin/users/${id}/activate-package`,
            {
                "packageType": plan.type,
                "packageAmount": plan.amount,
                "reason": "Payment completed but package not activated due to network issue",
                "transactionHash": plan?.transactionHash
            }
        );
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const pendingWithdrawal = async () => {
    try {
        const res = await axiosConfig.get(`admin/withdrawals/pending`);
        return res.data;
    } catch (error) {
        console.error('Transaction fetch error:', error);
        return error?.response?.data || { message: error.message };
    }
};

export const updateUserPassword  = async (id,password) => {
    try {
        const res = await axiosConfig.patch(`admin/users/${id}/password`,
            {
                "newPassword": password,
            }
        );
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const updateUserProfile = async (id, profileData) => {
    try {
        const res = await axiosConfig.patch(`admin/users/${id}/profile`, profileData);
        return res.data;
    } catch (error) {
        return error?.response?.data || error.message
    }
}

// new earn to walk start here all others to remove 

// all challenges get api 
export const getAllChallenges = async () => {
    try {
        const res = await axiosConfig.get('/admin/challenges');
        return res.data;
    } catch (error) {
       console.error('Failed to fetch challenges:', error?.response?.data || error.message);
       throw error; 
    }
}

// all challenges delete api 
export const deleteChallenge = async (challengeId) => {
    try {
         const res = await axiosConfig.delete(`/admin/challenges/${challengeId}`);
         return res.data;
    } catch (error) {
        console.error('Failed to delete challenge:', error?.response?.data || error.message);
        throw error; 
     }  
    }

// update challenge api
export const updateChallenge = async (challengeId, updatedData) => {
    try {
        const res = await axiosConfig.put(`/admin/challenges/${challengeId}`, updatedData);
        return res.data;
    } catch (error) {
        console.error('Failed to update challenge:', error?.response?.data || error.message);
        throw error;
    }
}

// challenge create api 
export const createChallenge = async (challengeData) => {
    try {
        const res = await axiosConfig.post('/admin/challenges', challengeData);
        return res.data;
    } catch (error) {
        console.error('Failed to create challenge:', error?.response?.data || error.message);
        throw error;
        
    }
}

// challenge get by id api 
export const getChallengeById = async (challengeId) => {
    try {
        const res = await axiosConfig.get(`/admin/challenges/${challengeId}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch challenge:', error?.response?.data || error.message);
        throw error;
    }
}

// create and edit challenge image upload api 

export const uploadChallengeImage = async (imageFile) => {
    const formdata = new FormData();
    formdata.append('image', imageFile);
    const res = await axiosConfig.post('/admin/challenges/upload-image',formdata, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return  res.data;
}

// members get all users api 

export const getallusers = async () => {
    try {
        const res = await axiosConfig.get('/admin/users');
        return res.data;
    } catch (error) {
        console.error('Failed to fetch users:', error?.response?.data || error.message);
        throw error;
    }
}


// memebers get by id user details api
export const getuserById = async (userid)=>{
    try {
        const res = await axiosConfig.get(`/admin/users/${userid}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch users:', error?.response?.data || error.message);
        throw error;    
    }
    
}

// ads settings get api
export const getAdsSettings = async () => {
    try {
        const res = await axiosConfig.get('/ads/admin/settings');
        return res.data;
    } catch (error) {
        console.error('Failed to fetch ads settings:', error?.response?.data || error.message);
        throw error;
    }
}

// ads settings update api
export const updateAdsSettings = async (data) => {
    try {
        const res = await axiosConfig.put('/ads/admin/settings', data);
        return res.data;
    } catch (error) {
        console.error('Failed to update ads settings:', error?.response?.data || error.message);
        throw error;
    }
}

// binary commission api
export const binaryCommission = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/binary-commission?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch binary commission:', error?.response?.data || error.message);
        return error?.response?.data || { message: error.message };
    }
}

// bvlog data api
export const getbvlogData = async () => {
    try {
        const res = await axiosConfig.get('admin/bv-log');
        return res.data;
    } catch (error) {
        console.error('Failed to fetch bvlog data:', error?.response?.data || error.message);
        return error?.response?.data || { message: error.message };
    }
}

// staking reward api
export const stakingReward = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/staking-rewards?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch staking rewards:', error?.response?.data || error.message);
        return error?.response?.data || { message: error.message };
    }
}