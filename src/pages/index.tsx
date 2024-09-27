import { PageLayout } from "@/components/layout/page";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex">
        <p>Not a user?</p>
        <a href="/form">Register</a>
      </div>
    </PageLayout>
  );
}
