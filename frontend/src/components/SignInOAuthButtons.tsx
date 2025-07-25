import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
    const {signIn,isLoaded}=useSignIn();
    if(!isLoaded)
    {
        return null;
    }
    const sigInWithGoogle = () =>{
        signIn.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    }
  return (
    <Button onClick={sigInWithGoogle} variant={"secondary"} className="w-full text-white border-zinc-200 h-11">
        Continue with Google
    </Button>
  )
}

export default SignInOAuthButtons