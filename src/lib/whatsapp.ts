/**
 * Formats a phone number and opens WhatsApp in a new tab.
 * Uses a named window "whatsapp_window" to prevent multiple duplicate tabs.
 */
export const openWhatsApp = (phone: string, message: string) => {
  // Remove all non-numeric characters
  let cleanPhone = phone.replace(/\D/g, "");
  
  // Assume Indian numbers if 10 digits are provided
  if (cleanPhone.length === 10) {
    cleanPhone = "91" + cleanPhone;
  }
  
  // Ensure we have a valid country code or at least a reasonable length
  if (cleanPhone.length < 10) {
    console.error("Invalid phone number for WhatsApp:", phone);
    return;
  }

  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  
  // Using a specific window name ensures that subsequent calls reuse the same tab
  window.open(url, "whatsapp_window");
};
