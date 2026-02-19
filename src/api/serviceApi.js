import { axiosConfig } from "../config/AxiosConfig";

export const adminProfile = async () => {
    try {
        const response = await axiosConfig.get("admin/profile")
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const ReferralLinks = async () => {
    try {
        const response = await axiosConfig.get("users/referral-links")
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

export const purchasePackages = async (data) => {
    try {
        const response = await axiosConfig.post("packages/purchase", {
            packageType: data.packageType,
            transactionHash: data.transactionHash
        })
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const purchasedPackages = async () => {
    try {
        const response = await axiosConfig.get("packages/my-packages")
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}
export const adminTree = async (id) => {
    try {
        const res = await axiosConfig.get(`admin/users/${id}/genealogy-tree?depth=4`);
        return res.data
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

export const getbvlogData = async () => {
    try {
        const res = await axiosConfig.get(`tree/bvlog`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const referralHistory = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`earnings/referral-history?page=${page}&limit=${limit}`);
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

export const submitUpdateKYC = async (formData) => {
    try {
        const res = await axiosConfig.put('kyc/update-kyc', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    } catch (error) {
        return error?.response?.data || { success: false, message: error.message };
    }
};

export const updateuserProfile = async (data) => {
    try {
        const profile = {
            name: data.name,

            phone: data.phone,

        }
        const response = await axiosConfig.put("users/profile", profile)
        return response.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const binaryCommission = async () => {
    try {
        const res = await axiosConfig.get(`binary/commissions`);
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

export const treeByUserid = async (id) => {
    try {
        const res = await axiosConfig.get(`admin/users/${id}/genealogy-tree?depth=4`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}

export const stakingReward = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`earnings/roi-history?page=${page}&limit=${limit}`);
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
export const getSingleUsers = async (id) => {
    try {
        const res = await axiosConfig.get(`admin/users/${id}`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }

}

export const getUsersIncomeHistory = async (id, page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/users/${id}/income-history?page=${page}&limit=${limit}`);
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }

}
export const getUsersKYCDetails = async (params = {}) => {
    try {
        const { page = 1, limit = 10, status } = params
        let url = `admin/kyc/submissions?page=${page}&limit=${limit}`
        if (status) {
            url += `&status=${status}`
        }
        const res = await axiosConfig.get(url)
        return res.data
    } catch (error) {
        return error?.response?.data || error.message
    }
}


export const verifyKYC = async (id, status) => {
    try {
        const res = await axiosConfig.patch(`admin/kyc/${id}/status`,
            {
                "status": status, // or "rejected"
                "remarks": "Document verified successfully"
            }
        )
        return res.data;
    } catch (error) {
        return error?.response?.data || { success: false, message: error.message };
    }
};

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

export const investHistory = async (page = 1, limit = 10) => {
    try {
        const res = await axiosConfig.get(`admin/purchases/all?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error('Transaction fetch error:', error);
        return error?.response?.data || { message: error.message };
    }
};

export const investStatus = async () => {
    try {
        const res = await axiosConfig.get(`admin/purchases/stats`);
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
export const userVerify = async (id) => {
    try {
        const res = await axiosConfig.patch(`admin/users/${id}/verify-email`)
        return res.data;
    } catch (error) {
        return error?.response?.data || { success: false, message: error.message };
    }
};

export const getPdf = async () => {
  try {
    const res = await axiosConfig.get(`admin/users?export=true`);
    return res;
  } catch (error) {
    return error?.response?.data || { success: false, message: error.message };
  }
};
