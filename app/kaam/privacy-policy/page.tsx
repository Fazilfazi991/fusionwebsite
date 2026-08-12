import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "KAAM Privacy Policy | Fusion Ventures",
  description: "Privacy Policy for KAAM, operated by FUSION VENTURES FZ-LLC."
};

const sections = [
  {
    title: "1. Introduction",
    content: [
      "This Privacy Policy explains how KAAM, operated by FUSION VENTURES FZ-LLC, handles personal information when you use the KAAM mobile application and related KAAM services. It applies to the Android application with package identifier com.kaamperfectmatch.kaam_perfect_match and to KAAM services made available by us.",
      "KAAM is a hiring and job-matching service for Candidates and Employers. The information we process depends on the account type, the features you use, and the information you choose or need to provide to use those features."
    ]
  },
  {
    title: "2. Information We Collect",
    content: [
      "Account and authentication information: name, email address, phone number where provided, account and authentication identifiers, role (Candidate or Employer), and authentication/session information. If you choose Google Sign-In, Google provides identity information needed to authenticate your KAAM account.",
      "Candidate profile and employment information: profile photo, nationality, gender, date of birth, country, city and other location information you enter; headline, skills, languages, job roles, experience, work preferences, salary expectations, availability, privacy preferences, and profile/resume media paths.",
      "Employer and company information: company and contact details, trade-license and verification information where provided, company logo, hiring requirements, and related hiring workflow information.",
      "Identity-document information: passport and visa images, document numbers, issue and expiry dates, nationality, date of birth, OCR-extracted fields, and document validation, verification, and review results. Government identification information is sensitive information.",
      "Communications and activity information: interests and requests, matches, saved and recently viewed candidates, chat messages, notification events and preferences.",
      "Device and technical information: Firebase Cloud Messaging device tokens, device or installation identifiers used for notifications, and authentication, service-operation, and error metadata made available by our service providers."
    ]
  },
  {
    title: "3. How We Use Information",
    content: [
      "We use information to create and authenticate accounts; create Candidate profiles and Employer/company profiles; provide matching, eligibility, hiring, saved-candidate and recently-viewed features; enable interests, matches and chat; deliver in-app and push notifications; provide support; operate, secure and protect KAAM from misuse; and comply with applicable operational requirements.",
      "We use identity documents and extracted information to support Candidate identity verification and eligibility workflows. Document review and validation information helps KAAM determine the status of information submitted for those workflows."
    ]
  },
  {
    title: "4. Candidate and Employer Visibility",
    content: [
      "KAAM makes selected professional Candidate profile information available to eligible Employers according to the application’s matching and privacy rules. Selected Employer company and hiring information may be available to Candidates as part of the hiring workflow. Interests, matches, and chat content are available to the applicable participants.",
      "Passport and visa images, document numbers, OCR-extracted identity fields, and document review information are used for KAAM verification and eligibility workflows. They are stored in private KAAM storage and are not made publicly visible to Employers as part of normal Candidate profile visibility."
    ]
  },
  {
    title: "5. Camera and Image Access",
    content: [
      "KAAM may request camera access when you choose to capture a profile image or identity document. It may also let you choose an image or document file when you choose to upload profile media or identity documents. KAAM does not use the camera continuously."
    ]
  },
  {
    title: "6. Notifications",
    content: [
      "KAAM uses Firebase Cloud Messaging to deliver relevant service notifications, such as interests, matches, messages, document updates, and account or service events where enabled. KAAM stores device tokens and notification preferences to support this feature. Notification delivery is subject to your device permissions and KAAM notification preferences."
    ]
  },
  {
    title: "7. Service Providers",
    content: [
      "We use service providers that process information to operate KAAM: Supabase for authentication, database and storage services; Google for Google Sign-In and Firebase Cloud Messaging; and Azure Document Intelligence through a server-side OCR workflow when identity-document OCR is configured and used. These providers process the information needed to provide their services to KAAM.",
      "Provider operational logs, authentication metadata, and service telemetry may be retained under the provider’s own applicable policies and configuration."
    ]
  },
  {
    title: "8. How Information Is Shared",
    content: [
      "KAAM shares information within the service where necessary for matching, hiring, and communication, as described in the Candidate and Employer Visibility section. We also disclose information to the service providers described above when needed for them to provide their services to KAAM.",
      "We may disclose information where required to comply with applicable law, respond to valid legal process, protect the security of KAAM or its users, or in connection with a lawful business transaction."
    ]
  },
  {
    title: "9. Data Security",
    content: [
      "KAAM uses HTTPS for information in transit, authenticated access controls, Supabase Row Level Security, server-side authorization for account deletion, and private storage protections for sensitive documents. These measures are designed to protect information, but no online service can guarantee absolute security."
    ]
  },
  {
    title: "10. Data Retention",
    content: [
      "We retain KAAM account and service information while it is needed to operate the account and service, subject to the deletion process below. We do not state fixed retention periods here because they depend on the relevant data, service operation, and provider configuration.",
      "When an account is deleted, KAAM removes the account and associated active KAAM database records and user-owned storage objects according to the implemented deletion workflow. Provider operational logs, backups, and provider-controlled metadata may be subject to the provider’s own retention practices and are not necessarily erased immediately."
    ]
  },
  {
    title: "11. Account and Data Deletion",
    content: [
      "You can permanently delete a KAAM account in the app through Settings / Login & Security → Delete Account. KAAM requires identity verification, an explicit confirmation, and then signs the account out after deletion.",
      "You can also use our public deletion page at https://www.fusionventuresglobal.com/kaam/delete-account. It requires verification of the existing KAAM account email before deletion. Deletion is permanent and removes associated active KAAM data according to the implemented deletion workflow."
    ]
  },
  {
    title: "12. Your Choices and Requests",
    content: [
      "You can manage certain profile, visibility, and notification settings in KAAM. For privacy questions, account information requests, correction requests where supported, or help with deletion, contact us at info@fusionventuresglobal.com."
    ]
  },
  {
    title: "13. Children and Age",
    content: [
      "KAAM is intended for job seekers and Employers. KAAM does not currently publish a minimum-age policy. A minimum intended age and target-audience decision is required before final Google Play target-audience declarations are made."
    ]
  },
  {
    title: "14. International Processing",
    content: [
      "KAAM uses cloud and service providers that may process information across jurisdictions. We do not identify particular processing locations or transfer mechanisms here because they depend on the applicable provider configuration."
    ]
  },
  {
    title: "15. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy when KAAM’s data practices or service functionality change. The current version will be published on this page with its updated date."
    ]
  },
  {
    title: "16. Contact Us",
    content: [
      "KAAM is operated by FUSION VENTURES FZ-LLC. For privacy questions or requests, contact info@fusionventuresglobal.com."
    ]
  }
];

export default function KaamPrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 px-5 py-6 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-[980px] items-center justify-between gap-5">
          <a href="/" aria-label="Fusion Ventures home"><Image src="/fusion-ventures-logo.webp" alt="Fusion Ventures" width={640} height={176} className="h-9 w-auto" /></a>
          <a href="/" className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d6a84f]">Return to Fusion Ventures</a>
        </div>
      </header>
      <section className="px-5 py-14 sm:px-10 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[900px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d6a84f]">KAAM · FUSION VENTURES FZ-LLC</p>
          <h1 className="mt-5 font-display text-4xl leading-tight tracking-[-0.045em] sm:text-6xl">KAAM Privacy Policy</h1>
          <p className="mt-5 text-sm text-white/55">Last updated: August 13, 2026</p>
          <p className="mt-7 max-w-[760px] text-base leading-8 text-white/65">This policy is written for the current KAAM production data flows and account-deletion behavior.</p>
          <div className="mt-12 grid gap-5">
            {sections.map((section) => <article key={section.title} className="rounded-xl border border-[#d6a84f]/20 bg-white/[0.035] p-6 sm:p-8"><h2 className="text-xl font-semibold text-white">{section.title}</h2>{section.content.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-white/68">{paragraph}</p>)}</article>)}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
