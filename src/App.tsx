import { EmployeeForm } from "./features/personal/components/EmployeeForm";
import { PersonalForm } from "./features/personal/components/PersonalForm";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 sm:gap-12">
        <PersonalForm />
        <EmployeeForm />
      </div>
    </main>
  );
}