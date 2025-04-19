let db;

// ✅ Open (or Create) IndexedDB Database
const request = indexedDB.open("HealthyScaleDB", 1);

request.onupgradeneeded = function (event) {
    db = event.target.result;

    // Create Users store
    if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
    }

    // Create Recipes store
    if (!db.objectStoreNames.contains("recipes")) {
        db.createObjectStore("recipes", { keyPath: "id", autoIncrement: true });
    }
};

request.onsuccess = function (event) {
    db = event.target.result;
    console.log("✅ IndexedDB is ready!");
};

request.onerror = function (event) {
    console.error("❌ Error opening IndexedDB:", event.target.error);
};

// ✅ Save User Data (Username, Email, Password)
function saveUser(username, email, password) {
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");

    const user = { username, email, password };
    const request = store.add(user);

    request.onsuccess = function () {
        console.log("✅ User saved successfully!");
    };

    request.onerror = function (event) {
        console.error("❌ Error saving user:", event.target.error);
    };
}

// ✅ Save Recipe Data (Title, Ingredients, Preparation)
function saveRecipe() {
    const recipeTitle = document.getElementById("recipeTitle").value;
    const ingredients = document.getElementById("ingredients").value;
    const preparation = document.getElementById("preparation").value;

    const transaction = db.transaction(["recipes"], "readwrite");
    const store = transaction.objectStore("recipes");

    const recipe = { recipeTitle, ingredients, preparation };
    const request = store.add(recipe);

    request.onsuccess = function () {
        console.log("✅ Recipe saved successfully!");
        alert("Recipe saved successfully!");
    };

    request.onerror = function (event) {
        console.error("❌ Error saving recipe:", event.target.error);
    };
}

// ✅ Function to Handle User Sign In & Open Recipe Upload
function openRecipeUpload() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (username && email && password) {
        saveUser(username, email, password);

        document.getElementById("signInForm").classList.add("hidden");
        document.getElementById("recipeModal").classList.remove("hidden");
    } else {
        alert("⚠️ Please fill all fields before proceeding.");
    }
}

// ✅ Fetch & Display Users (For Debugging)
function getUsers() {
    const transaction = db.transaction(["users"], "readonly");
    const store = transaction.objectStore("users");
    const request = store.getAll();

    request.onsuccess = function (event) {
        console.log("👤 Users List:", event.target.result);
    };

    request.onerror = function (event) {
        console.error("❌ Error fetching users:", event.target.error);
    };
}

// ✅ Fetch & Display Recipes (For Debugging)
function getRecipes() {
    const transaction = db.transaction(["recipes"], "readonly");
    const store = transaction.objectStore("recipes");
    const request = store.getAll();

    request.onsuccess = function (event) {
        console.log("🍽️ Recipes List:", event.target.result);
    };

    request.onerror = function (event) {
        console.error("❌ Error fetching recipes:", event.target.error);
    };
}
