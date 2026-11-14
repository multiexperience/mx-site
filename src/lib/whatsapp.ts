// International format, no "+" and no spaces — used to build wa.me links.
export const WHATSAPP_NUMBER = '5513996773215'

export const whatsappUrl = (text?: string) =>
  text
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`
