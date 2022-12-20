export default function searchParam(key) {
    return new URLSearchParams(location.search).get(key);
  };