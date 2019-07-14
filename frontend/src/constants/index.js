export const BASE_URL = "http://localhost:8000";
export const SORT_URL = "http://localhost:8008";
export const STUDENT_DEFAULT_IMAGE = "data:image/png;base64,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";
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