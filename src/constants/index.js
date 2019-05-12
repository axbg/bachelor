export const BASE_URL = "http://localhost:8000";
export const USER_ROLES = {
    STUDENT: "STUDENT",
    ADMIN: "ADMIN",
    VOLUNTEER: "VOLUNTEER",
    CASHIER: "CASHIER",
    OPERATOR: "OPERATOR"
}

export const STUDENT_NAVIGATION_OPTIONS = [
    {
        title: "Home",
        link: "/student/home"
    },
    {
        title: "Profile",
        link: "/student/profile"
    },
    {
        title: "Registration Day",
        link: "/student/registration-day"
    },
    {
        title: "Credits and Faculties",
        link: "/student/credits"
    },
    {
        title: "Logout",
        link: "/logout"
    }
]