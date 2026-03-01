const API_BASE_URL = import.meta.env.VITE_API_URL

const getAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey) || "{}");
    const accessToken = oidcContext?.access_token;
    return accessToken;
};

export const deleteAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    sessionStorage.removeItem(oidcKey);
}

export const fetchCourses = async () => {
    // alert(`API_BASE_URL: ${API_BASE_URL}`)
    const response = await fetch(`${API_BASE_URL}/courses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.json();
};

export const getCourses = async (id) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    );
    return response.json();
};

export const createCourses = async (courses) => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(courses),
    });
    return response.json();
};

export const updateCourses = async (id, courses) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(courses),
    });
    return response.json();
};

export const deleteCourses = async (id) => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return response.json();
};