export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
}

export interface UserRequest {
    name: string;
    password: string;
    email: string;
    phoneNumber: string;
    role: string;
}