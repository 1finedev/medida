import Canvas from './components/Canvas';
import CanvasActions from './components/CanvasActions';
import DrawingHistory from './components/DrawingHistory';

function App() {
  return (
    <main className="w-full h-screen flex items-center justify-center bg-background text-text-primary py-8 px-6">
      <section className="w-[20vw] h-full">
        <DrawingHistory />
      </section>
      <section className="flex-1 flex flex-col space-y-6 h-full border border-transparent bg-primary rounded-2xl p-6">
        <CanvasActions />
        <Canvas />
      </section>
    </main>
  );
}

export default App;
