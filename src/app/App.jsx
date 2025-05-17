import { RouterProvider } from "react-router-dom";
import { router } from "./_routes";
import { JumboTheme } from "@jumbo/components";
import { CONFIG } from "./_config";
import { AuthProvider } from "./_components/_core";
import JumboRTL from "@jumbo/components/JumboRTL/JumboRTL";
import { Suspense } from "react";
import Spinner from "./_shared/Spinner";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "./_components/AppProvider";
import { FireDataProvider } from "./Firestation/pages/FireDataContext";

function App() {
  return (
    <FireDataProvider>
    <AuthProvider>
      <AppProvider>
        <JumboTheme init={CONFIG.THEME}>
          <CssBaseline />
          <Suspense fallback={<Spinner />}>
            <JumboRTL>
              <RouterProvider router={router} />
            </JumboRTL>
          </Suspense>
        </JumboTheme>
      </AppProvider>
    </AuthProvider>
    </FireDataProvider>
  );
}

export default App;
