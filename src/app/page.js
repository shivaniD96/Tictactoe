import { Game } from '@/components/Game';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'black' }}>
      <Game />
    </main>
  );
}
