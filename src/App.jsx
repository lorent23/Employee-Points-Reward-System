import { useEffect, useState } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/index.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    globals: {
      // ToDo: add toaster here
      onError: (error) => {
        console.log(error);
      },
    },
  },
});

function App() {
  const [primaryColor, setPrimaryColor] = useState("green");

  // Whitelabel logic. We will get values like 'primary/ secondary color' from the API
  useEffect(() => {
    const changeColor = setTimeout(() => {
      const pColor = "#535bf2";
      const root = document.querySelector(":root");
      root.style.setProperty("--primary-color", pColor);
      setPrimaryColor(pColor);
    }, 3000);
    return () => clearTimeout(changeColor);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: primaryColor,
          },
        }}
      >
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
