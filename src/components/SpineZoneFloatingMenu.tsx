"use client";

import FloatingActionMenu from "@/components/ui/floating-action-menu";
import { Calendar, Phone, MessageCircle, FileText, HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";

export function SpineZoneFloatingMenu() {
  const router = useRouter();

  const healthcareActions = [
    {
      label: "Book Assessment",
      Icon: <Calendar className="w-4 h-4" />,
      onClick: () => router.push("/assessment"),
    },
    {
      label: "Call Now",
      Icon: <Phone className="w-4 h-4" />,
      onClick: () => window.open("tel:+1-858-555-0123"),
    },
    {
      label: "Patient Portal", 
      Icon: <FileText className="w-4 h-4" />,
      onClick: () => router.push("/patient-portal"),
    },
    {
      label: "Chat Support",
      Icon: <MessageCircle className="w-4 h-4" />,
      onClick: () => {
        // Toggle chatbot or open support
        const chatbot = document.querySelector('[data-chatbot]');
        if (chatbot) {
          (chatbot as HTMLElement).click();
        }
      },
    },
    {
      label: "Emergency Care",
      Icon: <HeartHandshake className="w-4 h-4" />,
      onClick: () => window.open("tel:911"),
    },
  ];

  return (
    <FloatingActionMenu
      className="fixed bottom-8 left-8"
      options={healthcareActions}
    />
  );
}

// Compact version with essential healthcare actions
export function SpineZoneFloatingMenuCompact() {
  const router = useRouter();

  const healthcareActions = [
    {
      label: "Book Assessment",
      Icon: <Calendar className="w-4 h-4" />,
      onClick: () => router.push("/assessment"),
    },
    {
      label: "Call Now",
      Icon: <Phone className="w-4 h-4" />,
      onClick: () => window.open("tel:+1-858-555-0123"),
    },
    {
      label: "Patient Portal", 
      Icon: <FileText className="w-4 h-4" />,
      onClick: () => router.push("/patient-portal"),
    },
    {
      label: "Chat Support",
      Icon: <MessageCircle className="w-4 h-4" />,
      onClick: () => {
        const chatbot = document.querySelector('[data-chatbot]');
        if (chatbot) {
          (chatbot as HTMLElement).click();
        }
      },
    },
  ];

  return (
    <FloatingActionMenu
      className="fixed bottom-6 left-6 z-[60]"
      options={healthcareActions}
    />
  );
}