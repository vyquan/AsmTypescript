import DataPokenons from './DataPokemons'

const getPokemons = new DataPokenons();
export default class GameController {
    point: number;
    total: number;
    select: number;
    time: number;
    user_name: string;
    status: boolean;
    interval;
    constructor(point, total, select, time, user_name) {
        this.point = point;
        this.total = total;
        this.select = select;
        this.time = time;
        this.user_name = user_name;
    }

    async renderItem() {
        this.status = false;
        document.querySelector('#namePlayers').textContent = this.user_name;
        await getPokemons.shuffing().then(pokemons => {
            this.total = pokemons.length;
            const mainInterfaceElement = document.getElementById('mainInterface')
            const html = pokemons.map((pokemon) => {
                return /*html*/ `
                <div class="col-2 m-2 p1 text-center pokemon ">
                    <div class="overlay"></div>
                    <span class="text-center invisible">$#${pokemon.id}</span>
                    <img src="${pokemon.image}" class="img-fluid" title="${pokemon.name}">
                </div>`;
            }).join('')
            mainInterfaceElement.innerHTML = html;
        });
    }
    afterRender() {
        const pokemonElements = document.querySelectorAll('.pokemon');
        pokemonElements.forEach(btnPokemon => {
            btnPokemon.addEventListener("click", () => {
                btnPokemon.classList.add('selected');
                btnPokemon.querySelector('.overlay').classList.add('invisible')
                this.handleLogic();
            });
        });

    }
    handleLogic() {
        const selectedElement = document.querySelectorAll('.selected');

        if (selectedElement.length == 2) {
            const tempStatus = selectedElement[0].querySelector('span').textContent ==
                selectedElement[1].querySelector('span').textContent
            if (tempStatus) {
                this.matched(selectedElement);
            } else {
                this.notMatch(selectedElement);
            }
        }
    }
    matched(selectedElement) {
        const pointElement = document.querySelector('#point');
        this.point += 100;
        pointElement.textContent = `${this.point}`;
        selectedElement.forEach(btn => {
            btn.classList.add('bg-warning');
            setTimeout(() => {
                btn.classList.remove('selected');
                btn.classList.add('invisible');
            },500);
        })
        this.handleSelect();
    }
    notMatch(selectedElement) {
        selectedElement.forEach(btn => {
            btn.classList.add('bg-danger');
            setTimeout(() => {
                btn.querySelector('.overlay').classList.remove('invisible')
                btn.classList.remove('selected', 'bg-danger');
            }, 500);
        })
    }
    handleSelect() {
        this.select++;
        if (this.select === this.total / 2) {
            this.status = true;
            clearInterval(this.interval);
            const html = /*html */ `
            <div class="col-10">
                <img style="width:950px; height:670px" src="https://i.pinimg.com/originals/4b/18/17/4b1817221d77d9ddf67119b2ed532a0b.gif" alt="">
            </div>
            `
            document.querySelector('#mainInterface').innerHTML = html;
        }
    }
    handlingTime(time = this.time, statusWin = this.status) {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            time--;
            document.querySelector('#time').textContent = `${time}`;
            if (statusWin === true) {
                clearInterval(this.interval);
            }
            if (time == 0) {
                clearInterval(this.interval);
                const html = /*html */ `
                    <div class="col-10">
                    <img style="width:950px; height:670px" src="https://i.pinimg.com/originals/99/40/27/994027a48bb98e180e56a66265ccd922.gif" alt="">
                    </div>
                `;
                document.querySelector('#mainInterface').innerHTML = html;
            }
        },1000)
    }
}
