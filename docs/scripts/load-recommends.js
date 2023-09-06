const createRecommendCard = ({ imgSrc, title, category, videoUrl }) => {
    const recommendCardTemplate = document
        .getElementById("recipe-recommend-template")
        .content.firstElementChild.cloneNode(true);

    const recommendCardImage = recommendCardTemplate.querySelector(
        ".recipe-recommends-card__thumb"
    );
    const recommendCardTitle = recommendCardTemplate.querySelector(
        ".recipe-recommends-card__title a"
    );
    const recommendCardCategory = recommendCardTemplate.querySelector(
        ".recipe-recommends-card__category"
    );

    recommendCardImage.src = imgSrc;
    recommendCardTitle.textContent = title;
    recommendCardTitle.href = videoUrl;
    recommendCardCategory.textContent = category;

    return recommendCardTemplate;
};

const loadRecommends = async () => {
    try {
        const mealsRes = [];
        for (let i = 0; i < 3; i++) {
            mealsRes.push(
                await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
            );
        }

        const meals = await Promise.all(mealsRes.map(res => res.json()));

        const recommendsContainer = document.querySelector(".recipe-recommends");

        meals.forEach(meal => {
            const mealData = meal.meals[0];
            const recommendCard = createRecommendCard({
                imgSrc: mealData.strMealThumb,
                title: mealData.strMeal,
                category: mealData.strCategory,
                videoUrl: mealData.strYoutube
            });

            recommendsContainer.appendChild(recommendCard);
        });
    } catch (err) {
        console.error(err);
    }
};

window.addEventListener("load", loadRecommends);
