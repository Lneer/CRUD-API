import { slashTrim } from './slashTrim';

const BASE_URL = 'api/users';

export const getEndPoint = (url?: string): string | undefined => {
  const trimedUrl = slashTrim(url)?.toLowerCase();
  switch (trimedUrl) {
    case BASE_URL:
      return trimedUrl;
    case undefined:
      return undefined;
    default:
      return slashTrim(trimedUrl.replace(BASE_URL, ''));
  }
};
