import Loading from "@/components/Loading";
import { bg } from "@/components/LoginComponent";

export default function Home() {
  return (
    <main className={`min-h-screen ${bg}`}>
      <Loading bg={bg} />
    </main>
  );
}
