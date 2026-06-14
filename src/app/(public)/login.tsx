import { LoginView } from "@/screens/Login/Login.view";
import { useLoginVM } from "@/screens/Login/useLogin.vm";

export default function Login() {
  const vm = useLoginVM();

  return <LoginView {...vm} />;
}
