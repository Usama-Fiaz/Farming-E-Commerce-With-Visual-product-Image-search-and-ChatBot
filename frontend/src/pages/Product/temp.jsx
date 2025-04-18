import React from "react";
import { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
  commentList: {
    marginTop: theme.spacing(2),
    "& > *": {
      marginBottom: theme.spacing(2),
    },
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    "& > *": {
      margin: theme.spacing(1, 0),
    },
  },
  commentDate: {
    color: theme.palette.text.secondary,
  },
}));

const Product = () => {
  const classes = useStyles();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { text: "This product is great!", date: "2024-03-05T08:16:12.126Z" },
    {
      text: "I am really happy with this purchase.",
      date: "2024-03-04T14:32:45.872Z",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = { text: commentText, date: new Date().toISOString() };
    setComments([...comments, newComment]);
    setCommentText("");
  };
  //

  const id = useParams().id;

  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading, error } = useFetch(
    `http://127.0.0.1:8000/product-inventory/product-detail/${id}`
  );

  console.log(data);

  return (
    <div className="product">
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="mainImg">
              <img
                // src={"http://127.0.0.1:8000/" + data?.image}
                // alt={"http://127.0.0.1:8000/" + data?.image}
                src={data?.image}
                alt={data?.image}
              />
            </div>
          </div>
          <div className="right">
            <h1
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "2em",
                color: "#333",
                textAlign: "center",
                margin: "20px 0",
              }}
            >
              {data?.title}
            </h1>
            <span className="price">£:{data?.price}</span>
            <p>{data?.brand_name}</p>

            <div className="quantity">
              <button
                className="quantity"
                onClick={() =>
                  setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                }
              >
                -
              </button>
              {quantity}
              <button
                className="quantity"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <button
              className="add"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.title,
                    desc: data.brand_name,
                    price: data.price,
                    img: `${data.image}`,
                    quantity,
                    vendorfk: data.vendorfk,
                    totalbill: data.price * quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>

            <hr />
            <div className="right">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Shop:</strong>
                    </TableCell>
                    <TableCell>{data?.vendorfk.Business_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Product ID:</strong>
                    </TableCell>
                    <TableCell>{data?.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Product Style:</strong>
                    </TableCell>
                    <TableCell>{data?.Style}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Product Shape:</strong>
                    </TableCell>
                    <TableCell>{data?.shape}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Product Color:</strong>
                    </TableCell>
                    <TableCell>{data?.color}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Product Type:</strong>
                    </TableCell>
                    <TableCell>{data?.Product_category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Shop Location:</strong>
                    </TableCell>
                    <TableCell>{data?.available_location}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "sans-serif",
                        color: "#2879fe",
                      }}
                    >
                      <strong>Dimension:</strong>
                    </TableCell>
                    <TableCell>1 ft X 1 ft</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <Box className={classes.root}>
                <Typography variant="h5" className={classes.sectionTitle}>
                  Comments ({comments.length})
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    label="Add a comment"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Post Comment
                  </Button>
                </form>
                <List className={classes.commentList}>
                  {comments.map((comment, index) => (
                    <React.Fragment key={index}>
                      <ListItem
                        alignItems="flex-start"
                        className={classes.comment}
                      >
                        <ListItemAvatar>
                          <Avatar>{comment.text.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.text}
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.commentDate}
                            >
                              {moment(comment.date).format(
                                "MMM Do YYYY, h:mm:ss a"
                              )}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < comments.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
