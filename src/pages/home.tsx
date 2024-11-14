import React from 'react';
import Navigation from '../components/homeNav';
import Sidebar from '../components/sidebar';

interface MyComponentProps {}

const MyComponent: React.FC<MyComponentProps> = () => {
  return (
    <main data-layername="home" className="flex h-screen w-screen overflow-hidden flex-col pb-96 leading-none text-center bg-white text-blue-950 max-md:pb-24">
      <Navigation />
      <Sidebar />
    </main>
  );
};

export default MyComponent;