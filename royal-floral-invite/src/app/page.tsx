"use client";

import React, { useState, useSyncExternalStore } from "react";
import InviteEnvelope from "@/components/InviteEnvelope";
import HeroSection from "@/components/HeroSection";
import CountdownSection from "@/components/CountdownSection";
import StorySection from "@/components/StorySection";
import SaptapadiVowsWheel from "@/components/SaptapadiVowsWheel";
import EventsSection from "@/components/EventsSection";
import WardrobeLookbook from "@/components/WardrobeLookbook";
import DiyaBlessingRitual from "@/components/DiyaBlessingRitual";
import VenueSection from "@/components/VenueSection";
import GallerySection from "@/components/GallerySection";
import RsvpSection from "@/components/RsvpSection";
import FooterSection from "@/components/FooterSection";

const emptySubscribe = () => () => {};

function useUrlGuestParam() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const paramGuest = new URLSearchParams(window.location.search).get("guest");
      return paramGuest && paramGuest.trim().length > 0
        ? paramGuest.trim()
        : "Beloved Guest";
    },
    () => "Beloved Guest"
  );
}

export default function Home() {
  const guestName = useUrlGuestParam();
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-ivory text-ink">
      {/* Royal Velvet & Floral Wax-Seal Cover */}
      <InviteEnvelope
        guestName={guestName}
        isOpen={envelopeOpen}
        onOpen={() => setEnvelopeOpen(true)}
      />

      {/* Main Wedding Invitation Flow */}
      <div
        className={`transition-opacity duration-1000 ${
          envelopeOpen ? "opacity-100" : "opacity-0 pointer-events-none select-none"
        }`}
      >
        <HeroSection guestName={guestName} />
        <CountdownSection />
        <StorySection />
        <SaptapadiVowsWheel />
        <EventsSection />
        <WardrobeLookbook />
        <DiyaBlessingRitual />
        <VenueSection />
        <GallerySection />
        <RsvpSection guestName={guestName} />
        <FooterSection />
      </div>
    </main>
  );
}
