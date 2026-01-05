import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
        }
    }, [navigate]);

    return (
        <div className="admin-layout">
            <AdminNavbar />
            <main className="admin-main-content" style={{ padding: "2rem" }}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
