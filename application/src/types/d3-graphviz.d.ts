declare module 'd3-graphviz' {
  interface GraphvizRenderOptions {
    engine?: 'dot' | 'circo' | 'neato' | 'osage' | 'twopi';
    images?: Array<{ path: string; width: number; height: number }>;
  }

  interface GraphvizInstance {
    renderDot(dot: string, options?: GraphvizRenderOptions): GraphvizInstance;
    zoomBehavior?: unknown;
    destroy(): void;
  }

  interface GraphvizOptions {
    useWorker?: boolean;
    fit?: boolean;
    width?: number;
    height?: number;
    zoom?: boolean;
    tweenShapes?: boolean;
  }

  export function graphviz(
    selector: string | Element,
    options?: GraphvizOptions,
  ): GraphvizInstance;
}
