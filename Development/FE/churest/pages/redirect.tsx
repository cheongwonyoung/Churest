import { useRouter } from 'next/router';

export default function Redirect() {
  const router = useRouter();
  const code = router.query.code;
  return <div>리다이렉트랑께요</div>;
}
