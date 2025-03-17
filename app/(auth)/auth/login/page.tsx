import LoginView from "@/app/components/schedular/components/auth/LoginView";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col ">
        <LoginView />
      </div>
    </main>
  );
}
