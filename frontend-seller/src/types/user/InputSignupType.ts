export type InputSignupType = {
    email: string;
    password: string;
    passwordCheck: string;
    phoneNumber: string;
    registeredNo: string;
    isValidEmail: boolean;
    validEmail: string;
    isValidRegisteredNo: boolean;
    validRegisteredNo: string;
    isValidSignup: boolean;
    validSignup: string;
    onChangeInfo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckEmail: () => void;
    onCheckRegisteredNo: () => void;
    onSignup: () => void;
}