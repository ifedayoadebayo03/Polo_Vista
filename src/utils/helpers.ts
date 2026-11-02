import { CartItem } from '../types';
import { STORE_PHONE_INTL, STORE_LOCATION } from '../data/products';

export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

export function generateWhatsAppMessage(
  cart: CartItem[],
  customerInfo: {
    name: string;
    phone: string;
    deliveryMethod: 'pickup' | 'delivery';
    stateOrAddress: string;
    notes: string;
  }
): string {
  const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let message = `*HELLO POLO VISTA CLOTHES STORE (YABA, LAGOS)*\n`;
  message += `I want to place a wholesale order from your website.\n\n`;
  message += `*ORDER SUMMARY (${totalQty} Pieces Total):*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;

  cart.forEach((item, index) => {
    const lineTotal = item.unitPrice * item.quantity;
    message += `${index + 1}. *${item.name}*\n`;
    message += `   • Size: ${item.size}\n`;
    message += `   • Color: ${item.color}\n`;
    message += `   • Quantity: ${item.quantity} pcs\n`;
    message += `   • Price: ${formatNaira(item.unitPrice)} each = *${formatNaira(lineTotal)}*\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*ESTIMATED TOTAL: ${formatNaira(totalPrice)}*\n\n`;
  message += `*CUSTOMER DETAILS:*\n`;
  message += `• Name: ${customerInfo.name || 'Not specified'}\n`;
  message += `• Phone: ${customerInfo.phone || 'Not specified'}\n`;
  message += `• Fulfillment: ${
    customerInfo.deliveryMethod === 'pickup'
      ? `Pickup Shop @ Yaba Lagos (${STORE_LOCATION})`
      : `Nationwide Waybill / Delivery to: ${customerInfo.stateOrAddress || 'Delivery Address to be confirmed'}`
  }\n`;

  if (customerInfo.notes) {
    message += `• Additional Notes: ${customerInfo.notes}\n`;
  }

  message += `\nPlease confirm stock availability and send payment account details. Thank you!`;

  return encodeURIComponent(message);
}

export function getWhatsAppUrl(encodedMessage: string): string {
  return `https://wa.me/${STORE_PHONE_INTL}?text=${encodedMessage}`;
}
