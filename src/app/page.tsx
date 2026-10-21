import Hero from "@/components/Hero";
import TroupeShowcase from "@/components/TroupeShowcase";
import FeaturesSection from "@/components/FeaturesSection";
import FeaturedClassesPreview from "@/components/FeaturedClassesPreview";
import GalleryPreview from "@/components/GalleryPreview";
import CtaBanner from "@/components/CtaBanner";
import AdminRedirectCheck from "@/components/AdminRedirectCheck";

export default function Home() {
  return (
    <div className="bg-[#07020e] text-[#f8f5ff] min-h-screen">
      <AdminRedirectCheck />
      <Hero />
      <TroupeShowcase />
      <FeaturesSection />
      <FeaturedClassesPreview />
      <GalleryPreview />
      <CtaBanner />
    </div>
  );
}
