declare namespace Express {
  interface Response {
    result: (data: any) => void;
    error: (code: number, errorMessage: string) => void;
  }
}
