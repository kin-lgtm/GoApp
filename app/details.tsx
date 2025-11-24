import { useLocalSearchParams, useRouter } from 'expo-router';
import DetailsScreen from '../screens/DetailsScreen';

export default function Details() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Parse the item from params
  const item = params.item ? JSON.parse(params.item as string) : null;
  
  const navigation = {
    goBack: () => router.back(),
  };

  const route = {
    params: { item },
  };

  return <DetailsScreen navigation={navigation as any} route={route as any} />;
}
