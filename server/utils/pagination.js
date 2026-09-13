function getPagination(query = {}) {
    const hasPagination =
        query.page !== undefined || query.limit !== undefined

    if (!hasPagination) {
        return {
            enabled: false,
            page: 1,
            limit: null,
            skip: 0
        }
    }

    const page = Math.max(1, parseInt(query.page, 10) || 1)
    const limit = Math.min(
        100,
        Math.max(1, parseInt(query.limit, 10) || 10)
    )
    const skip = (page - 1) * limit

    return {
        enabled: true,
        page,
        limit,
        skip
    }
}

function buildPaginationMeta({ page, limit, total, enabled }) {
    const effectiveLimit = enabled ? limit : total || 1

    return {
        page: enabled ? page : 1,
        limit: enabled ? limit : total,
        total,
        totalPages: Math.max(1, Math.ceil(total / effectiveLimit) || 1)
    }
}

module.exports = {
    getPagination,
    buildPaginationMeta
}
