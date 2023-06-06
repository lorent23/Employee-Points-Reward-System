import { useEffect, useState } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./router/index.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
    globals: {
      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    },
  },
});

function App() {
  const [primaryColor, setPrimaryColor] = useState("green");

  useEffect(() => {
    const changeColor = setTimeout(() => {
      const pColor = "#535bf1";
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
        <ToastContainer />
        <Router />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
