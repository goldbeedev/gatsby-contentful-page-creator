async function createProductPages(actions, graphql) {
  const result = await graphql(
    `
      {
        allContentfulProducts {
          edges {
            node {
              id

              productTitle
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw new Error(result.errors);
  }

  const productTemplate = path.resolve("./src/templates/product.tsx");

  const products = result.data.allContentfulProducts.edges;

  products.forEach(product => {
    actions.createPage({
      path: `/product/${product.node.id}/`,

      component: productTemplate,

      context: {
        id: product.node.id
      }
    });
  });
}
