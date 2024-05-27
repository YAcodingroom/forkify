const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renameKeys = function (obj) {
  const keyValues = Object.keys(obj).map(key => {
    const index = key.indexOf('_');
    const newKey =
      index > 1
        ? `${key.slice(0, index)}${key
            .slice(index + 1)[0]
            .toUpperCase()}${key.slice(index + 2)}`
        : key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};

const showRecipe = async function () {
  try {
    const res = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/664c8f193e7aa067e94e8706'
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const recipe = renameKeys(data.data.recipe);

    console.log(recipe);
  } catch (err) {
    console.error(err.message);
  }
};

showRecipe();
