const API_URL = "http://localhost:5000/api";

async function fetchRecipes() {
  try {
    const response = await fetch(API_URL);
    const recipes = await response.json();

    const container = document.getElementById("recipesContainer");
    container.innerHTML = "";

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.classList.add("recipe-card");

      card.innerHTML = `
        <button class="delete-btn" onclick="deleteRecipe('${recipe._id}')">✖</button>
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load recipes", error);
  }
}

async function addRecipe() {
  const name = document.getElementById("name").value;
  const ingredients = document.getElementById("ingredients").value.split(",");
  const instructions = document.getElementById("instructions").value;

  if (!name || !ingredients || !instructions) {
    alert("Please fill all fields!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, ingredients, instructions })
  });

  document.getElementById("name").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("instructions").value = "";

  fetchRecipes();
}

async function deleteRecipe(id) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchRecipes();
  }
}

document.getElementById("addRecipeBtn").addEventListener("click", addRecipe);
fetchRecipes();
