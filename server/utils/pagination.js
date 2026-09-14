function getPagination(query = {}) {
    const page = Math.max(
        1,
        parseInt(query.page, 10) || 1
    )

    const limit = Math.min(
        100,
        Math.max(
            1,
            parseInt(query.limit, 10) || 6
        )
    )

    // Calculate how many records to skip
    const skip = (page - 1) * limit

    return {
        enabled: true,
        page,
        limit,
        skip
    }
}

function buildPaginationMeta({
    page,
    limit,
    total,
    enabled
}) {
    const effectiveLimit = enabled
        ? limit
        : total || 1

    return {
        page: enabled ? page : 1,
        limit: enabled ? limit : total,
        total,
        totalPages: Math.max(
            1,
            Math.ceil(total / effectiveLimit) || 1
        )
    }
}

module.exports = {
    getPagination,
    buildPaginationMeta
}