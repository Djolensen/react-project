import {
  Avatar,
  Box,
  TextField,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import {
  getAllProducts,
  getUserCarts,
  createNewCart,
  updateExistingCart,
} from "../../api/api";

import { Product as ProductType } from "../../types/main";
import { Product } from "../../components/Product/Product";

type ProductInLocalStorage = {
  productId: number;
  quantity: number;
};

export const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);

  const updateBackendCart = async (
    userId: number,
    products: ProductInLocalStorage[]
  ) => {
    try {
      const userCarts = await getUserCarts(userId);
      if (userCarts.data.length !== 0) {
        /* ovde updatujemo korpu */
        const existingCart = userCarts.data[0];
        await updateExistingCart(existingCart.id, userId, products);
      } else {
        await createNewCart(userId, products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProductToCart = (product: ProductType) => {
    const { id } = product;
    const cartFromStorage = localStorage.getItem("cart");

    if (cartFromStorage) {
      const productsFromStorage = JSON.parse(
        cartFromStorage
      ) as ProductInLocalStorage[];

      const existingProductIndex = productsFromStorage.findIndex((product) => {
        return product.productId === id;
      });

      /* TO-DO -> Proveriti da li je nulti index, kako ne bi ulazio u else ispod. */
      if (existingProductIndex !== -1) {
        const existingProduct = productsFromStorage[existingProductIndex];

        productsFromStorage[existingProductIndex] = {
          productId: id,
          quantity: existingProduct.quantity + 1,
        };

        localStorage.setItem("cart", JSON.stringify(productsFromStorage));
        updateBackendCart(1, productsFromStorage);
      } else {
        const updatedProducts = [
          ...productsFromStorage,
          { productId: id, quantity: 1 },
        ];

        localStorage.setItem("cart", JSON.stringify(updatedProducts));
        updateBackendCart(1, updatedProducts);
      }
    } else {
      const products = [{ productId: id, quantity: 1 }];
      const productsInStorage = JSON.stringify(products);
      localStorage.setItem("cart", productsInStorage);
      updateBackendCart(1, products);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        component="aside"
        sx={(theme) => ({
          width: "15%",
          height: "100%",
          backgroundColor: theme.palette.grey[50],
          borderRight: `2px solid ${theme.palette.grey[200]}`,
          borderTopRightRadius: theme.spacing(2),
          borderBottomRightRadius: theme.spacing(2),
        })}
      >
        <List>
          <ListItem>Products</ListItem>
        </List>
      </Box>

      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: theme.spacing(3),
            gap: 3,

            borderBottom: `2px solid ${theme.palette.grey[300]}`,
          })}
        >
          <TextField
            placeholder="Search for products"
            sx={{ flex: 1 }}
            variant="standard"
          />
          <Avatar />
        </Box>

        <Box
          sx={(theme) => ({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",

            padding: theme.spacing(3),
          })}
        >
          <Typography>Products</Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              overflowX: "hidden",
              gap: 3,
            }}
          >
            {products.map((product) => {
              return (
                <Product
                  {...product}
                  onAddToCart={() => addProductToCart(product)}
                  onNavigate={() => {
                    /* navigate to single product page */
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
