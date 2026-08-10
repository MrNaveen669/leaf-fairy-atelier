/**
 * CONTACT CONFIGURATION
 * ---------------------
 * IMPORTANT: The values below are PLACEHOLDERS. They are NOT verified business
 * contact details. Replace them before going live.
 */

/** [PHONE PLACEHOLDER] Replace with the real Leaf Fairy business number. */
export const PLACEHOLDER_PHONE = "+91 00000 00000";

/** [PHONE PLACEHOLDER] Same number in international dial format (digits only) for WhatsApp links. */
export const PLACEHOLDER_PHONE_E164 = "910000000000";

/** [EMAIL PLACEHOLDER] Replace with the real enquiries inbox. */
export const PLACEHOLDER_EMAIL = "hello@leaffairy.example";

/** [ADDRESS PLACEHOLDER] Replace with the real studio address. */
export const PLACEHOLDER_ADDRESS = "Studio address, Mumbai, Maharashtra, India";

export const STUDIO_HOURS = "Mon – Sat, 10:00 – 19:00 IST";

/** Builds a WhatsApp deep link with a prefilled enquiry message. */
export function whatsappLink(message: string) {
  return `https://wa.me/${PLACEHOLDER_PHONE_E164}?text=${encodeURIComponent(message)}`;
}
