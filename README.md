## Getting Started

You can build your container with

-   docker build . -tmy-next-js-app
    and run it with
-   docker run -p 3000:3000 my-next-js-app

## ENV

RK7_PORT=port to rk7 http
RK7_URL = https://"address ref server ":$RK7_PORT/rk7api/v0/xmlinterface.xml
RK7_LOGIN=login full right
RK7_PASSWORD=password full right
MAINPARENTIDENT=ident Cashier group
