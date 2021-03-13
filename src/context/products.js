// products context
import React from 'react';
import axios from 'axios';

export const ProductContext = React.createContext();

export default function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [SpinnerType, setSpinnerType] = React.useState('');
  const [SpinnerText, setSpinnerText] = React.useState('');
  const [featured, setFeatured] = React.useState([]);
  const [sorted, setSorted] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [realted, setRealted] = React.useState([]);
  const [filters, setFilters] = React.useState({
    search: '',
    category: 'all',
    shipping: false,
    price: 'all',
    city: 'all',
  });
  const cat = filters.category;

  const [counter, setcounter] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    getProducts();
    axios.get(`https://walkin-start.herokuapp.com/api/counter/`).then((res) => {
      setcounter(res.data);
    });
    axios.get(`https://walkin-start.herokuapp.com/api/like`).then((res) => {
      setLikes(res.data);
    });
    return () => {};
  }, []);

  const getProducts = () => {
    setLoading(true);
    axios
      .get(`https://walkin-start.herokuapp.com/api/places`)
      .then((response) => {
        setSorted(response.data);
        setProducts(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateProduct = (place) => {
    const index = products.findIndex((it) => it._id === place._id);
    if (index > -1) {
      products.splice(index, 1, place);
      // setProducts(products);
    }
  };
  const updateLikes = (userId, id, inc = true) => {
    if (inc) {
      console.log('user id =>', userId);
      axios
        .put(`https://walkin-start.herokuapp.com/api/like/${id}/increment`, {
          userId: userId,
        })
        .then((res) => {
          if (res.status == 200) {
            const { count, _id, users } = res.data;
            const newLikes = [...likes];
            const index = newLikes.findIndex((it) => it._id === _id);
            if (index > -1) {
              newLikes[index] = res.data;
              setLikes(newLikes);
            }
          }
        });
    } else {
      axios
        .put(`https://walkin-start.herokuapp.com/api/like/${id}/decrement`, {
          userId: userId,
        })
        .then((res) => {
          if (res.status == 200) {
            const { count, _id, users } = res.data;
            const newLikes = [...likes];
            const index = newLikes.findIndex((it) => it._id === _id);
            if (index > -1) {
              newLikes[index] = res.data;
              setLikes(newLikes);
            }
          }
        });
    }
  };

  return (
    <div>
      <ProductContext.Provider
        value={{
          products,
          counter,
          likes,
          loading,
          featured,
          sorted,
          page,
          filters,
          updateLikes,
          updateProduct,
          realted,
        }}
      >
        {children}
      </ProductContext.Provider>
    </div>
  );
}
