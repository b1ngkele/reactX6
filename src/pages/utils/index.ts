const graphToJson = (graph) => {
  return {
    // ...state.flow,
    nodes: graph.getNodes().map((item) => {
      // @ts-ignore
      const {
        id,
        shape,
        label,
        ports: { items },
        data,
      } = item;
      const { x, y } = item.position();
      return {
        id,
        shape,
        label,
        x,
        y,
        ports: {
          items,
        },
        data,
      };
    }),
    edges: graph.getEdges().map((item) => ({
      target: item.target,
      source: item.source,
      data: item.data,
    })),
  };
};
