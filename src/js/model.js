export const state = {
  recipe: {},
};

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

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.recipe = renameKeys(data.data.recipe);

    console.log(state.recipe);
  } catch (err) {
    console.error(err.message);
  }
};