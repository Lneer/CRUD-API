import { User } from '../types/user';

const checkArray = <T>(arr: Array<T>):boolean => {
  if (Array.isArray(arr) && arr.every((elem) => typeof elem === 'string')) {
    return true;
  }
  return false;
};

export const bodyFieldsValidate = (user: User):boolean => {
  const { username, age, hobbies } = user;
  if (typeof username === 'string' && typeof age === 'number' && checkArray(hobbies)) {
    return true;
  } return false;
};
