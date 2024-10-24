import { useNavigation } from '@remix-run/react';

export function TopLoader() {
  const navigation = useNavigation();
  return (
    <div
      style={{
        display: navigation.state === 'loading' ? 'block' : 'none',
      }}
      className="h-1 w-full z-50 fixed top-0 left-0 bg-gradient-to-r from-purple-400 to-purple-700 animate-pulse transition-all"
    ></div>
  );
}
