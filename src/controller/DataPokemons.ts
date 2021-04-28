import _ from 'lodash';

export default class DataPokenons {
    async ItemPokemon() {
        const pokemons: number = 20;
        interface Interface {
            id: number;
            name: string;
            image: string;
        }
        let ArrItemPokemon: Interface[] = [];

        for (let i = 11; i <= pokemons; i++) {
            let data: any = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            let pokemon: any = await data.json()
            ArrItemPokemon = [...ArrItemPokemon, { id: pokemon.id, name: pokemon.name, image: pokemon.sprites.back_default }]
        }

        return ArrItemPokemon;
    }

    async shuffing() {
        let item ;
        await this.ItemPokemon().then(data => {
            const newArrItemPokemon = [...data, ...data];
            item = _.shuffle(newArrItemPokemon);
        })
        return item;
    }
}
