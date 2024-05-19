export type InputFoodType = {
  image: File | null;
  name: string;
  originalPrice: number;
  sellPrice: number;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeImg: (image: File) => void;
  onRegisterFood: () => void;
}