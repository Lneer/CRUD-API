export const slashTrim = (str?: string): undefined | string => {
  if (!str) {
    return undefined;
  }

  let res = str;
  if (str[0] === '/') {
    res = res.slice(1);
  }

  if (str[str.length - 1] === '/') {
    res = res.slice(0, str.length - 2);
  }
  return res;
};
