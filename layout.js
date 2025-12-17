body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f6f6f6;
}

header {
  background: #fff;
  border-bottom: 4px solid #7b1f2a;
}

header h1 {
  margin: 0;
  padding: 15px;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  background: #7b1f2a;
}

nav a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  background: #5c1620;
}

main {
  max-width: 1100px;
  margin: 30px auto;
  padding: 20px;
  background: white;
}

/* 🔒 MOBILE — SOMENTE AQUI */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: center;
  }

  nav a {
    width: 100%;
    text-align: center;
  }
}
