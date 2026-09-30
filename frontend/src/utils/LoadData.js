export const loadData = (loaderData, fallback) => {
  if (!loaderData || Object.keys(loaderData).length === 0) {
    console.warn("⚠️ Using mock data (demo mode)");
    return fallback;
  }
  return loaderData;
};
