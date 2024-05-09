import { AxiosResponse } from "axios";

export type CategoryIdType = {
    id?: number;
    setId: (value: AxiosResponse) => void;
}