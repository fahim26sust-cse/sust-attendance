'use client';
import { useSessionUser } from '@/lib/custom_hook/student/useSessionUser';
import UserGeoFenceInner from '../components/geo-fence/UserGeoFenceInner';
import UnauthedSplash from '../components/student-home/UnauthedSplash';

export default function UserGeoFenceComp() {
  const { mounted, user } = useSessionUser();
  if (!mounted) return null;
  if (!user) return <UnauthedSplash />;
  return <UserGeoFenceInner studentId={user.id} />;
}
