const createRecipesCard = ({ imgSrc, title, category, videoUrl }) => {
    const recipeCardTemplate = document
        .getElementById("recipe-card-template")
        .content.firstElementChild.cloneNode(true);

    const recipeCardImage = recipeCardTemplate.querySelector(".recipe-card__thumb");
    const recipeCardTitle = recipeCardTemplate.querySelector(".recipe-card__title");
    const recipeCardCategory = recipeCardTemplate.querySelector(
        ".recipe-card__category"
    );
    const recipeCardButton = recipeCardTemplate.querySelector(".recipe-card__btn");

    recipeCardImage.src = imgSrc;
    recipeCardTitle.textContent = title;
    recipeCardCategory.textContent = category;
    recipeCardButton.href = videoUrl;

    return recipeCardTemplate;
};

const fetchRecipes = async q => {
    const recipesContainer = document.querySelector(".recipes__results");
    recipesContainer.innerHTML = "";
    try {
        const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
        );
        const data = await res.json();

        data.meals.forEach(meal => {
            const recipeCard = createRecipesCard({
                imgSrc: meal.strMealThumb,
                title: meal.strMeal,
                category: meal.strCategory,
                videoUrl: meal.strYoutube
            });

            recipesContainer.appendChild(recipeCard);
        });
    } catch (err) {
        console.error(err);
    }
};

let timeoutId;
const searchBar = document.getElementById("searchbar__input");
searchBar.addEventListener("keyup", async e => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fetchRecipes(e.target.value), 500);
});
