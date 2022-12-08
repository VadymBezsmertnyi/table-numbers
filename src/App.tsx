import React from 'react';
import './App.css';
import Header from 'components/Header';
import Table from 'components/Table';
import { ContextProvider } from 'provider/provider';

const App = () => {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Table />
      </main>
    </ContextProvider>
  );
};

export default App;
