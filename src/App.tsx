import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routers } from "@/core/routers";
import { RouteView } from "@/core/types/router";

function App() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routers.map(({ path, component: Component }: RouteView) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
