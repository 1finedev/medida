import Canvas from './components/Canvas';
import DrawingHistory from './components/DrawingHistory';

function App() {
  return (
    <main className="items-center justify-center w-full min-h-screen px-6 py-8 bg-background text-text-primary">
      <section className="flex items-center justify-center">
        <Canvas />
      </section>
      <section className="flex-1 border border-transparent flex flex-col items-center justify-center lg:px-[10vw] px-4 mt-6">
        <DrawingHistory />
      </section>
    </main>
  );
}

export default App;
