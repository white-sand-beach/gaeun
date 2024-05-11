export type InputFoodType = {
  image: string;
  name: string;
  originalPrice: number;
  sellPrice: number;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRegisterFood: () => void;
}