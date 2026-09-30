import { createBrowserRouter, redirect } from "react-router-dom";
import LandingPage from "../pages/Landing/";
import ManagerHomePage from "../pages/Manager/Home";
import SignInPage from "../pages/SignIn";
import SignUpPage from "../pages/SignUp";
import PricingPage from "../pages/SignUp/pricing";
import SuccesCheckoutPage from "../pages/SuccesCheckout";
import LayoutDashboard from "../components/Layout";
import ManageCoursePage from "../pages/Manager/Courses";
import ManageCreateCoursePage from "../pages/Manager/Create-Courses";
import ManageCourseDetailPage from "../pages/Manager/Courses-Detail";
import ManageCourseContentCreatePage from "../pages/Manager/Course-Content-Create";
import ManageCoursePreviewPage from "../pages/Manager/Course-Preview";
import ManageStudentsPage from "../pages/Manager/Students";
import StudentPage from "../pages/Student/StudentOverview";
import { MANAGER_SESSION, STRORAGE_KEY, STUDENT_SESSION } from "../utils/const";
import secureLocalStorage from "react-secure-storage";
import ManageStudentCreatePage from "../pages/Manager/Student-Create";
import StudentsCourseList from "../pages/Manager/Student-Course";
import StudentForm from "../pages/Manager/Student-Course/student-form";

import {
  mockOverview,
  mockCourses,
  mockCourseDetails,
  mockStudents,
  mockManagerSession,
  mockStudentSession
} from "../utils/mockData";

const mockCategories = {
  data: [
    { _id: "cat-frontend", name: "Frontend" },
    { _id: "cat-backend", name: "Backend" },
    { _id: "cat-database", name: "Database" },
    { _id: "cat-devops", name: "DevOps" }
  ]
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },

  {
    path: "/manager/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STRORAGE_KEY);
      if (session && (session.role === "manager" || session === "manager")) {
        throw redirect("/manager");
      }
      return true;
    },
    element: <SignInPage />
  },
  {
    path: "/manager/sign-up",
    loader: async () => {
      const session = secureLocalStorage.getItem(STRORAGE_KEY);
      if (session && (session.role === "manager" || session === "manager")) {
        throw redirect("/manager");
      }
      return true;
    },
    element: <SignUpPage />
  },
  {
    path: "/manager/sign-up/pricing",
    element: <PricingPage />
  },
  {
    path: "/success-checkout",
    element: <SuccesCheckoutPage />
  },

  {
    path: "/manager",
    id: MANAGER_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STRORAGE_KEY) || mockManagerSession;
      return typeof session === "string" ? mockManagerSession : session;
    },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        loader: async () => {
          return mockOverview;
        },
        element: <ManagerHomePage />
      },
      {
        path: "courses",
        loader: async () => {
          return mockCourses;
        },
        element: <ManageCoursePage />
      },
      {
        path: "courses/create",
        loader: async () => {
          return { categories: mockCategories, course: null };
        },
        element: <ManageCreateCoursePage />
      },
      {
        path: "courses/edit/:id",
        loader: async ({ params }) => {
          const course = mockCourses.find((c) => c._id === params.id) || mockCourseDetails;
          return { categories: mockCategories, course };
        },
        element: <ManageCreateCoursePage />
      },
      {
        path: "courses/:id",
        loader: async ({ params }) => {
          const { mockCourses } = await import("../utils/mockData");
          const course = mockCourses.find((c) => c._id === params.id);

          if (!course) {
            throw new Response("Course not found", { status: 404 });
          }

          return {
            ...course,
            details: course.details || [
              {
                _id: "d1",
                title: "Introduction",
                type: "video",
                duration: "5m",
                description: "Welcome to the course!"
              },
              {
                _id: "d2",
                title: "Main Lesson",
                type: "text",
                duration: "15m",
                description: "Learn the core concepts step by step."
              }
            ]
          };
        },
        element: <ManageCourseDetailPage />
      },

      {
        path: "courses/:id/create",
        element: <ManageCourseContentCreatePage />
      },
      {
        path: "courses/:id/edit/:contentId",
        loader: async ({ params }) => {
          const content = mockCourseDetails.details.find((d) => d._id === params.contentId) || null;
          return content;
        },
        element: <ManageCourseContentCreatePage />
      },
      {
        path: "courses/:id/preview",
        loader: async () => {
          return mockCourseDetails;
        },
        element: <ManageCoursePreviewPage />
      },

      {
        path: "/manager/students",
        loader: async () => {
          return mockStudents;
        },
        element: <ManageStudentsPage />
      },
      {
        path: "/manager/students/create",
        element: <ManageStudentCreatePage />
      },
      {
        path: "/manager/students/edit/:id",
        loader: async ({ params }) => {
          const student = mockStudents.find((s) => s._id === params.id) || null;
          return student;
        },
        element: <ManageStudentCreatePage />
      },

      {
        path: "/manager/courses/students/:id",
        loader: async () => {
          return {
            ...mockCourseDetails,
            students: mockCourseDetails.students || []
          };
        },
        element: <StudentsCourseList />
      },
      {
        path: "/manager/courses/students/:id/add",
        loader: async () => {
          return mockStudents;
        },
        element: <StudentForm />
      }
    ]
  },

  {
    path: "/student",
    id: STUDENT_SESSION,
    loader: async () => {
      const session = secureLocalStorage.getItem(STRORAGE_KEY) || mockStudentSession;
      return typeof session === "string" ? mockStudentSession : session;
    },
    element: <LayoutDashboard isAdmin={false} />,
    children: [
      {
        index: true,
        loader: async () => {
          return mockCourses;
        },
        element: <StudentPage />
      },
      {
        path: "/student/detail-course/:id",
        loader: async ({ params }) => {
          const course = mockCourses.find((c) => c._id === params.id) || mockCourseDetails;
          return {
            ...course,
            details: course.details || mockCourseDetails.details
          };
        },
        element: <ManageCoursePreviewPage isAdmin={false} />
      }
    ]
  },

  {
    path: "/student/sign-in",
    loader: async () => {
      const session = secureLocalStorage.getItem(STRORAGE_KEY);
      if (session && (session.role === "student" || session === "student")) {
        throw redirect("/student");
      }
      return true;
    },
    element: <SignInPage type="student" />
  }
]);

export default router;
