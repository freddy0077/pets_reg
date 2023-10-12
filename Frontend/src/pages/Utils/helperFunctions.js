

export const hasRole = (user, role) => user?.role?.toLowerCase()?.includes(role?.toLowerCase());

// utils.js
export function getQueryParams(query) {
    return [...new URLSearchParams(query).entries()].reduce(
        (obj, [key, value]) => ((obj[key] = value), obj),
        {}
    );
}
