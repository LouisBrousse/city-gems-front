import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

const $api = async <
  DefaultT = unknown,
  DefaultR extends NitroFetchRequest = NitroFetchRequest,
  T = DefaultT,
  R extends NitroFetchRequest = DefaultR,
  O extends NitroFetchOptions<R> = NitroFetchOptions<R>
>(
  url: R,
  options?: O
) => {
  try {
    const auth = useAuth(); 
    const response = await $fetch<T>(url, {
      ...options,
      headers: {
        Authorization: auth.logged ? `Bearer ${auth.accessToken}` : '',
        ...options?.headers,
      },
    });

    return response;
  } catch (error) {
    console.error('API request failed:', error);


    throw error; 
  }
};
function useAuth() {
    throw new Error('Function not implemented.');
}

