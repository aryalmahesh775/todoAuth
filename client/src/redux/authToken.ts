import Cookies from "universal-cookie";

const cookies = new Cookies();

export const isTokenPresent = (): boolean => {
    const token = cookies.get("token");
    return !!token;
};