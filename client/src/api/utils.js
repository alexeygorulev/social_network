export const setQueryParam = (key, value, clear) => {
  if (window.history.replaceState) {
    const searchParams = clear
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newurl = `${
      window.location.origin + window.location.pathname
    }?${searchParams.toString()}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  }
};

export const changeQueryParams = (params, clear) => {
  if (window.history.replaceState) {
    const searchParams = clear
      ? new URLSearchParams()
      : new URLSearchParams(window.location.search);
    for (const key of searchParams.keys()) {
      if (!params.includes(key)) searchParams.delete(key);
    }
    const newurl = `${window.location.origin + window.location.pathname}${
      clear && !params?.length ? "" : "?"
    }${searchParams.toString()}`;
    window.history.replaceState({ path: newurl }, "", newurl);
  }
};
