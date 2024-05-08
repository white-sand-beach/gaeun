interface TokenState  {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
}

export default TokenState ;
