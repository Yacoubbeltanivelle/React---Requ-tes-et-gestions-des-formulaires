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

  // Modifier un produit via Put
  async function putProducts(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Produit mis à jour",
        price: 49.99,
        description: "Description mise à jour",
        image: "https://via.placeholder.com/150",
        category: "electronics",
      }),
    });

    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
    console.log("Produit modifié :", data);
  }

  // Modifier partiellement un produit
  async function patchProducts(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: 39.99,
      }),
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été modifié`);
    console.log("Produit modifié :", data);
  }

  // Supprimer un produit via DELETE
  async function deleteProducts(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    alert(`Le produit avec l'id ${data.id} a été supprimé`);
    console.log("Produit supprimé :", data);
  }

  return (
    <Container>
      <Col>
        <Button onClick={postProducts}>Ajouter un produit</Button>
      </Col>

      <Row className="gy-4">
        {products.map((product) => (
          <Col md={3} lg={3} key={product.id}>
            <Card className="card h-100">
              <Card.Img variant="top" src={product.image} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text className="text">{product.description}</Card.Text>
                <Card.Text className="text">Prix : {product.price} €</Card.Text>
                <Button onClick={() => putProducts(product.id)}>
                  Modifier le produit complet
                </Button>
                <Button
                  variant="warning"
                  onClick={() => patchProducts(product.id)}
                >
                  Modifier le prix du produit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteProducts(product.id)}
                >
                  Supprimer le produit
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
