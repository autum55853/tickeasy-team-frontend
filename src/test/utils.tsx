import { ReactNode } from "react";
import { render, renderHook, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { ModalStatusProvider } from "@/context/modalStatusContext";

function createWrapper(initialEntries: string[] = ["/"]) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <ModalStatusProvider>
          <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
        </ModalStatusProvider>
      </QueryClientProvider>
    );
  };
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions & { initialEntries?: string[] }
) {
  const { initialEntries, ...renderOptions } = options ?? {};
  return render(ui, { wrapper: createWrapper(initialEntries), ...renderOptions });
}

export function renderHookWithProviders<T>(
  renderFn: () => T,
  options?: { initialEntries?: string[] }
) {
  return renderHook(renderFn, { wrapper: createWrapper(options?.initialEntries) });
}
