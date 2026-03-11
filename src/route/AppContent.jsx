import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import MainLayout from "../layout/MainLayout";
import Loader from "../layout/Loader";
import Overview from '../pages/Overview';
import Support from '../pages/Support';
import MLMPageNotFound from '../pages/404';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import TransactionLog from '../pages/TransactionLog';
import DepositLog from '../pages/DepositLog';
import WithdrawLog from '../pages/WithdrawLog';
import Challenge from '../pages/Challenge';
import CreateChallenge from '../pages/CreateChallenge';
import EditChallenge from '../pages/EditChallenge';
import Settings from '../pages/Settings';
import Member from '../pages/Member';
import UserDetails from '../pages/UserDetails';

const AppContent = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/signin" element={!isAuthenticated ? <SignIn/> : <Navigate to="/dashboard" replace />} />
                <Route path="/register/:referral?" element={!isAuthenticated ? <SignUp/> : <Navigate to="/dashboard" replace />} />
                <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/signin" replace />}>
                      <Route index element={<Overview />} />
                      <Route path="dashboard" element={<Overview />} />
                      <Route path="member" element={<Member/>} />
                      <Route path="user-details/:userId" element={<UserDetails/>} />
                      <Route path="support" element={<Support/>} />
                      <Route path="reports/transaction-log" element={<TransactionLog/>} />
                      <Route path="reports/deposit-log" element={<DepositLog/>} />
                      <Route path="reports/withdraw-log" element={<WithdrawLog/>} />
                      {/* earnto walk route starts here   */}
                      <Route path="challenges" element={<Challenge/>} />
                      <Route path="challenges/create" element={<CreateChallenge/>} />
                      <Route path="challenges/edit/:challengeId" element={<EditChallenge/>} />
                      <Route path="settings" element={<Settings/>} />
                </Route>
            <Route path="*" element={<MLMPageNotFound/>} />
            </Routes>
        </Suspense>
    )
}

export default AppContent

