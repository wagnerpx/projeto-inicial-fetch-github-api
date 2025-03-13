import { user } from '/src/scripts/services/user.js';
import { repositories } from '/src/scripts/services/repositories.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    getUserProfile(userName)
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    if (e.key === 'Enter') {
        getUserProfile(userName)
    }
});

function getUserProfile(userName) {

    user(userName).then(userData => {
        let userInfo = `<div class="info">
                            <img src="${userData.avatar_url}" alt="Foto do perfil do usuário" />
                            <div class="data">
                                <h1>${userData.name ?? 'Não possui nome cadastrado 😭'}</h1>
                                <p>${userData.bio ?? 'Não possui nome cadastrado 😭'}</p>
                            </div>
                        </div>`;

        document.querySelector('.profile-data').innerHTML = userInfo;

        getUserRepositories(userName);
    });
}

function getUserRepositories(userName) {
    repositories(userName).then(reposData => {
        let repositoriesItens = '';

        reposData.forEach(repo => {
            repositoriesItens += `<li>
                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                    <p>${repo.description ?? 'Não possui descrição 😭'}</p>
                                    </li>`;
        })

        document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
                                                                    <h2>Repositórios</h2>
                                                                    <ul>${repositoriesItens}</ul>
                                                                </div>`;
    })
}

