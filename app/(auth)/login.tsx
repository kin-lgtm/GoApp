import { useRouter } from 'expo-router';
import LoginScreen from '../../screens/LoginScreen';

export default function Login() {
  const router = useRouter();
  
  const navigation = {
    navigate: (screen: string) => {
      if (screen === 'Register') {
        router.push('/(auth)/register');
      }
    },
    replace: (screen: string) => {
      router.replace(screen as any);
    },
  };

  return <LoginScreen navigation={navigation as any} />;
}
