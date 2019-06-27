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
        icon: "home",
        link: "/student/home"
    },
    {
        index: 1,
        title: "Profil",
        shortTitle: "Profil",
        icon: "profile",
        link: "/student/profile"
    },
    {
        index: 2,
        title: "Înscriere",
        shortTitle: "Înscriere",
        icon: "location",
        link: "/student/registration-day"
    },
    {
        index: 3,
        title: "Opțiuni",
        shortTitle: "Opțiuni",
        icon: "option",
        link: "/student/credits"
    },
]

export const VOLUNTEER_NAVIGATION_OPTIONS = [
    {
        index: 0,
        title: "Flux",
        shortTitle: "Flux",
        icon: "check",
        link: "/volunteer/check"
    },
    {
        index: 1,
        title: "Generare",
        shortTitle: "Generare",
        icon: "icon",
        link: "/volunteer/generate"
    },
    {
        index: 2,
        title: "Poziție",
        shortTitle: "Poziție",
        icon: "position",
        link: "/volunteer/position"
    },
]

export const ADMIN_NAVIGATION_OPTIONS = [
    {
        index: 0,
        title: "Panou de control",
        shortTitle: "Panou",
        icon: "icon",
        link: "/admin/control"
    },
    {
        index: 1,
        title: "Sortare",
        shortTitle: "Sortare",
        icon: "icon",
        link: "/admin/sorting"
    },
    {
        index: 2,
        title: "Gestiune Voluntari",
        shortTitle: "Gestiune",
        icon: "icon",
        link: "/admin/add-user"
    },
    {
        index: 3,
        title: "Căutare",
        shortTitle: "Căutare",
        icon: "icon",
        link: "/admin/search"
    }
]

export const CASHIER_NAVIGATION_OPTIONS = [
    {
        index: 0,
        title: "Căutare",
        shortTitle: "Căutare",
        icon: "icon",
        link: "/cashier/credits"
    }
]

export const OPERATOR_NAVIGATION_OPTIONS = [
    {
        index: 0,
        title: "Căutare",
        shortTitle: "Căutare",
        icon: "icon",
        link: "/operator/enrollment"
    }
]