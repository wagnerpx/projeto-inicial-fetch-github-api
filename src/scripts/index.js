import { getUser } from '/src/scripts/services/user.js';
import { getRepositories } from '/src/scripts/services/repositories.js';

import { user } from './objects/user.js';
import { screen } from './objects/screen.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserData(userName)
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    if (e.key === 'Enter') {
        getUserData(userName)
    }
});

async function getUserData(userName) {

    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    screen.renderUser(user);

}

// function getUserRepositories(userName) {
//     getRepositories(userName).then(reposData => {
//         let repositoriesItens = '';

//         reposData.forEach(repo => {
//             repositoriesItens += `<li>
//                                     <a href="${repo.html_url}" target="_blank">${repo.name}</a>
//                                     <p>${repo.description ?? 'Não possui descrição 😭'}</p>
//                                     </li>`;
//         })

//         document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
//                                                                     <h2>Repositórios</h2>
//                                                                     <ul>${repositoriesItens}</ul>
//                                                                 </div>`;
//     })
// }

