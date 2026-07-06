export function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} сум`;
}

export function getEffectivePrice(product) {
  return product.salePrice ?? product.price;
}
