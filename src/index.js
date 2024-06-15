import { ThemeProvider } from "@mui/material";
import FullScreenContainer from "app/components/layout/layout";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PositivoTheme from "theme";
import App from "./App";
import store, { persistor } from "./core/redux/store";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={PositivoTheme}>
            <QueryClientProvider client={query}>
                <PersistGate loading={null} persistor={persistor}>
                    <Provider store={store}>
                        <ToastContainer />
                        <BrowserRouter>
                            <FullScreenContainer>
                                <App />
                            </FullScreenContainer>
                        </BrowserRouter>
                    </Provider>
                </PersistGate>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
