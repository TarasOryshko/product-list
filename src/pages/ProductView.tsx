// src/pages/ProductView.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateProduct, removeProduct } from "../redux/ProductSlice";
import {
  Container,
  Typography,
  TextField,
  Button,
  Modal,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === id)
  );
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(
    product || {
      id: "",
      name: "",
      count: 0,
      description: "",
      imageUrl: "",
    }
  );

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  const handleUpdateProduct = () => {
    dispatch(updateProduct(updatedProduct));
    setOpen(false);
  };

  const handleDeleteProduct = () => {
    dispatch(removeProduct(id!));
    navigate("/");
  };

  return (
    <Container>
      <Card sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
        <CardMedia
          component="img"
          alt={product.name}
          height="300"
          image={product.imageUrl}
          title={product.name}
        />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="body1">Count: {product.count}</Typography>
        </CardContent>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ m: 2 }}
        >
          Edit Product
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleDeleteProduct}
          sx={{ m: 2 }}
        >
          Delete Product
        </Button>
      </Card>

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
            value={updatedProduct.name}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Count"
            type="number"
            value={updatedProduct.count}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                count: Number(e.target.value),
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={updatedProduct.description}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                description: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            value={updatedProduct.imageUrl}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })
            }
            margin="normal"
          />
          <Button
            variant="contained"
            onClick={handleUpdateProduct}
            sx={{ mt: 2 }}
          >
            Save Changes
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
    </Container>
  );
};

export default ProductView;
