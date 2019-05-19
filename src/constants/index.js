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
        index: 0,
        title: "Home",
        shortTitle: "Home",
        icon: "icon",
        link: "/student/home"
    },
    {
        index: 1,
        title: "Profile",
        shortTitle: "Profile",
        icon: "icon",
        link: "/student/profile"
    },
    {
        index: 2,
        title: "Registration Day",
        shortTitle: "Registration",
        icon: "icon",
        link: "/student/registration-day"
    },
    {
        index: 3,
        title: "Credits and Faculties",
        shortTitle: "Credits",
        icon: "icon",
        link: "/student/credits"
    },
]