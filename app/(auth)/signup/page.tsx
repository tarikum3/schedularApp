import SignUpView from "@/app/components/schedular/components/auth/SignUpView";

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col ">
        <SignUpView />
      </div>
    </main>
  );
}
