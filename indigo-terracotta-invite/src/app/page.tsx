"use client";

import React, { useState, useSyncExternalStore } from "react";
import FolioCover from "@/components/FolioCover";
import EditorialInvite from "@/components/EditorialInvite";

const emptySubscribe = () => () => {};

function useGuestParam() {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const val = new URLSearchParams(window.location.search).get("guest");
      return val && val.trim().length > 0 ? val.trim() : "Beloved Guest";
    },
    () => "Beloved Guest"
  );
}

export default function Home() {
  const guestName = useGuestParam();
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen bg-petal-milk text-berry-ink">
      <FolioCover
        guestName={guestName}
        isOpen={opened}
        onOpen={() => setOpened(true)}
      />
      <div className={opened ? "opacity-100" : "opacity-0 pointer-events-none"}>
        <EditorialInvite guestName={guestName} />
      </div>
    </main>
  );
}
