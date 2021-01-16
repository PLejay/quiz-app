const localURL = 'http://localhost:3004';

const exports = {
  getDecks: () => {
    return fetchRequest(`getDecks`);
  }
}


const fetchRequest = (url: string) => {
  return fetch(`${localURL}/${url}`)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    })
}

export default exports;