import AIChat from "@/components/AIChat";
import NavigationBar from "@/components/NavBar";

export default function MainPage() {
  return (
    <div className="flex h-screen flex-col">
      <NavigationBar />
      <AIChat />
    </div>
  );
}
