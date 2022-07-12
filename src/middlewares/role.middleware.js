// Check if user has role
const auth = (role) => {

    return (r, w, next) => {

        const result = role.find(rol => rol == r.claims.role)

        if (!result) {
            return w.status(401).json({
                error: true,
                data: null,
                message: 'Unauthorized'
            })
        }

        next()
    }

}

export default auth