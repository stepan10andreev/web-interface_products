export const getCashedData = <T>(key: string): T => {
  const cashedProducts = sessionStorage.getItem(key)
  return cashedProducts && JSON.parse(cashedProducts)
}
