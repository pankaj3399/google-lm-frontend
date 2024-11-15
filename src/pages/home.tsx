import Navigation from '../components/homeNav';
import Sidebar from '../components/sidebar';

const MyComponent = () => {
  return (
    <main className="flex flex-col bg-white overflow-x-hidden">
      <Navigation />
      <Sidebar />
    </main>
  );
};

export default MyComponent;