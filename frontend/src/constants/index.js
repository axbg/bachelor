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
        title: "Acasă",
        shortTitle: "Acasă",
        icon: "icon",
        link: "/student/home"
    },
    {
        index: 1,
        title: "Profil",
        shortTitle: "Profil",
        icon: "icon",
        link: "/student/profile"
    },
    {
        index: 2,
        title: "Înscriere",
        shortTitle: "Înscriere",
        icon: "icon",
        link: "/student/registration-day"
    },
    {
        index: 3,
        title: "Opțiuni",
        shortTitle: "Opțiuni",
        icon: "icon",
        link: "/student/credits"
    },
]