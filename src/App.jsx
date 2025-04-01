import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  // Charger les produits existants
  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  // Ajouter un produit via POST
  async function postProducts() {
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Nouveau produit",
        price: 29.99,
        description: "Un super produit ajouté via API",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        category: "electronics",
      }),
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été créé`);
    console.log("Produit créé :", data);
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Button onClick={postProducts}>Ajouter un produit</Button>
        </Col>
      </Row>

      <Row>
        {products.map((product) => (
          <Col key={product.id} className="mb-4 mx-2">
            <Card style={{ width: "18rem", overflow: "hidden" }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "1rem",
                }}
              />
              <Card.Body>
                <Card.Title style={{ height: "100px", overflow: "hidden" }}>
                  {product.title}
                </Card.Title>
                <Card.Text style={{ height: "150px", overflow: "auto" }}>
                  {product.description}
                </Card.Text>
                <Card.Text>Prix : {product.price} €</Card.Text>
                <Button onClick={postProducts}>
                  Modifier le produit complet
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
