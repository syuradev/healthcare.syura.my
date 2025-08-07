import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export function useLogin() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      console.log("Login successful! Session data:", authData.session);
      console.log("User data:", authData.user);

      reset();
      router.push("/dashboard");
    } catch (err) {
      setError("root", { message: "An unexpected error occurred" });
      console.error("Login error:", err);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting
  };
}
