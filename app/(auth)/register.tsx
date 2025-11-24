import { useRouter } from 'expo-router';
import RegisterScreen from '../../screens/RegisterScreen';

export default function Register() {
  const router = useRouter();
  
  const navigation = {
    goBack: () => router.back(),
    navigate: (screen: string) => {
      router.push(screen as any);
    },
  };

  return <RegisterScreen navigation={navigation as any} />;
}
