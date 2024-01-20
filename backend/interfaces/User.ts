interface User {
    _id?: string;
    username: string;
    email: string;
    password: string;
    token?: string;
    createdAt?: {
        type: Date,
        default: Date,
    };
}

export default User;