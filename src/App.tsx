import React from 'react';
import { Header, Table, Footer } from 'components';
import { ContextProvider } from 'provider/provider';

import './App.css';

const App = () => {
  return (
    <ContextProvider>
      <Header />
      <main>
        <Table />
      </main>
      <Footer />
    </ContextProvider>
  );
};

export default App;
