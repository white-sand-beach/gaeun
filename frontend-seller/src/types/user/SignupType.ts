export type SignupType = {
    email?: string;
    password?: string;
    phoneNumber?: string;
    registeredNo?: string;
    setValid: (value: boolean) => void;
    setComment: (value: string) => void;
}