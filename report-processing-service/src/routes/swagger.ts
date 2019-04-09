import koaSwagger from 'koa2-swagger-ui';

export const swaggerRouter = (baseUrl: string) => {

  const swaggerConfig = {
    routePrefix: '/documentation',
    swaggerOptions: {
      url: `${baseUrl}/swagger.json`,
    },
  }

  return koaSwagger(swaggerConfig);
}
