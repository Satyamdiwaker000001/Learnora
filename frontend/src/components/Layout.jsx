import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet, useLoaderData, useMatch } from "react-router-dom";

export default function LayoutDashboard({ isAdmin = true }) {
  const session = useLoaderData();
  const isManagerPreviewPage = useMatch("/manager/courses/:id/preview");
  const isStudentPreviewPage = useMatch("/student/detail-course/:id");

  const isPreviewPage = isManagerPreviewPage || isStudentPreviewPage;

  return (
    <>
      {isPreviewPage ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen bg-[#F8FAFC]">
          <Sidebar isAdmin={isAdmin} />
          <main className="flex flex-col flex-1 gap-6 p-6 md:p-8 ml-[280px] max-w-[calc(100vw-290px)] min-h-screen">
            <Header type={session?.role ?? (isAdmin ? "manager" : "student")} />
            <div className="flex-1">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </>
  );
}
