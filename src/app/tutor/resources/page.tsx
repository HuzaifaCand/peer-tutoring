import PageTransitionWrapper from "@/components/TransitionWrapper";
import ResourcesPageComponent from "@/components/users/resources/ResourcesPageComponent";

export default function ResourcesPage() {
  return (
    <PageTransitionWrapper>
      <ResourcesPageComponent />
    </PageTransitionWrapper>
  );
}
