import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRedirectResult(auth);
        const userDocRef = await createUserDocumentFromAuth(response.user);
      } catch (error) {
        // Handle errors if necessary
      }
    };
    fetchData(); // Call the inner async function
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google redirect
      </button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;
