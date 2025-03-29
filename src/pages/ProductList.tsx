// src/pages/ProductList.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addProduct, removeProduct } from "../redux/ProductSlice";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
  Modal,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ProductList: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>("name"); // Додаємо стан для сортування
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    count: 0,
    description: "",
    imageUrl: "",
  });

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.imageUrl.trim()) return;
    dispatch(addProduct({ id: uuidv4(), ...newProduct }));
    setNewProduct({ name: "", count: 0, description: "", imageUrl: "" });
    setOpen(false);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      dispatch(removeProduct(productToDelete));
      setDeleteOpen(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOrder === "count") {
      return a.count - b.count;
    }
    return 0;
  });

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Product List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Product
      </Button>

      <FormControl sx={{ mt: 2, mb: 2 }}>
        <InputLabel id="sort-select-label">Sort by</InputLabel>
        <Select
          labelId="sort-select-label"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Sort by"
        >
          <MenuItem value="name">Alphabetically</MenuItem>
          <MenuItem value="count">By Count</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ height: "100%", position: "relative" }}>
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={product.imageUrl}
                  title={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body2">
                    Count: {product.count}
                  </Typography>
                </CardContent>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setProductToDelete(product.id);
                  setDeleteOpen(true);
                }}
                sx={{ position: "absolute", bottom: 8, right: 8 }}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "white",
            borderRadius: 2,
            maxWidth: 400,
            mx: "auto",
            mt: 10,
          }}
        >
          <TextField
            fullWidth
            label="Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Count"
            type="number"
            value={newProduct.count}
            onChange={(e) =>
              setNewProduct({ ...newProduct, count: Number(e.target.value) })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddProduct} sx={{ mt: 2 }}>
            Confirm
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mt: 2, ml: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>

      {/* Dialog for Deleting Product */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteProduct} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;
