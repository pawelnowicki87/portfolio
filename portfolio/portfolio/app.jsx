function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackMarquee />
        <Projects />
        <Timeline />
        <GithubStats />
        <Contact />
      </main>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
