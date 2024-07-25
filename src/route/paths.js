function path (link, sublink) {
    return `${link}${sublink}`
}

const ROOT_MAIN = '/mainpage'

const ROOT_AUTH = '/auth'

export const PATH_MAIN = {
    HOME: path(ROOT_MAIN, '/home')
}

export const PATH_AUTH = {
    LOGIN: path(ROOT_AUTH, '/login'),
    SIGNUP: path(ROOT_AUTH, '/signup'),
}