import { LazyExoticComponent, ComponentType } from 'react';

export interface RouteView {
  path: string;
  component: LazyExoticComponent<ComponentType>;
  meta: {
    title: string;
  };
  needLogin: boolean;
}

export interface ModuleConfig {
  name: string;
  views: RouteView[];
}
