// Contact configuration - Update these with your actual details
export const WHATSAPP_NUMBER = "1234567890"; // Replace with your WhatsApp number (with country code, no +)
export const INSTAGRAM_HANDLE = "frameandfocusstudio"; // Replace with your Instagram handle

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

// Generate WhatsApp link with pre-filled message
export function getWhatsAppLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Pre-filled messages for different services
export const WHATSAPP_MESSAGES = {
  portrait: "Hi Frame & Focus Studio! I'm interested in booking a Portrait Session. Could you share your availability and pricing?",
  event: "Hi Frame & Focus Studio! I'm interested in Event Coverage for my upcoming event. Could you share your packages and availability?",
  brand: "Hi Frame & Focus Studio! I'm interested in a Brand Shoot for my business. Could you share your creative packages?",
  product: "Hi Frame & Focus Studio! I'm interested in Product Photography for my online store. Could you share your rates?",
  fashion: "Hi Frame & Focus Studio! I'm interested in Fashion & Beauty photography. Could you share your editorial packages?",
  corporate: "Hi Frame & Focus Studio! I'm interested in Corporate Photography (headshots/team photos). Could you share your business packages?",
  miniSession: "Hi Frame & Focus Studio! I'd like to book a Mini Session. Is this package available?",
  premiumSession: "Hi Frame & Focus Studio! I'm interested in the Premium Portrait Session. Could we discuss details?",
  brandPackage: "Hi Frame & Focus Studio! I'd like to start a Brand/Product Shoot. Let's discuss the creative direction!",
  eventPackage: "Hi Frame & Focus Studio! I need Event Coverage. Could you send me a custom quote?",
  general: "Hi Frame & Focus Studio! I'd love to book a photography session with you. What are your available dates?",
  graduation: "Hi Frame & Focus Studio! I'm interested in a Graduation Shoot. Could you share your packages?",
  wedding: "Hi Frame & Focus Studio! I'm looking for wedding photography coverage. Could you share your packages?",
  birthday: "Hi Frame & Focus Studio! I'd like to book a Birthday Shoot. What packages do you offer?",
  family: "Hi Frame & Focus Studio! I'm interested in a Family Portrait session. Could you share your availability?",
} as const;

export type ServiceType = keyof typeof WHATSAPP_MESSAGES;
