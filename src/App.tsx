import Canvas from './components/Canvas';
import DrawingHistory from './components/DrawingHistory';

function App() {
  return (
    <main className="w-full min-h-screen items-center justify-center bg-background text-text-primary py-8 px-6">
      <section className="flex justify-center items-center">
        <Canvas />
      </section>
      <section className="flex-1 border border-transparent p-6 max-w-[80vw] flex flex-col items-center justify-center">
        <DrawingHistory />
      </section>
    </main>
  );
}

export default App;
