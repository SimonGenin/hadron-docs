export const echo = ({ params, query }) => {
  return {
    body: { params, query }
  };
};