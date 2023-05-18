import product1 from "./assets/products/1.jpg";
import product2 from "./assets/products/2.jpg";
import product3 from "./assets/products/3.jpg";
import product4 from "./assets/products/4.jpg";
import product5 from "./assets/products/5.jpg";
import product6 from "./assets/products/6.jpg";
import product7 from "./assets/products/7.jpg";
import product8 from "./assets/products/8.jpg";
import product9 from "./assets/products/9.jpg";
import product10 from "./assets/products/10.jpg";
import product11 from "./assets/products/11.jpg";
import product12 from "./assets/products/12.jpg";

const arrayProducts = [
  {
    id: "price_1N8PF8JqMocsCimAMf80uWGc",
    name: "Life Pro Isolate Zero 1kg",
    price: 48.90,
    image: product1,
  },
  {
    id: "price_1N8PHyJqMocsCimAtaI4NjFJ",
    name: "Life Pro Stamina Energy Drink 300g",
    price: 19.90,
    image: product2,
  },
  {
    id: "price_1N8PJxJqMocsCimAslmfPNUw",
    name: "Life Pro Creatine Monohydrate 200mesh 300g",
    price: 27.90,
    image: product3,
  },
  {
    id: "price_1N8PL6JqMocsCimAJdQ7F7za",
    name: "Life Pro Vegan Protein 900g Organic Protein",
    price: 33.90,
    image: product4,
  },
  {
    id: "price_1N8PLtJqMocsCimAQlboPmEV",
    name: "Life Pro Whey Choco Monky 1kg Limited Edition",
    price: 32.90,
    image: product5,
  },
  {
    id: "price_1N8PMSJqMocsCimAjZPLVCMe",
    name: "Life Pro Whey Gourmet Edition 900g",
    price: 30.90,
    image: product6,
  },
  {
    id: "price_1N8PNFJqMocsCimABQZJGXhO",
    name: "Life Pro Casein Pro Gourmet Edition 900g",
    price: 34.90,
    image: product7,
  },
  {
    id: "price_1N8PNvJqMocsCimAQYy18Hfm",
    name: "Life Pro Fit Food Tasty Rice Choco Monky 1kg",
    price: 6.90,
    image: product8,
  },
  {
    id: "price_1N8POsJqMocsCimADrpUFf3o",
    name: "Life Pro Peanut Choc Protein Cream 250g",
    price: 7.50,
    image: product9,
  },
  {
    id: "price_1N8PPTJqMocsCimAiHbRKbHv",
    name: "Sauzero Zero Calories Ketchup 310ml",
    price: 3.80,
    image: product10,
  },
  {
    id: "price_1N8PQ4JqMocsCimAAIYKx3hz",
    name: "Sauzero Zero Calories Yogurt 310ml",
    price: 3.80,
    image: product11,
  },
  {
    id: "price_1N8PQgJqMocsCimAS39iPlIR",
    name: "Sauzero Zero Calories Dulce De Leche 310ml",
    price: 3.80,
    image: product12,
  },
];

function getProductData(id) {
  let productData = arrayProducts.find((product) => product.id === id);

  if (productData === undefined) {
    console.log("Product not found for id: " + id);
    return undefined;
  }

  return productData;
}

export { arrayProducts, getProductData };
