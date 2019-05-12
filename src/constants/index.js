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
        shortTitle: "Home",
        icon: "icon",
        link: "/student/home"
    },
    {
        title: "Profile",
        shortTitle: "Profile",
        icon: "icon",
        link: "/student/profile"
    },
    {
        title: "Registration Day",
        shortTitle: "Registration",
        icon: "icon",
        link: "/student/registration-day"
    },
    {
        title: "Credits and Faculties",
        shortTitle: "Credits",
        icon: "icon",
        link: "/student/credits"
    },
]