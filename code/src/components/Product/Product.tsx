import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  Divider,
  Badge,
} from "@mui/material";

import { Product as ProductType } from "../../types/main";

type Props = ProductType & {
  onAddToCart?: () => void;
  onNavigate?: () => void;
};

export const Product = ({
  title,
  description,
  price,
  category,
  image,
  onNavigate,
  onAddToCart,
}: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="" />
      <CardContent>
        <Badge>{category}</Badge>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          onClick={() => {
            /* redirect to the single Product page
            useNavigate for routing
          */
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" onClick={onAddToCart}>
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};
