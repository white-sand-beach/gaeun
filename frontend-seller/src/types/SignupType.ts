export type SignupType = {
    email?: string;
    password?: string;
    phoneNumber?: string;
    registeredNo?: string;
    setValid: (value: boolean) => void;
    setcomment: (value: string) => void;
}