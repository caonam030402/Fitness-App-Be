type dataType<T> = T;

export const successResponse = <T>(message: string, data: dataType<T>) => {
  return {
    message: message,
    data: data,
  };
};

export const calculateBMI = (height: number, weight: number) => {
  return weight / ((height / 100) * 2);
};
