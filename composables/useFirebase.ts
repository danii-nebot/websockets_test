import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

export default function () {
  const { $auth } = useNuxtApp();
  const user = useState<User | null>("firebase-user", () => null);

  $auth?.onAuthStateChanged((_user: User) => {
    user.value = _user;
  });

  function errorHandler(error: any) {
    // TODO:
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  }

  async function loginUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword($auth, email, password);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async function registerUser() {
    const email = "daniign@gmail.com";
    const password = "123456";
    try {
      await createUserWithEmailAndPassword($auth, email, password);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async function googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup($auth, provider);
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async function logout() {
    try {
      await signOut($auth);
    } catch (error) {
      errorHandler(error);
    }
  }

  return {
    user,
    loginUser,
    registerUser,
    googleLogin,
    logout,
  };
}
