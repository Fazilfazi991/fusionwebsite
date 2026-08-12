import type { Metadata } from "next";
import { KaamDeleteAccountClient } from "./kaam-delete-account-client";

export const metadata: Metadata = {
  title: "KAAM Account Deletion | Fusion Ventures",
  description: "Existing KAAM users can securely request permanent account deletion."
};

export default function KaamDeleteAccountPage() {
  return <KaamDeleteAccountClient />;
}
